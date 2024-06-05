import express from 'express';
import { addFeedback, getFeedbacksByVideo, deleteFeedbackById } from '../controllers/feedbackController.js';

const router = express.Router();

router.post('/add/:videoId', addFeedback);

router.get('/:videoId', getFeedbacksByVideo);

router.delete('/:id', deleteFeedbackById);

export default router;
