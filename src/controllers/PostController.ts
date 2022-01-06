import { Handler, Response } from "express"
import { getConnection, getRepository } from "typeorm"
import Post from "../entity/Post"
import { AuthenticatedRequest } from "../types"

export const create: Handler = async (request: AuthenticatedRequest, response: Response) => {
    // TODO
}

export const search = async (request: AuthenticatedRequest, response: Response) => {
    // TODO
}

export const update = async (request: AuthenticatedRequest, response: Response) => {
    const postRepository = getRepository(Post)
    const post = await postRepository.findOneOrFail(request.params.id)
    
    post.title = request.body.title
    post.content = request.body.content

    await postRepository.save(post)
    
    return response.json({
        post
    })
    
}

export const remove = async (request: AuthenticatedRequest, response: Response) => {
    // TODO
}
