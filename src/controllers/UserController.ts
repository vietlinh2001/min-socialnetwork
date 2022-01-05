import { Handler } from "express";
import { AuthenticatedRequest } from "../types";

export const profile: Handler = async (request: AuthenticatedRequest, response) => {
  console.log(request.user);
  
  return response.json({
    user: request.user
  })
} 
