'use client'
import React, { useEffect, useState } from 'react'
import Navbar from '../../../../lib/components/Navbar'
import EditForm from '../../../../lib/components/EditForm';

const page = ({ params }) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const resumeId = params.resumeId;

    const fetchResume = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/resume?id=' + resumeId);
            const { resume } = await res.json();
            console.log(resume)
            setData(resume);
            console.log(resume)
        } catch (err) {
            //alert the error to the user
            alert('Error fetching resume');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchResume();
    }, [resumeId]);


    return (
        <div>
            <>
                <Navbar />
                {isLoading ? (
                    <div className="flex justify-center items-center h-screen">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-slate-500"></div>
                    </div>
                ) : (
                    <div style={containerStyles}>
                        <h1 style={headingStyles}>Edit Your Resume</h1>
                        <EditForm
                            fetchResume={fetchResume}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            resume={data}
                        />
                    </div>
                )}
            </>
        </div>
    )
}

export default page;


const containerStyles = {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
};

const headingStyles = {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
};

