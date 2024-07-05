<template>
    <v-app>      
        <TabMenu />
        <PopularGames />    
        <GameSlider />

    </v-app>
  </template>
  
  <script>
import TabMenu from '../components/TabMenu.vue';
import PopularGames from '../components/PopularGames.vue';
import GameSlider from '../components/GameSlider.vue';
  
  
  
  export default {
    name: 'HomePage',
    components: {
      TabMenu,
      GameSlider,
      PopularGames,
    },
  };
  </script>
  
  <style>
  /* Aquí puedes agregar estilos globales o específicos para tu App.vue */
  </style>