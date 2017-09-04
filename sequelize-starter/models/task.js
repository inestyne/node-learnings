module.exports = (sequelize, DataType) => {
  const Task = sequelize.define('Task', {
    id: {
      type: DataType.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataType.STRING(1024),
      allowNull: true
    },
    description: {
      type: DataType.TEXT,
      allowNull: true
    },
    priority: {
      type: DataType.INTEGER(11),
      allowNull: true
    },
    notes: {
      type: DataType.TEXT,
      allowNull: true
    },
    status: {
      type: DataType.INTEGER(11),
      allowNull: true
    },
    completed_date: {
      type: DataType.DATE,
      allowNull: true
    },
    due_date: {
      type: DataType.DATE,
      allowNull: true
    },
    synced_at: {
      type: DataType.DATE,
      allowNull: true
    },
    unique_id: {
      type: DataType.STRING(255),
      allowNull: true
    },

  }, {
    tableName: 'tasks',
    underscored: true,

  });

  Task.associate = function(models) {
    Task.belongsTo(models.Firm)
    Task.belongsTo(models.User, {as: 'user'})
    Task.belongsTo(models.User, {as: 'created_by'})
    Task.belongsTo(models.User, {as: 'updated_by'})
    Task.belongsTo(models.AdminUser, {as: 'assigned_to'})
    Task.belongsTo(models.AdminUser, {as: 'assigned_by'})
  };

  return Task;
};