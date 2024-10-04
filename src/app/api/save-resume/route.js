import ReactPDF from '@react-pdf/renderer';
import ResumeDocument from '../../../lib/components/ReactDocument';
import { NextResponse } from 'next/server';

export const GET = async (req) => {
    const { searchParams } = new URL(req.url);
    const resumeId = searchParams.get('resumeId');

    if (!resumeId) {
        return NextResponse.json({ error: 'Missing resumeId' }, { status: 400 });
    }

    try {
        const response = await fetch(`/api/resume?id=${resumeId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const { resume } = await response.json();

        // Create the PDF stream
        const pdfStream = await ReactPDF.renderToStream(<ResumeDocument data={resume.data} />);

        // Set headers to force download
        const headers = new Headers({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${resume.data.fullName} - ${resume.title}.pdf"`,
        });

        // Return the PDF stream as a response
        return new Response(pdfStream, {
            status: 200,
            headers,
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch resume data' }, { status: 500 });
    }
};
