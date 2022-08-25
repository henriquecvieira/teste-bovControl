export default {
  execute: async (dateDay, farmCod) => {
    return [
      {
        $and: [{
          $expr: {
            $eq: [{
              $dayOfMonth: {
                $toDate: '$createdAt'
              }
            }, dateDay]
          }
        }, { farmCod }
        ]
      }
    ]
  }
}
