import bcrypt from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'

module.exports = (sequelize, DataType) => {
  const AdminUsers = sequelize.define('AdminUsers', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true, },
    email: { type: DataType.STRING, unique: true, allowNull: false, validate: { notEmpty: true, } },
    last_name: { type: DataType.STRING, allowNull: false, validate: { notEmpty: true, }, },
    first_name: { type: DataType.STRING, allowNull: false, validate: { notEmpty: true, }, },
    encrypted_password: { type: DataType.STRING, allowNull: false, validate: { notEmpty: true, }, },
  }, {
    tableName: 'admin_users',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  })

  AdminUsers.associate = function(models) {
    // AdminUsers.hasMany(models.Users)
  }

  AdminUsers.validate = function(email, password) {
    return AdminUsers.find({where:{email:email}})
      .then(function(result) {
        return new Promise(function(resolve,reject){
          bcrypt.compare(password, result.encrypted_password, function(err, valid) {
            if (!valid) reject(err)
            resolve(result)
          })
        })
      })
  }

  AdminUsers.prototype.token = function() {
    return jwt.sign({id: this.id}, process.env.JWT_SECRET, { expiresIn: '1h' })
  }

  AdminUsers.prototype.refresh_token = function() {
    return 'goobligook'
  }

  return AdminUsers
}