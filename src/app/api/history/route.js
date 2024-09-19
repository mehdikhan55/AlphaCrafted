import dbConnect from "@/lib/dbConnect";
import Resume from "@/models/Resume";
import { NextResponse } from "next/server";

export const GET = async (req) => {

    await dbConnect();

    try {
        const resumes = await Resume.find();
        console.log('resumes from mongo: ', resumes);
        return NextResponse.json( resumes , { status: 200 });
    } catch (err) {
        console.error('API route error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
