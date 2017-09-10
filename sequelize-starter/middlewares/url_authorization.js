import bcrypt from 'bcrypt-nodejs-as-promised'
import jwt from 'jsonwebtoken'

module.exports = ( app, server, namespace ) => {
  server.use(async function (req, res, next) {
    // do not authorize endpoint used to get authorization!
    if (req.url === '/api/admin_users/sign_in') {
       return next()
    }

    try {
      const decoded = await jwt.verify(req.query.access_token, process.env.JWT_SECRET)
      req.user = decoded
      return next()

    } catch (e) {
      res.send(401);                                                              
      return next(false)

    }

  })
}
