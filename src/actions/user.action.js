'use server'

import User from "../models/User";
import dbConnect from '../lib/dbConnect';

export const saveUserData = async (user) => {
    //console.log('saveUserData called')
    const { fullName, email, imageUrl } = user;
    //console.log("user recieved in saveUserData", user)
    await dbConnect();
    try {
        
        const userExists = await User.findOne({ email });

        let result;
        if (userExists) {
            // Update the existing user
            result = await User.findOneAndUpdate(
                { email },
                { fullName, imageUrl }, 
                { new: true }
            );
        } else {
            // Create a new user if one does not exist
            const newUser = new User({
                fullName,
                email,
                imageUrl
            });
            result = await newUser.save();
        }

        // Convert the Mongoose document to a plain JavaScript object
        const plainObject = {
            _id: result._id.toString(), // Convert _id to a string
            fullName: result.fullName,
            email: result.email,
            imageUrl: result.imageUrl,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt
        };

        //console.log('good work');
        return plainObject;
    }catch (error) {
        //console.log('Error saving user data (in user actions):', error.message);
        throw new Error(`Error saving user data: ${error.message}`);
    }
}