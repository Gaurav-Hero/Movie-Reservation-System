import express from 'express'

import {
    addTheater,
    listAllTheater,
    listSingleTheater,
    updateTheater,
    deleteTheater
} from '../controllers/theater.controller.js'
import { verifyToken , verifyAdmin} from '../middleware/auth.middleware.js';

const router = express.Router()

router.post('/', verifyToken, verifyAdmin, addTheater); 
router.get('/', listAllTheater); 
router.get('/:id', listSingleTheater); 
router.put('/:id', verifyToken, verifyAdmin, updateTheater); 
router.delete('/:id', verifyToken, verifyAdmin, deleteTheater); 

export default router;