import mongoose from "mongoose"
import User from "./User.Model.js"

const messageSchema = new mongoose.Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId, 
        required : true, 
        ref : User,
    }, 
    receiverId : {
        type : mongoose.Schema.Types.ObjectId, 
        required : true, 
        ref : User,
    }, 
    content : {
        type : String, 
        required : true
    },
    timestamp : {
        type : Date, 
        default : Date.now
    }, 
    seen: {
        type: Boolean,
        default: false,
    },
    messageType: {
        type: String,
        enum: ['text', 'image', 'file'], // Specify the types of messages
        default: 'text',
    },
})

const Message = mongoose.model('Message', messageSchema)

export default Message