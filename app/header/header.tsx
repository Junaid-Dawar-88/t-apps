import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="min-h-screen">
      <nav className="w-64 min-h-screen sticky top-0 flex flex-col bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-xl border-r border-slate-700">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-700">
          <div className="font-bold text-3xl py-2 px-3 rounded-lg text-white bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg">
            D
          </div>

          <div>
            <h1 className="text-lg font-bold text-white">Dawaloom</h1>
            <p className="text-xs text-blue-300 font-medium tracking-wider">
              TEACHER APP
            </p>
          </div>
        </div>

        {/* Menu */}
        <ul className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
          
          {[
            { name: "Home", href: "/" },
            { name: "Teacher", href: "/teacher" },
            { name: "Student", href: "/student" },
            { name: "Attendance", href: "/attendance" },
            { name: "Schedule", href: "/schedul" },
            { name: "Syllabus", href: "/syllabus" },
            { name: "Exam", href: "/exam" },
          ].map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="block py-2 px-4 rounded-md text-sm font-semibold text-slate-100 hover:bg-blue-600 hover:text-white transition-all duration-300 relative group"
              >
                {item.name}

                {/* Hover Line */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Optional Footer */}
        <div className="p-4 border-t border-slate-700 text-xs text-slate-400">
          © 2026 Dawaloom
        </div>

      </nav>
    </header>
  );
};

export default Header;