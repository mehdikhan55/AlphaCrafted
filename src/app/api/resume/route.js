import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import Resume from "@/models/Resume";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    await dbConnect();
    try {
        const resumeData= await req.json();
        const savedResume = new Resume(resumeData);
        await savedResume.save();
        return NextResponse.json({ resumeId: savedResume._id }, { status: 201 });
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
