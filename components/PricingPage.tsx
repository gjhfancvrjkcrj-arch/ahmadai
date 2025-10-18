import React from 'react';
import { CheckIcon } from './icons';

interface PricingPageProps {
    isLifetimeUser: boolean;
    onNavigateBack: () => void;
    isLoggedIn: boolean;
}

const PricingPage: React.FC<PricingPageProps> = ({ isLifetimeUser, onNavigateBack, isLoggedIn }) => {

    return (
        <div className="container mx-auto p-4 sm:p-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-white">خطط الاشتراك</h1>
                <p className="mt-4 text-lg text-gray-400">اختر الخطة التي تناسب احتياجاتك لتطلق العنان لإبداعك.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Basic Plan */}
                <div className={`bg-gray-800/80 backdrop-blur-sm border rounded-2xl p-8 flex flex-col ${!isLifetimeUser ? 'border-purple-500' : 'border-gray-700'}`}>
                    <h3 className="text-2xl font-semibold text-white text-right">الخطة الأساسية</h3>
                    <p className="mt-4 text-gray-400 text-right">مثالية للبدء واستكشاف الإمكانيات.</p>
                    <p className="mt-8 text-right">
                        <span className="text-4xl font-bold text-white">$10</span>
                        <span className="text-lg text-gray-400"> / شهر</span>
                    </p>
                    <ul className="mt-8 space-y-4 text-gray-300 text-right flex-grow">
                        <li className="flex items-center justify-end"><span className="mr-3">10 تعديل صور يومياً</span> <CheckIcon className="h-6 w-6 text-green-500" /></li>
                        <li className="flex items-center justify-end"><span className="mr-3">جودة قياسية</span> <CheckIcon className="h-6 w-6 text-green-500" /></li>
                        <li className="flex items-center justify-end"><span className="mr-3">دعم عبر البريد الإلكتروني</span> <CheckIcon className="h-6 w-6 text-green-500" /></li>
                    </ul>
                    <button disabled={!isLifetimeUser} className={`mt-8 w-full py-3 px-4 rounded-lg text-sm font-medium focus:outline-none transition-colors ${!isLifetimeUser ? 'bg-purple-600 text-white cursor-default' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}>
                        {!isLifetimeUser ? 'الخطة الحالية' : 'اختر الخطة'}
                    </button>
                </div>

                {/* Lifetime Plan */}
                <div className={`bg-gray-800/80 backdrop-blur-sm border rounded-2xl p-8 flex flex-col relative overflow-hidden ${isLifetimeUser ? 'border-yellow-400 shadow-yellow-400/20 shadow-2xl' : 'border-gray-700'}`}>
                    {isLifetimeUser && <div className="absolute top-0 right-0 h-16 w-16">
                        <div className="absolute transform rotate-45 bg-yellow-400 text-center text-gray-900 font-semibold py-1 right-[-34px] top-[32px] w-[170px]">
                            حصرية
                        </div>
                    </div>}
                    <h3 className="text-2xl font-semibold text-yellow-400 text-right">خطة مدى الحياة</h3>
                    <p className="mt-4 text-gray-400 text-right">عرض خاص للمستخدمين المميزين.</p>
                     <p className="mt-8 text-right">
                        <span className="text-4xl font-bold text-white">خاص</span>
                    </p>
                    <ul className="mt-8 space-y-4 text-gray-300 text-right flex-grow">
                        <li className="flex items-center justify-end"><span className="mr-3">تعديلات صور غير محدودة</span> <CheckIcon className="h-6 w-6 text-green-500" /></li>
                        <li className="flex items-center justify-end"><span className="mr-3">جودة فائقة الدقة (4K)</span> <CheckIcon className="h-6 w-6 text-green-500" /></li>
                        <li className="flex items-center justify-end"><span className="mr-3">أولوية قصوى في الدعم</span> <CheckIcon className="h-6 w-6 text-green-500" /></li>
                         <li className="flex items-center justify-end"><span className="mr-3">وصول حصري للميزات الجديدة</span> <CheckIcon className="h-6 w-6 text-green-500" /></li>
                    </ul>
                     <button disabled={true} className={`mt-8 w-full py-3 px-4 rounded-lg text-sm font-medium focus:outline-none transition-colors ${isLifetimeUser ? 'bg-yellow-500 text-gray-900 cursor-default' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}>
                        {isLifetimeUser ? 'الخطة الحالية' : 'خطة خاصة'}
                    </button>
                </div>

                 {/* Pro Plan */}
                 <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 flex flex-col">
                    <h3 className="text-2xl font-semibold text-white text-right">الاحترافية</h3>
                    <p className="mt-4 text-gray-400 text-right">للمبدعين والشركات الصغيرة.</p>
                    <p className="mt-8 text-right">
                        <span className="text-4xl font-bold text-white">$25</span>
                        <span className="text-lg text-gray-400"> / شهر</span>
                    </p>
                    <ul className="mt-8 space-y-4 text-gray-300 text-right flex-grow">
                        <li className="flex items-center justify-end"><span className="mr-3">تعديلات صور غير محدودة</span> <CheckIcon className="h-6 w-6 text-green-500" /></li>
                        <li className="flex items-center justify-end"><span className="mr-3">جودة عالية الدقة (HD)</span> <CheckIcon className="h-6 w-6 text-green-500" /></li>
                        <li className="flex items-center justify-end"><span className="mr-3">أولوية في الدعم</span> <CheckIcon className="h-6 w-6 text-green-500" /></li>
                    </ul>
                    <button className="mt-8 w-full py-3 px-4 border border-purple-500 rounded-lg text-sm font-medium text-purple-400 hover:bg-purple-500/10 focus:outline-none">
                        اختر الخطة
                    </button>
                </div>

            </div>
             {isLoggedIn && (
                 <div className="text-center mt-12">
                     <button onClick={onNavigateBack} className="text-purple-400 hover:text-purple-300 font-medium">
                        &larr; العودة إلى الإعدادات
                     </button>
                 </div>
             )}
        </div>
    );
};

export default PricingPage;