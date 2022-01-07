import {Handler, Response} from "express"
import {getRepository} from "typeorm"
import Post from "../entity/Post"
import PostCollectionResource from "../resources/PostCollectionResource"
import PostResource from "../resources/PostResource"
import {AuthenticatedRequest, Condition} from "../types"
import Like from "../entity/Like"
import LikeResource from "../resources/LikeResource"
import PostService from "../services/PostService";
import SearchByContentCondition from "../SearchByContentCondition";
import SearchByTitleCondition from "../SearchByTitleCondition";

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
    const postService: PostService = request.app.get('PostService')

    const postResource = new PostResource(await postService
        .compose(request.user, request.body.title, request.body.content))

    return response.json({
        post: postResource.toJson()
    })
}

export const search = async (request: AuthenticatedRequest, response: Response) => {
    const postService: PostService = request.app.get('PostService')
    const {keyword, by, page} = request.query
    const condition: Condition = (by === 'title') ?
        new SearchByTitleCondition(keyword as string) :
        new SearchByContentCondition(keyword as string)

    const paginatedPosts = await postService.search(
        condition,
        parseInt(page as string)
    )

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
        post: new PostResource(post).toJson()
    })

}

export const remove = async (request: AuthenticatedRequest, response: Response) => {
    const postRepository = getRepository(Post)
    const post = await postRepository.findOneOrFail(request.params.id)

    await postRepository.softRemove(post)

    return response.status(200).json({
        post: new PostResource(post).toJson()
    })
}

