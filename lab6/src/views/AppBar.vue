<template>
<!--  <v-app-bar dark color="primary">-->
<!--    <v-container fluid>-->
<!--      <v-row justify="center" align="center" class="navbar_main">-->
<!--        <v-app-bar-title>-->
<!--          <v-icon icon="mdi-circle-slice-4" />-->
<!--          Broker Component-->
<!--        </v-app-bar-title>-->
<!--        <v-toolbar-items>-->
<!--          <v-col>-->
<!--            <v-app-bar-title>-->
<!--              <router-link to="/login" class="navbar_btn_text pink_line">-->
<!--                Login-->
<!--              </router-link>-->
<!--            </v-app-bar-title>-->
<!--          </v-col>-->
<!--        </v-toolbar-items>-->
<!--      </v-row>-->
<!--    </v-container>-->
<!--  </v-app-bar>-->
  <nav class="navbar navbar-expand navbar-dark bg-primary">
    <a href class="navbar-brand" @click.prevent> Broker Component</a>
    <div class="navbar-nav mr-auto">
      <li v-if="isLogged" class="nav-item">
        <router-link to="/auction" class="nav-link">
          <font-awesome-icon icon="home" />Profile
        </router-link>
      </li>

<!--      <li v-if="showAdminBoard" class="nav-item">-->
<!--        <router-link to="/admin" class="nav-link">Admin Board</router-link>-->
<!--      </li>-->
<!--      <li v-if="showModeratorBoard" class="nav-item">-->
<!--        <router-link to="/mod" class="nav-link">Moderator Board</router-link>-->
<!--      </li>-->
<!--      <li class="nav-item">-->
<!--        <router-link v-if="currentUser" to="/user" class="nav-link">User</router-link>-->
<!--      </li>-->
    </div>

    <div v-if="!isLogged" class="navbar-nav ml-auto">

      <li class="nav-item">
        <router-link to="/login" class="nav-link">
          <font-awesome-icon icon="sign-in-alt" />Login
        </router-link>
      </li>
    </div>

    <div v-if="isLogged" class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link to="/auction" class="nav-link">
          <font-awesome-icon icon="user" />
          {{ getName }}
        </router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" href @click.prevent="logOut">
          <font-awesome-icon icon="sign-out-alt" />LogOut
        </a>
      </li>
    </div>
  </nav>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "AppBar",
  components: {FontAwesomeIcon},
  data(){
    return {
      appTitle: 'Awesome App',
      sidebar: false,
      menuItems: [
        { title: 'Home', path: '/home', icon: 'home' },
        { title: 'Sign In', path: '/signin', icon: 'lock_open' }
      ]
    }
  },
  computed: {
    isLogged(){
      return this.$store.getters.IS_LOGGED;
    },
    getName(){
      return this.$store.getters.NAME;
    }
  },
  methods: {
    logOut(){
      this.$store.dispatch('LOG_OUT', this.name)
        .then(() => {
          this.$router.push('/login');
        })

    }
  }
};
</script>
