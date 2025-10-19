import React, { useState, useEffect } from 'react';
import { Page, Task, GeneratedAccount } from './types';
import Header from './components/Header';
import EditorPage from './components/EditorPage';
import LoginPage from './components/LoginPage';
import PricingPage from './components/PricingPage';
import RegisterPage from './components/RegisterPage';
import SettingsPage from './components/SettingsPage';
import TasksPage from './components/TasksPage';
import MergePage from './components/MergePage';
import GeneratorPage from './components/GeneratorPage';

const initialTasks: Task[] = [
    { id: '1', title: 'مشاركة الموقع', description: 'شارك الموقع مع صديق واحصل على مكافأة.', reward: 5, status: 'available' },
    { id: '2', title: 'تابعنا على وسائل التواصل', description: 'قم بمتابعة حسابنا الرسمي على المنصات.', reward: 3, status: 'available' },
    { id: '3', title: 'تقييم التطبيق بـ 5 نجوم', description: 'ادعمنا بتقييم إيجابي على المتجر.', reward: 10, status: 'available' },
];

const lifetimeUsers = [
    'lifetime@user.com',
];

const App: React.FC = () => {
    const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<Page>(Page.Login);
    const [imageCredits, setImageCredits] = useState<number>(10);
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [generatedAccounts, setGeneratedAccounts] = useState<GeneratedAccount[]>([]);

    const currentUserPlan = (() => {
        if (!currentUserEmail) return 'أساسي';

        const lowerCaseEmail = currentUserEmail.toLowerCase();
        
        if (lifetimeUsers.includes(lowerCaseEmail)) {
            return 'مدى الحياة';
        }

        const generatedAccount = generatedAccounts.find(acc => acc.email === lowerCaseEmail);
        if (generatedAccount) {
            return generatedAccount.subscriptionType;
        }

        return 'أساسي';
    })();

    const isLifetimeUser = currentUserPlan !== 'أساسي';

    useEffect(() => {
        if (currentUserEmail) {
            if (currentPage === Page.Login || currentPage === Page.Register) {
                setCurrentPage(Page.Editor);
            }
        } else {
            if ([Page.Editor, Page.Settings, Page.Pricing, Page.Tasks, Page.Merge, Page.Generator].includes(currentPage)) {
                setCurrentPage(Page.Login);
            }
        }
    }, [currentUserEmail, currentPage]);
    
    useEffect(() => {
        if (currentUserEmail) {
            // Reset state for a new user session for this simulation
            setImageCredits(10);
            setTasks(initialTasks.map(t => ({...t, status: 'available'})));
            if (currentUserEmail.toLowerCase() !== 'lifetime@user.com') {
                 // Don't clear accounts if logging into a generated account
                 const isGenerated = generatedAccounts.some(acc => acc.email === currentUserEmail.toLowerCase());
                 if (!isGenerated) {
                    setGeneratedAccounts([]);
                 }
            }
        }
    }, [currentUserEmail]);
    
    // Auto-delete expired accounts
    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            
            setGeneratedAccounts(currentAccounts => {
                const activeAccounts = currentAccounts.filter(acc => acc.expiresAt === null || acc.expiresAt > now);
                
                const isCurrentUserExpired = currentAccounts.some(acc => 
                    acc.email === currentUserEmail && 
                    acc.expiresAt !== null && 
                    acc.expiresAt <= now
                );

                if (isCurrentUserExpired) {
                    setCurrentUserEmail(null);
                    setCurrentPage(Page.Login);
                }
                
                return activeAccounts;
            });
        }, 1000); // Check every second
    
        return () => clearInterval(interval);
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
    
    const handleDeleteAccount = () => {
        console.log(`Account deleted for user: ${currentUserEmail}`);
        // In a real app, you would make an API call here.
        setCurrentUserEmail(null);
        setCurrentPage(Page.Login); // Navigate to login after deletion
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

    const handleGenerateAccount = (subscriptionValue: string, subscriptionLabel: string) => {
        const now = Date.now();
        let expiresAt: number | null = null;
    
        switch (subscriptionValue) {
            case '1-day':
                expiresAt = now + 24 * 60 * 60 * 1000;
                break;
            case '2-days':
                expiresAt = now + 2 * 24 * 60 * 60 * 1000;
                break;
            case '3-days':
                expiresAt = now + 3 * 24 * 60 * 60 * 1000;
                break;
            case 'weekly':
                expiresAt = now + 7 * 24 * 60 * 60 * 1000;
                break;
            case 'monthly':
                expiresAt = now + 30 * 24 * 60 * 60 * 1000;
                break;
            case 'yearly':
                expiresAt = now + 365 * 24 * 60 * 60 * 1000;
                break;
            case 'lifetime':
                expiresAt = null;
                break;
        }

        const nextId = generatedAccounts.filter(acc => acc.subscriptionType === subscriptionLabel).length + 1;
        const typeSlug = subscriptionValue;
        const newAccount: GeneratedAccount = {
            email: `gen-${typeSlug}-${nextId}@user.com`,
            pass: 'password123',
            subscriptionType: subscriptionLabel,
            expiresAt: expiresAt,
        };
        setGeneratedAccounts(prev => [newAccount, ...prev]);
    };
    
    const handleDeleteGeneratedAccount = (emailToDelete: string) => {
        setGeneratedAccounts(prev => prev.filter(acc => acc.email !== emailToDelete));
    };

    const renderPage = () => {
        if (!currentUserEmail) {
             switch (currentPage) {
                case Page.Login:
                    return <LoginPage onLoginSuccess={handleLoginSuccess} onNavigateToRegister={() => navigate(Page.Register)} generatedAccounts={generatedAccounts} />;
                case Page.Register:
                    return <RegisterPage onRegisterSuccess={handleRegisterSuccess} onNavigateToLogin={() => navigate(Page.Login)} />;
                case Page.Pricing:
                    return <PricingPage isLifetimeUser={false} onNavigateBack={() => navigate(Page.Login)} isLoggedIn={false} />;
                default:
                    return <LoginPage onLoginSuccess={handleLoginSuccess} onNavigateToRegister={() => navigate(Page.Register)} generatedAccounts={generatedAccounts} />;
            }
        }
        
        // --- Authenticated Routes ---
        switch (currentPage) {
            case Page.Editor:
                return <EditorPage isLifetimeUser={isLifetimeUser} imageCredits={imageCredits} onUseCredit={handleUseCredit} />;
            case Page.Merge:
                return <MergePage isLifetimeUser={isLifetimeUser} imageCredits={imageCredits} onUseCredit={handleUseCredit} />;
            case Page.Settings:
                return <SettingsPage currentUserPlan={currentUserPlan} onNavigateToPricing={() => navigate(Page.Pricing)} />;
            case Page.Pricing:
                return <PricingPage isLifetimeUser={isLifetimeUser} onNavigateBack={() => navigate(Page.Settings)} isLoggedIn={true} />;
            case Page.Tasks:
                return <TasksPage tasks={tasks} onCompleteTask={handleCompleteTask} onClaimReward={handleClaimReward} />;
            case Page.Generator:
                 if (currentUserEmail.toLowerCase() === 'lifetime@user.com') {
                    return <GeneratorPage accounts={generatedAccounts} onGenerate={handleGenerateAccount} onDelete={handleDeleteGeneratedAccount} />;
                 }
                 return <EditorPage isLifetimeUser={isLifetimeUser} imageCredits={imageCredits} onUseCredit={handleUseCredit} />;
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
                currentUserEmail={currentUserEmail}
                currentUserPlan={currentUserPlan}
            />
            <main>
                {renderPage()}
            </main>
        </div>
    );
};

export default App;