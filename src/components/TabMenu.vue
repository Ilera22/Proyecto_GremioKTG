<template>
  <v-main>
    <v-row class="hero-container pa-3">
      <div style="height: 300px;"></div>
      <v-col cols="12" md="7">
        <v-card>
          <v-img height="300px" src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" cover></v-img>
          <v-card-title class="card-title">Top western road trips</v-card-title>
          <v-card-subtitle>1,000 miles of wonder</v-card-subtitle>
          <div class="d-flex justify-end">
            <v-btn color="orange" class="mr-3 mb-3">Explore</v-btn>
          </div>
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
              <v-window-item value="one">
                <v-row>
                  <v-col v-for="(item, index) in recentPosts" :key="index" cols="12" class="py-1">
                    <v-card class="v-card-styles">
                      <div class="d-flex flex-no-wrap justify-space-between">
                        <div class="content-container">
                          <v-card-title class="card-title">{{ item.title.rendered }}</v-card-title>
                          <v-card-actions>
                            <v-btn class="ms-1" size="small" variant="outlined" @click="leerMas(item.link)">Leer Mas</v-btn>
                            <div class="ml-3">
                              <v-icon small class="mr-1">mdi-clock-outline</v-icon>
                              {{ formatDate(item.date) }}
                            </div>
                          </v-card-actions>
                        </div>
                        <v-avatar rounded="0" size="100">
                          <v-img :src="item.featured_image" cover></v-img>
                        </v-avatar>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-window-item>

              <v-window-item value="two">
                <v-row>
                  <v-col v-for="(item, index) in guidePosts" :key="index" cols="12" class="py-1">
                    <v-card class="v-card-styles">
                      <div class="d-flex flex-no-wrap justify-space-between">
                        <div class="content-container">
                          <v-card-title class="card-title">{{ item.title.rendered }}</v-card-title>
                          <v-card-actions>
                            <v-btn class="ms-1" size="small" variant="outlined" @click="leerMas(item.link)">Leer Mas</v-btn>
                            <div class="ml-3">
                              <v-icon small class="mr-1">mdi-clock-outline</v-icon>
                              {{ formatDate(item.date) }}
                            </div>
                          </v-card-actions>
                        </div>
                        <v-avatar rounded="0" size="100">
                          <v-img :src="item.featured_image" cover></v-img>
                        </v-avatar>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-window-item>

              <v-window-item value="three">
                <v-row>
                  <v-col v-for="(item, index) in topPosts" :key="index" cols="12" class="py-1">
                    <v-card class="v-card-styles">
                      <div class="d-flex flex-no-wrap justify-space-between">
                        <div class="content-container">
                          <v-card-title class="card-title">{{ item.title.rendered }}</v-card-title>
                          <v-card-actions>
                            <v-btn class="ms-1" size="small" variant="outlined" @click="leerMas(item.link)">Leer Mas</v-btn>
                            <div class="ml-3">
                              <v-icon small class="mr-1">mdi-clock-outline</v-icon>
                              {{ formatDate(item.date) }}
                            </div>
                          </v-card-actions>
                        </div>
                        <v-avatar rounded="0" size="100">
                          <v-img :src="item.featured_image" cover></v-img>
                        </v-avatar>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-window-item>
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
    };
  },
  mounted() {
    this.fetchRecentPosts();
    this.fetchGuidePosts();
    this.fetchTopPosts();
  },
  methods: {
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
.card-title {
  font-size: 0.8rem;
}

.hero-container {
  width: 90%;
  margin: 0 auto;
  border-radius: 25px;
  background-color: rgba(71, 71, 71, 0.479);
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
</style>
