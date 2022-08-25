import searchProductionRepository from '../database/repository/production/searchProductionRepository.js'
import milkProductionRepository from '../database/repository/production/milkProductionRepository.js'
import avgProductionRepository from '../database/repository/production/avgProductionRepository.js'
// import volumeProductionRepository from '../database/repository/production/volumeProductionRepository.js'
import priceCalc from '../useCases/priceCalc.js'
import findFarmRepository from '../database/repository/farm/findFarmRepository.js'
import createProductionRepository from '../database/repository/production/createProductionRepository.js'
import milkYearAvgProductionRepository from '../database/repository/production/milkYearAvgProductionRepository.js'

export default {

  insert: async (req, res) => {
    try {
      const production = req.body
      const resultCreate = await createProductionRepository.execute(production)
      return res.status(201).json(resultCreate)
    } catch (error) {
      return res.status(500).json({ error: 'Registration failed' })
    }
  },
  allProduction: async (req, res) => {
    try {
      const { year, month, farmCod } = req.body
      const result = await searchProductionRepository.execute(year, month, farmCod)
      if (result?.totalRegister === 0) {
        return res.status(404).json({ error: 'production not found' })
      }
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ error })
    }
  },
  milkProduction: async (req, res) => {
    try {
      const { year, month, farmCod } = req.body
      const volume = await milkProductionRepository.execute(year, month, farmCod)
      if (volume === 0) {
        return res.status(404).json({ error: 'production not found' })
      }
      const distance = await findFarmRepository.execute(farmCod)
      const resultCalc = await priceCalc.execute(volume, month, distance)
      return res.status(201).json({ resultCalc })
    } catch (error) {
      return res.status(500).json({ error })
    }
  },
  milkAvgYearProduction: async (req, res) => {
    try {
      const { year, farmCod } = req.body
      const resultProduction = await milkYearAvgProductionRepository.execute(year, farmCod)
      if (resultProduction.length === 0) {
        return res.status(404).json({ error: 'production not found' })
      }
      const distance = await findFarmRepository.execute(farmCod)
      const result = []
      for (let i = 0; i < resultProduction.length; i++) {
        result.push(await priceCalc.execute(resultProduction[i].sum, resultProduction[i]._id, distance, resultProduction[i].avg))
      }
      return res.status(201).json(result)
    } catch (error) {
      return res.status(500).json({ error })
    }
  },
  averageProduction: async (req, res) => {
    try {
      const { year, month, farmCod } = req.body
      const searchAvgProduction = await avgProductionRepository.execute(year, month, farmCod)
      if (searchAvgProduction === 0) {
        return res.status(404).json({ error: 'production not found' })
      }
      return res.status(201).json(searchAvgProduction)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
  // milkVolume: async (req, res) => {
  //   try {
  //     const { year, month, farmCod } = req.body
  //     const milkVolume = await volumeProductionRepository.execute(year, month, farmCod)
  //     if (milkVolume.length === 0) {
  //       return res.status(404).json({ error: 'production not found' })
  //     }
  //     const volume = milkVolume[0].sum
  //     return res.status(201).json()
  //   } catch (error) {
  //     return res.status(400).json({ error: 'Bad Request' })
  //   }
  // }
}
