const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'doctor', 'nurse','patient', 'staff','guardian'],
      required: true
    },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }] 
  }, { timestamps: true });
  

module.exports = mongoose.model('User', userSchema);
