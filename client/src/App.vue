<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
<CreateEventModal/>
</template>






<script>
import { computed, ref } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import CreateEventModal from './components/CreateEventModal.vue'

export default {
  setup() {
    

    return {

      appState: computed(() => AppState)
    }
  },
  components: { Navbar, CreateEventModal }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
