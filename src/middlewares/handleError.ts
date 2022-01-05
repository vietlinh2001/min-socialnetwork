import { EntityNotFoundError } from "typeorm"

export default (error, request, response, next) => {
  console.log(error);

  if (error instanceof EntityNotFoundError) {

    return response.status(404).json({
      error: 'Entity Not Found'
    })
  } else {
    response.status(500).json({
      error: 'Server Error'
    })
  }
}
