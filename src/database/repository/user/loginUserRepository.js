import User from '../../../models/User.js'
import * as bcrypt from 'bcrypt'
import token from '../../../middleware/token/token.js'



export default {
  execute: async (user) => {
    try {

      const searchUser = await User.find({ email: user.email }).select('+password')

      if (!searchUser) {
        return ({ error: 'User not found' })
      }
      if (!bcrypt.compare(searchUser[0].password, user.password)) {
        return ({ error: 'Invalid user' })
      }
      const tokenGeneration = token.generationToken({ user })
      return ({ token: tokenGeneration })
    } catch (error) {
      return { error: 'login failed!' }
    }
  }
}
