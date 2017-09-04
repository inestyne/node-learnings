import bcrypt from 'bcrypt-nodejs-as-promised'
import jwt from 'jsonwebtoken'

module.exports = (sequelize, DataType) => {
  const AdminUser = sequelize.define('AdminUser', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true, },
    email: { type: DataType.STRING, unique: true, allowNull: false, validate: { notEmpty: true, } },
    last_name: { type: DataType.STRING, allowNull: false, validate: { notEmpty: true, }, },
    first_name: { type: DataType.STRING, allowNull: false, validate: { notEmpty: true, }, },
    encrypted_password: { type: DataType.STRING, allowNull: false, validate: { notEmpty: true, }, },
  }, {
    tableName: 'admin_users',
    underscored: true,
  })

  AdminUser.associate = function(models) {
    AdminUser.belongsTo(models.AdminUserType)
    AdminUser.belongsTo(models.Firm, {as: 'firm'})
    AdminUser.belongsTo(models.Firm, {as: 'selected_firm'})
  }

  AdminUser.validate = async function(email, password) {
    // bycrypt just throws errors :)
    try {
      const user = await AdminUser.find({where:{email:email}})
      const valid = await bcrypt.compare(password, user.encrypted_password)
      return user
    } catch (e) {
      console.log(e)
      throw 'Usernamme or password no valid'
    }
  }

  AdminUser.prototype.token = function() {
    return jwt.sign({id: this.id}, process.env.JWT_SECRET, { expiresIn: '1h' })
  }

  AdminUser.prototype.refresh_token = function() {
    return 'goobligook'
  }

  return AdminUser
}