import usuarios from './models/model.Usuario.js'

export const index = async (req, res) => {
  const user = await usuarios.find()
  res.json(user)
}
