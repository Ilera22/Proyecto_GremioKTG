<template>
  <aside :class="['sidebar', { 'sidebar--collapsed': isCollapsed }]">
    <button class="toggle-button" @click="toggleSidebar">
      <i v-if="isCollapsed" class="fas fa-chevron-right"></i>
      <i v-else class="fas fa-chevron-left"></i>
    </button>

    <div class="logo" v-if="!isCollapsed">
      <img src="@/assets/logo_ktg.png" alt="Logo" />
    </div>

    <nav class="menu">
      <ul>
        <li v-for="item in items" :key="item.id" @click="navigate(item)">
          <img :src="item.icon" alt="Icono del juego" />
          <span v-if="!isCollapsed">{{ item.name }}</span>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: true,
      items: [
        { id: 1, name: 'Diablo IV', icon: '@/assets/logo_ktg.png' },
        { id: 2, name: 'World of Warcraft', icon: '@/assets/logo_ktg.png' },
        { id: 3, name: 'Elden Ring', icon: '@/assets/logo_ktg.png' },
        // Añade más juegos según lo necesites
      ],
    };
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },
    navigate(item) {
      // Lógica para navegación. Esto puede depender de Vue Router.
      this.$router.push({ name: 'game-page', params: { id: item.id } });
    },
  },
};
</script>

<style>
.sidebar {
  background-color: var(--sidebar-bg);
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
  background: none;
  border: none;
  color: var(--accent-color);
  cursor: pointer;
  margin: 10px;
}

.menu ul {
  list-style: none;
  padding: 0;
}

.menu ul li {
  display: flex;
  align-items: center;
  padding: 10px;
  transition: background 0.3s;
}

.menu ul li:hover {
  background-color: var(--hover-color);
}

.menu ul li img {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

.menu ul li span {
  color: var(--text-color);
}
</style>
