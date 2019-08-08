import bcrypt from 'bcrypt-nodejs-as-promised'
import jwt from 'jsonwebtoken'

module.exports = (sequelize, DataType) => {
  var OAuthApplication = sequelize.import('oauth_application')
  var OAuthAccessToken = sequelize.import('oauth_access_token')

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

  // bycrypt just throws errors :)
  AdminUser.validate = async function(email, password) {
    try {
      const user = await AdminUser.find({where:{email:email}})
      const valid = await bcrypt.compare(password, user.encrypted_password)
      return user
    } catch (e) {
      console.log(e)
      throw 'Usernamme or password no valid'
    }
  }

  AdminUser.find_by_token = async function(token) {
    try {
      const oauth_token = await OAuthAccessToken.find({where:{ token: token }})
      return await AdminUser.find({where:{ id: oauth_token.resource_owner_id }})
    } catch (e) {
      console.log(e)
      throw 'Token invalid'
    }
  }

  AdminUser.prototype.create_token = async function(client_id, client_secret) {
    try {
      await OAuthAccessToken.destroy({where:{ resource_owner_id: this.id }})
      const app =  await OAuthApplication.find({where:{ uid: client_id, secret: client_secret }})
      const token = await OAuthAccessToken.create({
        resource_owner_id: this.id,
        application_id: null,
        token: jwt.sign({id: this.id, selected_firm_id: this.selected_firm_id}, process.env.JWT_SECRET, { expiresIn: '1h' }),
        refresh_token: jwt.sign({id: this.id, selected_firm_id: this.selected_firm_id}, process.env.JWT_SECRET, { expiresIn: '1h' }),
        expires_in: 7200,
        scopes: 'user read and write preference',
        created_at: new Date()
      })
      return token;
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  return AdminUser
}