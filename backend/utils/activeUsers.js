
const activeUsers = {
    doctors: new Set(),
    nurses: new Set(),
    patients: new Set(),
    staff: new Set(),
  };
  
  const addActiveUser = (userId, role) => {
    switch (role) {
      case 'doctor':
        activeUsers.doctors.add(userId);
        break;
      case 'nurse':
        activeUsers.nurses.add(userId);
        break;
      case 'patient':
        activeUsers.patients.add(userId);
        break;
      case 'staff':
        activeUsers.staff.add(userId);
        break;
      default:
        break;
    }
  };
  
  const removeActiveUser = (userId, role) => {
    switch (role) {
      case 'doctor':
        activeUsers.doctors.delete(userId);
        break;
      case 'nurse':
        activeUsers.nurses.delete(userId);
        break;
      case 'patient':
        activeUsers.patients.delete(userId);
        break;
      case 'staff':
        activeUsers.staff.delete(userId);
        break;
      default:
        break;
    }
  };
  
  const getActiveUserCounts = () => {
    return {
      doctors: activeUsers.doctors.size,
      nurses: activeUsers.nurses.size,
      patients: activeUsers.patients.size,
      staff: activeUsers.staff.size,
    };
  };
  
  module.exports = { addActiveUser, removeActiveUser, getActiveUserCounts };