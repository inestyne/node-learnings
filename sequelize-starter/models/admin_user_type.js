module.exports = (sequelize, DataType) => {
  const AdminUserType = sequelize.define('AdminUserType', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true, },
    description: { type: DataType.STRING, allowNull: false, validate: { notEmpty: true, }, },
  }, {
    tableName: 'admin_user_types',
    underscored: true,
    timestamps: false
  });

  AdminUserType.associate = function(models) {
    AdminUserType.hasMany(models.AdminUser);
  };

  return AdminUserType;
};