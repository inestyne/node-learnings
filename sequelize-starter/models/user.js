module.exports = (sequelize, DataType) => {
  const User = sequelize.define('User', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true, },
    email: { type: DataType.STRING, unique: true, allowNull: false, validate: { notEmpty: true, } },
    last_name: { type: DataType.STRING, allowNull: false, validate: { notEmpty: true, }, },
    first_name: { type: DataType.STRING, allowNull: false, validate: { notEmpty: true, }, },
  }, {
    tableName: 'users',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  User.associate = function(models) {
    // Users.hasMany(models.Users);
  };

  return User;
};