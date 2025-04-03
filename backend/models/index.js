const { sequelize } = require('../config/db');
const User = require('./User');
const Student = require('./Student');
const School = require('./School');
const Volunteer = require('./Volunteer');

// Define associations
User.hasOne(Student, { foreignKey: 'userId' });
Student.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(School, { foreignKey: 'userId' });
School.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(Volunteer, { foreignKey: 'userId' });
Volunteer.belongsTo(User, { foreignKey: 'userId' });

// Export models
module.exports = {
  sequelize,
  User,
  Student,
  School,
  Volunteer,
};