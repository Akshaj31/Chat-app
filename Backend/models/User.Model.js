import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name : {
        type : String, 
        required : true
    }, 
    email : {
        type : String, 
        required : true,
        unique : true,  
        match: [/.+\@.+\..+/, 'Invalid email address'],
    }, 
    username : {
        type : String, 
        unique : true, 
    }, 
    password : {
        type : String, 
        required : true
    },
    friends : [{
        type : mongoose.Schema.Types.ObjectId,  
        ref : 'User'
    }], 
    pendingSentInvitations : [{
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'User'
    }], 
    pendingReceiverInvitations : [{
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'User'
    }],

}, {timestamps : true})

const User = mongoose.model('User', userSchema);

export default User