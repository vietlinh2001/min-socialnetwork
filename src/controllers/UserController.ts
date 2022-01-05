import { Handler }       from "express";
import { getRepository } from "typeorm";
import { User }          from "../entity/User";

export const search: Handler = async (request, response) => {

  const userRepository = getRepository(User)
  const users = await userRepository.find()

  return response.json(
    users
  )
}

export const detail: Handler = async (request, response) => {

  const userRepository = getRepository(User)
  const user = await userRepository.findOneOrFail(request.params.id)

  return response.json({
    user
  })
}

export const create: Handler = async (request, response) => {

  const userRepository = getRepository(User)
  const user = new User()

  user.name = request.body.name
  user.email = request.body.email

  await userRepository.save(user)

  return response.json({
    user
  })
}

export const update: Handler = async (request, response) => {

  const userRepository = getRepository(User)
  const user = await userRepository.findOneOrFail(request.params.id)

  user.name = request.body.name
  await userRepository.save(user)

  return response.json({
    user
  })
}

export const remove: Handler = async (request, response) => {

  const userRepository = getRepository(User)
  const user = await userRepository.findOneOrFail(request.params.id)

  await userRepository.remove(user)

  return response.json({
    user
  })
}