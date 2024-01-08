import dotenv from 'dotenv'
import express from 'express'
import filmaiRoutes from './routes/filmai.js'
import mongoose from 'mongoose'
import userRoutes from './routes/user.js'

dotenv.config()

//express app = express()
const app = express()

//middleware
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

//routes
app.use('/api/filmai', filmaiRoutes)
app.use('/api/user', userRoutes)
 

//connect to DB
mongoose.connect(process.env.URI)
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log('listening on port', process.env.PORT)
		})
	})
	.catch(err => console.log(err))


