import React, { useState } from 'react';

interface SettingsPageProps {
    currentUserPlan: string;
    onNavigateToPricing: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ currentUserPlan, onNavigateToPricing }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const planName = currentUserPlan === 'أساسي' ? 'الخطة الأساسية' : currentUserPlan;
    const planDescription = currentUserPlan !== 'أساسي' ? 'لديك وصول كامل وغير محدود لجميع الميزات.' : 'تتضمن 10 تعديلات صور يومياً. يمكنك الترقية للوصول إلى ميزات أكثر.';

    const handleChangePassword = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (newPassword !== confirmNewPassword) {
            setError('كلمتا المرور الجديدتان غير متطابقتين.');
            return;
        }
        if (newPassword.length < 8) {
            setError('يجب أن تكون كلمة المرور الجديدة 8 أحرف على الأقل.');
            return;
        }

        // Simulate password change
        console.log('Password change requested.');
        setMessage('تم تغيير كلمة المرور بنجاح!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setTimeout(() => {
            setMessage('');
        }, 3000);
    };

    return (
        <div className="container mx-auto p-4 sm:p-8">
            <div className="max-w-2xl mx-auto bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 md:p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-8 text-right">الإعدادات</h2>
                <div className="space-y-10">
                    {/* Change Password Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-200 border-b border-gray-600 pb-3 mb-4 text-right">تغيير كلمة المرور</h3>
                        <form onSubmit={handleChangePassword} className="space-y-4">
                            <div className="text-right">
                                <label className="block text-sm font-medium text-gray-400 mb-1">كلمة المرور الحالية</label>
                                <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:ring-purple-500 focus:border-purple-500" />
                            </div>
                            <div className="text-right">
                                <label className="block text-sm font-medium text-gray-400 mb-1">كلمة المرور الجديدة</label>
                                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:ring-purple-500 focus:border-purple-500" />
                            </div>
                            <div className="text-right">
                                <label className="block text-sm font-medium text-gray-400 mb-1">تأكيد كلمة المرور الجديدة</label>
                                <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:ring-purple-500 focus:border-purple-500" />
                            </div>
                            {error && <p className="text-red-400 text-sm text-center pt-2">{error}</p>}
                            {message && <p className="text-green-400 text-sm text-center pt-2">{message}</p>}
                            <div className="text-left pt-2">
                                <button type="submit" className="py-2 px-5 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium">حفظ التغييرات</button>
                            </div>
                        </form>
                    </div>

                    {/* Subscription Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-200 border-b border-gray-600 pb-3 mb-4 text-right">الاشتراك</h3>
                        <div className="bg-gray-700/50 rounded-lg p-5 flex justify-between items-center">
                            <div className="text-right">
                                <h4 className="font-bold text-white">خطتك الحالية: {planName}</h4>
                                <p className="text-gray-400 text-sm">{planDescription}</p>
                            </div>
                            <button onClick={onNavigateToPricing} className="py-2 px-5 border border-gray-500 hover:bg-gray-600 rounded-lg text-white font-medium whitespace-nowrap">
                                عرض الخطط
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;