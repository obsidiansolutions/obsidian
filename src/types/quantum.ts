export interface Complex {
  real: number;
  imag: number;
}

export interface QuantumState {
  qubits: number[];
  superposition: boolean;
  entanglement: number;
  coherence: number;
}

export interface QuantumCircuit {
  gates: QuantumGate[];
  depth: number;
  width: number;
}

export interface QuantumGate {
  type: 'H' | 'X' | 'Y' | 'Z' | 'CNOT' | 'RX' | 'RY' | 'RZ' | 'T' | 'S';
  target: number;
  control?: number;
  angle?: number;
}

export interface AIModel {
  type: 'quantum' | 'classical' | 'hybrid';
  parameters: number;
  layers: number;
  accuracy: number;
  loss: number;
}

export interface ProcessingResult {
  state: QuantumState;
  probability: number;
  confidence: number;
  executionTime: number;
}

export interface QuantumObservable {
  operator: Complex[][];
  expectationValue: number;
}

export interface DecoherenceParameters {
  T1: number;  // Relaxation time
  T2: number;  // Dephasing time
  temperature: number;
  environmentalNoise: number;
}

export interface QuantumOptimizationResult {
  parameters: number[];
  cost: number;
  iterations: number;
  convergence: boolean;
}

export interface EntanglementMetrics {
  vonNeumannEntropy: number;
  concurrence: number;
  mutualInformation: number;
}

export type WaveFunctionType = {
  amplitudes: Complex[];
  phases: number[];
  normalization: number;
};