import { Handler } from "express";
import { User } from "../entity/User";
import UserResource from "../resources/UserResource";
import { AuthenticatedRequest } from "../types";


export const profile: Handler = async (request: AuthenticatedRequest, response) => {

  const userResource = new UserResource(request.user)

  return response.json({
    user: userResource.toJson()
  })
} 
