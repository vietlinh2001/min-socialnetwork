import * as UserController from './controllers/UserController'
import { Router }          from "express";
import { body }            from "express-validator";
import validate            from "./middlewares/validate";
import requireAuthenticated from './middlewares/requireAuthenticate';

const controller = (method) => (request, response, next) => {
  method(request, response, next).catch(error => next(error))
}

export default (router: Router) => {

  router.use(requireAuthenticated)

  router.get('/user/me', controller(UserController.profile))
}

