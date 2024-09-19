import Link from 'next/link'
import React from 'react'

const Button = ({ title, path}) => {
    return (
        <div>
            <Link href={path}
                className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
            >
                <span className="relative text-base font-semibold text-white"
                >
                    {title}
                </span>
            </Link>
        </div>
    )
}

export default Button;
