'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const History = () => {
    const[resumes,setResumes] = useState([])

    useEffect(()=>{
        const fetchResumes=async()=>{
            const res = await fetch('/api/history')
            const data = await res.json()
            setResumes(data)
        }
        fetchResumes();
    },[])

  return (
    <div className="py-5 border-t-2 border-t-slate-300 max-w-7xl pt-4 mx-auto grid grid-cols-2 items-start lg:grid-cols-3 px-5">
        {resumes.map((resume)=>{
            //make a card
            return(
                <Link href={`/resume-preview/${resume._id}`} target="_blank" >
                <div key={resume._id} className="bg-white shadow-xl rounded-lg mx-4 my-4 border border-slate-200">
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

export default History
