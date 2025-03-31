import React, { useState, useEffect } from 'react';
import ConfirmationModal from '../ConfirmationModal';
import EmergencyCall from '../EmergencyCall';

interface FallDetectionProps {
  onEmergency: (message: string) => void;
}

const DETECTION_INTERVAL = 40; // Intervalo de detecção em segundos
const RESPONSE_TIME = 20; // Tempo para resposta em segundos

const FallDetection: React.FC<FallDetectionProps> = ({ onEmergency }) => {
  const [isActive, setIsActive] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showCall, setShowCall] = useState(false);
  const [isDetecting, setIsDetecting] = useState(true);

  // Inicializa lastCheck apenas no cliente
  useEffect(() => {
    setLastCheck(new Date());
    // Cleanup ao desmontar
    return () => {
      setShowModal(false);
      setShowCall(false);
      setCountdown(null);
    };
  }, []);

  // Simulação de detecção de queda
  useEffect(() => {
    if (isActive && isDetecting) {
      const interval = setInterval(() => {
        const now = new Date();
        setLastCheck(now);
        
        if (now.getSeconds() % DETECTION_INTERVAL === 0) {
          handleFallDetection();
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isActive, isDetecting]);

  // Contador regressivo após detecção
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown !== null) {
      if (countdown > 0) {
        timer = setInterval(() => {
          setCountdown(prev => (prev !== null ? prev - 1 : null));
        }, 1000);
      } else {
        setIsDetecting(false);
        handleConfirmFall();
      }
      return () => {
        clearInterval(timer);
      };
    }
  }, [countdown]);

  const vibrate = (pattern: number[]) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };

  const handleFallDetection = () => {
    if (!showCall) {
      setShowModal(true);
      setCountdown(RESPONSE_TIME);
      vibrate([500, 200, 500]); // Vibração de alerta inicial
    }
  };

  const handleConfirmFall = () => {
    setShowModal(false);
    setCountdown(null);
    setShowCall(true);
    vibrate([1000, 300, 1000, 300, 1000]); // Vibração de emergência
    onEmergency("⚠️ Queda detectada! Iniciando chamada de emergência e enviando localização.");
  };

  const handleCancelFall = () => {
    setShowModal(false);
    setCountdown(null);
    setIsDetecting(true);
    vibrate([200]); // Vibração curta de confirmação
  };

  const handleEndCall = () => {
    setShowCall(false);
    setIsDetecting(true);
    vibrate([200, 200]); // Vibração dupla de finalização
  };

  const toggleSensor = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setLastCheck(new Date());
      setIsDetecting(true);
      vibrate([100]); // Vibração curta de ativação
    }
  };

  return (
    <>
      <div className="bg-gray-800 p-3 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-bold text-gray-400">
            Sensor de Quedas {isActive ? '(Monitorando)' : '(Desativado)'}
          </div>
          <button
            onClick={toggleSensor}
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              isActive
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-red-500 hover:bg-red-600'
            } text-white transition-colors shadow-md`}
          >
            {isActive ? 'Ativo' : 'Inativo'}
          </button>
        </div>

        <div className="text-xs text-gray-500">
          Última verificação: {lastCheck ? lastCheck.toLocaleTimeString() : '--:--'}
          {countdown !== null && (
            <div className="mt-1 text-red-400 font-bold animate-pulse">
              ⚠️ Alerta em: {countdown} segundos
            </div>
          )}
        </div>

        <ConfirmationModal
          isOpen={showModal}
          title="⚠️ Detecção de Queda"
          message={`Detectamos uma possível queda. Você está bem? Se não responder em ${countdown} segundos, iniciaremos uma chamada de emergência.`}
          confirmText="✅ Estou Bem"
          onConfirm={handleCancelFall}
          onCancel={handleConfirmFall}
        />
      </div>

      <EmergencyCall
        isOpen={showCall}
        contactName="Maria (Filha)"
        onClose={handleEndCall}
      />
    </>
  );
};

export default FallDetection; 