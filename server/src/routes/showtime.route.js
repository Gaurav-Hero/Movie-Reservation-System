import express from 'express'
import { verifyToken , verifyAdmin} from '../middleware/auth.middleware.js';
import {
    addShowtime,
    getAllShowtime,
    getShowtimeById,
    updateShowtime,
    deleteShowtime
} from '../controllers/showtime.controller.js'

const router = express.Router()

router.post('/', verifyToken, verifyAdmin, addShowtime); 
router.get('/', getAllShowtime); 
router.get('/:id', getShowtimeById); 
router.put('/:id', verifyToken, verifyAdmin, updateShowtime); 
router.delete('/:id', verifyToken, verifyAdmin, deleteShowtime);

export default router;

