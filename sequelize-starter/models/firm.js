module.exports = (sequelize, DataType) => {
  const Firm = sequelize.define('Firm', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true, },
    name: { type: DataType.STRING, allowNull: false, validate: { notEmpty: true, }, },
  }, {
    tableName: 'firms',
    timestamps: false
  });

  Firm.associate = function(models) {
    Firm.hasMany(models.AdminUser);
  };

  return Firm;
};