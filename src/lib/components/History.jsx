'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { IoMdRefresh } from "react-icons/io";

const History = () => {
    const [resumes, setResumes] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchRes = async () => {

    }

    const fetchResumes = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/history', { headers: { 'Cache-Control': 'no-cache' } });
            const data = res.data;
            setResumes(data);  
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch resumes');
        } finally {
            setLoading(false);  
        }
    };

    useEffect(() => {
        fetchResumes();
    }, []);


    useEffect(() => {
        console.log('Updated resumes: ', resumes);
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
                        <>
                            <button onClick={fetchResumes} className=" flex items-center justify-center border-t-2 border-t-slate-300 mt-4  bg-blue-500 text-white p-2 rounded-tr-xl rounded-br-xl">.<IoMdRefresh size={22} color='black' /> </button>

                            <div className="py-5  max-w-7xl pt-4 mx-auto grid grid-cols-2 items-start lg:grid-cols-3 px-5">
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
                        </>
                    )
            }
        </>

    )
}

export default History
