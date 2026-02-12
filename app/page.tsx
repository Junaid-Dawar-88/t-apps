import React from 'react'
import { getStudent } from './actions/student-actions'
import { getTeacher } from './actions/teacher-actions'

const Home = async () => {
  const students = await getStudent()
  const teachers = await getTeacher()

  return (
    <div className='min-h-screen bg-slate-100 p-8'>

      <div className='bg-gradient-to-r from-blue-700 to-indigo-700 text-white rounded-3xl p-10 shadow-xl mb-10'>
        <h1 className='text-4xl font-bold mb-2'>
          Welcome to Dawaloom
        </h1>
        <p className='text-blue-100 text-lg'>
          Smart Teacher & Student Management System
        </p>
      </div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12'>

        <div className='bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition'>
          <p className='text-slate-500 font-medium'>طلاب (Students)</p>
          <h2 className='text-4xl font-bold text-blue-600 mt-2'>
            {students.length}
          </h2>
        </div>

        <div className='bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition'>
          <p className='text-slate-500 font-medium'>Teachers</p>
          <h2 className='text-4xl font-bold text-indigo-600 mt-2'>
            {teachers.length}
          </h2>
        </div>

        <div className='bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition'>
          <p className='text-slate-500 font-medium'>Active Classes</p>
          <h2 className='text-4xl font-bold text-green-600 mt-2'>
            8
          </h2>
        </div>

        <div className='bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition'>
          <p className='text-slate-500 font-medium'>Attendance Today</p>
          <h2 className='text-4xl font-bold text-orange-500 mt-2'>
            145
          </h2>
        </div>

      </div>
      <div className='grid lg:grid-cols-3 gap-8'>

        <div className='lg:col-span-2'>
          <h2 className='text-2xl font-bold text-slate-800 mb-6'>
            Top Teachers
          </h2>

          <div className='grid md:grid-cols-2 gap-6'>

            {teachers.slice(0,4).map((teacher) => (
              <div
                key={teacher.id}
                className='bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition group cursor-pointer'
              >

                <div className='flex items-center gap-4 mb-4'>
                  
                  <div className='w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white text-xl font-bold'>
                    {teacher.name?.charAt(0)}
                  </div>

                  <div>
                    <h3 className='font-bold text-lg text-slate-800'>
                      {teacher.name}
                    </h3>
                    <p className='text-slate-500 text-sm'>
                      Teacher_Id: {teacher.id}
                    </p>
                  </div>

                </div>

                <div className='flex justify-between text-sm text-slate-500'>
                  <span>{teacher.email}</span>
                </div>

                <div className='mt-4'>
                  <span className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold'>
                    Active
                  </span>
                </div>

              </div>
            ))}

          </div>
        </div>
        <div className='bg-white rounded-2xl p-6 shadow-md h-fit'>
          <h2 className='text-xl font-bold mb-4 text-slate-800'>
            Recent Activity
          </h2>

          <div className='space-y-4'>

            <div className='flex gap-3'>
              <div className='w-2 bg-green-500 rounded-full'></div>
              <p className='text-slate-600 text-sm'>
                New teacher added
              </p>
            </div>

            <div className='flex gap-3'>
              <div className='w-2 bg-blue-500 rounded-full'></div>
              <p className='text-slate-600 text-sm'>
                Student attendance updated
              </p>
            </div>

            <div className='flex gap-3'>
              <div className='w-2 bg-purple-500 rounded-full'></div>
              <p className='text-slate-600 text-sm'>
                New class scheduled
              </p>
            </div>

            <div className='flex gap-3'>
              <div className='w-2 bg-orange-400 rounded-full'></div>
              <p className='text-slate-600 text-sm'>
                Teacher profile updated
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  )
}

export default Home