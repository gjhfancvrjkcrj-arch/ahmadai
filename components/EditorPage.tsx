
import React, { useState, useCallback } from 'react';
import { editImageWithPrompt } from '../services/geminiService';
import { fileToBase64 } from '../utils/fileUtils';
import { UploadIcon, DownloadIcon, SparklesIcon, PhotoIcon } from './icons';

interface EditorPageProps {
    isLifetimeUser: boolean;
    imageCredits: number;
    onUseCredit: () => void;
}

const LoadingSpinner: React.FC = () => (
    <div className="absolute inset-0 bg-gray-900 bg-opacity-80 flex flex-col items-center justify-center z-10 rounded-2xl">
        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="text-lg text-gray-300 mt-4">الذكاء الاصطناعي يفكّر...</span>
    </div>
);

const EditorPage: React.FC<EditorPageProps> = ({ isLifetimeUser, imageCredits, onUseCredit }) => {
    const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
    const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
    const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    const hasCredits = imageCredits > 0;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setOriginalImageFile(file);
            setOriginalImageUrl(URL.createObjectURL(file));
            setGeneratedImageUrl(null);
            setError(null);
        }
    };

    const handleGenerate = useCallback(async () => {
        if (!originalImageFile || !prompt) {
            setError('يرجى رفع صورة وتقديم وصف للتعديل.');
            return;
        }

        if (!isLifetimeUser && !hasCredits) {
            setError('رصيدك من الصور لا يكفي. أكمل بعض المهام للحصول على المزيد!');
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedImageUrl(null);

        try {
            const { base64, mimeType } = await fileToBase64(originalImageFile);
            const editedImageBase64 = await editImageWithPrompt(base64, mimeType, prompt);
            setGeneratedImageUrl(`data:image/png;base64,${editedImageBase64}`);
            onUseCredit(); // Deduct credit on success
        } catch (err: unknown) {
            console.error(err);
            const message = err instanceof Error ? err.message : 'An unexpected error occurred.';
            setError(`فشل في إنشاء الصورة: ${message}`);
        } finally {
            setIsLoading(false);
        }
    }, [originalImageFile, prompt, isLifetimeUser, hasCredits, onUseCredit]);
    
    return (
        <div className="container mx-auto p-4 sm:p-8">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 md:p-8 shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left side - Controls and Input */}
                    <div className="flex flex-col space-y-6">
                        <div>
                            <label className="block text-lg font-semibold mb-2 text-gray-200 text-right">1. ارفع صورتك</label>
                            <label htmlFor="file-upload" className="group cursor-pointer flex justify-center w-full px-6 py-10 border-2 border-dashed border-gray-600 hover:border-purple-500 rounded-2xl transition-colors bg-gray-900/50 hover:bg-purple-500/10">
                                <div className="text-center">
                                    {originalImageUrl ? (
                                        <img src={originalImageUrl} alt="Original" className="max-h-40 mx-auto rounded-lg shadow-md" />
                                    ) : (
                                        <>
                                            <UploadIcon className="mx-auto h-12 w-12 text-gray-500 group-hover:text-purple-400" />
                                            <p className="mt-2 text-sm text-gray-400">
                                                <span className="font-semibold text-purple-400">انقر للرفع</span> أو اسحب وأفلت
                                            </p>
                                            <p className="text-xs text-gray-500">PNG, JPG, WEBP حتى 10 ميجابايت</p>
                                        </>
                                    )}
                                </div>
                                <input id="file-upload" type="file" className="sr-only" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
                            </label>
                        </div>
                        <div>
                           <label htmlFor="prompt" className="block text-lg font-semibold mb-2 text-gray-200 text-right">2. صف التعديل الذي تريده</label>
                           <textarea
                                id="prompt"
                                rows={4}
                                className="block w-full bg-gray-700 border border-gray-600 rounded-lg shadow-sm p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                placeholder="مثال: 'اجعل السماء تبدو كمجرة' أو 'أضف كلب كورجي لطيف يرتدي عباءة بطل خارق'"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                           />
                        </div>
                        <button
                            onClick={handleGenerate}
                            disabled={isLoading || !originalImageFile || !prompt || (!isLifetimeUser && !hasCredits)}
                            className="w-full flex items-center justify-center py-4 px-6 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 transition-all transform hover:scale-105 disabled:scale-100"
                        >
                            <SparklesIcon className="w-6 h-6 ml-3"/>
                            {isLoading ? 'جاري الإنشاء...' : 'إنشاء الصورة'}
                        </button>
                        {error && <p className="text-red-400 text-center">{error}</p>}
                    </div>

                    {/* Right side - Output */}
                    <div className="flex flex-col">
                        <label className="block text-lg font-semibold mb-2 text-gray-200 text-right">النتيجة</label>
                        <div className="relative w-full aspect-square bg-gray-900/50 border-2 border-dashed border-gray-600 rounded-2xl flex items-center justify-center">
                            {isLoading && <LoadingSpinner />}
                            {!isLoading && generatedImageUrl && (
                                <img src={generatedImageUrl} alt="Generated" className="object-contain w-full h-full rounded-2xl" />
                            )}
                            {!isLoading && !generatedImageUrl && (
                                <div className="text-center text-gray-500">
                                    <PhotoIcon className="w-16 h-16 mx-auto" />
                                    <p>ستظهر صورتك المعدلة هنا</p>
                                </div>
                            )}
                        </div>
                         {generatedImageUrl && !isLoading && (
                            <a
                                href={generatedImageUrl}
                                download="edited-image.png"
                                className="mt-6 w-full flex items-center justify-center py-3 px-6 border border-gray-600 rounded-lg shadow-sm text-md font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 transition-colors"
                            >
                                <DownloadIcon className="w-5 h-5 ml-3"/>
                                تحميل الصورة
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditorPage;