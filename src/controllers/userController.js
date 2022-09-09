import createUserRepository from '../database/repository/user/createUserRepository.js'
import loginUserRepository from '../database/repository/user/loginUserRepository.js'

export default {
  register: async (req, res) => {
    try {
      const user = req.body
      const resultCreate = await createUserRepository.execute(user)
      return res.status(201).json(resultCreate)
    } catch (error) {
      return res.status(500).json({ error: 'Registration failed' })
    }
  },
  login: async function (req, res) {
    try {
      const user = req.body
      const result = await loginUserRepository.execute(user)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(400).json({ error: 'login failed' })
    }
  }
}
