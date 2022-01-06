import { body } from "express-validator"
import { getRepository } from "typeorm"
import Post from "../entity/Post"
import validate from "../middlewares/validate"

export default validate(
    body("postId").custom(async postId => {
        const postRepository = getRepository(Post) 
        try {
            await postRepository.findOneOrFail(postId)
        } catch(error) {
            throw new Error(`The post with id (${postId}) is not existed`)
        }
    })
)
