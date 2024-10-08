'use client'

import Navbar from '../../../lib/components/Navbar'
import InfoForm from '../../../lib/components/InfoForm'
import React, { useState } from 'react'

const GenerateResume = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <>
      <Navbar />
      <div style={containerStyles}>
        <h1 style={headingStyles}>Create Your Resume</h1>
        <InfoForm
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    </>

  );
};

export default GenerateResume;


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

