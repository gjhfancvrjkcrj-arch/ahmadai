import React, { useState } from 'react';
import { Task } from '../types';
import { GiftIcon, CheckIcon } from './icons';
import RatingModal from './RatingModal';

interface TasksPageProps {
    tasks: Task[];
    onCompleteTask: (taskId: string) => void;
    onClaimReward: (taskId: string) => void;
}

const TasksPage: React.FC<TasksPageProps> = ({ tasks, onCompleteTask, onClaimReward }) => {
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

    const handlePerformTask = (task: Task) => {
        // Special handling for the rating task
        if (task.id === '3' && task.status === 'available') {
            setIsRatingModalOpen(true);
        } else {
            onCompleteTask(task.id);
        }
    };

    const handleRatingSubmit = (rating: number) => {
        console.log(`User submitted a rating of ${rating} stars.`);
        onCompleteTask('3'); // Mark task '3' as completed
        setIsRatingModalOpen(false);
    };


    const getButton = (task: Task) => {
        switch (task.status) {
            case 'available':
                return (
                    <button
                        onClick={() => handlePerformTask(task)}
                        className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-colors"
                    >
                        أداء المهمة
                    </button>
                );
            case 'claimable':
                return (
                    <button
                        onClick={() => onClaimReward(task.id)}
                        className="w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-gray-900 font-medium transition-colors"
                    >
                        المطالبة بالمكافأة
                    </button>
                );
            case 'claimed':
                return (
                    <button
                        disabled
                        className="w-full py-2 px-4 bg-gray-600 rounded-lg text-gray-400 cursor-not-allowed flex items-center justify-center"
                    >
                        <CheckIcon className="w-5 h-5 ml-2" />
                        تمت المطالبة
                    </button>
                );
            default:
                return null;
        }
    };


    return (
        <>
            <div className="container mx-auto p-4 sm:p-8">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-extrabold text-white">مركز المهام</h1>
                        <p className="mt-4 text-lg text-gray-400">أكمل المهام التالية لكسب المزيد من رصيد تعديل الصور!</p>
                    </div>
                    <div className="space-y-6">
                        {tasks.map(task => (
                            <div key={task.id} className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-4 text-right">
                                    <div className="hidden sm:block p-3 bg-purple-500/10 rounded-full">
                                    <GiftIcon className="w-8 h-8 text-purple-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">{task.title}</h3>
                                        <p className="text-sm text-gray-400">{task.description}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                    <div className="text-center">
                                        <span className="font-bold text-xl text-yellow-400">+{task.reward}</span>
                                        <p className="text-xs text-gray-500">صور</p>
                                    </div>
                                <div className="w-full sm:w-40">
                                    {getButton(task)}
                                </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <RatingModal
                isOpen={isRatingModalOpen}
                onClose={() => setIsRatingModalOpen(false)}
                onSubmit={handleRatingSubmit}
            />
        </>
    );
};

export default TasksPage;