
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div>
       <header>
        <nav className='w-full py-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 flex items-center justify-between shadow-lg border-b border-slate-700'>
            <div className='flex items-center gap-3 ml-6'>
             <div className='font-bold text-3xl py-2 px-3 rounded-lg text-center text-white bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg hover:shadow-xl transition-shadow duration-300'>
               D
             </div>
             <div>
               <h1 className='text-lg font-bold text-white'>Dawaloom</h1>
               <p className='text-xs text-blue-300 font-medium tracking-wider'>TEACHER APP</p>
             </div>
            </div>
            <ul className='flex items-center justify-center gap-1 mr-6'>
                <li className='py-2 px-4 rounded-md text-sm font-semibold text-slate-100 hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer relative group'>
                    <Link href="/">Home</Link>
                    <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300'></span>
                </li>
                <li className='py-2 px-4 rounded-md text-sm font-semibold text-slate-100 hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer relative group'>
                    <Link href="/teacher">Teacher</Link>
                    <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300'></span>
                </li>
                <li className='py-2 px-4 rounded-md text-sm font-semibold text-slate-100 hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer relative group'>
                    <Link href="/student">Student</Link>
                    <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300'></span>
                </li>
                <li className='py-2 px-4 rounded-md text-sm font-semibold text-slate-100 hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer relative group'>
                    <Link href="/attendance">Attendance</Link>
                    <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300'></span>
                </li>
                <li className='py-2 px-4 rounded-md text-sm font-semibold text-slate-100 hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer relative group'>
                    <Link href="/schedul">Schedule</Link>
                    <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300'></span>
                </li>
                <li className='py-2 px-4 rounded-md text-sm font-semibold text-slate-100 hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer relative group'>
                    <Link href="/exam">Exam</Link>
                    <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300'></span>
                </li>

            </ul>
        </nav>
       </header>
    </div>
  )
}

export default Header