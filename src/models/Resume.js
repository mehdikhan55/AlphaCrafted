import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
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
});

// Using `mongoose.models` to check if the model already exists
const Resume = mongoose.models?.Resume || mongoose.model('Resume', resumeSchema);

export default Resume;
