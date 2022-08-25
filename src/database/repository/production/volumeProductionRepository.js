import Production from '../../../models/Production.js'
import query from '../../query/queryMilkProduction.js'

export default {
  execute: async (dateYear, dateMonth, farmCod) => {
    const resultQuery = await query.execute(dateYear, dateMonth, farmCod)
    return Production.aggregate(resultQuery)
  }
}
