import User from '../models/User.Model.js';
import bcrypt from 'bcryptjs';

// Check if username is available
const checkUsername = async (req, res) => {
    const { username } = req.body;

    const userExists = await User.findOne({ username });
    if (userExists) {
        return res.status(400).json({ message: 'Username already taken.' });
    }

    res.status(200).json({ message: 'Username is available.' });
};


// Update username
const updateUsername = async (req, res) => {
    const { previousUsername, newUsername } = req.body;

    // Check if the new username is unique
    const usernameExists = await User.findOne({ username: newUsername });
    if (usernameExists) {
        return res.status(400).json({ message: 'Username already taken.' });
    }

    // Update the username
    const updatedUser = await User.findOneAndUpdate(
        { username: previousUsername },
        { username: newUsername },
        { new: true }
    );

    if (!updatedUser) {
        return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        username: updatedUser.username,
    });
};

// Update password
const updatePassword = async (req, res) => {
    const { previousUsername, oldPassword, newPassword } = req.body;

    const user = await User.findOne({ username: previousUsername });
    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Old password is incorrect.' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully.' });
};

export { checkUsername,  updateUsername, updatePassword };
