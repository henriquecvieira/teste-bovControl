import User from '../../../models/User.js'
import passwordHash from '../../../useCases/passwordHash.js'
import token from '../../../middleware/token/token.js'

export default {
  execute: async (user) => {
    try {
      const searchUser = await User.find({ email: user.email })
      if (searchUser.length > 0) {
        return ({ error: 'user already exists' })
      }
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
