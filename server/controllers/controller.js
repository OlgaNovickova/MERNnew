import Movie from '../models/filmoModelis.js'
import mongoose from 'mongoose'

//GET - paimti visus filmus
export const getMovies = async(req, res) => {
  const user_id = req.user._id
  const filmai = await Movie.find({user_id}).sort({createdAt: -1})
  res.status(200).json(filmai) 
}

//GET - paimti vieną pratimą
export const getMovie = async (req, res) => {
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Tokio filmo nėra'})
  }
  const filmas = await Movie.findById(id)
  if(!filmas) {
    return res.status(404).json({error: 'Tokio filmo nėra'})
  }
  res.status(200).json(filmas)
}

//POST - sukurti naują filmą
export const createMovie = async (req, res) => {
  const {title, production, director, cast, rating, description} = req.body

  let emptyFields = []

  if(!title) {emptyFields.push('title')}
  if(!production) {emptyFields.push('production')}
  if(!director) {emptyFields.push('director')}
  if(!cast) {emptyFields.push('cast')}
  if(!rating) {emptyFields.push('rating')}
  if(!description) {emptyFields.push('description')}
  if (emptyFields.length > 0) {
    return res.status(400).json({error: 'Prašome užpildyti visus laukelius', emptyFields})
  }

  try {
    const user_id = req.user._id
    const filmas = await Movie.create({title, production, director, cast, rating, description, user_id})
    res.status(200).json(filmas)
  } catch(error) {
    res.status(400).json({error: error.message})
  }
}

//PATCH - redaguoti vieną filmą
export const updateMovie = async (req, res) => {
	const { id } = req.params
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Tokio filmo nėra' })
	}
	const filmas = await Movie.findOneAndUpdate({_id: id}, {...req.body})
	if (!filmas) {
		return res.status(404).json({ error: 'Tokio filmo nėra' })
	}
	res.status(200).json(filmas)
}

//DELETE - ištrinti vieną filmą
export const deleteMovie = async (req, res) => {
	const { id } = req.params
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Tokio filmo nėra' })
	}
	const filmas = await Movie.findOneAndDelete({_id: id})
	if (!filmas) {
		return res.status(404).json({ error: 'Tokio filmo nėra' })
	}
	res.status(200).json(filmas)
}
