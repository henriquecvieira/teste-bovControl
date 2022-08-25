import Farm from '../../../models/Farm.js'

export default {
  execute: async (farm) => {
    const result = await Farm.create(farm)
    return result
  }
}
