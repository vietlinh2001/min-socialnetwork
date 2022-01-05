import { Handler } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { AuthenticatedRequest } from "../types";

// TODO will use the real one in the future
const requireAuthenticated: Handler = async (request: AuthenticatedRequest, response, next) => {
    const userRepository = getRepository(User)
    const loggedInUser = await userRepository.findOne(process.env.DEV_FAKE_USER)

    if (!loggedInUser) {
        return response.status(401).json({
            error: "UnAuthenticated"
        })
    }

    request.user = loggedInUser

    return next()
}

export default requireAuthenticated
