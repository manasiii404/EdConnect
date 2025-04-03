const { sequelize } = require('../config/db');
const User = require('./User');
const Student = require('./Student');
const School = require('./School');
const Volunteer = require('./Volunteer');
const Class = require('./Class');
const VolunteerRequest = require('./VolunteerRequest');

// Define associations with consistent aliases
User.hasOne(Student, { foreignKey: 'userId' });
Student.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(School, { foreignKey: 'userId' });
School.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(Volunteer, { foreignKey: 'userId' });
Volunteer.belongsTo(User, { foreignKey: 'userId' });

// School-Class associations
School.hasMany(Class, { 
  foreignKey: 'schoolId',
  as: 'classes'  // plural for hasMany
});
Class.belongsTo(School, { 
  foreignKey: 'schoolId',
  as: 'school'   // singular for belongsTo
});

// VolunteerRequest associations
School.hasMany(VolunteerRequest, { 
  foreignKey: 'schoolId',
  as: 'volunteerRequests'
});
VolunteerRequest.belongsTo(School, { 
  foreignKey: 'schoolId',
  as: 'school'
});

Class.hasMany(VolunteerRequest, { 
  foreignKey: 'classId',
  as: 'volunteerRequests'
});
VolunteerRequest.belongsTo(Class, { 
  foreignKey: 'classId',
  as: 'class'  // singular alias
});

// Export models
module.exports = {
  sequelize,
  User,
  Student,
  School,
  Volunteer,
  Class,
  VolunteerRequest,
};