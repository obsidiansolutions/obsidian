import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiAI {
  private genAI: GoogleGenerativeAI;
  private model: any;
  private chat: any;
  private history: Array<{ role: string; parts: string }> = [];

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    this.initChat();
  }

  private async initChat() {
    this.chat = this.model.startChat({
      history: this.history,
      generationConfig: {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      },
    });
  }

  public async sendMessage(message: string): Promise<string> {
    try {
      const result = await this.chat.sendMessage(message);
      const response = await result.response;
      const text = response.text();
      
      this.history.push(
        { role: "user", parts: message },
        { role: "model", parts: text }
      );

      return text;
    } catch (error) {
      console.error('Error in Gemini API:', error);
      throw new Error('Failed to get response from Gemini');
    }
  }

  public getHistory(): Array<{ role: string; parts: string }> {
    return this.history;
  }

  public async enhanceWithQuantumContext(message: string, quantumState: any): Promise<string> {
    const contextEnhancedPrompt = `
      [Quantum Context]
      Current Quantum State:
      - Qubits: ${quantumState.qubits.join(', ')}
      - Superposition: ${quantumState.superposition}
      - Entanglement Level: ${quantumState.entanglement}
      - Coherence: ${quantumState.coherence}

      User Query: ${message}

      Please provide insights considering the current quantum state.
    `;

    return this.sendMessage(contextEnhancedPrompt);
  }
}