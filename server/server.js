import express from 'express'
import dotenv from 'dotenv'
import isDatabaseConnected from './src/config/db.config.js'
import authRoute from './src/routes/auth.route.js'
import movieRoute from './src/routes/movie.route.js'
import theaterRoute from './src/routes/theater.route.js'
import showtimeRoute from './src/routes/showtime.route.js'

dotenv.config()

const app = express();
app.use(express.json())

app.use('/api/auth', authRoute);
app.use('/api/movies', movieRoute);
app.use('/api/theater', theaterRoute);
app.use('/api/showtime', showtimeRoute);

const port = process.env.PORT || 5000
if(isDatabaseConnected()){
    app.listen(port , () => {
    console.log(`Server is Ok @ ${port}`)
    })
}


