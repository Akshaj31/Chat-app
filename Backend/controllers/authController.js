import User from '../models/User.Model.js';
// import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';

const registerUser = async(req, res) =>{
    const {name, email, username, password} = req.body;
    if (!name || !email || !username || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    
    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error("User with this email id already exists")
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        username, 
        password : hashedPassword
    })

    if(user){
        res.status(201).json({
            _id : user._id, 
            name : user.name, 
            email : user.email, 
            username : user.username, 
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid user data')
    }
}

export {registerUser}