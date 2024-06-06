// routes/protectedRoute.js
import express,{Request,Response} from 'express';
import verifyToken from '../middleware/middleware';

const router = express.Router();

// Extend the Request interface to include the userId property
interface AuthenticatedRequest extends Request {
    userId?: string;
  }

router.get('/shows/seats/:id/billing/:id', verifyToken, (req:AuthenticatedRequest, res) => {
  res.json({ message: 'This is a protected route', userId: req.userId  });
});

export default router;
