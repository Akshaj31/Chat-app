import User from '../models/User.Model.js';

const generateUniqueUsername = async () => {
    const randomAdjective = ['Swift', 'Quick', 'Brave', 'Clever', 'Bold'];
    const randomNoun = ['Fox', 'Lion', 'Eagle', 'Wolf', 'Tiger'];
    const randomNumber = Math.floor(Math.random() * 1000); // Number at the end
    const baseUsername = `${randomAdjective[Math.floor(Math.random() * randomAdjective.length)]}${randomNoun[Math.floor(Math.random() * randomNoun.length)]}${randomNumber}`;

    // Check uniqueness in the database
    let username = baseUsername.toLowerCase();
    let exists = await User.findOne({ username });

    // Generate a new username if it already exists
    while (exists) {
        const newRandomNumber = Math.floor(Math.random() * 1000);
        username = `${randomAdjective[Math.floor(Math.random() * randomAdjective.length)]}${randomNoun[Math.floor(Math.random() * randomNoun.length)]}${newRandomNumber}`.toLowerCase();
        exists = await User.findOne({ username });
    }

    return username;
};

export default generateUniqueUsername;
