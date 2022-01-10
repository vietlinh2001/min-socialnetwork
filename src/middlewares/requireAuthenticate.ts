import {Handler, Request} from "express";
import {getRepository} from "typeorm";
import {User} from "../entity/User";
import {AuthenticatedRequest} from "../types";
import jwt from 'jsonwebtoken'

const requireAuthenticated: Handler = async (request: Request & AuthenticatedRequest, response, next) => {
    const userRepository = getRepository(User)
    const token = (request.headers.authorization || '').replace('Bearer ', '')

    const privateKey = process.env.APP_KEY

    try {
        const { id } = jwt.verify(token, privateKey) as { id: number }
        request.user = await userRepository.findOne(id)
        return next()
    } catch (error) {
        return response.status(403).json({
            error: 'UnAuthenticated'
        })
    }
}

export default requireAuthenticated
