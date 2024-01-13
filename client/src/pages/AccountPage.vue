<template>
  <div class="container-fluid bg-dark">

    <section class="row">
      <div class="about text-center">
        <h3>My Tickets</h3>
      </div>
    </section>
    <section class="row justify-content-around">
      <div v-for="myTicket in myTickets" :key="myTicket.id" class="col-7 card my-2 bg-secondary">
        <h4 class="p-3">{{ myTicket.event.name }}</h4>
        <div>
          <img :src="myTicket.event.coverImg" alt="Event Cover Image">
        </div>
        <p class="p-3">{{ myTicket.event.location }}</p>
        <p>{{ myTicket.event.description }}</p>
        <div class="text-end">
          <button @click="returnTicket(myTicket.id)" class="btn btn-danger rounded-pill my-2">Return Ticket</button>
        </div>

      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop.js';
import { accountService } from '../services/AccountService.js'
import { ticketService } from '../services/TicketsService.js';

export default {

  setup() {

    onMounted(() => {
      getMyTickets()
    })

    async function getMyTickets() {
      try {
        await accountService.getMyTickets()

      } catch (error) {
        Pop.error(error)
      }
    }
    return {

      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.myTickets),

      async returnTicket(ticketId) {
        try {
          const returnTicket = await Pop.confirm('Are you sure you want to return the ticket?')
          if (!returnTicket) {
            return
          }
          await ticketService.returnTicket(ticketId)
          Pop.success('Ticket has been returned')
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
