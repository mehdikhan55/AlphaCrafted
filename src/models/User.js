import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        fullName:{
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        resumes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Resume', 
            },
        ],
    },
    { timestamps: true } 
);

// Add the index on the email field
UserSchema.index({ email: 1 });

// Check if the User model already exists
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
