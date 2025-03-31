'use client';

import React from 'react';

const MonitorIcon = ({ className = '' }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={`w-8 h-8 ${className}`}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12h4l3-9 3 18 3-9h7" />
    </svg>
  );
};

export default MonitorIcon; 