import * as UserController from './controllers/UserController'
import * as PostController from './controllers/PostController'
import { Router }          from "express";
import requireAuthenticated from './middlewares/requireAuthenticate';

const controller = (method) => (request, response, next) => {
  method(request, response, next).catch(error => next(error))
}

export default (router: Router) => {

  router.use(requireAuthenticated)

  router.get('/user/me', controller(UserController.profile))
  
  router.put('/post/:id', controller(PostController.update))

  router.post('/post',controller(PostController.create))

  router.get('/post', controller(PostController.search))

  router.delete('/post/:id', controller(PostController.remove))

}

