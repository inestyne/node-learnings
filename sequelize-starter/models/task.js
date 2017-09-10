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
    scopes: {
      policy: function(user) { return { where: { 
        firm_id: user.selected_firm_id, 
        $or: [ { assigned_by_id: user.id } , { assigned_to_id: user.id } ] 
      }}},
   
      my_tasks: function(user) { return { where: { 
        assigned_to_id: user.id, 
        status: { $ne: Task.enum_status['Completed'] } 
      }}},
   
      assigned_by_me: function(user) { return { where: { 
        assigned_by_id: user.id, 
        status: { $ne: Task.enum_status['Completed'] } 
      }}},

      today: function(user) { return { where: { 
        due_date: new Date(), 
        status: { $ne: Task.enum_status['Completed'] } 
      }}},

      past_date: function(user) { return { where: { 
        due_date: { $lt: new Date() }, 
        status: { $ne: Task.enum_status['Completed'] } 
      }}},

      completed: function(user) { return { where: { 
        status: Task.enum_status['Completed']
      }}},

      all: function(user) { return { where: { 
        status: { $ne: Task.enum_status['Completed'] } 
      }}},

    }
  });

  Task.associate = function(models) {
    Task.belongsTo(models.Firm)
    Task.belongsTo(models.User, {as: 'user'})
    Task.belongsTo(models.User, {as: 'created_by'})
    Task.belongsTo(models.User, {as: 'updated_by'})
    Task.belongsTo(models.AdminUser, {as: 'assigned_to'})
    Task.belongsTo(models.AdminUser, {as: 'assigned_by'})
  };

  Task.enum_status = {Not_Started: 1, In_Process: 2, Completed: 99}
  Task.enum_priority = {Normal: 1, High: 2}

  return Task;
};