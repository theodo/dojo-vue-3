<template>
  <div class="select-user">
    <label>User</label>
    <select v-model="user">
      <option value="buefy">Buefy</option>
      <option value="vuetifyjs">Vuetify</option>
    </select>
  </div>
  <user-repositories :user="user" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserRepositories from './components/UserRepositories.vue';

export default defineComponent({
  name: 'App',
  components: {
    UserRepositories
  },
  data() {
    return {
      user: 'buefy'
    };
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.select-user {
  text-align: left;
  padding-bottom: 1rem;
}
.select-user label {
  padding-right: 1rem;
}
</style>
