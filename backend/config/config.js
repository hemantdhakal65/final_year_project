require('dotenv').config(); 

module.exports = {
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/hospital-management',
    JWT_SECRET: process.env.JWT_SECRET || 'hemant_dhakal_1600',
    PORT: process.env.PORT || 5000, 
};
