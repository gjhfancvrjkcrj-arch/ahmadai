import React from 'react';
import { Page } from '../types';
import { LogoutIcon, SettingsIcon, SparklesIcon, GiftIcon, PhotoIcon, PencilSquareIcon, RectangleStackIcon, KeyIcon } from './icons';

interface HeaderProps {
    isLoggedIn: boolean;
    isLifetimeUser: boolean;
    imageCredits: number;
    onLogout: () => void;
    onNavigate: (page: Page) => void;
    currentPage: Page;
    currentUserEmail: string | null;
    currentUserPlan: string;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, isLifetimeUser, imageCredits, onLogout, onNavigate, currentPage, currentUserEmail, currentUserPlan }) => {
    
    const navButtonClasses = (page: Page) => {
        const isActive = currentPage === page;
        return `p-2 rounded-full ${isActive ? 'bg-purple-600/30 text-purple-300' : 'text-gray-400 hover:text-white hover:bg-gray-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white`;
    };

    return (
        <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Title - on the right in RTL */}
                    <div className="flex items-center">
                        <div className="flex items-center text-white font-bold text-xl">
                            <SparklesIcon className="h-6 w-6 text-purple-400 ml-2" />
                            <span>محرر الصور بالذكاء الاصطناعي</span>
                        </div>
                    </div>

                    {/* Navigation - on the left in RTL */}
                    <nav className="flex items-center">
                        {isLoggedIn ? (
                            <div className="flex items-center space-x-2 sm:space-x-4">
                               <button onClick={() => onNavigate(Page.Editor)} className={navButtonClasses(Page.Editor)} aria-label="محرر الصور">
                                    <PencilSquareIcon className="h-6 w-6" />
                               </button>
                               <button onClick={() => onNavigate(Page.Merge)} className={navButtonClasses(Page.Merge)} aria-label="دمج الصور">
                                    <RectangleStackIcon className="h-6 w-6" />
                               </button>

                                {currentUserEmail === 'lifetime@user.com' && (
                                   <button 
                                        onClick={() => onNavigate(Page.Generator)} 
                                        className={navButtonClasses(Page.Generator)} 
                                        aria-label="مولد الحسابات"
                                    >
                                        <KeyIcon className="h-6 w-6" />
                                   </button>
                                )}

                                <div className="border-l border-gray-600 h-6 mx-1 sm:mx-2"></div>

                               <div className="flex items-center space-x-2 bg-gray-700/50 rounded-full px-3 py-1.5">
                                   <PhotoIcon className="h-5 w-5 text-gray-400"/>
                                   <span className="text-sm font-medium text-white">{isLifetimeUser ? currentUserPlan : imageCredits}</span>
                               </div>
                                <div className="border-l border-gray-600 h-6 mx-1 sm:mx-2"></div>
                                <button
                                    onClick={() => onNavigate(Page.Tasks)}
                                    className={navButtonClasses(Page.Tasks)}
                                    aria-label="المهام"
                                >
                                    <GiftIcon className="h-6 w-6" />
                                </button>
                                <button
                                    onClick={() => onNavigate(Page.Settings)}
                                    className={navButtonClasses(Page.Settings)}
                                    aria-label="الإعدادات"
                                >
                                    <SettingsIcon className="h-6 w-6" />
                                </button>
                                 <button
                                    onClick={onLogout}
                                    className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                    aria-label="تسجيل الخروج"
                                >
                                    <LogoutIcon className="h-6 w-6" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <button onClick={() => onNavigate(Page.Register)} className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md text-sm">
                                    إنشاء حساب
                                </button>
                                <button onClick={() => onNavigate(Page.Login)} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                    تسجيل الدخول
                                </button>
                                <button onClick={() => onNavigate(Page.Pricing)} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                    الأسعار
                                </button>
                            </div>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;