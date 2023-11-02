export class TowerEvent{
    constructor(data){
        this.id = data.id
        this.creatorId = data.creatorId
        this.name = data.name
        this.description = data.description
        this.coverImg = data.coverImg
        this.location = data.location
        this.capacity = data.capacity
        this.stateDate = new Date(data.stateDate)
        this.isCanceled = data.isCanceled
        this.type = data.type
        this.ticketCount = data.ticketCount
        this.creator = data.creator
    }
}