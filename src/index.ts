import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import pool from './db'
import authRouter from './routes/auth'
import clientRouter from './routes/client'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/client', clientRouter)

const port = process.env.PORT || 3000

pool.query('SELECT NOW()')
    .then(() => console.log('DB connected'))
    .catch((err) => console.error('DB connection error:', err))

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})

