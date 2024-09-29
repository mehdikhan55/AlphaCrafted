import mongoose from 'mongoose';

// UserProfileSchema to hold individual profile data for each resume
const UserProfileSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        linkedinURL: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        summary: {
            type: String,
        },
        experiences: [
            {
                jobTitle: {
                    type: String,
                    required: true,
                },
                company: {
                    type: String,
                    required: true,
                },
                description: {
                    type: String,
                },
            },
        ],
        skills: [
            {
                name: {
                    type: String,
                    required: true,
                },
            },
        ],
        education: [
            {
                degree: {
                    type: String,
                    required: true,
                },
                institution: {
                    type: String,
                    required: true,
                },
                description: {
                    type: String,
                },
            },
        ],
        projects: [
            {
                title: {
                    type: String,
                    required: true,
                },
                description: {
                    type: String,
                },
            },
        ],
        certifications: [
            {
                name: {
                    type: String,
                    required: true,
                },
                authority: {
                    type: String,
                    required: true,
                },
                description: {
                    type: String,
                },
            },
        ],
    },
    { timestamps: true } // Timestamps for tracking creation and updates
);

// ResumeSchema to represent multiple resumes for each user
const ResumeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
            required: true,
        },
        userFullName:{
            type: String,
            required: true,
        },
        userImageUrl:{
            type: String,
            required: true,
        },
        userEmail:{
            type: String,
            required: true,
        },
        isPublic: {
            type: Boolean,
            default: false,
        },
        data: UserProfileSchema, // Embeded UserProfileSchema for each resume
    },
    { timestamps: true } 
);

// Checking if the Resume model already exists
const Resume = mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);

export default Resume;
