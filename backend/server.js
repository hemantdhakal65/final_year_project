const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const { SerialPort, ReadlineParser } = require("serialport");
const http = require("http");
const socketIo = require('socket.io');
const { parser } = require("./config/serialConfig");
const Alert = require("./models/Alert");
const aurdinoRoutes = require('./routes/aurdinoRoutes');

const config = require('./config/config');
const {verifyToken} =require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require("./routes/appointmentRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const messageRoutes = require('./routes/messageRoutes');
const userDeleteRoutes=require('./routes/userDeleteRoutes');
const { cleanupAppointments } = require("./controllers/appointmentController");

dotenv.config(); 
const PORT = config.PORT; 
const app = express();


const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

global.io = io;

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});



app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Welcome to the Hospital Management System API');
});

app.use('/api/auth', authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userDeleteRoutes); 
app.use('/api/arduino', aurdinoRoutes);

setInterval(cleanupAppointments, 10 * 60 * 1000);

app.get('/api/protected', verifyToken, (req, res) => {
  res.json({ success: true, message: 'This is a protected route', user: req.user });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 