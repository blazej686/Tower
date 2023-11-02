<template>
    <div class="modal fade" id="createEventModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="createEventModal">Create Event</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="createEvent()">
  <div class="mb-3">
    <label for="name" class="form-label">Event Name</label>
    <input v-model="editable.name" type="text" class="form-control" id="name">
  </div>
  <div class="mb-3">
    <label for="description" class="form-label">Event description</label>
    <input v-model="editable.description" type="text" class="form-control" id="description">
  </div>
  <div class="mb-3">
    <label for="coverImg" class="form-label">Event Cover Img Url</label>
    <input v-model="editable.coverImg" type="url" class="form-control" id="coverImg">
  </div>
  <div class="mb-3">
    <label for="location" class="form-label">Event location</label>
    <input v-model="editable.location" type="text" class="form-control" id="location">
  </div>
  <div class="mb-3">
    <label for="capacity" class="form-label">Event capacity</label>
    <input v-model="editable.capacity" type="number" class="form-control" id="capacity">
  </div>
  <div class="mb-3">
    <label for="startDate" class="form-label">Event Date</label>
    <input v-model="editable.startDate" type="Date" class="form-select" id="startDate" name="startDate">
  </div>
  <div class="mb-3">
     <label for="type" class="form-label">Event type</label>
     <select v-model="editable.type" class="form-select" id="" name="" >
      <option
        :value="eventType" 
        v-for="eventType in types" 
        :key="eventType"> {{ eventType }}
      </option>
     </select>
  </div>

<button type="submit" class="btn btn-primary">Create Event</button>

</form>
</div>
</div>
</div>
</div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted, ref } from 'vue';
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';
import { Modal } from 'bootstrap';
import { TowerEvent } from '../models/TowerEvent.js';
import { useRouter } from 'vue-router';
export default {
    setup(){
        const editable = ref({})
        const types = [ 'concert', 'convention', 'sport', 'digital']
        const router = useRouter()



    return { 
        types,
      editable,

async createEvent(){
    try {
        const eventData = editable.value
        const event = await eventsService.createEvent(eventData)
        Pop.success('The event has been created')
        editable.value = {},
        Modal.getOrCreateInstance('#createEventModal').hide()
        router.push({name: 'Event', params: {eventId : event.id}})
        
    } catch (error) {
        Pop.error(error)
    }

}


     }
    }
};
</script>


<style lang="scss" scoped>

</style>