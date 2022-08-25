import User from './paths/user.js'
import Farm from './paths/farm.js'
import Production from './paths/production.js'

const paths = Object.assign(
  User,
  Farm,
  Production
)

export default paths
