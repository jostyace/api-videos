import jwt from 'jsonwebtoken'
import { jwtSecret } from '../config/config.js'

const logueadoMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization')
  if (!authHeader) {
    return res.status(401).json({ message: 'No está autenticado' })
  }

  const token = authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'No está autenticado' })
  }

  try {
    const decoded = jwt.verify(token, jwtSecret)
    req.user = decoded
    next()
  } catch (err) {
    res.status(401).json({ message: 'Token no es válido' })
  }
}

export default authMiddleware
