const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/db')

module.exports = {
   authenticateToken: (req, res, next) => {
      const authHeader = req.headers['authorization']
      const token = authHeader && authHeader.split(' ')[1]
      if (!token) {
         return res.sendStatus(401)
      }
      jwt.verify(token, JWT_SECRET, (err, data) => {
         if (err) {
            return res.sendStatus(403);
         }
         req.data = data
         next()
      })
   },
   authenticateRole: (role) => {
      return (req, res, next) => {
         if (req.data && req.data.role === role) {
            next()
         } else {
            res.sendStatus(401)
         }
      }
   }
}