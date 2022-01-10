import {Handler} from "express";
import {getRepository} from "typeorm";
import {User} from "../entity/User";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

export const login: Handler = async (request, response) => {

    const {email, password} = request.body
    const userRepository = getRepository(User)

    const user = await userRepository.findOne({
        where: {
            email
        }
    })

    if (!user) {
        return response.status(403).json({
            message: 'Wrong email'
        })
    }

    if (!await bcrypt.compare(password, user.password)) {
        return response.status(403).json({
            message: 'Wrong password'
        })

    }

    const token = jwt.sign({id: user.id}, process.env.APP_KEY)

    return response.json({token})
}
