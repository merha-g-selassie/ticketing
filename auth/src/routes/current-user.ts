import express from 'express';
import { UserPayload } from '../types/UserPayload';
import { currentUser } from '@merha-tickets/common';

const router = express.Router();

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

router.get('/api/users/currentuser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
