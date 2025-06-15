import express from 'express'
import dotenv from 'dotenv'
import isDatabaseConnected from './src/config/db.config.js';
import authRoute from './src/routes/auth.route.js'

dotenv.config()

const app = express();
app.use(express.json())

app.use('/api/auth', authRoute)

const port = process.env.PORT || 5000
if(isDatabaseConnected()){
    app.listen(port , () => {
    console.log(`Server is Ok @ ${port}`)
    })
}


