import React from 'react';

export function TestComponent() {
  return (
    <div className="p-10 border-4 border-dashed border-indigo-500 rounded-3xl bg-indigo-50/50 backdrop-blur-xl text-center my-10 animate-pulse">
      <h1 className="text-4xl md:text-6xl font-black text-indigo-900 tracking-tighter uppercase italic">
        This is from the UI library
      </h1>
      <p className="mt-4 text-indigo-600 font-bold tracking-widest text-xs uppercase">
        Verified Shared Component • NC-CORE-UI-V1
      </p>
    </div>
  );
}
