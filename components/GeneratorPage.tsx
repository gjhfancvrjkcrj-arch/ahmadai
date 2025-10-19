import React, { useState, useEffect } from 'react';
import { KeyIcon, CalendarDaysIcon, TrashIcon } from './icons';
import { GeneratedAccount } from '../types';

interface GeneratorPageProps {
    accounts: GeneratedAccount[];
    onGenerate: (subscriptionValue: string, subscriptionLabel: string) => void;
    onDelete: (email: string) => void;
}

const subscriptionOptions: { label: string; value: string; icon: React.FC<React.SVGProps<SVGSVGElement>> }[] = [
    { label: 'يوم واحد', value: '1-day', icon: CalendarDaysIcon },
    { label: 'يومين', value: '2-days', icon: CalendarDaysIcon },
    { label: '3 أيام', value: '3-days', icon: CalendarDaysIcon },
    { label: 'أسبوع', value: 'weekly', icon: CalendarDaysIcon },
    { label: 'شهر', value: 'monthly', icon: CalendarDaysIcon },
    { label: 'سنة', value: 'yearly', icon: CalendarDaysIcon },
    { label: 'مدى الحياة', value: 'lifetime', icon: KeyIcon },
];

const formatTimeRemaining = (expiresAt: number | null): string => {
    if (expiresAt === null) {
        return 'لا تنتهي صلاحيته';
    }

    const remainingMs = expiresAt - Date.now();

    if (remainingMs <= 0) {
        return 'انتهت صلاحيته';
    }

    const seconds = Math.floor((remainingMs / 1000) % 60);
    const minutes = Math.floor((remainingMs / 1000 / 60) % 60);
    const hours = Math.floor((remainingMs / (1000 * 60 * 60)) % 24);
    const days = Math.floor(remainingMs / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days} يوم و ${hours} ساعة`;
    if (hours > 0) return `${hours} ساعة و ${minutes} دقيقة`;
    if (minutes > 0) return `${minutes} دقيقة و ${seconds} ثانية`;
    return `${seconds} ثانية`;
};

const GeneratorPage: React.FC<GeneratorPageProps> = ({ accounts, onGenerate, onDelete }) => {
    const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
    const [, setCurrentTime] = useState(Date.now());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleCopy = (account: GeneratedAccount) => {
        const textToCopy = `البريد الإلكتروني: ${account.email}\nكلمة المرور: ${account.pass}\nالاشتراك: ${account.subscriptionType}`;
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopiedEmail(account.email);
            setTimeout(() => setCopiedEmail(null), 2000); // Reset after 2 seconds
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    return (
        <div className="container mx-auto p-4 sm:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 md:p-8 shadow-2xl">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-extrabold text-white">مولّد الحسابات</h1>
                        <p className="mt-4 text-lg text-gray-400">
                           اختر مدة الاشتراك لإنشاء حساب جديد.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                        {subscriptionOptions.map(({ label, value, icon: Icon }) => (
                            <button
                                key={label}
                                onClick={() => onGenerate(value, label)}
                                className="flex flex-col items-center justify-center p-4 border border-gray-700 rounded-lg shadow-sm text-sm font-medium text-white bg-gray-700/50 hover:bg-purple-600/50 hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 transition-all transform hover:-translate-y-1"
                            >
                                <Icon className="w-8 h-8 mb-2 text-purple-400"/>
                                <span>{label}</span>
                            </button>
                        ))}
                    </div>

                    {accounts.length > 0 && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-right text-gray-200 border-b border-gray-600 pb-2">الحسابات التي تم إنشاؤها</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                                {accounts.map((acc, index) => (
                                    <div key={index} className="bg-gray-700/50 rounded-lg p-4 flex flex-col justify-between animate-fadeInUp shadow-lg">
                                        <div className="text-right">
                                            <p className="text-xs text-gray-400">البريد الإلكتروني:</p>
                                            <p className="font-mono text-sm text-white break-all">{acc.email}</p>
                                            <p className="text-xs text-gray-400 mt-2">كلمة المرور:</p>
                                            <p className="font-mono text-sm text-white">{acc.pass}</p>
                                            <p className="text-xs text-gray-400 mt-2">الاشتراك:</p>
                                            <p className="font-semibold text-sm text-yellow-400">{acc.subscriptionType}</p>
                                            <p className="text-xs text-gray-400 mt-2">الوقت المتبقي:</p>
                                            <p className="font-mono text-sm text-cyan-400">{formatTimeRemaining(acc.expiresAt)}</p>
                                        </div>
                                        <div className="mt-4 flex items-center gap-2">
                                            <button
                                                onClick={() => handleCopy(acc)}
                                                className={`flex-grow py-2.5 px-4 rounded-md text-xs font-semibold transition-colors duration-200 ${
                                                    copiedEmail === acc.email
                                                        ? 'bg-green-600 text-white'
                                                        : 'bg-gray-600 hover:bg-gray-500 text-gray-200'
                                                }`}
                                            >
                                                {copiedEmail === acc.email ? 'تم النسخ!' : 'نسخ'}
                                            </button>
                                            <button
                                                onClick={() => onDelete(acc.email)}
                                                className="p-2.5 bg-red-800/50 hover:bg-red-700/70 text-red-400 hover:text-red-300 rounded-md transition-colors"
                                                aria-label="حذف الحساب"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GeneratorPage;