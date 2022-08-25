export default {
  execute: async (dateYear, dateMonth, farmCod) => {
    return [
      {
        $and: [{
          $expr: {
            $eq: [{
              $year: {
                $toDate: '$createdAt'
              }
            }, dateYear]
          }
        }, {
          $expr: {
            $eq: [{
              $month: {
                $toDate: '$createdAt'
              }
            }, dateMonth]
          }
        }, {
          farmCod
        }]
      }]
  }
}
