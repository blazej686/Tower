<template>
  <div class="container-fluid bg-dark">

    <section class="row p-3">
      <div class="col-12 my-3">
        <img class="img-fluid rounded" src="https://images.unsplash.com/photo-1642721366091-31bc60ada871?auto=format&fit=crop&q=80&w=2074&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Theater seats">
      </div>
    </section>


    <section class="row  p-3">
      <div class="col-12 my-3 bg-secondary card ">
        <div class="d-flex justify-content-around p-1">
        <button @click="changeType(type)"
        v-for="type in types" :key="type"
        class='btn btn-outline-dark my-1 p-2'>
        {{ type }}
        </button>
        </div>
      </div>
    </section>


    <section class='row p-3'>
      <div v-for='event in events' :key='event' class='col-12 col-md-3 card shadow my-2'>
      <EventCard />
      </div>
    </section>
  </div>


  
</template>


<script>
import { AppState } from '../AppState';
import { computed,  onMounted, ref } from 'vue';
import { logger } from '../utils/Logger.js';
import EventCard from '../components/EventCard.vue';
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService.js';
export default {
    setup() {
        const types = ['Concert', 'Convention', 'Sport', 'Digital'];
        const filteredType = ref("");

        onMounted(() => {
          getEvents();

        })


        async function getEvents() {
                try {
                  await eventsService.getEvents()
                } catch (error) {
                  Pop.error(error)
                }
              }
        return {
            types,
            filteredType,
            events: computed(() => {
                if (filteredType.value) {
                    return AppState.events.filter((event) => event.type == filteredType.value);
                }
                else {
                    return AppState.events;
                }
            }),
            





            
            changeType(type) {
                logger.log(type);
                filteredType.value = type;
            }
        };
    },
    components: { EventCard }
}
</script>


<style lang='scss' scoped>
img{
  
  object-fit: cover;
  object-position: center;
  
}

</style>