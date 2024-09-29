import React, { useState } from 'react';
import PersonalHistory from './PersonalHistory';
import CommunityResumes from './CommunityResumes';

const Tabs = () => {
    const [activeTab, setActiveTab] = useState(2);

    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex);
    };

    const tabs = [
        {
            id: 1,
            name: "Community"
        },
        {
            id: 2,
            name: "Personal"
        }
    ];

    return (
        <div className="py-5  max-w-7xl pt-12 mx-auto  px-5">
            <div role="tablist" className="flex mx-auto rounded-lg bg-gray-100 p-1 md:w-[50%]">
                {tabs.map((tab) => (
                    <a
                        key={tab.id} // Use tab.id as the key
                        role="tab"
                        className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-colors duration-200 text-md cursor-pointer ${
                            activeTab === tab.id
                                ? 'bg-white shadow-sm font-semibold text-primary'
                                : 'text-gray-500 hover:bg-gray-100'
                        }`}
                        onClick={() => handleTabClick(tab.id)} // Correctly set the tab.id
                    >
                        {tab.name} {/* Display the tab name */}
                    </a>
                ))}
            </div>
            <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
                <div className="text-gray-700">
                    {activeTab === 1
                        ? <CommunityResumes/>
                        : <PersonalHistory/>
                        }

                </div>
            </div>
        </div>
    );
};

export default Tabs;
