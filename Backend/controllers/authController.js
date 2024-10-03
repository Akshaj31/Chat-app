import User from '../models/User.Model.js';
import bcrypt from 'bcryptjs';
import generateUniqueUsername from '../utils/usernameGenerator.js';
import {generateAccessToken, generateRefreshToken} from '../utils/generateToken.js'

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const username = await generateUniqueUsername();

        
        // Create the user with the generated username
        const user = await User.create({
            name,
            email,
            username,
            password: hashedPassword,
        });
        
        const refreshToken = generateRefreshToken(user);
        const accessToken = generateAccessToken(user);

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true, // Set to true if using HTTPS
            sameSite: 'Strict', // or 'Lax' depending on your needs
            maxAge: 15 * 60 * 1000, // 15 minutes
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true, // Set to true if using HTTPS
            sameSite: 'Strict', // or 'Lax' depending on your needs
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            // Include token here in future
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { input, password } = req.body;

    if (!input || !password) {
        return res.status(400).json({ message: "Please fill in all the fields" });
    }

    try {
        const user = await User.findOne({
            $or: [{ email: input }, { username: input }]
        });

        if (!user) {
            return res.status(401).json({ message: "Incorrect email/username" });
        }

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
            return res.status(401).json({ message: "Password entered is incorrect" });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true, // Set to true if using HTTPS
            sameSite: 'Strict', // or 'Lax' depending on your needs
            maxAge: 15 * 60 * 1000, // 15 minutes
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true, // Set to true if using HTTPS
            sameSite: 'Strict', // or 'Lax' depending on your needs
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            // Include token if needed
            // accessToken,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getUsername = async (req, res) => {
    try {
        const username = await generateUniqueUsername();
        return res.status(200).json({ username });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


const logout = async (req, res) =>{
    const {userId} = req.body
    try{
        await User.updateOne({_id:userId}, {$set: {refreshToken:null}})
        res.cookie('accessToken', '', { expires: new Date(0) }); // Expire access token cookie
        res.cookie('refreshToken', '', { expires: new Date(0) });
        return res.status(200).json({ message: "Logged out successfully." });
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}

export { registerUser, loginUser, getUsername, logout };
