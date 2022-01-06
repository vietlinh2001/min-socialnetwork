import { Handler, Response } from "express"
import { getRepository } from "typeorm"
import Post from "../entity/Post"
import { AuthenticatedRequest } from "../types"

export const create: Handler = async (request: AuthenticatedRequest, response: Response) => {
    
    const postRepository = getRepository(Post)

    const post = new Post()
    post.title = request.body.title
    post.content = request.body.content
    post.likes = []
    await postRepository.save(post)

    return response.json({
        post
    })
}

export const search = async (request: AuthenticatedRequest, response: Response) => {

    const postRepository = getRepository(Post)
    const post = await postRepository.createQueryBuilder('post')

    if (request.query.key) {
        post.where('post.title like :title',
            {title: `%${request.query.key}%`})
    }
    
    const posts = await post.getMany()

    return response.json({posts})
}

export const update = async (request: AuthenticatedRequest, response: Response) => {

}

export const remove = async (request: AuthenticatedRequest, response: Response) => {
    
}
