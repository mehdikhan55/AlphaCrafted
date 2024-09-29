'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from "@clerk/nextjs";
import { saveUserData } from '../actions/user.action'
import toast from 'react-hot-toast';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [userDataLoading, setUserDataLoading] = useState(null);
  const [userFetchingError, setUserFetchingError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setUserFetchingError(null);
      if (user) {
        const newUser = {
          fullName: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
          imageUrl: user?.imageUrl
        };

        try {
          const savedUser = await saveUserData(newUser);
          setUserData(() => savedUser);
          //console.log('saved user data....:', userData);
        } catch (error) {
          setUserFetchingError(error.message);
          //console.log('error ye h:', error.message);
          console.error("Error saving user data:", error);
          toast.error(`Error fetching user data (Might be network issue, try refreshing)`);
        }
      } else {
        setUserData(null);
      }
      setUserDataLoading(false);
    };
    setUserDataLoading(true);
    fetchUserData();
    //console.log('fetchUserData called');
    //console.log('got user data:', userData);
  }, [user]);



  return (
    <UserContext.Provider value={{ userData, userDataLoading, userFetchingError, setUserFetchingError }} >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export default UserContext;