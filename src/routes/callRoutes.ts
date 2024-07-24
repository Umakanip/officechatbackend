import { Router } from 'express';
import {
  getCalls,
  getCallById,
  createCall,
  updateCall,
  deleteCall
} from '../controllers/callController';

const router: Router = Router();

router.get('/calls', getCalls);
router.get('/calls/:id', getCallById);
router.post('/calls', createCall);
router.put('/calls/:id', updateCall);
router.delete('/calls/:id', deleteCall);

export default router;