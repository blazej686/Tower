<template>
  <div class="container-fluid p-5 bg-dark">
    <section class="row bg-secondary rounded">
      <div class="col-12 col-md-4">
        <img class=" img-fluid rounded my-2" :src="event.coverImg" alt="Event cover image">
      </div>
      <div class="col-8">
        <h1> {{ event.name }}</h1>
        <h3>{{ event.location }}</h3>
        <p>{{ event.description }}</p>
        <p>Date of Event: {{ event.startDate }}</p>
        <p v-if="event.isCanceled" class="card bg-danger my-2">Event Canceled</p>
        <p v-else-if="remainingTickets == 0" class="card bg-primary my-2"> Sold Out</p>
        <div v-else class="d-flex align-items-center">
          <div>
            <button v-if="account.id" :disabled="event.capacity - event.ticketCount == 0" @click="getATicket()"
              class="btn btn-warning rounded-pill my-2">Get A
              Ticket</button>
            <div>

            </div>
          </div>
          <p class="ms-2">{{ remainingTickets }} Spots left</p>
        </div>

        <div>
          <div v-if="!event.isCanceled">
            <button @click="cancelEvent(event)" v-if="event.creatorId == account.id"
              class="btn btn-danger rounded-pill my-2">Cancel
              Event</button>
          </div>
        </div>
      </div>
    </section>



    <section class="row bg-primary rounded p-2 my-3">
      <h3>Who is Attending</h3>
      <p v-if="isAttending" class=" ms-2">You are Attending</p>

      <div v-for=" ticket  in  tickets " :key='ticket.id' class="col-3 col-md-1">
        <div>
          <img class="img-fluid rounded-circle my-1" :src="ticket.profile.picture" alt="Profile Picture"
            :title="ticket.profile.name">
        </div>
      </div>

    </section>

    <section class="row bg-primary rounded my-3 p-5">
      <div class="col-12 p-4">
        <section class="row justify-content-end">
          <h2 class="text start">Comments</h2>
          <form v-if="account.id" @submit.prevent>
            <div class="col-10 text-start">
              <textarea v-model="formInfo.body" name="comment" id="comment" cols="30" rows="10"
                class="rounded form-control" placeholder="Enter comments here"></textarea>
            </div>
            <div class="col-3 my-2 text-start">
              <button :disabled="!account.id" @click="addComment()" type="submit"
                class="btn btn-success rounded-pill">Post
                Comment
              </button>
            </div>
          </form>
        </section>
        <section v-for=" comment  in  comments " :key="comment.id" class="row bg-light rounded shadow my-3">
          <div class="col-12 my-3 p-3 d-flex align-items-center flex-wrap justify-content-around">
            <div>
              <img class="rounded-circle p-1" :src="comment.creator.picture" alt="Profile Picture"
                :title="comment.creator.name">
              <p class="p-1 text-center">{{ comment.creator.name }} </p>
            </div>
            <div class="comment">
              <p class="p-2 ">
                {{ comment.body }}
              </p>
            </div>
            <div class="text-end">
              <button @click="destroyComment(comment.id)" class="btn btn-danger rounded-pill ms-2 text-end"
                v-if="comment.creatorId == account.id">Delete Comment</button>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted, ref, } from 'vue';
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService.js';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js'
import { ticketService } from '../services/TicketsService.js';
import { commentsService } from '../services/CommentsService.js';

export default {


  setup() {
    const route = useRoute()
    const formInfo = ref({})

    onMounted(() => {
      getEventById()
      getTicketByEventId()
      getCommentsByEvent()

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

    async function getCommentsByEvent() {
      try {
        const eventId = route.params.eventId
        await eventsService.getCommentsByEvent(eventId)
      } catch (error) {
        Pop.error(error)
      }
    }

    return {
      formInfo,
      event: computed(() => AppState.activeEvent),
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.tickets),
      remainingTickets: computed(() => AppState.remainingTickets),
      myTickets: computed(() => AppState.myTickets),
      isAttending: computed(() => AppState.tickets.find(t => t.accountId == AppState.account.id)),



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
      },

      async addComment() {
        try {
          const commentData = formInfo.value
          commentData.eventId = route.params.eventId
          await commentsService.addComment(commentData)
          Pop.success(`You have added a comment`)
          formInfo.value = {}
        } catch (error) {
          Pop.error(error)
        }
      },

      async destroyComment(commentId) {
        try {
          const wantsToDelete = await Pop.confirm(`Are you sure you want to delete this comment?`)
          if (!wantsToDelete) {
            return
          }
          await commentsService.destroyComment(commentId)
          Pop.success(`Comment has been removed`)
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>



<style lang='scss' scoped>
.comment {
  word-wrap: normal;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>