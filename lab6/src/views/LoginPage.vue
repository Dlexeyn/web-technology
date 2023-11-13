<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">

    <v-sheet width="400" class="mx-auto">
      <v-img height="300" src="@/assets/birzha.svg" />
      <v-form fast-fail @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            id="login"
            v-model="name"
            type="text"
            class="form-control"
            name="username"
          />
          <p v-if="errors.length"
            class="alert alert-danger">
            <b>Пожалуйста исправьте указанные ошибки:</b>
            <ul>
              <li v-for="error in errors">{{ error }}</li>
            </ul>
          </p>
        </div>
        <v-btn id="btnLogin" type="submit" color="primary" block class="mt-2">Sign in</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  computed: {
    isLogged(){
      return this.$store.getters.IS_LOGGED;
    }
  },
  data: function() {
    return {
      name: '',
      errors: [],
  };
},
  methods: {
    handleLogin() {
      if(this.checkForm()) {
        console.log( this.name);
        this.$store.dispatch('LOGIN', this.name).then(
          () => {
            if(this.isLogged)
              this.$store.dispatch('INIT_BROKER_STOCKS', this.$store.getters.ID)
                .then(() => {
                  this.$router.push('/auction');
                })
            else {
              this.errors.push('Указанный брокер не существует.');
            }
          }
        );
      }

    },
    checkForm(){
      this.errors = [];
      if(this.name){
        return true;
      } else {
        this.errors.push('Требуется указать имя.');
      }
    }
  },
}
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>
