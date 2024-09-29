'use client'
import { useUserContext } from '../context/userContext';
import { ClerkLoaded, ClerkLoading } from '@clerk/nextjs';

const MainContent = ({ children }) => {
  const { userDataLoading } = useUserContext();


  return (
    <>
      <ClerkLoading>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-slate-500"></div>
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        {userDataLoading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-slate-500"></div>
          </div>
        ) : (children)}

      </ClerkLoaded>
    </>
  );

}

export default MainContent;
