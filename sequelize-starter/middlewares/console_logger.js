import chalk from 'chalk'

module.exports = ( app, server, namespace ) => {
  server.use(function logger(req,res,next) {
    console.log()
    console.log(chalk.blue(new Date(),req.method,req.url,req.params))
    next()
  })
}
