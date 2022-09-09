import User from '../../../models/User.js'
import passwordHash from '../../../useCases/passwordHash.js'
import token from '../../../middleware/token/token.js'
import { v4 as uuidv4 } from 'uuid'
import randomInteger from 'random-int'

export default {
  execute: async (user) => {
    try {
      const searchUser = await User.find({ email: user.email })
      if (searchUser.length > 0) {
        return ({ error: 'user already exists' })
      }

      user._id = uuidv4()
      user.createdAt = Date.now()
      user.farmerCod = randomInteger(100, 100000)
      const hashUser = await passwordHash.createHash(user)
      const resultCreate = await User.create(hashUser)
      const tokenGeneration = token.generationToken({ user: resultCreate })
      const resultUser = {
        token: tokenGeneration
      }
      return resultUser
    } catch (error) {
      return { error: 'Registration failed' }
    }
  }
}
