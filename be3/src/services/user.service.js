const UserModel = require('../models/user.model')

const UserServices = {
   getUserById: async (id) => {
      try {
         const data = await UserModel.findByPk(id)
         return data
      } catch (error) {
         throw new Error(error.message)
      }
   },
   updateUser: async (id, dataUpdate) => {
      try {
         const data = await UserModel.findByPk(id)
         if (!data) {
            throw new Error('Not found')
         }
         await data.update(dataUpdate)
         return data
      } catch (error) {
         throw new Error(error.message)
      }
   },
   deleteUser: async (id) => {
      try {
         const data = await UserModel.findByPk(id)
         if (!data) {
            throw new Error('Not found')
         }
         await data.destroy()
         return { message: 'Deleted successfully' }
      } catch (error) {
         throw new Error(error.message)
      }
   }
}

module.exports = UserServices