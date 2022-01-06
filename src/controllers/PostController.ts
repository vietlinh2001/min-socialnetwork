import { Handler, Response } from "express"
import { IPaginationOptions, paginate } from "nestjs-typeorm-paginate"
import {getRepository } from "typeorm"
import Post from "../entity/Post"
import PostCollectionResource from "../resources/PostCollectionResource"
import PostResource from "../resources/PostResource"
import { AuthenticatedRequest } from "../types"
import { paginiationLimit } from "../config"
import Like from "../entity/Like"
import LikeResource from "../resources/LikeResource"

export const detail: Handler = async (request: AuthenticatedRequest, response: Response) => {
    const postRepository = getRepository(Post)
    const likeRepository = getRepository(Like)

    const post = await postRepository.findOneOrFail(request.params.id)
    const countOfLike = await likeRepository.count({
        where: {
            postId: post.id
        }
    })

    const latest3Likes = await likeRepository.find({
        where: {
            postId: post.id
        },
        order: {
            createdAt: 'DESC'
        },
        take: 3
    })

    const postResource = new PostResource(post)
    
    return response.json({
        post: postResource.toJson(),
        _countOfLike: countOfLike,
        _latest3Likes: latest3Likes.map(like => new LikeResource(like).toJson())
    })
}

export const create: Handler = async (request: AuthenticatedRequest, response: Response) => {
    
    const postRepository = getRepository(Post)

    const post = new Post()
    post.title = request.body.title
    post.content = request.body.content
    post.author = request.user
    post.likes = []
    
    await postRepository.save(post)
    const postResource = new PostResource(post)

    return response.json({
        post: postResource.toJson()
    })
}

export const search = async (request: AuthenticatedRequest, response: Response) => {

    const postRepository = getRepository(Post)
    const query = postRepository.createQueryBuilder('post')
        .leftJoinAndSelect('post.author', 'user')

    if (request.query.key) {
        query.where('post.title like :title',
            {title: `%${request.query.key}%`})
    }

    const paginatedPosts = await paginate<Post>(query, {
        page: request.query.page as string,
        limit: paginiationLimit
    })
    
    const postCollection = new PostCollectionResource(paginatedPosts.items)

    return response.json({
        posts: postCollection.toJson(),
        _pagination: paginatedPosts.meta
    })
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
    const postRepository = getRepository(Post)
    const post = await postRepository.findOneOrFail(request.params.id)

    await  postRepository.softRemove(post)

    return response.status(200).json({
        post
    })
}
