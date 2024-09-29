import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Resume from "../../../models/Resume";

export const GET = async (req) => {
    // Extract user ID from the headers
    const userId = req.headers.get('x-user-id'); // Use the appropriate header key

    if (!userId) {
        return NextResponse.redirect("/sign-in");
    }

    await dbConnect();

    try {
        const resumes = await Resume.find({ userId });
        return NextResponse.json(resumes, { status: 200 });
    } catch (err) {
        console.error('API route error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};
