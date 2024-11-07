<template>
  <aside :class="['sidebar', { 'sidebar--collapsed': isCollapsed }]">
    <button class="toggle-button" @click="toggleSidebar">
      <i v-if="isCollapsed" class="fas fa-chevron-right"></i>
      <i v-else class="fas fa-chevron-left"></i>
    </button>

    <div class="logo" v-if="!isCollapsed">
      <img src="path/to/logo.png" alt="Logo" />
    </div>

    <div class="search" v-if="!isCollapsed">
      <input type="text" v-model="searchQuery" placeholder="Buscar..." @input="onSearch" />
    </div>

    <nav class="menu">
      <ul>
        <li v-for="item in filteredItems" :key="item.id" @click="navigate(item)">
          <img :src="item.icon" alt="Icono del juego" />
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
import { getAllItems } from '~/services/api';

export default {
  data() {
    return {
      isCollapsed: true,
      searchQuery: '',
      items: [
        { id: 1, name: 'Diablo IV', icon: 'path/to/diablo-icon.png' },
        { id: 2, name: 'World of Warcraft', icon: 'path/to/wow-icon.png' },
      ],
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(item =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },
    async onSearch() {
      if (this.searchQuery.length > 2) {
        const response = await getAllItems();
        this.items = response.filter(item => 
          item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        this.items = await getAllItems();
      }
    },
    navigate(item) {
      this.$router.push({ name: 'game-page', params: { id: item.id } });
    },
  },
};
</script>

<style>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 80px;
  height: 100vh;
  transition: width 0.3s;
  overflow: hidden;
}
.sidebar--collapsed {
  width: 250px;
}
.toggle-button {
  color: #fff;
  cursor: pointer;
}
.search input {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
}
</style>
