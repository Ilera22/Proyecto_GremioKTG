<template>
  <v-card>
    <v-container fluid>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
        <v-list-item nav>
          <template v-slot:prepend>
            <v-avatar>
              <img src='@/assets/logo_ktg.png' alt="Avatar" />
            </v-avatar>
          </template>

          <template v-slot:title>
            gremioktg
          </template>

          <template v-slot:append>
            <v-btn
              icon="mdi-chevron-left"
              variant="text"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-home"
            title="Home"
            value="home"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account"
            title="My Account"
            value="account"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-group-outline"
            title="Users"
            value="users"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      rail: true,
    }
  },
}
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí */
</style>
