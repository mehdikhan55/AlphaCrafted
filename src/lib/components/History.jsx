'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'

const History = () => {
    const [resumes, setResumes] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchRes = async () => {
        const res = await axios.get('/api/history', { headers: { 'Cache-Control': 'no-cache' } });
        const data = res;
        return data.data;
    }

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                setLoading(true);
                //make axios request with no cache
                const data = await fetchRes();
                console.log('fetched data: ', data);
                setResumes(data);  // Set the resumes state
                console.log('resuems fetched: ', resumes);
            } catch (error) {
                console.log(error)
                toast.error('Failed to fetch resumes');
                setLoading(false);
            }
        }
        fetchResumes();
    }, []);


    useEffect(() => {
        if (resumes.length > 0) {
            setLoading(false);
            console.log('second use effect resumes: ', resumes);
        }
    }, [resumes]);


    return (
        <>
            {
                loading ? (
                    // make a loader here
                    <div className="flex justify-center items-center h-screen">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-slate-500"></div>
                    </div>

                )
                    :
                    (
                        <div className="py-5 border-t-2 border-t-slate-300 max-w-7xl pt-4 mx-auto grid grid-cols-2 items-start lg:grid-cols-3 px-5">
                            {resumes.map((resume) => {
                                //make a card
                                return (
                                    <Link key={resume._id} href={`/resume-preview/${resume._id}`} target="_blank" >
                                        <div className="bg-white shadow-xl rounded-lg mx-4 my-4 border border-slate-200">
                                            <div className="h-40 overflow-hidden">
                                            </div>
                                            <div className="p-6">
                                                <h2 className="text-xl font-bold text-gray-800">{resume.fullName}</h2>
                                                <p className="leading-relaxed mb-3">{resume.fullName}</p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    )
            }
        </>

    )
}

export default History
