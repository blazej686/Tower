import { AppState } from "../AppState.js";
import { TowerEvent } from "../models/TowerEvent.js";
import { api } from "./AxiosService.js";

class EventsService {

    async getEvents() {
        const res = await api.get('api/events');
        AppState.events = res.data.map((event) => new TowerEvent(event))
    }

    async createEvent(eventData) {
        const res = await api.post('api/events', eventData)
        const newEvent = new TowerEvent(res.data)
        AppState.events.push(newEvent)
        return newEvent
    }
    async getEventById(eventId) {
        const res = await api.get(`api/events/${eventId}`)
        const newEvent = new TowerEvent(res.data)
        AppState.activeEvent = newEvent
        AppState.remainingTickets = AppState.activeEvent.capacity - AppState.activeEvent.ticketCount
    }

    async cancelEvent(eventId) {
        const res = await api.delete(`api/events/${eventId}`)
        AppState.activeEvent = new Event(res.data)
    }

}


export const eventsService = new EventsService()