import express from 'express'
import UserController from '../controllers/UserController.js'
import productionController from '../controllers/productionController.js'
import FarmController from '../controllers/FarmController.js'
import validateAvgProduction from '../middleware/validateRoutes/validateAvgProduction.js'
import validateAvgYearProduction from '../middleware/validateRoutes/validateAvgYearProduction.js'
import validateFarm from '../middleware/validateRoutes/validateFarm.js'
import validateLogin from '../middleware/validateRoutes/validateLogin.js'
import validateMilkProduction from '../middleware/validateRoutes/validateMilkProduction.js'
import validateProduction from '../middleware/validateRoutes/validateProduction.js'
import validateRegister from '../middleware/validateRoutes/validateRegister.js'
import validateSearchProduction from '../middleware/validateRoutes/validateSearchProduction.js'
import validateAuth from '../middleware/token/auth.js'

const routes = express.Router()

routes.post('/register', validateRegister.execute, UserController.register)
routes.post('/login', validateLogin.execute, UserController.login)
routes.post('/farmRegister', validateAuth.auth, validateFarm.execute, FarmController.farmRegister)
routes.post('/insertProduction', validateAuth.auth, validateProduction.execute, productionController.insert)
routes.get('/searchAllFarms', validateAuth.auth, FarmController.searchAllFarms)
routes.get('/searchAllProduction', validateAuth.auth, validateSearchProduction.execute, productionController.allProduction)
routes.get('/milkProduction', validateAuth.auth, validateMilkProduction.execute, productionController.milkProduction)
routes.get('/avgProduction', validateAuth.auth, validateAvgProduction.execute, productionController.averageProduction)
routes.get('/avgYearProduction', validateAuth.auth, validateAvgYearProduction.execute, productionController.milkAvgYearProduction)
// routes.get('/milkVolume', validateAuth.auth, productionController.milkVolume)

export default routes
