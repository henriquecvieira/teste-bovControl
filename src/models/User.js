import mongoose from 'mongoose'


const { model, Schema } = mongoose

const schema = new Schema({

  _id: {
    type: String
  },
  farmer: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  createdAt: {
    type: Date
  },
  farmerCod: {
    type: Number
  }
})

export default model('bovControl', schema, 'bovControl')
