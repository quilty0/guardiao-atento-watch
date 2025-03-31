'use client';

import React, { useState, useEffect } from 'react';
import VitalCard from '../VitalCard';
import MonitorIcon from '../MonitorIcon';
import ConfirmationModal from '../ConfirmationModal';
import FallDetection from '../FallDetection';
import MedicationReminder from '../MedicationReminder';
import SleepMonitor from '../SleepMonitor';

interface VitalSigns {
  heartRate: number;
  bloodPressure: { systolic: number; diastolic: number };
  temperature: number;
  oxygenation: number;
}

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
}

interface Medication {
  id: string;
  name: string;
  time: string;
  instructions: string;
  taken: boolean;
}

interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
}

interface ModalState {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  onConfirm: () => void;
}

const PatientView = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [vitalSigns, setVitalSigns] = useState<VitalSigns>({
    heartRate: 78,
    bloodPressure: { systolic: 120, diastolic: 80 },
    temperature: 36.8,
    oxygenation: 96
  });

  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    {
      id: '1',
      name: 'Maria Silva',
      relationship: 'Filha',
      phone: '(11) 98765-4321'
    },
    {
      id: '2',
      name: 'João Santos',
      relationship: 'Filho',
      phone: '(11) 91234-5678'
    }
  ]);

  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      name: 'Pressão Alta',
      time: '08:00',
      instructions: 'Tomar com água',
      taken: false
    },
    {
      id: '2',
      name: 'Diabetes',
      time: '12:00',
      instructions: 'Tomar após o almoço',
      taken: false
    }
  ]);

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      title: 'Consulta Cardiologista',
      date: '10/04/2024',
      time: '14:00',
      location: 'Hospital São Lucas'
    }
  ]);

  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    title: '',
    message: '',
    confirmText: '',
    onConfirm: () => {},
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      setCurrentTime(timeStr);

      // Simula atualização dos sinais vitais a cada 3 segundos
      if (now.getSeconds() % 3 === 0) {
        setVitalSigns(prev => ({
          ...prev,
          heartRate: Math.floor(75 + Math.random() * 6),
          oxygenation: Math.floor(94 + Math.random() * 3),
          temperature: Number((36.5 + Math.random() * 0.5).toFixed(1))
        }));
      }

      // Verifica medicamentos
      medications.forEach(med => {
        if (med.time === timeStr && !med.taken) {
          alert(`Hora de tomar o remédio: ${med.name}\n${med.instructions}`);
        }
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [medications]);

  const handleSOS = () => {
    setModalState({
      isOpen: true,
      title: 'Confirmação de Emergência',
      message: 'Você está prestes a acionar o serviço de emergência. Deseja continuar?',
      confirmText: 'Confirmar Emergência',
      onConfirm: () => {
        const message = `EMERGÊNCIA ATIVADA!\n\nContatos sendo notificados:\n${emergencyContacts.map(contact => `${contact.name} - ${contact.phone}`).join('\n')}`;
        alert(message);
        setModalState(prev => ({ ...prev, isOpen: false }));
      },
    });
  };

  const handleMedicationTaken = (medId: string) => {
    setMedications(prev => 
      prev.map(med => 
        med.id === medId ? { ...med, taken: true } : med
      )
    );
  };

  const handleCallContact = (contact: EmergencyContact) => {
    setModalState({
      isOpen: true,
      title: 'Confirmar Ligação',
      message: `Você está prestes a ligar para ${contact.name} (${contact.relationship}). Deseja continuar?`,
      confirmText: 'Confirmar Ligação',
      onConfirm: () => {
        window.location.href = `tel:${contact.phone}`;
        setModalState(prev => ({ ...prev, isOpen: false }));
      },
    });
  };

  const handleCloseModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const handleEmergencyAlert = (message: string) => {
    const fullMessage = `ALERTA!\n${message}\n\nContatos sendo notificados:\n${emergencyContacts.map(contact => `${contact.name} - ${contact.phone}`).join('\n')}`;
    alert(fullMessage);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Cabeçalho com Hora */}
      <div className="sticky top-0 bg-black p-4 border-b border-gray-800">
        <div className="text-center">
          <div className="text-4xl font-bold">{currentTime}</div>
          <div className="text-sm text-gray-400">
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </div>
        </div>
      </div>

      {/* Conteúdo Principal - Scrollável */}
      <div className="h-[calc(100vh-80px)] overflow-y-auto">
        <div className="p-2 space-y-3">
          {/* Sinais Vitais - Layout 2x2 compacto */}
          <div className="grid grid-cols-2 gap-2">
            <VitalCard
              title="Batimentos"
              value={vitalSigns.heartRate}
              unit="bpm"
              min={60}
              max={100}
              icon="❤️"
              description="Frequência"
              color="text-red-500"
            />
            <VitalCard
              title="Pressão"
              value={`${vitalSigns.bloodPressure.systolic}/${vitalSigns.bloodPressure.diastolic}`}
              unit="mmHg"
              min="90/60"
              max="120/80"
              icon="💧"
              description="Sistólica/Diastólica"
              color="text-blue-500"
            />
            <VitalCard
              title="Temp."
              value={vitalSigns.temperature}
              unit="°C"
              min={36}
              max={37.5}
              icon="🌡️"
              description="Temperatura"
              color="text-yellow-500"
            />
            <VitalCard
              title="Oxig."
              value={vitalSigns.oxygenation}
              unit="%"
              min={95}
              max={100}
              icon="📊"
              description="Saturação"
              color="text-green-500"
            />
          </div>

          {/* Botão SOS e Sensor de Quedas */}
          <div className="space-y-2">
            <button
              onClick={handleSOS}
              className="w-full bg-red-600 text-white py-3 rounded-full text-xl font-bold hover:bg-red-700 transition-colors"
            >
              EMERGÊNCIA
            </button>
            <FallDetection onEmergency={handleEmergencyAlert} />
          </div>

          {/* Seções Colapsáveis */}
          <div className="space-y-3">
            {/* Medicamentos */}
            <div className="bg-gray-900 rounded-lg p-3">
              <h2 className="text-lg font-bold mb-2">Medicamentos</h2>
              <MedicationReminder />
            </div>

            {/* Monitoramento do Sono */}
            <div className="bg-gray-900 rounded-lg p-3">
              <h2 className="text-lg font-bold mb-2">Sono</h2>
              <SleepMonitor />
            </div>

            {/* Contatos de Emergência */}
            <div className="bg-gray-900 rounded-lg p-3">
              <h2 className="text-lg font-bold mb-2">Contatos</h2>
              <div className="space-y-2">
                {emergencyContacts.map((contact) => (
                  <button
                    key={contact.phone}
                    onClick={() => handleCallContact(contact)}
                    className="w-full bg-gray-800 p-2 rounded-lg text-left hover:bg-gray-700 transition-colors"
                  >
                    <div className="font-bold">{contact.name}</div>
                    <div className="text-sm text-gray-400">{contact.relationship}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={modalState.isOpen}
        title={modalState.title}
        message={modalState.message}
        confirmText={modalState.confirmText}
        onConfirm={modalState.onConfirm}
        onCancel={handleCloseModal}
      />
    </div>
  );
};

export default PatientView; 