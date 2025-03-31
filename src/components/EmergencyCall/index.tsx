import React, { useState, useEffect } from 'react';

interface EmergencyCallProps {
  isOpen: boolean;
  contactName: string;
  onClose: () => void;
}

const EmergencyCall: React.FC<EmergencyCallProps> = ({ isOpen, contactName, onClose }) => {
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-red-600 p-6 rounded-lg max-w-sm w-full mx-4 text-white">
        <div className="text-center space-y-4">
          <div className="animate-pulse text-2xl font-bold mb-4">
            Ligando para Emergência
          </div>
          
          <div className="w-20 h-20 rounded-full bg-white mx-auto flex items-center justify-center">
            <span className="text-red-600 text-3xl font-bold">
              {contactName.charAt(0).toUpperCase()}
            </span>
          </div>
          
          <div className="text-xl font-semibold">
            {contactName}
          </div>

          <div className="text-lg">
            {formatTime(callDuration)}
          </div>

          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={onClose}
              className="bg-white text-red-600 px-6 py-2 rounded-full font-bold hover:bg-red-100 transition-colors"
            >
              Encerrar
            </button>
          </div>

          <div className="text-sm mt-4">
            Enviando localização atual...
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyCall; 