'use client'
import ResumeDocument from '../../../../lib/components/ReactDocument'
import { PDFViewer } from '@react-pdf/renderer'
import React, { useEffect, useState } from 'react'




const page = ({ params }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const resumeId = params.resumeId;

  useEffect(() => {
    const fetchResume = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/resume?id=' + resumeId);
        const { resume } = await res.json();
        //console.log(resume)
        setData(resume.data);
        //console.log(resume)
      } catch (err) {
        //alert the error to the user
        alert('Error fetching resume');
      } finally {
        setLoading(false);
      }
    }
    fetchResume();
  }, [resumeId]);


  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-slate-500"></div>
    </div>
      ) : (
        <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
          <PDFViewer style={{ width: '100%', height: '100%' }}>
            <ResumeDocument data={data} />
          </PDFViewer>
        </div>
      )}
    </>
  )
}
export default page
