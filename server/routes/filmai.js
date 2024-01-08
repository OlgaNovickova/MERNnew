import express from 'express'
import * as controller from '../controllers/controller.js'
import requireAuth from '../middleware/requireAuth.js'

const router = express.Router()
router.use(requireAuth)

//GET - paimti visus filmus
router.get('/', controller.getMovies)



//GET - paimti vieną filmą
router.get('/:id', controller.getMovie)



//POST - sukurti vieną filmą
router.post('/', controller.createMovie)



//PATCH - redaguoti vieną filmą
router.patch('/:id', controller.updateMovie)


//DELETE - ištrinti vieną filmą
router.delete('/:id',controller.deleteMovie)



export default router