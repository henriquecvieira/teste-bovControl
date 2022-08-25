import Farm from '../../../models/Farm.js'

export default {
  execute: async (farmCod) => {
    try {
      const farm = await Farm.find({ farmCod })
      return farm[0].distance
    } catch (error) {
      throw new Error(error)
    }
  }
}
