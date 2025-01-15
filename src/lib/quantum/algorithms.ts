import { Complex } from '../types/quantum';

export class QuantumAlgorithms {
  private readonly SQRT_2_INV: number = 1 / Math.sqrt(2);
  private readonly PI_4: number = Math.PI / 4;
  
  // Quantum Fourier Transform implementation
  public quantumFourierTransform(amplitudes: Complex[]): Complex[] {
    const N = amplitudes.length;
    const result: Complex[] = new Array(N).fill({ real: 0, imag: 0 });
    
    for (let k = 0; k < N; k++) {
      for (let n = 0; n < N; n++) {
        const angle = (2 * Math.PI * k * n) / N;
        const expTerm = {
          real: Math.cos(angle),
          imag: -Math.sin(angle)
        };
        result[k] = this.addComplex(
          result[k],
          this.multiplyComplex(amplitudes[n], expTerm)
        );
      }
      result[k] = this.scaleComplex(result[k], 1 / Math.sqrt(N));
    }
    
    return result;
  }

  // Grover's Algorithm utilities
  public groverDiffusion(state: Complex[]): Complex[] {
    const N = state.length;
    const average = state.reduce(
      (acc, val) => this.addComplex(acc, this.scaleComplex(val, 1 / N)),
      { real: 0, imag: 0 }
    );
    
    return state.map(amplitude => {
      const scaled = this.scaleComplex(average, 2);
      return this.subtractComplex(
        this.scaleComplex(scaled, N),
        amplitude
      );
    });
  }

  // Shor's Algorithm primality test helper
  public modularExponentiation(base: number, exponent: number, modulus: number): number {
    if (modulus === 1) return 0;
    
    let result = 1;
    base = base % modulus;
    
    while (exponent > 0) {
      if (exponent & 1) {
        result = (result * base) % modulus;
      }
      base = (base * base) % modulus;
      exponent = exponent >> 1;
    }
    
    return result;
  }

  // Quantum Phase Estimation
  public quantumPhaseEstimation(
    unitary: (state: Complex[]) => Complex[],
    eigenstate: Complex[],
    precision: number
  ): number {
    const n = Math.ceil(Math.log2(1 / precision));
    let phase = 0;
    
    for (let k = 0; k < n; k++) {
      const power = Math.pow(2, k);
      let currentState = eigenstate;
      
      for (let i = 0; i < power; i++) {
        currentState = unitary(currentState);
      }
      
      const measurement = this.measurePhase(currentState);
      phase += measurement * Math.pow(2, -(k + 1));
    }
    
    return phase;
  }

  // Quantum Error Correction using Steane code
  public steaneEncode(qubit: Complex): Complex[] {
    const encoded = new Array(7).fill({ real: 0, imag: 0 });
    const logicalZero = this.createLogicalZero();
    const logicalOne = this.createLogicalOne();
    
    return encoded.map((_, i) => 
      this.addComplex(
        this.scaleComplex(logicalZero[i], qubit.real),
        this.scaleComplex(logicalOne[i], qubit.imag)
      )
    );
  }

  // Quantum Teleportation protocol
  public quantumTeleport(
    state: Complex,
    bellPair: [Complex, Complex]
  ): { measurements: [number, number], finalState: Complex } {
    const bellMeasurement = this.performBellMeasurement(state, bellPair[0]);
    const correctedState = this.applyTeleportationCorrections(
      bellPair[1],
      bellMeasurement
    );
    
    return {
      measurements: bellMeasurement,
      finalState: correctedState
    };
  }

  // Advanced matrix operations for quantum circuits
  private tensorProduct(a: Complex[][], b: Complex[][]): Complex[][] {
    const result: Complex[][] = [];
    
    for (let i = 0; i < a.length * b.length; i++) {
      result[i] = [];
      for (let j = 0; j < a[0].length * b[0].length; j++) {
        const a_i = Math.floor(i / b.length);
        const a_j = Math.floor(j / b[0].length);
        const b_i = i % b.length;
        const b_j = j % b[0].length;
        
        result[i][j] = this.multiplyComplex(
          a[a_i][a_j],
          b[b_i][b_j]
        );
      }
    }
    
    return result;
  }

  // Quantum Circuit Simulation utilities
  private createLogicalZero(): Complex[] {
    return [
      { real: 1, imag: 0 },
      { real: 0, imag: 0 },
      { real: 0, imag: 0 },
      { real: 0, imag: 0 },
      { real: 0, imag: 0 },
      { real: 0, imag: 0 },
      { real: 0, imag: 0 }
    ];
  }

  private createLogicalOne(): Complex[] {
    return [
      { real: 0, imag: 0 },
      { real: 0, imag: 0 },
      { real: 0, imag: 0 },
      { real: 1, imag: 0 },
      { real: 0, imag: 0 },
      { real: 0, imag: 0 },
      { real: 0, imag: 0 }
    ];
  }

  private performBellMeasurement(
    state: Complex,
    entangledQubit: Complex
  ): [number, number] {
    const measurement1 = Math.random() < Math.pow(state.real, 2) ? 1 : 0;
    const measurement2 = Math.random() < Math.pow(entangledQubit.real, 2) ? 1 : 0;
    return [measurement1, measurement2];
  }

  private applyTeleportationCorrections(
    qubit: Complex,
    measurements: [number, number]
  ): Complex {
    let corrected = { ...qubit };
    
    if (measurements[1]) {
      corrected = this.pauliX(corrected);
    }
    if (measurements[0]) {
      corrected = this.pauliZ(corrected);
    }
    
    return corrected;
  }

  // Quantum Gates
  private pauliX(qubit: Complex): Complex {
    return {
      real: qubit.imag,
      imag: qubit.real
    };
  }

  private pauliZ(qubit: Complex): Complex {
    return {
      real: qubit.real,
      imag: -qubit.imag
    };
  }

  // Complex number operations
  private addComplex(a: Complex, b: Complex): Complex {
    return {
      real: a.real + b.real,
      imag: a.imag + b.imag
    };
  }

  private subtractComplex(a: Complex, b: Complex): Complex {
    return {
      real: a.real - b.real,
      imag: a.imag - b.imag
    };
  }

  private multiplyComplex(a: Complex, b: Complex): Complex {
    return {
      real: a.real * b.real - a.imag * b.imag,
      imag: a.real * b.imag + a.imag * b.real
    };
  }

  private scaleComplex(a: Complex, scalar: number): Complex {
    return {
      real: a.real * scalar,
      imag: a.imag * scalar
    };
  }

  private measurePhase(state: Complex[]): number {
    const probability = state.reduce(
      (acc, val) => acc + Math.pow(val.real, 2) + Math.pow(val.imag, 2),
      0
    );
    
    const normalizedState = state.map(val => 
      this.scaleComplex(val, 1 / Math.sqrt(probability))
    );
    
    return Math.atan2(
      normalizedState[0].imag,
      normalizedState[0].real
    ) / (2 * Math.PI);
  }
}