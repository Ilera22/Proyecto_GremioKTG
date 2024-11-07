<template>
  <v-container class="pa-4">
    <v-toolbar class="px-2 search-bar" flat bg-color="orange">
      <h3>THRONE AND LIBERTY GUIAS</h3>
      <v-spacer></v-spacer>
      <v-text-field
        class="pa-1"
        v-model="search"
        density="comfortable"
        placeholder="Search"
        prepend-inner-icon="mdi-magnify"
        style="max-width: 300px"
        variant="solo"
        clearable
        hide-details
      ></v-text-field>
    </v-toolbar>

    <v-slide-group v-model="selectedSlide" class="pa-2" show-arrows>
      <v-slide-item v-for="(item, index) in filteredGames" :key="index" :value="index">
        <v-card class="pb-3 ma-2 rounded-card" height="250" width="260" @click="goToArticle(item.link)">
          <v-img :src="item.img" height="140" cover class="rounded-image"></v-img>
          <v-list-item :subtitle="truncateText(item.subtitle, 30)" class="mb-2">
            <template v-slot:title>
              <strong class="text-h12 mb-2 wrap">{{ item.title }}</strong>
            </template>
          </v-list-item>
          <div class="d-flex justify-space-between px-4">
            <div class="d-flex align-center text-caption text-medium-emphasis me-1"></div>
          </div>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'GameSlider',
  data() {
    return {
      search: '',
      selectedSlide: 0,
      games: [],
    };
  },
  computed: {
    filteredGames() {
      return this.games.filter(game => {
        return game.title.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  mounted() {
    this.fetchGames();
  },
  methods: {
    async fetchGames() {
      try {
        const response = await axios.get('https://wp.gremioktg.com/wp-json/wp/v2/posts', {
          params: {
            category: '21', // Tag ID del juego (Throne and Liberty)
            post_tag: '25', // Tag ID para guías
            per_page: 10,
            _embed: true
          }
        });

        console.log('API Response:', response.data); // Añadir esta línea para depuración

        if (response.data.length === 0) {
          console.warn('No posts found with the specified tags.');
        }

        const posts = response.data.map(post => ({
          img: post._embedded && post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0].source_url : 'https://cdn.vuetifyjs.com/docs/images/graphics/games/default.jpg',
          title: post.title.rendered,
          subtitle: this.cleanText(post.excerpt.rendered),
          link: post.link
        }));

        this.games = posts;
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    },
    truncateText(text, maxLength) {
      if (text && text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
      }
      return text;
    },
    cleanText(text) {
      return text ? text.replace(/<\/?[^>]+(>|$)/g, "") : ""; // Eliminar etiquetas HTML
    },
    goToArticle(link) {
      window.open(link, '_blank'); // Abrir el enlace en una nueva pestaña
    }
  }
};
</script>

<style scoped>
.search-bar {
  background-color: transparent !important;
}

.wrap {
  display: flex;
  flex-wrap: wrap;
  white-space: normal;
  overflow-wrap: break-word;
}

.rounded-image {
  border-radius: 15px;
}

.rounded-card {
  border-radius: 15px;
}
</style>
