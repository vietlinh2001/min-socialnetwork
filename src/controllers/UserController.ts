import {Handler, Request} from "express";
import UserResource from "../resources/UserResource";
import { AuthenticatedRequest } from "../types";


export const profile: Handler = async (request: Request & AuthenticatedRequest, response) => {

  const userResource = new UserResource(request.user)

  return response.json({
    user: userResource.toJson()
  })
} 
