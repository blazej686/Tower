import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { api } from "./AxiosService.js"

class TicketsService {


    async getTicketByEventId(eventId) {
        const res = await api.get(`api/events/${eventId}/tickets`)
        AppState.tickets = res.data.map((ticket) => new Ticket(ticket))
    }

    async getATicket(eventId) {
        const res = await api.post(`api/tickets`, { eventId })
        AppState.tickets.push(new Ticket(res.data))
        const updatedTickets = (AppState.activeEvent.capacity - AppState.activeEvent.ticketCount)
        AppState.remainingTickets = updatedTickets
    }

}

export const ticketService = new TicketsService()
