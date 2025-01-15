import React from 'react';
import { Cpu, Maximize2 } from 'lucide-react';
import { QuantumCircuit, QuantumGate } from '../types/quantum';

interface Props {
  circuit: QuantumCircuit;
  onGateClick?: (gate: QuantumGate) => void;
}

export const QuantumCircuitVisualizer: React.FC<Props> = ({ circuit, onGateClick }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Cpu className="w-6 h-6" />
          Quantum Circuit Visualization
        </h3>
        <button className="text-gray-400 hover:text-white">
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>
      
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${circuit.width}, 1fr)` }}>
        {circuit.gates.map((gate, idx) => (
          <div
            key={idx}
            onClick={() => onGateClick?.(gate)}
            className="bg-gray-800 p-3 rounded text-center cursor-pointer hover:bg-gray-700 transition-colors"
          >
            <span className="text-blue-400 font-mono">{gate.type}</span>
            <div className="text-gray-400 text-sm">
              Q{gate.target}{gate.control !== undefined ? ` C${gate.control}` : ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};