export default {
  '/v1/farmRegister': {
    post: {
      summary: 'Register a farm',
      description: 'Register a farm',
      tags: ['Farm'],
      parameters: [
        {
          in: 'header',
          name: 'Authorization',
          description: 'Bearer token',
          required: true
        },
        {
          in: 'body',
          name: 'body',
          description: 'Action registration',
          required: true,
          schema: {
            type: 'object',
            properties: {
              farm: {
                type: 'string'
              },
              address: {
                type: 'string'
              },
              distance: {
                type: 'number'
              }
            }
          }
        }
      ],
      responses: {
        201: {
          description: 'Action successfully registered'
        },
        400: {
          description: 'Error: bad request'
        },
        500: {
          description: 'Internal server Error'
        }
      }
    }
  },
  '/v1/searchAllFarms': {
    get: {
      tags: ['Farm'],
      description: 'find all farms!!!',
      parameters: [
        {
          in: 'header',
          name: 'Authorization',
          description: 'Bearer token',
          required: true
        }
      ],
      responses: {
        200: { description: 'OK' }
      }
    }
  }
}
