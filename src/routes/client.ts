import { Router } from 'express'

import { getCLients, createCLients, updateClient, deleteClient } from '../controllers/clientsController'

const router = Router()

router.get('/', getCLients)
router.post('/', createCLients)
router.patch('/:id', updateClient)
router.delete('/:id', deleteClient)

export default router