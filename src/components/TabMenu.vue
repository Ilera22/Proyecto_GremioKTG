<template>
  <v-main>
    <v-row class="hero-container pa-3">
      <div style="background-color: var(--v-theme-primary); height: 300px;"></div>
      <v-col cols="12" md="7">
        <v-card color="teal">
          <v-responsive aspect-ratio="16:9" class="video-container">
            <iframe 
              width="100%" 
              style="min-height: 100%;" 
              src="https://www.youtube.com/embed/oAMG-mcXl_E?si=avXUDdHRJLMSmY21" 
              title="YouTube video player" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerpolicy="strict-origin-when-cross-origin">
            </iframe>
          </v-responsive>
        </v-card>
      </v-col>

      <v-col cols="12" md="5">
        <v-card>
          <v-tabs v-model="tab" bg-color="primary" align-tabs="center">
            <v-tab value="news">Noticias</v-tab>
            <v-tab value="analysis">Análisis</v-tab>
            <v-tab value="recent">Top</v-tab>
          </v-tabs>

          <v-card-text>
            <v-window v-model="tab">
              <v-window-item value="news">
                <v-row>
                  <v-col v-for="(item, index) in newsPosts" :key="index" cols="12" class="py-1">
                    <v-card class="v-card-styles">
                      <div class="d-flex flex-no-wrap justify-space-between">
                        <div class="content-container">
                          <v-card-title class="card-title wrap">{{ item.title.rendered }}</v-card-title>
                          <v-card-actions>
                            <v-btn class="ms-1" size="small" variant="outlined" @click="leerMas(item.link)">Leer Más</v-btn>
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

              <v-window-item value="analysis">
                <v-row>
                  <v-col v-for="(item, index) in analysisPosts" :key="index" cols="12" class="py-1">
                    <v-card class="v-card-styles">
                      <div class="d-flex flex-no-wrap justify-space-between">
                        <div class="content-container">
                          <v-card-title class="card-title wrap">{{ item.title.rendered }}</v-card-title>
                          <v-card-actions>
                            <v-btn class="ms-1" size="small" variant="outlined" @click="leerMas(item.link)">Leer Más</v-btn>
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

              <v-window-item value="recent">
                <v-row>
                  <v-col v-for="(item, index) in recentPosts" :key="index" cols="12" class="py-1">
                    <v-card class="v-card-styles">
                      <div class="d-flex flex-no-wrap justify-space-between">
                        <div class="content-container">
                          <v-card-title class="card-title wrap">{{ item.title.rendered }}</v-card-title>
                          <v-card-actions>
                            <v-btn class="ms-1" size="small" variant="outlined" @click="leerMas(item.link)">Leer Más</v-btn>
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
      tab: 'news',
      newsPosts: [],
      analysisPosts: [],
      recentPosts: [],
    };
  },
  mounted() {
    this.fetchNewsPosts();
    this.fetchAnalysisPosts();
    this.fetchRecentPosts();
  },
  methods: {
    async fetchNewsPosts() {
      try {
        const response = await axios.get(
          'https://wp.gremioktg.com/wp-json/wp/v2/posts?per_page=4&tags=14&_embed=true'
        );
        this.newsPosts = await this.fetchFeaturedImages(response.data);
      } catch (error) {
        console.error('Error fetching news posts:', error);
      }
    },
    async fetchAnalysisPosts() {
      try {
        const response = await axios.get(
          'https://wp.gremioktg.com/wp-json/wp/v2/posts?per_page=4&tags=18&_embed=true'
        );
        this.analysisPosts = await this.fetchFeaturedImages(response.data);
      } catch (error) {
        console.error('Error fetching analysis posts:', error);
      }
    },
    async fetchRecentPosts() {
      try {
        const response = await axios.get(
          'https://wp.gremioktg.com/wp-json/wp/v2/posts?per_page=4&orderby=date&order=desc&_embed=true'
        );
        this.recentPosts = await this.fetchFeaturedImages(response.data);
      } catch (error) {
        console.error('Error fetching recent posts:', error);
      }
    },
    async fetchFeaturedImages(posts) {
      const postPromises = posts.map(async (post) => {
        if (post.featured_media) {
          try {
            const mediaResponse = await axios.get(
              `https://gremioktg.com/wp-json/wp/v2/media/${post.featured_media}`
            );
            post.featured_image = mediaResponse.data.source_url;
          } catch (error) {
            console.error(`Error fetching image for post ${post.id}:`, error);
            post.featured_image = null;
          }
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
  min-height: 500px;
  margin: 0 auto;
  border-radius: 25px;
  background-color: rgba(71, 71, 71, 0.479);
}


/* este cambia la altura del video igual este es el v-responsive style="min-height: 500px;" */
.video-container {
  width: 100%;
  height:fit-content;
  min-height: 400px;
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
