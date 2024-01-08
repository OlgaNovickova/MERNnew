import mongoose from 'mongoose'

const Schema = mongoose.Schema
const filmoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  production: {
    type: Number,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  cast: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, {timestamps: true})

export default mongoose.model('Movie', filmoSchema)