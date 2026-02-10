import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Sparkles } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-18 items-center py-3">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="p-2.5 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
                            <Sparkles className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                            NoteTaker
                        </span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex flex-col items-end mr-2">
                            <span className="text-sm font-semibold text-slate-700">{user?.name}</span>
                            <span className="text-xs text-slate-500">{user?.email}</span>
                        </div>

                        <div className="flex items-center gap-2 p-1 bg-slate-100/50 rounded-full border border-slate-200/50">
                            <Link
                                to="/profile"
                                className={`p-2 rounded-full transition-all duration-200 ${location.pathname === '/profile' ? 'bg-white text-indigo-600 shadow-sm' : 'hover:bg-white/50 text-slate-500 hover:text-slate-700'}`}
                                title="Profile"
                            >
                                <User className="h-5 w-5" />
                            </Link>

                            <button
                                onClick={logout}
                                className="p-2 hover:bg-white text-slate-400 hover:text-red-500 rounded-full transition-all duration-200 hover:shadow-sm"
                                title="Logout"
                            >
                                <LogOut className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
