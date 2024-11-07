<template>
  <v-main>
    <v-row class="hero-container pa-3">
      <div style="height: 300px;"></div>
      <v-col cols="12" md="7">
        <v-card>
          <v-responsive aspect-ratio="16/9" class="video-container">
            <v-img
              v-if="!videoLoaded"
              src="https://img.youtube.com/vi/ZZ5LpwO-An4/maxresdefault.jpg"
              @click="loadVideo"
              cover
              class="video-placeholder"
              alt="Video placeholder"
            ></v-img>
            <iframe
              v-else
              src="https://www.youtube.com/embed/ZZ5LpwO-An4"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              class="video-iframe"
            ></iframe>
          </v-responsive>
        </v-card>
      </v-col>

      <v-col cols="12" md="5">
        <v-card>
          <v-tabs v-model="tab" bg-color="primary" align-tabs="center">
            <v-tab value="one">News</v-tab>
            <v-tab value="two">Reviews</v-tab>
            <v-tab value="three">Hot</v-tab>
          </v-tabs>

          <v-card-text>
            <v-window v-model="tab">
              <!-- Contenido de las pestañas aquí -->
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import axios from 'axios';
import { format } from 'date-fns';

export default {
  name: 'TabMenu',
  data() {
    return {
      tab: 'one',
      recentPosts: [],
      guidePosts: [],
      topPosts: [],
      videoLoaded: false,
    };
  },
  mounted() {
    this.fetchRecentPosts();
    this.fetchGuidePosts();
    this.fetchTopPosts();
  },
  methods: {
    loadVideo() {
      this.videoLoaded = true;
    },
    async fetchRecentPosts() {
      try {
        const response = await axios.get('https://wp.gremioktg.com/wp-json/wp/v2/posts?per_page=4&_embed=true');
        const posts = await this.fetchFeaturedImages(response.data);
        this.recentPosts = posts;
      } catch (error) {
        console.error('Error fetching recent posts:', error);
      }
    },
    async fetchGuidePosts() {
      try {
        const response = await axios.get('https://wp.gremioktg.com/wp-json/wp/v2/posts?per_page=4&categories=1&_embed=true');
        const posts = await this.fetchFeaturedImages(response.data);
        this.guidePosts = posts;
      } catch (error) {
        console.error('Error fetching guide posts:', error);
      }
    },
    async fetchTopPosts() {
      try {
        const response = await axios.get('https://wp.gremioktg.com/wp-json/wp/v2/posts?per_page=4&categories=8&orderby=date&order=desc&_embed=true');
        const posts = await this.fetchFeaturedImages(response.data);
        this.topPosts = posts;
      } catch (error) {
        console.error('Error fetching top posts:', error);
      }
    },
    async fetchFeaturedImages(posts) {
      const postPromises = posts.map(async (post) => {
        if (post.featured_media) {
          const mediaResponse = await axios.get(`https://gremioktg.com/wp-json/wp/v2/media/${post.featured_media}`);
          post.featured_image = mediaResponse.data.source_url;
        } else {
          post.featured_image = null;
        }
        return post;
      });
      return Promise.all(postPromises);
    },
    leerMas(link) {
      window.open(link, '_blank');
    },
    formatDate(dateString) {
      return format(new Date(dateString), 'dd/MM/yy');
    },
  },
};
</script>

<style scoped>
.hero-container {
  width: 90%;
  margin: 0 auto;
  border-radius: 25px;
  background-color: rgba(71, 71, 71, 0.479);
}

.video-container {
  width: 100%;
}

.video-placeholder {
  cursor: pointer;
  height: 100%;
}

.video-iframe {
  width: 100%;
  height: 100%;
}

.card-title {
  font-size: 1rem;
}

.content-container {
  flex: 1;
  min-width: 0;
}

.wrap {
  white-space: normal;
  overflow-wrap: break-word;
}

.v-card-styles {
  background-color: var(--v-theme-primary);
}

/* Media Query for Mobile */
@media (max-width: 600px) {
  .card-title.wrap {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
