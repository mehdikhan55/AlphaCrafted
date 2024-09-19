'use server'
import dbConnect from "@/lib/dbConnect";
import Resume from "@/models/Resume.js";

export const saveResume = async (resumeData) => {
    await dbConnect();
    try {
        // Save to database
        const savedResume = new Resume(resumeData);
        await savedResume.save();
        console.log('hello')
        return savedResume._id;
    }catch(err){
        console.log('error in resume actions...',err);
        throw new Error('Error saving resume');
    }
    
}

export const getResume = async (id) => {
    await dbConnect();
    try {
        const resume = await Resume.findById(id);
        return resume;
    }catch(err){
        console.log('error in resume actions',err);
        throw new Error('Error fetching resume');
    }
}