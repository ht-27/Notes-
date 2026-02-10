import { useForm } from 'react-hook-form';
import api from '../utils/api';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

const NoteForm = ({ initialData, onSuccess, onCancel }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialData || { title: '', content: '' }
    });
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            if (initialData) {
                await api.put(`/notes/${initialData.id}`, data);
            } else {
                await api.post('/notes', data);
            }
            onSuccess();
        } catch (error) {
            console.error("Error saving note", error);
            // Ideally show error state here
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Title</label>
                <input
                    type="text"
                    {...register('title', { required: 'Title is required' })}
                    className="input-primary"
                    placeholder="Note title..."
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Content</label>
                <textarea
                    rows={6}
                    {...register('content', { required: 'Content is required' })}
                    className="input-primary resize-none"
                    placeholder="Write your thoughts here..."
                />
                {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
            </div>

            <div className="flex justify-end gap-3 pt-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="btn-secondary"
                    disabled={isLoading}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="btn-primary"
                    disabled={isLoading}
                >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Note'}
                </button>
            </div>
        </form>
    );
};

export default NoteForm;
