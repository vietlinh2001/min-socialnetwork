import * as UserController from './controllers/UserController'
import * as PostController from './controllers/PostController'
import express, {Router} from "express";
import * as LikeController from './controllers/LikeController'
import requireAuthenticated from './middlewares/requireAuthenticate';
import postForm from './form/postForm';
import Post from './entity/Post';
import likeForm from './form/likeForm';
import * as NotificationController from './controllers/NotificationController'
import bindEntity from "./middlewares/bindEntity";
import Like from "./entity/Like";
import mustBeOwner from "./middlewares/mustBeOwner";
import * as LoginController from './controllers/LoginController'
import validate from "./middlewares/validate";
import {body} from "express-validator";

const controller = (method) => (request, response, next) => {
    method(request, response, next).catch(error => next(error))
}

export default (router: Router) => {

    router.post(
        '/login',
        validate(
            body('email').isEmail(),
            body('password').isString()
        ),
        controller(LoginController.login)
    )

    const protectedRouter = express.Router()

    router.use('/api', protectedRouter)

    protectedRouter.use(requireAuthenticated)

    protectedRouter.get(
        '/user/me',
        controller(UserController.profile)
    )

    protectedRouter.get(
        '/post/:id',
        bindEntity(Post),
        mustBeOwner('post', 'view'),
        controller(PostController.detail)
    )

    protectedRouter.put(
        '/post/:id',
        postForm,
        bindEntity(Post),
        mustBeOwner('post', 'update'),
        controller(PostController.update)
    )

    protectedRouter.post(
        '/post',
        postForm,
        controller(PostController.create)
    )

    protectedRouter.get(
        '/post',
        controller(PostController.search)
    )

    protectedRouter.delete(
        '/post/:id',
        bindEntity(Post),
        mustBeOwner('post', 'deletes'),
        controller(PostController.remove)
    )

    protectedRouter.post(
        '/like',
        likeForm,
        controller(LikeController.create)
    )

    protectedRouter.delete(
        "/like/:id",
        bindEntity(Like),
        mustBeOwner('like', 'unlike'),
        controller(LikeController.unLike)
    )

    protectedRouter.get(
        '/notification',
        controller(NotificationController.show)
    )


}
