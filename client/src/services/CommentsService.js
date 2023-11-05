import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentsService {

    async addComment(commentData) {
        const res = await api.post(`api/comments`, commentData)
        AppState.comments.push(new Comment(res.data))

    }

    async destroyComment(commentId) {
        const res = await api.delete(`api/comments/${commentId}`)
        logger.log(res.data)

    }

}
export const commentsService = new CommentsService()