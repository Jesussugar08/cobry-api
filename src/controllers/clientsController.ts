import {Request, Response} from 'express'
import pool from '../db'

export const getCLients = async (req: Request, res: Response) => {
    try{
        const result = await pool.query(
            `SELECT
                *
             FROM cobry.clients
             WHERE user_id = $1 and deleted_at is null` ,
             [1]// mas adelante reemplazar con el user_id del token 
        )

        res.status(200).json({
            success:true,
            data: result.rows
        })
    }catch (error){
        res.status(500).json({error: 'Error al obtener clientes'})
    }
}

export const createCLients = async (req: Request, res: Response) => {
    try{
        const { name, email, phone, ruc } = req.body
        const result = await pool.query(
            `insert into cobry.clients(user_id, name, email, phone, ruc)
             values ($1, $2, $3, $4, $5)
             RETURNING *
             `,
             [1, name, email, phone, ruc]
             
        )

        res.status(200).json({
            success:true,
            data: result.rows
        })
    } catch (error: any) {
        console.error('Create client error:', error.message)
        res.status(500).json({ error: error.message })
    }
}

export const updateClient = async (req: Request, res: Response) => {
    try{
        const {name, email, phone, ruc } = req.body
        const {id} = req.params
        const result = await pool.query(
            `update cobry.clients
             set name=$1, email=$2, phone=$3, ruc=$4
             where id = $5 
             returning *
             `,
             [name, email, phone, ruc, id]
             
        )

        res.status(200).json({
            success:true,
            data: result.rows
        })
    }catch (error){
        res.status(500).json({error: 'Error al editar un cliente'})
    }
}

export const deleteClient = async (req: Request, res: Response) => {
    try{
        const {id} = req.params
        const result = await pool.query(
            `update cobry.clients
             set deleted_at=now()
             where id = $1
             returning *
             `,
             [id]
             
        )

        res.status(200).json({
            success:true,
            data: result.rows
        })
    }catch (error){
        res.status(500).json({error: 'Error al eliminar el cliente'})
    }
}
