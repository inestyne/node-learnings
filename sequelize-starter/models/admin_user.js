import bcrypt from 'bcrypt-nodejs-as-promised'
import jwt from 'jsonwebtoken'

module.exports = (sequelize, DataType) => {
  const AdminUser = sequelize.define('AdminUser', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true, },
    email: { type: DataType.STRING, unique: true, allowNull: false, validate: { notEmpty: true, } },
    last_name: { type: DataType.STRING, allowNull: false, validate: { notEmpty: true, }, },
    first_name: { type: DataType.STRING, allowNull: false, validate: { notEmpty: true, }, },
    encrypted_password: { type: DataType.STRING, allowNull: false, validate: { notEmpty: true, }, },
    selected_firm_id: { type: DataType.INTEGER },

    AdminUserTypeId: { type: DataType.INTEGER, field: 'admin_user_type_id' },
    FirmId: { type: DataType.INTEGER, field: 'firm_id' },
  }, {
    tableName: 'admin_users',
    underscores: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  })

  AdminUser.associate = function(models) {
    AdminUser.belongsTo(models.AdminUserType)
    AdminUser.belongsTo(models.Firm)
  }

  AdminUser.validate = async function(email, password) {
    const user = await AdminUser.find({where:{email:email}})

    // bycrypt just throws errors :)
    try {
      const valid = await bcrypt.compare(password, user.encrypted_password)
    } catch (e) {
      throw 'Usernamme or password no valid'
    }

    return user
  }

  AdminUser.prototype.token = function() {
    return jwt.sign({id: this.id}, process.env.JWT_SECRET, { expiresIn: '1h' })
  }

  AdminUser.prototype.refresh_token = function() {
    return 'goobligook'
  }

  return AdminUser
}