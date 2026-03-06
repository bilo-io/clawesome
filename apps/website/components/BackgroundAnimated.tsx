import React from 'react';

export default function BackgroundAnimated() {
    return (
        <div className="absolute top-0 left-0 right-0 h-[600px] pointer-events-none overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/5 dark:bg-indigo-500/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-purple-500/5 dark:bg-purple-500/10 blur-[100px] rounded-full animate-pulse delay-700" />
        </div>
    );
}