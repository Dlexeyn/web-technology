<template>
  <v-app>
    <AppBar/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup>
import AppBar from "@/views/AppBar.vue";
</script>
