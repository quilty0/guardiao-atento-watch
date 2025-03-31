import React, { useState, useEffect } from 'react';
import ConfirmationModal from '../ConfirmationModal';

interface FallDetectionProps {
  onEmergency: (message: string) => void;
}

const FallDetection: React.FC<FallDetectionProps> = ({ onEmergency }) => {
  const [isActive, setIsActive] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  // Inicializa lastCheck apenas no cliente
  useEffect(() => {
    setLastCheck(new Date());
  }, []);

  // Simulação de detecção de queda a cada 15 segundos
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        const now = new Date();
        setLastCheck(now);
        
        // Simula uma queda a cada 15 segundos
        if (now.getSeconds() % 15 === 0) {
          handleFallDetection();
        }
      }, 1000); // Verifica a cada segundo, mas só detecta a cada 15

      return () => clearInterval(interval);
    }
  }, [isActive]);

  // Contador regressivo após detecção
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown !== null) {
      if (countdown > 0) {
        timer = setInterval(() => {
          setCountdown(prev => (prev !== null ? prev - 1 : null));
        }, 1000);
      } else {
        handleConfirmFall();
      }
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleFallDetection = () => {
    setShowModal(true);
    setCountdown(30); // Inicia contagem regressiva de 30 segundos
    
    // Vibrar o relógio (quando disponível)
    if ('vibrate' in navigator) {
      navigator.vibrate([500, 200, 500]); // Vibração mais forte
    }
  };

  const handleConfirmFall = () => {
    setShowModal(false);
    setCountdown(null);
    onEmergency("Queda detectada! Enviando alerta para contatos de emergência.");
  };

  const handleCancelFall = () => {
    setShowModal(false);
    setCountdown(null);
  };

  const toggleSensor = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setLastCheck(new Date());
    }
  };

  return (
    <div className="bg-gray-800 p-3 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-bold text-gray-400">Sensor de Quedas</div>
        <button
          onClick={toggleSensor}
          className={`px-3 py-1 rounded-full text-xs font-bold ${
            isActive
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-red-500 hover:bg-red-600'
          } text-white transition-colors`}
        >
          {isActive ? 'Ativo' : 'Inativo'}
        </button>
      </div>

      <div className="text-xs text-gray-500">
        Última verificação: {lastCheck ? lastCheck.toLocaleTimeString() : '--:--'}
        {countdown !== null && (
          <div className="mt-1 text-red-400">
            Alerta em: {countdown} segundos
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={showModal}
        title="Detecção de Queda"
        message={`Detectamos uma possível queda. Você está bem? Se não responder em ${countdown} segundos, alertaremos seus contatos.`}
        confirmText="Estou Bem"
        onConfirm={handleCancelFall}
        onCancel={handleConfirmFall}
      />
    </div>
  );
};

export default FallDetection; 