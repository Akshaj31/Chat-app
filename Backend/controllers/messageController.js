import Message from "../models/Message.Model.js";
import User from "../models/User.Model.js";
import mongoose from "mongoose";

const sendMessage = async (req, res) => {
    console.log(req.user); // Log req.user
	const { receiverUsername, content, messageType } = req.body;

	if (!receiverUsername || !content) {
		return res
			.status(400)
			.json({ message: "Receiver username and contents are required" });
	}

	const receiver = await User.findOne({ username: receiverUsername });
    if (!receiver) {
        return res.status(404).json({ message: "Recipient not found." });
    }

    // Explicitly cast IDs to ObjectId
    // const senderId = mongoose.Types.ObjectId();
    // const receiverId = mongoose.Types.ObjectId(receiver._id);

	try {
		const newMessage = new Message({
			senderId : req.user.id,
			receiverId : receiver._id,
			content,
			messageType,
			timestamp: new Date(),
		});

		const savedMessage = await newMessage.save();

		return res.status(201).json(savedMessage);
	} catch (error) {
		return res.status(500).json(error.message);
	}
};

const getMessages = async (req, res) => {
	const { userId } = req.params;

	try {
		const message = await Message.find({
			$or: [
				{ senderId: req.user.id, receiverId: userId },
				{ senderId: userId, receiverId: req.user.id },
			],
		}).sort({ timestamp: 1 });

		return res.status(200).json(message);
	} catch (error) {
		return res.status(500).json(error.message);
	}
};

export { sendMessage, getMessages };
