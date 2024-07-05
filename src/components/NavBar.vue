<template>
    <div>
      <!-- Navigation Drawer -->
      <v-navigation-drawer v-model="drawer" app temporary>
        <v-list>
          <v-list-item v-for="item in items" :key="item.title">
            <v-list-item-content>
              <v-list-item-title class="title">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  
      <!-- App Bar -->
      <v-row class="align-center no-gutters">
        <v-col cols="auto" class="burguer-menu">
          <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
        </v-col>
        <v-col cols="auto">
          <v-app-bar-title>
            <img
              :src="logoSrc"
              alt="Logo"
              style="max-height: 50px; max-width: 50px;"
              class="mt-2"
            />
          </v-app-bar-title>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" md="5">
          <v-text-field
            v-model="search"
            density="compact"
            label="Search"
            append-inner-icon="mdi-magnify"
            variant="outlined"
            flat
            hide-details
            single-line
            class="mx-2"
          ></v-text-field>
        </v-col>
      </v-row>
  
      <!-- Menu Button Row -->
      <v-row bg-color="deep-purple-accent-4" class="justify-center align-center">
        <v-col  class="menu-btn-container">
          <v-btn variant="text" v-for="(item, index) in items" :key="index">{{ item.title }}</v-btn>
        </v-col>
      </v-row>
    </div>
  </template>
  
  <script>
  export default {
    name: "NavBar",
    data() {
      return {
        search: '',
        drawer: false,
        items: [
          { title: 'Dropdown 1' },
          { title: 'Dropdown 2' },
          { title: 'Dropdown 3' },
          { title: 'Dropdown 4' },
          { title: 'Dropdown 5' },
        ],
        logoSrc: require('@/assets/logo_ktg.png') // Asegúrate de que la ruta sea correcta
      };
    },
    methods: {
      toggleDrawer() {
        this.drawer = !this.drawer;
      }
    }
  };
  </script>
  
  <style scoped>
  .burguer-menu {
    visibility: hidden;
  }
  
  .menu-btn-container {
    display: flex;
    justify-content: center;
  }
  
  @media only screen and (max-width: 767px) {
    .burguer-menu {
      visibility: visible;
    }
  
    .menu-btn-container {
      display: none;
    }
  }
  </style>