import React from 'react';
import { Brain, Activity, Gauge } from 'lucide-react';
import { AIModel } from '../types/quantum';

interface Props {
  model: AIModel;
}

export const AIModelStats: React.FC<Props> = ({ model }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-bold text-gray-800">AI Model Statistics</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <Activity className="w-4 h-4" />
            <span>Accuracy</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">
            {(model.accuracy * 100).toFixed(2)}%
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <Gauge className="w-4 h-4" />
            <span>Loss</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">
            {model.loss.toFixed(4)}
          </div>
        </div>

        <div className="col-span-2 bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-gray-600">Type</span>
              <div className="font-semibold capitalize">{model.type}</div>
            </div>
            <div>
              <span className="text-gray-600">Parameters</span>
              <div className="font-semibold">{model.parameters.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};