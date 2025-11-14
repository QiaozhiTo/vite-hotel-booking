import express from 'express'
import { protect } from '../middleware/authMiddleware.js';
import { registerHotel } from '../controllers/hotelController.js';

const hotelRouter = express.Router();
hotelRouter.get('/', (req, res) => res.json({ success: true })); // 便于自测

hotelRouter.post('/', protect, registerHotel);
export default hotelRouter;
