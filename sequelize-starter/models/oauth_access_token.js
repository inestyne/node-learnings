module.exports = (sequelize, DataTypes) => {
  const OAuthAccessToken = sequelize.define('OAuthAccessToken', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    resource_owner_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    application_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'oauth_applications',
        key: 'id'
      }
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    refresh_token: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true
    },
    expires_in: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    revoked_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    scopes: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    previous_refresh_token: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {
    tableName: 'oauth_access_tokens',
    timestamps: false,
    underscored: true,
  })

  OAuthAccessToken.associate = function(models) {
  }

  return OAuthAccessToken
}
