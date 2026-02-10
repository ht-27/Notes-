import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import { User, Mail, Save, Loader2, CheckCircle2 } from 'lucide-react';

const Profile = () => {
    const { user, login } = useAuth();
    const { register, handleSubmit, setValue } = useForm();
    const [msg, setMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setValue('name', user.name);
            setValue('email', user.email);
        }
    }, [user, setValue]);

    const onSubmit = async (data) => {
        setIsLoading(true);
        setMsg('');
        try {
            await api.put('/users/me', data);
            setMsg('Profile updated successfully');
            // Optimistically update local user state if needed, or rely on re-fetch
            const res = await api.get('/users/me');
            // Assuming AuthContext has a way to update user, or we just rely on page refresh for now.
            // Actually, let's just show the success message.
        } catch (err) {
            console.error(err);
            setMsg('Failed to update profile');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Profile Settings</h1>
                    <p className="text-slate-500 mt-2">Manage your account information</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-8">
                        {msg && (
                            <div className={`mb-6 p-4 rounded-lg flex items-center gap-2 text-sm ${msg.includes('success') ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                                {msg.includes('success') && <CheckCircle2 className="w-5 h-5" />}
                                {msg}
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                        <input
                                            {...register('name', { required: true })}
                                            className="input-primary !pl-10"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                        <input
                                            {...register('email', { required: true })}
                                            type="email"
                                            className="input-primary !pl-10 bg-slate-50"
                                            disabled
                                        />
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="btn-primary"
                                >
                                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-4 h-4" />}
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
