import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentsService {

    async destroyComment(commentId) {
        const res = await api.delete(`api/comments/${commentId}`)
        logger.log(res.data)

    }

}
export const commentsService = new CommentsService()