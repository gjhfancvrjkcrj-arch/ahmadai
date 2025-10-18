import React, { useState } from 'react';
import { StarIcon } from './icons';

interface RatingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (rating: number) => void;
}

const RatingModal: React.FC<RatingModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (rating > 0) {
            onSubmit(rating);
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div 
                className="bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-2xl max-w-sm w-full mx-4 text-center"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold text-white mb-4">قيّم تجربتك</h2>
                <p className="text-gray-400 mb-6">ملاحظاتك تساعدنا على التحسين.</p>
                <div className="flex justify-center items-center gap-2 mb-8" dir="ltr">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                            key={star}
                            className={`w-10 h-10 cursor-pointer transition-colors ${
                                (hoverRating >= star || rating >= star)
                                ? 'text-yellow-400'
                                : 'text-gray-600'
                            }`}
                            filled={hoverRating >= star || rating >= star}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                        />
                    ))}
                </div>
                <div className="flex gap-4">
                    <button 
                        onClick={onClose}
                        className="flex-1 py-2.5 px-5 border border-gray-600 hover:bg-gray-700 rounded-lg text-white font-medium"
                    >
                        إلغاء
                    </button>
                    <button 
                        onClick={handleSubmit}
                        disabled={rating === 0}
                        className="flex-1 py-2.5 px-5 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                        إرسال التقييم
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RatingModal;