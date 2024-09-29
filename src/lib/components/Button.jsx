import Link from 'next/link';
import React from 'react';

const Button = ({ title, path, outlined = false, onClick }) => {
    const handleClick = (e) => {
        if (onClick) {
            e.preventDefault(); // Prevent default link behavior if onClick is provided
            onClick();
        }
    };

    const buttonContent = (
        <span className="relative text-base font-semibold">
            {title}
        </span>
    );

    return (
        <div>
            {path ? (
                <Link 
                    href={path}
                    onClick={handleClick} // Attach handleClick to Link
                    className={`relative flex h-11 w-full items-center justify-center px-3 rounded-full transition duration-300 
                        ${outlined  
                            ? 'border-2 border-primary text-primary hover:bg-primary hover:text-white' 
                            : 'before:absolute before:inset-0 before:rounded-full before:bg-primary text-white before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95'}
                        sm:w-max`}
                >
                    {buttonContent}
                </Link>
            ) : (
                <button
                    onClick={handleClick}
                    className={`relative flex h-11 w-full items-center justify-center px-3 rounded-full transition duration-300 
                        ${outlined  
                            ? 'border-2 border-primary text-primary hover:bg-primary hover:text-white' 
                            : 'before:absolute before:inset-0 before:rounded-full before:bg-primary text-white before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95'}
                        sm:w-max`}
                >
                    {buttonContent}
                </button>
            )}
        </div>
    );
};

export default Button;
