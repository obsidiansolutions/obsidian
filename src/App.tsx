import React, { useState, useEffect } from 'react';
import { Brain, Cpu } from 'lucide-react';
import { Logo } from './components/Logo';
import { QuantumProcessor } from './lib/quantum/core';
import { QuantumAI } from './lib/ai/quantum-ai';
import { QuantumCircuitVisualizer } from './components/QuantumCircuitVisualizer';
import { AIModelStats } from './components/AIModelStats';
import { ObsidianChatbox } from './components/ObsidianChatbox';
import { QuantumCircuit } from './types/quantum';
import { useQuantumStore } from './store/quantumStore';

function App() {
  const [quantum] = useState(() => new QuantumProcessor(4));
  const [ai] = useState(() => new QuantumAI(5));
  const { updateQuantumState } = useQuantumStore();
  const [circuit] = useState<QuantumCircuit>({
    gates: [
      { type: 'H', target: 0 },
      { type: 'CNOT', target: 1, control: 0 },
      { type: 'X', target: 2 },
      { type: 'H', target: 3 }
    ],
    depth: 4,
    width: 4
  });

  useEffect(() => {
    ai.train(10);
  }, [ai]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Logo className="w-12 h-12" />
            <div>
              <h1 className="text-2xl font-bold">Obsidian</h1>
              <p className="text-gray-400">Advanced Quantum-AI Computing Platform</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800">Quantum Processing</h2>
            </div>
            <QuantumCircuitVisualizer 
              circuit={circuit}
              onGateClick={(gate) => {
                quantum.applyGate(gate);
                const newState = quantum.measure();
                updateQuantumState(newState.state);
                console.log('Applied gate:', gate);
              }}
            />
          </div>

          <div className="space-y-6">
            <AIModelStats model={ai.getModelStats()} />
          </div>

          <div className="md:col-span-2">
            <ObsidianChatbox />
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4">
            <Logo size={32} />
            <p className="text-sm text-gray-400">© 2024 Obsidian AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;