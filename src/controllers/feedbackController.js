import Feedback from '../models/model.Feedback.js'

export const addFeedback = async (req, res) => {
  try {
    const { videoId } = req.params
    const { userId, timestamp, comment } = req.body
    const feedback = new Feedback({
      videoId,
      userId,
      timestamp,
      comment
    })
    await feedback.save()
    res.status(201).json(feedback)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getFeedbacksByVideo = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ videoId: req.params.videoId })
    res.status(200).json(feedbacks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id)
    if (!feedback) {
      return res.status(404).send('Feedback no encontrado')
    }
    await feedback.remove()
    res.status(200).json({ message: 'Feedback eliminado' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
