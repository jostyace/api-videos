import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const feedbackSchema = new Schema({
  videoId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Video'
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  timestamp: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Feedback = model('Feedback', feedbackSchema);

export default Feedback;
