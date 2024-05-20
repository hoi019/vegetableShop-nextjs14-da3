const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UserModel = require('../models/user.model')

module.exports = {
   register: async (userData) => {
      try {
         const hashedPassword = await bcrypt.hash(userData.password, 10)
         const data = await UserModel.create({ ...userData, password: hashedPassword })
         return data
      } catch (error) {
         throw new Error(error.message)
      }
   },
   login: async (email, password) => {
      try {
         const data = await UserModel.findOne({ where: { email } })
         if (!data) throw new Error('User not found')

         const isPasswordValid = await bcrypt.compare(password, data.password)
         if (!isPasswordValid) throw new Error('Invalid password')

         const token = jwt.sign({ id: data.id }, 'secret', { expiresIn: '10h' })
         return { data, token }
      } catch (error) {
         throw new Error(error.message)
      }
   }
}
