import React, { useState } from 'react';
import ConfirmationModal from '../ConfirmationModal';

interface Medication {
  id: string;
  name: string;
  time: string;
  taken: boolean;
  dosage: string;
}

const MedicationReminder: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      name: 'Pressão Alta',
      time: '08:00',
      taken: false,
      dosage: '1 comprimido'
    },
    {
      id: '2',
      name: 'Vitamina D',
      time: '12:00',
      taken: false,
      dosage: '2 gotas'
    },
    {
      id: '3',
      name: 'Diabetes',
      time: '20:00',
      taken: false,
      dosage: '1 comprimido'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedMed, setSelectedMed] = useState<Medication | null>(null);

  const handleMedicationClick = (med: Medication) => {
    if (!med.taken) {
      setSelectedMed(med);
      setShowModal(true);
    }
  };

  const handleConfirmMedication = () => {
    if (selectedMed) {
      setMedications(meds =>
        meds.map(med =>
          med.id === selectedMed.id ? { ...med, taken: true } : med
        )
      );
      setShowModal(false);
      setSelectedMed(null);
    }
  };

  const handleCancelMedication = () => {
    setShowModal(false);
    setSelectedMed(null);
  };

  return (
    <div className="space-y-2">
      {medications.map(med => (
        <div
          key={med.id}
          onClick={() => handleMedicationClick(med)}
          className={`bg-gray-800 rounded-lg transition-colors cursor-pointer ${
            med.taken 
              ? 'border-l-4 border-green-500' 
              : 'border-l-4 border-yellow-500 hover:bg-gray-700'
          }`}
        >
          <div className="p-2">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">{med.time}</div>
              <div className={`text-xs font-semibold ${
                med.taken
                  ? 'text-green-400'
                  : 'text-yellow-400'
              }`}>
                {med.taken ? '✓ Tomado' : '⏰ Pendente'}
              </div>
            </div>
            
            <div className="text-sm text-gray-400">{med.name}</div>
            <div className="text-xs text-gray-500">{med.dosage}</div>
          </div>
        </div>
      ))}

      <ConfirmationModal
        isOpen={showModal}
        title="Confirmar Medicação"
        message={selectedMed ? `Confirmar que tomou ${selectedMed.name} (${selectedMed.dosage})?` : ''}
        confirmText="Confirmar"
        onConfirm={handleConfirmMedication}
        onCancel={handleCancelMedication}
      />
    </div>
  );
};

export default MedicationReminder; 