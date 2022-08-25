const milkProductionSchema = {
  type: 'object',
  properties: {
    year: { type: 'number' },
    month: { type: 'number' },
    farmCod: { type: 'number' },
    farmerCod: { type: 'number' }
  },
  required: ['year', 'month'],
  additionalProperties: false
}

export default milkProductionSchema
