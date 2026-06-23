import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import pool from './db'
import router from './routes/auth'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', router)

const port = process.env.PORT || 3000

pool.query('SELECT NOW()')
    .then(() => console.log('DB connected'))
    .catch((err) => console.error('DB connection error:', err))

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})

app.use('/api/auth', router)