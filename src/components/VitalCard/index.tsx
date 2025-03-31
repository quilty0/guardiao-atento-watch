'use client';

import React, { ReactNode } from 'react';
import MonitorIcon from '../MonitorIcon';

interface VitalCardProps {
  title: string;
  value: number | string;
  unit: string;
  min: number | string;
  max: number | string;
  icon: ReactNode | string;
  description?: string;
  color?: string;
}

const VitalCard: React.FC<VitalCardProps> = ({
  title,
  value,
  unit,
  min,
  max,
  icon,
  description = '',
  color = 'text-gray-800'
}) => {
  const getIconAnimation = (icon: string) => {
    switch (icon) {
      case '❤️':
        return 'animate-heartbeat';
      case '💧':
        return 'animate-pressure';
      case '🌡️':
        return 'animate-temperature';
      case '📊':
        return 'animate-monitor';
      default:
        return '';
    }
  };

  const renderIcon = (icon: string) => {
    if (icon === '📊') {
      return (
        <div className="w-16 h-16 flex items-center justify-center">
          <MonitorIcon className={`text-green-500 ${getIconAnimation(icon)} scale-150`} />
        </div>
      );
    }
    return <div className={`text-4xl ${getIconAnimation(icon)}`}>{icon}</div>;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex flex-col items-center space-y-2">
        {/* Ícone animado */}
        {typeof icon === 'string' ? renderIcon(icon) : icon}
        
        {/* Título */}
        <h3 className="text-gray-700 text-lg font-medium">
          {title}
        </h3>

        {/* Valor principal com unidade */}
        <div className={`text-3xl font-bold ${color} animate-number`} key={String(value)}>
          {value} {unit}
        </div>

        {/* Descrição */}
        {description && (
          <p className="text-gray-500 text-sm text-center">
            {description}
          </p>
        )}

        {/* Min e Max */}
        <div className="w-full flex justify-between text-sm text-gray-400 mt-2">
          <span>Min: {min}</span>
          <span>Max: {max}</span>
        </div>
      </div>
    </div>
  );
};

export default VitalCard; 