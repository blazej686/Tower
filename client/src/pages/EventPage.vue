<template>
  <div class="container-fluid p-5 bg-dark">
    <section class="row bg-secondary rounded">
      <div class="col-4">
        <img class=" img-fluid rounded my-2" :src="event.coverImg" alt="Event cover image">
      </div>
      <div class="col-8">
        <h1> {{ event.name }}</h1>
        <h3>{{ event.location }}</h3>
        <p>{{ event.description }}</p>
        <p>Date of Event: {{ event.startDate }}</p>
        <p v-if="event.isCanceled" class="card bg-danger my-2">Event Canceled</p>
        <p v-else-if="event.capacity - event.ticketCount == 0" class="card bg-primary my-2"> Sold Out</p>
        <div v-else class="d-flex align-items-center">
          <button @click="getATicket()" class="btn btn-warning rounded-pill my-2">Get A
            Ticket</button>
          <p class="ms-2">{{ remainingTickets }} Spots left</p>
        </div>

        <div v-if="account">
          <div v-if="!event.isCanceled">
            <button @click="cancelEvent(event)" v-if="event.creatorId == account.id"
              class="btn btn-danger rounded-pill my-2">Cancel
              Event</button>
          </div>
          <p v-if="account.id == tickets.creatorId" class="ms-2">You're Attending</p>
        </div>
      </div>
    </section>

    <section class="row bg-primary rounded p-2 my-3">
      <div>
        <h3>Who is Attending</h3>
        <div v-for="ticket in tickets" :key='ticket'>
          <div class="col-1 d-flex ">
            <img class="img-fluid rounded-circle my-1" :src="ticket.profile.picture" alt="Profile Picture"
              :title="ticket.profile.name">
          </div>
        </div>
      </div>
    </section>

    <section class="row bg-primary rounded my-3 p-5">
      <div class="col-6">
        <section class="row">
          <div class="col-3">
            <button v-if="account" class="btn btn-success rounded-pill">Post Comment</button>
          </div>
        </section>
        <section class="row">
          <div class="col-3">

          </div>
          <div class="col-9 card">
            <h2>Comments here</h2>
            {{ comment.body }}
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted, } from 'vue';
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService.js';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js'
import { ticketService } from '../services/TicketsService.js';

export default {


  setup() {
    const route = useRoute()


    onMounted(() => {
      getEventById()
      getTicketByEventId()

    })
    async function getEventById() {
      try {
        const eventId = route.params.eventId
        await eventsService.getEventById(eventId)

      } catch (error) {
        Pop.error(error)
      }
    }

    async function getTicketByEventId() {
      try {
        const eventId = route.params.eventId
        await ticketService.getTicketByEventId(eventId)

      } catch (error) {
        Pop.error(error)
      }
    }

    return {

      event: computed(() => AppState.activeEvent),
      comment: computed(() => AppState.comments),
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.tickets),
      remainingTickets: computed(() => AppState.remainingTickets),


      async getATicket() {
        try {
          const eventId = route.params.eventId
          await ticketService.getATicket(eventId)

        } catch (error) {
          Pop.error(error)
        }
      },


      async cancelEvent(event) {
        try {

          if (!event.isCanceled) {
            const wantstocancel = await Pop.confirm('Are you sure you want to cancel this event?')
            if (!wantstocancel) {
              return
            }
          }
          const eventId = route.params.eventId
          await eventsService.cancelEvent(eventId)

        } catch (error) {
          Pop.error(error)
        }
      }

    }
  }
}
</script>



<style lang='scss' scoped></style>