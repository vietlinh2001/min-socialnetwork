import {Handler, Request} from "express"
import {getRepository} from "typeorm"
import Like from "../entity/Like"
import Post from "../entity/Post"
import LikeResource from "../resources/LikeResource"
import {AuthenticatedRequest, EntityBoundRequest} from "../types"
import NotificationService from "../services/NotificationService";
import LikedPostNotification from "../notifications/LikedPostNotification";
import PostService from "../services/PostService";
import PermissionDenied from "../PermissionDenied";

export const create: Handler = async (request: Request & AuthenticatedRequest, response) => {
    const postRepository = getRepository(Post)
    const notificationService: NotificationService = request.app.get('NotificationService')
    const postService: PostService = request.app.get('PostService')

    const likedPost = await postRepository.findOne(request.body.postId)

    const like = await postService.like(request.user, likedPost)
    await notificationService.send(new LikedPostNotification(like))

    return response.status(201).json({
        like: new LikeResource(like).toJson()
    })
}

export const unLike: Handler = async (request: Request & EntityBoundRequest<Post> & AuthenticatedRequest, response) => {
    const likeRepository = getRepository(Like)
    const like = request.entity

    await likeRepository.softDelete(request.params.id)

    return response.json({
        like
    })
}
