const Message = require('../models/Message');
const User = require('../models/User');
exports.sendMessage = async (req, res) => {
  try {
    const { receiver, content } = req.body;
    
    if (!receiver || !content) {
      return res.status(400).json({ error: 'Receiver and content are required' });
    }

    const sender = req.user.id; 

    const message = new Message({
      sender,
      receiver,
      content
    });

    const savedMessage = await message.save();

   
    const populatedMessage = await Message.findById(savedMessage._id)
      .populate('sender', 'username')
      .populate('receiver', 'username');

    res.status(201).json(populatedMessage);
  } catch (error) {
    console.error('Send Message Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.getMessages = async (req, res) => {
  try {
    const currentUserId = req.user.id; 
    const otherUserId = req.query.otherUserId; 

    let messages;
    if (otherUserId) {
      
      messages = await Message.find({
        $or: [
          { sender: currentUserId, receiver: otherUserId },
          { sender: otherUserId, receiver: currentUserId }
        ]
      });
    } else {
    
      messages = await Message.find({
        $or: [
          { sender: currentUserId },
          { receiver: currentUserId }
        ]
      });
    }

   
    messages = await Message.populate(messages, [
      { path: 'sender', select: 'username' },
      { path: 'receiver', select: 'username' }
    ]);
    messages.sort((a, b) => a.createdAt - b.createdAt);

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
