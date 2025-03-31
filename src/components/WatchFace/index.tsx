'use client';

import React, { useEffect, useState } from 'react';

interface Medication {
  name: string;
  time: string;
  taken: boolean;
}

const WatchFace = () => {
  const [time, setTime] = useState<string>('');
  const [medications, setMedications] = useState<Medication[]>([
    { name: 'Remédio 1', time: '08:00', taken: false },
    { name: 'Remédio 2', time: '12:00', taken: false },
    { name: 'Remédio 3', time: '18:00', taken: false },
  ]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSOS = () => {
    // Aqui você pode implementar a lógica de SOS
    alert('SOS Ativado! Um familiar será notificado imediatamente.');
  };

  const handleMedicationTaken = (index: number) => {
    setMedications(prev => 
      prev.map((med, i) => 
        i === index ? { ...med, taken: true } : med
      )
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      {/* Relógio Principal */}
      <div className="text-6xl font-bold text-white mb-8">
        {time}
      </div>

      {/* Botão SOS */}
      <button 
        className="w-48 h-48 rounded-full bg-red-600 text-white text-2xl font-bold hover:bg-red-700 transition-colors mb-8 shadow-lg"
        onClick={handleSOS}
        aria-label="Botão de emergência SOS"
      >
        SOS
      </button>

      {/* Lista de Remédios */}
      <div className="w-full max-w-md bg-gray-900 rounded-lg p-4">
        <h2 className="text-2xl text-white mb-4">Remédios do Dia</h2>
        <div className="space-y-4">
          {medications.map((med, index) => (
            <div 
              key={index}
              className="flex items-center justify-between bg-gray-800 p-4 rounded-lg"
            >
              <div>
                <p className="text-xl text-white">{med.name}</p>
                <p className="text-lg text-gray-300">{med.time}</p>
              </div>
              <button
                className={`px-6 py-2 rounded-full text-lg font-bold ${
                  med.taken 
                    ? 'bg-green-600 text-white' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                onClick={() => handleMedicationTaken(index)}
                disabled={med.taken}
              >
                {med.taken ? 'Tomado' : 'Tomar'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchFace; 