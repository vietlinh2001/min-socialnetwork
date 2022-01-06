import {Handler} from "express"
import {getRepository} from "typeorm"
import Like from "../entity/Like"
import Post from "../entity/Post"
import {AuthenticatedRequest} from "../types"

export const create: Handler = async (request: AuthenticatedRequest, response) => {
    const likeRepository = getRepository(Like)
    const postRepository = getRepository(Post)
    const { postId }     = request.body

    const likedPost = await postRepository.findOneOrFail(postId)
    const like      = new Like()

    like.post    = likedPost
    like.creator = request.user

    await likeRepository.save(like)

    response.status(201).json({
        like
    })
}

export const unLike: Handler = async (request: AuthenticatedRequest, response) => {
    const likeRepository = getRepository(Like)
    const like = await likeRepository.findOneOrFail(request.params.id)

    await likeRepository.softDelete(request.params.id)

    response.json({
        like
    })
}
