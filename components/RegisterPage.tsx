import React, { useState } from 'react';
import { SparklesIcon, EnvelopeIcon, LockClosedIcon } from './icons';

interface RegisterPageProps {
    onRegisterSuccess: (email: string) => void;
    onNavigateToLogin: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegisterSuccess, onNavigateToLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('كلمتا المرور غير متطابقتين.');
            return;
        }

        if(password.length < 8) {
            setError('يجب أن تكون كلمة المرور 8 أحرف على الأقل.');
            return;
        }

        // Simulate successful registration and auto-login
        console.log(`User registered with email: ${email}`);
        onRegisterSuccess(email);
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 animate-fadeInUp">
              <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl">
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-purple-600/20 mb-6">
                        <SparklesIcon className="h-6 w-6 text-purple-400" />
                    </div>
                     <h2 className="text-3xl font-extrabold text-white">
                        إنشاء حساب جديد
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        هل لديك حساب بالفعل؟{' '}
                        <button onClick={onNavigateToLogin} className="font-medium text-purple-400 hover:text-purple-300 transition-colors duration-200">
                            سجل الدخول من هنا
                        </button>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                               <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none relative block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-3 pr-10 text-white placeholder-gray-400 transition-colors duration-200 focus:z-10 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                                placeholder="البريد الإلكتروني"
                            />
                        </div>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                               <LockClosedIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none relative block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-3 pr-10 text-white placeholder-gray-400 transition-colors duration-200 focus:z-10 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                                placeholder="كلمة المرور"
                            />
                        </div>
                        <div className="relative">
                           <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                               <LockClosedIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                id="confirm-password"
                                name="confirm-password"
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="appearance-none relative block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-3 pr-10 text-white placeholder-gray-400 transition-colors duration-200 focus:z-10 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                                placeholder="تأكيد كلمة المرور"
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-400 text-sm text-center pt-2">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center rounded-md border border-transparent bg-purple-600 py-3 px-4 text-sm font-medium text-white transition-all duration-300 ease-in-out hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 hover:scale-105"
                        >
                            إنشاء الحساب
                        </button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    );
};

export default RegisterPage;