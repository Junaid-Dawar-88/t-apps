import React from 'react'
import { Mail, Phone, X } from 'lucide-react'
import UpdateTeacherModal from './UpdateTeacherModal'
import DeleteTeacherButton from './delete-teacher'

interface TeacherCardProps {
  teacher: {
    id: number
    name: string
    email: string
    phone?: string | ''
  }
  onClose: () => void
}
const TeacherCard: React.FC<TeacherCardProps> = ({ teacher, onClose }) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()} 
        className="bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden transform transition-transform duration-300 hover:scale-105"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 text-white text-center">
          <h3 className="text-2xl font-bold">{teacher.name}</h3>
          <span className="block mt-1 text-sm opacity-90">ID: {teacher.id}</span>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex items-center gap-4">
            <Mail className="w-6 h-6 text-indigo-500" />
            <span className="text-gray-800 font-medium">{teacher.email}</span>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="w-6 h-6 text-indigo-500" />
            <span className="text-gray-800 font-medium">{teacher.phone}</span>
          </div>
        </div>

        <div className="flex justify-center gap-4 p-6 bg-gray-50 border-t border-gray-200">
          <UpdateTeacherModal teacher={teacher} />
          <DeleteTeacherButton teacherId={teacher.id} />
        </div>
      </div>
    </div>
  )
}

export default TeacherCard