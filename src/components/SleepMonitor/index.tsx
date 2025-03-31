import React, { useState, useEffect } from 'react';

interface SleepData {
  status: 'dormindo' | 'acordado' | 'nao_monitorando';
  inicioSono: string | null;
  ultimoSono: {
    duracao: string | null;
    qualidade: number;
    movimentos: number;
  };
}

const SleepMonitor: React.FC = () => {
  const [sleepData, setSleepData] = useState<SleepData>({
    status: 'nao_monitorando',
    inicioSono: null,
    ultimoSono: {
      duracao: null,
      qualidade: 0,
      movimentos: 0
    }
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const calcularDuracao = (inicio: string): string => {
    const inicioDate = new Date(inicio);
    const fimDate = new Date();
    const diferencaMs = fimDate.getTime() - inicioDate.getTime();
    
    const horas = Math.floor(diferencaMs / (1000 * 60 * 60));
    const minutos = Math.floor((diferencaMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
  };

  const formatarHora = (dataString: string): string => {
    if (!mounted) return '--:--';
    const data = new Date(dataString);
    return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const iniciarMonitoramento = () => {
    setSleepData({
      status: 'dormindo',
      inicioSono: new Date().toISOString(),
      ultimoSono: {
        duracao: null,
        qualidade: 0,
        movimentos: 0
      }
    });
  };

  const pararMonitoramento = () => {
    if (sleepData.inicioSono) {
      const duracao = calcularDuracao(sleepData.inicioSono);
      const qualidade = Math.floor(Math.random() * 5) + 1;
      const movimentos = Math.floor(Math.random() * 20);

      setSleepData({
        status: 'acordado',
        inicioSono: null,
        ultimoSono: {
          duracao,
          qualidade,
          movimentos
        }
      });
    }
  };

  if (!mounted) {
    return (
      <div className="bg-indigo-900 p-4 rounded-lg text-white">
        <h3 className="text-lg font-semibold mb-2">Monitoramento do Sono</h3>
        <div className="text-sm">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="bg-indigo-900 p-4 rounded-lg text-white">
      <h3 className="text-lg font-semibold mb-2">Monitoramento do Sono</h3>
      
      <div className="space-y-3">
        {/* Status atual */}
        <div className="text-sm">
          <span className="text-indigo-300">Status: </span>
          <span className="font-medium">
            {sleepData.status === 'dormindo' ? 'Dormindo' : 
             sleepData.status === 'acordado' ? 'Acordado' : 
             'Não monitorando'}
          </span>
          {sleepData.status === 'dormindo' && sleepData.inicioSono && (
            <div className="text-xs text-indigo-300 mt-1">
              Início: {formatarHora(sleepData.inicioSono)}
            </div>
          )}
        </div>

        {/* Último sono */}
        {sleepData.ultimoSono.duracao && (
          <div className="bg-indigo-800 p-2 rounded">
            <div className="text-sm mb-1">Último Sono:</div>
            <div className="text-xs space-y-1">
              <div>Duração: {sleepData.ultimoSono.duracao}</div>
              <div>Qualidade: {'⭐'.repeat(sleepData.ultimoSono.qualidade)}</div>
              <div>Movimentos: {sleepData.ultimoSono.movimentos}</div>
            </div>
          </div>
        )}

        {/* Botão de ação */}
        <button
          onClick={sleepData.status === 'dormindo' ? pararMonitoramento : iniciarMonitoramento}
          className="w-full py-2 px-4 rounded bg-indigo-600 hover:bg-indigo-700 transition-colors"
        >
          {sleepData.status === 'dormindo' ? 'Acordei' : 'Vou Dormir'}
        </button>
      </div>
    </div>
  );
};

export default SleepMonitor; 