import { useState, useEffect } from 'react';
import api from '../utils/api';
import Layout from '../components/Layout';
import NoteForm from '../components/NoteForm';
import { Plus, Trash2, Edit2, Search, FileText, X, Sparkles } from 'lucide-react';

const Dashboard = () => {
    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingNote, setEditingNote] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchNotes = async () => {
        setIsLoading(true);
        try {
            const { data } = await api.get(`/notes?search=${search}`);
            setNotes(data);
        } catch (error) {
            console.error("Failed to fetch notes", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchNotes();
        }, 300);
        return () => clearTimeout(delayDebounce);
    }, [search]);

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (!window.confirm("Are you sure you want to delete this note?")) return;
        try {
            await api.delete(`/notes/${id}`);
            fetchNotes();
        } catch (error) {
            console.error("Failed to delete note", error);
        }
    };

    const handleEdit = (e, note) => {
        e.stopPropagation();
        setEditingNote(note);
        setIsFormOpen(true);
    };

    const handleCreate = () => {
        setEditingNote(null);
        setIsFormOpen(true);
    };

    const handleFormSubmit = async () => {
        setIsFormOpen(false);
        setEditingNote(null);
        fetchNotes();
    }

    return (
        <Layout>
            <div className="space-y-8 mt-4">
                {/* Actions Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/40 backdrop-blur-md p-1.5 rounded-2xl border border-white/50 shadow-lg shadow-indigo-100/10">
                    <div className="relative w-full sm:max-w-md group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search your notes..."
                            className="!pl-11 w-full bg-white/50 border-transparent focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-100 rounded-xl py-3 transition-all duration-200"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleCreate}
                        className="w-full sm:w-auto btn-primary shadow-indigo-500/20"
                    >
                        <Plus className="h-5 w-5" />
                        Create Note
                    </button>
                </div>

                {/* Notes Grid */}
                {isLoading && notes.length === 0 ? (
                    <div className="flex justify-center py-20">
                        <div className="bg-white/50 p-4 rounded-full backdrop-blur-sm">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                        </div>
                    </div>
                ) : notes.length === 0 ? (
                    <div className="text-center py-20 bg-white/40 backdrop-blur-sm rounded-3xl border border-dashed border-slate-300/60">
                        <div className="bg-gradient-to-br from-indigo-50 to-violet-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                            <Sparkles className="h-10 w-10 text-indigo-400/80" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">No notes found</h3>
                        <p className="text-slate-500 max-w-sm mx-auto leading-relaxed">
                            {search ? 'Try adjusting your search terms to find what you need.' : 'Capture your ideas, lists, and thoughts. Create your first note now.'}
                        </p>
                        {!search && (
                            <button onClick={handleCreate} className="mt-8 btn-secondary inline-flex border-slate-200/60">
                                <Plus className="h-4 w-4" />
                                Start Writing
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => (
                            <div
                                key={note.id}
                                className="group bg-white rounded-2xl shadow-sm border border-slate-200/60 hover:shadow-xl hover:shadow-indigo-100/40 hover:-translate-y-1 transition-all duration-300 flex flex-col h-[280px] overflow-hidden relative cursor-pointer"
                                onClick={(e) => handleEdit(e, note)}
                            >
                                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="p-6 flex-1 overflow-hidden">
                                    <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-1">
                                        {note.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-6">
                                        {note.content}
                                    </p>
                                </div>
                                <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                    <span className="text-xs text-slate-400 font-medium">Click to edit</span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={(e) => handleEdit(e, note)}
                                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
                                            title="Edit"
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(e, note.id)}
                                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <div
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsFormOpen(false)}
                    ></div>
                    <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200 ring-1 ring-black/5">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h2 className="text-lg font-semibold text-slate-900">
                                {editingNote ? 'Edit Note' : 'Create New Note'}
                            </h2>
                            <button
                                onClick={() => setIsFormOpen(false)}
                                className="text-slate-400 hover:text-slate-500 hover:bg-slate-100 p-1 rounded-lg transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="p-6">
                            <NoteForm
                                initialData={editingNote}
                                onSuccess={handleFormSubmit}
                                onCancel={() => setIsFormOpen(false)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Dashboard;
