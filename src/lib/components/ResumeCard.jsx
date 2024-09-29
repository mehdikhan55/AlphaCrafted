import Link from 'next/link';
import React from 'react';
import toast from 'react-hot-toast';
import { FaEnvelope, FaLinkedin } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { IoMdShare } from 'react-icons/io';

const ResumeCard = ({ resume, user, showPublicity = true, showEditOption = true }) => {
  const { title, data } = resume;
  const { fullName, email, linkedinURL, phone, summary, experiences, skills, education } = data;

  const handleShareClick = () => {
    //copy to clipboard
    navigator.clipboard.writeText(`${window.location.origin}/resume-preview/${resume._id}`);
    toast.success('Link copied to clipboard');
  }

  return (
    <div className="max-w-md mx-auto bg-white border border-slate-300 rounded-xl shadow-lg overflow-hidden md:max-w-2xl m-4 min-h-64  relative">
      <div className="p-8 ">

        <div className="flex justify-between">
          <Link  href={`/resume-preview/${resume._id}`} target="_blank">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{title}</div>
            <h2 className="block mt-1 text-lg leading-tight font-medium text-black">{fullName}</h2>
          </Link>

        </div>
        <div className="mt-4 text-gray-500 mb-4">
          <p  className="text-gray-700 text-lg ">
            <FaEnvelope className='inline-block mr-1 text-sm' />
            <span className='text-sm'>{email}</span>
          </p>
        </div>
        <hr />
        <div className="mt-4 flex items-center">
          <img className="h-8 w-8 rounded-full mr-4" src={user.imageUrl} alt={user.fullName} />
          <div>
            <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>
      <div className="absolute top-2 right-2 flex gap-1 z-10">
      <Link href={linkedinURL} className="text-indigo-500 text-lg hover:underline" target="_blank" rel="noopener noreferrer"><FaLinkedin /></Link>
        {showEditOption && <Link href={`/edit/${resume._id}`} target='_blank' className="text-slate-700 text-lg " rel="noopener noreferrer"><CiEdit /></Link>}
        <button onClick={handleShareClick} className="text-slate-700 text-lg " rel="noopener noreferrer"><IoMdShare /></button>
      </div>

      {showPublicity && <p className="text-slate-700 text-xs absolute bottom-3 right-2" >{`${resume.isPublic ? '(Public)' : '(Private)'}`}</p>}
    </div>
  );
};

export default ResumeCard;