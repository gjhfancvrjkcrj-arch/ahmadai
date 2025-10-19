import React, { useState } from 'react';
import { SparklesIcon, EnvelopeIcon, LockClosedIcon } from './icons';
import { GeneratedAccount } from '../types';


interface LoginPageProps {
    onLoginSuccess: (email: string) => void;
    onNavigateToRegister: () => void;
    generatedAccounts: GeneratedAccount[];
}

const lifetimeAccounts = [
    'lifetime@user.com',
];

const ButtonSpinner: React.FC = () => (
    <svg className="animate-spin ml-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onNavigateToRegister, generatedAccounts }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoggingIn(true);
        
        // Simulate a network delay for the animation to be visible
        setTimeout(() => {
            const lowerCaseEmail = email.toLowerCase();
            const isGenerated = generatedAccounts.some(acc => acc.email === lowerCaseEmail);
            
            // Simulated authentication
            const isValidUser = lifetimeAccounts.includes(lowerCaseEmail) || 
                                lowerCaseEmail === 'user@example.com' ||
                                isGenerated;

            if (isValidUser && password === 'password123') {
                onLoginSuccess(lowerCaseEmail);
                 // No need to set isLoggingIn to false on success, as the component will unmount
            } else {
                setError('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
                setIsLoggingIn(false); // Reset on failure
            }
        }, 1500); // 1.5 second delay
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
                       تسجيل الدخول إلى حسابك
                    </h2>
                     <p className="mt-2 text-sm text-gray-400">
                        أو{' '}
                        <button onClick={onNavigateToRegister} className="font-medium text-purple-400 hover:text-purple-300 transition-colors duration-200">
                            أنشئ حساباً جديداً
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
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none relative block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-3 pr-10 text-white placeholder-gray-400 transition-colors duration-200 focus:z-10 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                                placeholder="كلمة المرور"
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-400 text-sm text-center pt-2">{error}</p>}
                    
                    <div>
                        <button
                            type="submit"
                            disabled={isLoggingIn}
                            className="group relative w-full flex justify-center items-center rounded-md border border-transparent bg-purple-600 py-3 px-4 text-sm font-medium text-white transition-all duration-300 ease-in-out hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 hover:scale-105 disabled:bg-purple-500/80 disabled:cursor-wait disabled:hover:scale-100"
                        >
                            {isLoggingIn ? (
                                <>
                                    <ButtonSpinner />
                                    <span>جاري تسجيل الدخول...</span>
                                </>
                            ) : (
                                'تسجيل الدخول'
                            )}
                        </button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    );
};

export default LoginPage;