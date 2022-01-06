import * as UserController from './controllers/UserController'
import * as LikeController from './controllers/LikeController'
import { Router }          from "express";
import { body, param }            from "express-validator";
import validate            from "./middlewares/validate";
import requireAuthenticated from './middlewares/requireAuthenticate';

const controller = (method) => (request, response, next) => {
  method(request, response, next).catch(error => next(error))
}

export default (router: Router) => {

  router.use(requireAuthenticated)

  router.get('/user/me', controller(UserController.profile))

  router.post('/like', validate(
    body("postId").isInt({gt: 0})
  ), controller(LikeController.create))

  router.delete("/like/:id", validate(
    param("id").isInt({gt: 0})
  ), controller(LikeController.unLike))
}


