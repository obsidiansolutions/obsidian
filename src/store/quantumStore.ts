import { create } from 'zustand';
import { QuantumState } from '../types/quantum';

interface QuantumStore {
  quantumState: QuantumState;
  updateQuantumState: (state: Partial<QuantumState>) => void;
  resetQuantumState: () => void;
}

const initialState: QuantumState = {
  qubits: Array(4).fill(0),
  superposition: false,
  entanglement: 0,
  coherence: 1.0
};

export const useQuantumStore = create<QuantumStore>((set) => ({
  quantumState: initialState,
  updateQuantumState: (newState) =>
    set((state) => ({
      quantumState: { ...state.quantumState, ...newState },
    })),
  resetQuantumState: () => set({ quantumState: initialState }),
}));