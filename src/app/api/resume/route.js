import mongoose from "mongoose";
import dbConnect from '/src/lib/dbConnect';
import Resume from  '/src/models/Resume';
import { NextResponse } from "next/server";

export const POST = async (req) => {
    console.log('POST request to /api/resume');
    await dbConnect();
    try {
        const resumeData= await req.json();
        console.log('resumeData:', resumeData);
        const savedResume = new Resume(resumeData);
        await savedResume.save();
        console.log('saved resume : ', savedResume)
        return NextResponse.json({ resumeId: savedResume._id }, { status: 200 });
    } catch (err) {
        console.error('API route error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export const PUT = async (req) => {
    console.log('PUT request to /api/resume');
    await dbConnect();
    try {
        const resumeData = await req.json();
        console.log('resumeData:', resumeData);
        
        // Check if the resume ID is provided
        if (!resumeData._id) {
            return NextResponse.json({ error: 'Resume ID is required' }, { status: 400 });
        }

        // Update the resume with the given ID
        const updatedResume = await Resume.findByIdAndUpdate(resumeData._id, resumeData, { new: true });

        // Check if the resume was found and updated
        if (!updatedResume) {
            return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
        }

        console.log('updated resume:', updatedResume);
        return NextResponse.json({ resumeId: updatedResume._id }, { status: 200 });
    } catch (err) {
        console.error('API route error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export const GET = async (req) => {
    const { searchParams } = new URL(req.url);
    const resumeId = searchParams.get('id'); // Retrieve ID from query params

    await dbConnect();

    try {
        const resume = await Resume.findById(resumeId);
        if (!resume) {
            return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
        }
        return NextResponse.json({ resume }, { status: 200 });
    } catch (err) {
        console.error('API route error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
