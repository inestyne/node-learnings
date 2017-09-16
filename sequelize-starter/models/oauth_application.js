module.exports = (sequelize, DataTypes) => {
  const OAuthApplication = sequelize.define('OAuthApplication', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    uid: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    secret: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    redirect_uri: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    scopes: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    owner_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    owner_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'oauth_applications',
    underscored: true,
  })

  OAuthApplication.associate = function(models) {
  }

  return OAuthApplication
};
