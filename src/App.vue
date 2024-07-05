<template>
  <v-app>
    <nav><NavBar /></nav>
    
    <v-main>
      <div style="height: 2%;"></div>
      <TestComponent />
      <router-view />
      <TestComponent />
    </v-main>

    <footer>
      <AppFooter />
    </footer>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue';
import AppFooter from './components/AppFooter.vue'
import TestComponent from './components/TestComponent.vue';



export default {
  name: 'App',
  components: {
    NavBar,
    AppFooter,
    TestComponent,
  },
};
</script>

<style> 


</style>