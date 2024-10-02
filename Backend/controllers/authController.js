import User from '../models/User.Model.js';
// import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';
import generateUniqueUsername from '../utils/usernameGenerator.js';


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
            // Include token here in future
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid user data')
    }
}


const loginUser = async (req, res) => {
    const { input, password } = req.body;

    // Validate input fields
    if (!input || !password) {
        // console.log(input, password)
        return res.status(400).json({ message: "Please fill in all the fields" });
    }

    try {
        // Find user by email or username
        const user = await User.findOne({
            $or: [{ email: input }, { username: input }]
        });

        if (!user) {
            return res.status(401).json({ message: "Incorrect email/username" });
        }

        // Compare the password
        const correctPassword = await bcrypt.compare(password, user.password); // Await the comparison

        if (!correctPassword) {
            return res.status(401).json({ message: "Password entered is incorrect" });
        }

        // Successful login response
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username
            // You might want to include a token here if implemented
            // token: generateToken(user._id)
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


const getUsername = async (req, res) => {
    try {
        const username = await generateUniqueUsername();
        res.status(200).json({ username });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export {registerUser, loginUser, getUsername}