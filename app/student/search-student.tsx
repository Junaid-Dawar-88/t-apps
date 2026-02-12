'use client'
import React from 'react'

interface Props {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

const SearchStudent = ({ search, setSearch }: Props) => {
  return (
    <div className="w-full max-w-7xl my-4">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search teacher by name or email"
        className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
      />
    </div>
  )
}

export default SearchStudent