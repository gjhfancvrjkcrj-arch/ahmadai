import React, { useState, useEffect } from 'react';
import { Page, Task } from './types';
import Header from './components/Header';
import EditorPage from './components/EditorPage';
import LoginPage from './components/LoginPage';
import PricingPage from './components/PricingPage';
import RegisterPage from './components/RegisterPage';
import SettingsPage from './components/SettingsPage';
import TasksPage from './components/TasksPage';
import MergePage from './components/MergePage';

const initialTasks: Task[] = [
    { id: '1', title: 'مشاركة الموقع', description: 'شارك الموقع مع صديق واحصل على مكافأة.', reward: 5, status: 'available' },
    { id: '2', title: 'تابعنا على وسائل التواصل', description: 'قم بمتابعة حسابنا الرسمي على المنصات.', reward: 3, status: 'available' },
    { id: '3', title: 'تقييم التطبيق بـ 5 نجوم', description: 'ادعمنا بتقييم إيجابي على المتجر.', reward: 10, status: 'available' },
];

const lifetimeUsers = [
    'lifetime@user.com',
    ...Array.from({ length: 10 }, (_, i) => `lifetime${i + 1}@user.com`)
];

const App: React.FC = () => {
    const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<Page>(Page.Login);
    const [imageCredits, setImageCredits] = useState<number>(10);
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const isLifetimeUser = currentUserEmail ? lifetimeUsers.includes(currentUserEmail.toLowerCase()) : false;

    useEffect(() => {
        if (currentUserEmail) {
            if (currentPage === Page.Login || currentPage === Page.Register) {
                setCurrentPage(Page.Editor);
            }
        } else {
            if ([Page.Editor, Page.Settings, Page.Pricing, Page.Tasks, Page.Merge].includes(currentPage)) {
                setCurrentPage(Page.Login);
            }
        }
    }, [currentUserEmail, currentPage]);
    
    useEffect(() => {
        if (currentUserEmail) {
            // Reset state for a new user session for this simulation
            setImageCredits(10);
            setTasks(initialTasks.map(t => ({...t, status: 'available'})));
        }
    }, [currentUserEmail]);


    const handleLoginSuccess = (email: string) => {
        setCurrentUserEmail(email);
    };

    const handleRegisterSuccess = (email: string) => {
        setCurrentUserEmail(email);
    };

    const handleLogout = () => {
        setCurrentUserEmail(null);
        setCurrentPage(Page.Login);
    };

    const navigate = (page: Page) => {
        setCurrentPage(page);
    };
    
    const handleCompleteTask = (taskId: string) => {
        setTasks(prevTasks => prevTasks.map(task =>
            task.id === taskId && task.status === 'available' ? { ...task, status: 'claimable' } : task
        ));
    };

    const handleClaimReward = (taskId: string) => {
        const task = tasks.find(t => t.id === taskId);
        if (task && task.status === 'claimable') {
            setImageCredits(prev => prev + task.reward);
            setTasks(prevTasks => prevTasks.map(t =>
                t.id === taskId ? { ...t, status: 'claimed' } : t
            ));
        }
    };
    
    const handleUseCredit = () => {
        if (!isLifetimeUser) {
            setImageCredits(prev => Math.max(0, prev - 1));
        }
    };


    const renderPage = () => {
        if (!currentUserEmail) {
             switch (currentPage) {
                case Page.Login:
                    return <LoginPage onLoginSuccess={handleLoginSuccess} onNavigateToRegister={() => navigate(Page.Register)} />;
                case Page.Register:
                    return <RegisterPage onRegisterSuccess={handleRegisterSuccess} onNavigateToLogin={() => navigate(Page.Login)} />;
                case Page.Pricing:
                    return <PricingPage isLifetimeUser={false} onNavigateBack={() => navigate(Page.Login)} isLoggedIn={false} />;
                default:
                    return <LoginPage onLoginSuccess={handleLoginSuccess} onNavigateToRegister={() => navigate(Page.Register)} />;
            }
        }
        
        // --- Authenticated Routes ---
        switch (currentPage) {
            case Page.Editor:
                return <EditorPage isLifetimeUser={isLifetimeUser} imageCredits={imageCredits} onUseCredit={handleUseCredit} />;
            case Page.Merge:
                return <MergePage isLifetimeUser={isLifetimeUser} imageCredits={imageCredits} onUseCredit={handleUseCredit} />;
            case Page.Settings:
                return <SettingsPage isLifetimeUser={isLifetimeUser} onNavigateToPricing={() => navigate(Page.Pricing)} />;
            case Page.Pricing:
                return <PricingPage isLifetimeUser={isLifetimeUser} onNavigateBack={() => navigate(Page.Settings)} isLoggedIn={true} />;
            case Page.Tasks:
                return <TasksPage tasks={tasks} onCompleteTask={handleCompleteTask} onClaimReward={handleClaimReward} />;
            default:
                 return <EditorPage isLifetimeUser={isLifetimeUser} imageCredits={imageCredits} onUseCredit={handleUseCredit} />;
        }
    };

    return (
        <div className="text-white min-h-screen font-sans">
            <Header
                isLoggedIn={!!currentUserEmail}
                isLifetimeUser={isLifetimeUser}
                imageCredits={imageCredits}
                onLogout={handleLogout}
                onNavigate={navigate}
                currentPage={currentPage}
            />
            <main>
                {renderPage()}
            </main>
        </div>
    );
};

export default App;