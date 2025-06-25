import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import isDatabaseConnected from './src/config/db.config.js'
import authRoute from './src/routes/auth.route.js'
import movieRoute from './src/routes/movie.route.js'
import theaterRoute from './src/routes/theater.route.js'
import showtimeRoute from './src/routes/showtime.route.js'
import bookingRoute from './src/routes/booking.route.js'
import paymentRoutes from './src/routes/payment.route.js'
import userRoutes from './src/routes/user.route.js'
import adminRoutes from './src/routes/admin.route.js'

dotenv.config()

const app = express();
app.use(express.json())

//cors setup
app.use(cors({
    origin: 'http://localhost:5173',
}))


app.use('/api/auth', authRoute);
app.use('/api/movies', movieRoute);
app.use('/api/theater', theaterRoute);
app.use('/api/showtime', showtimeRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/payments", paymentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

const port = process.env.PORT || 5000
if(isDatabaseConnected()){
    app.listen(port , () => {
    console.log(`Server is Ok @ ${port}`)
    })
}


