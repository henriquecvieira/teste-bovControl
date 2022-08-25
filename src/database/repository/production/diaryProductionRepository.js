import Production from '../../../models/Production.js'
import query from '../../query/queryDiaryProduction.js'

export default {
  execute: async (dateDay, farmCod) => {
    const resultQuery = await query.execute(dateDay, farmCod)
    return Production.aggregate(resultQuery)
  }
}
