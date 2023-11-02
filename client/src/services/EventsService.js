import { AppState } from "../AppState.js";
import { TowerEvent } from "../models/TowerEvent.js";
import { api } from "./AxiosService.js";

class EventsService{

async  getEvents(){
const res = await api.get('api/events');
AppState.events = res.data.map((event) => new TowerEvent(event))
    }
}
export const eventsService = new EventsService()