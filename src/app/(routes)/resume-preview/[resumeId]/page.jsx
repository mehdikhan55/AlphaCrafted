'use client'
import ResumeDocument from '../../../../lib/components/ReactDocument'
import { PDFViewer } from '@react-pdf/renderer'
import React, { useEffect, useState } from 'react'
import ReactPDF from '@react-pdf/renderer';
import Link from 'next/link';



const page = ({ params }) => {
  const resumeId = params.resumeId;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const preview = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('preview') : null;
  console.log(preview)

  useEffect(() => {
    const fetchResume = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/resume?id=' + resumeId);
        const { resume } = await res.json();
        //console.log(resume)
        setData(resume.data);
        //console.log(resume)
        // Save the PDF to the server
        // await fetch(`/api/save-resume?resumeId=${resumeId}`);
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

        preview ? (
          <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
            <PDFViewer style={{ width: '100%', height: '100%' }}>
              <ResumeDocument data={data} />
            </PDFViewer>
          </div>
        )
          :
          (
            <div className="flex justify-center items-center h-screen">
              <div className="flex flex-col justify-center items-center h-screen">
                <p className="text-center text-gray-600 mb-4">
                  {`The filename will be "[Full_Name] - [Resume_Title]" if you choose to download.`}
                </p>
                <div className="flex justify-center items-center">
                  <a href={'?preview=true'} className="bg-primary text-white font-bold py-2 px-4 rounded" >Preview</a>
                  <Link href={`/api/save-resume?resumeId=${resumeId}`} className="bg-primary text-white font-bold py-2 px-4 rounded ml-4">Download</Link>
                </div>
              </div>
            </div>
          )

      )}
    </>
  )
}
export default page
