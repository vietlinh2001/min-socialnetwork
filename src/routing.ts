import * as UserController from './controllers/UserController'
import * as PostController from './controllers/PostController'
import {Router} from "express";
import * as LikeController from './controllers/LikeController'
import {body, param} from "express-validator";
import validate from "./middlewares/validate";
import requireAuthenticated from './middlewares/requireAuthenticate';
import postForm from './form/postForm';
import { getRepository } from 'typeorm';
import Post from './entity/Post';
import likeForm from './form/likeForm';

const controller = (method) => (request, response, next) => {
    method(request, response, next).catch(error => next(error))
}

export default (router: Router) => {

    router.use(requireAuthenticated)

    router.get(
        '/user/me',
        controller(UserController.profile)
    )

    router.get(
        '/post/:id',
        controller(PostController.detail)
    )

    router.put(
        '/post/:id',
        postForm,
        controller(PostController.update)
    )
    
    router.post(
        '/post',
        postForm,  
        controller(PostController.create)
    )

    router.get(
        '/post',
        controller(PostController.search)
    )

    router.delete(
        '/post/:id',
        controller(PostController.remove)
    )

    router.post(
        '/like',
        likeForm,
        controller(LikeController.create)
    )

    router.delete(
        "/like/:id",
        controller(LikeController.unLike)
    )
}
