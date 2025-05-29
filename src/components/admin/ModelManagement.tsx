
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';

interface Model {
  id: string;
  version: string;
  description: string;
  availability: string;
}

export const ModelManagement = () => {
  const [models, setModels] = useState<Model[]>([
    { id: '1', version: '1.0', description: 'Оригінальна модель', availability: 'Скрита' },
    { id: '2', version: '1.1', description: 'Оригінальна модель + донавчання проектами 03.2025', availability: 'Активна' },
  ]);

  const handleDeleteModel = (id: string) => {
    setModels(models.filter(m => m.id !== id));
  };

  const handleAvailabilityChange = (id: string, availability: string) => {
    setModels(models.map(m => m.id === id ? { ...m, availability } : m));
  };

  const availabilityOptions = ['Скрита', 'Активна', 'Архівна'];

  return (
    <div className="p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">Управління моделями</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Models List */}
        <div className="space-y-4">
          {models.map((model) => (
            <div key={model.id} className="grid grid-cols-4 gap-4 items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Версія</label>
                <div className="p-2 bg-white rounded border font-mono">{model.version}</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Опис</label>
                <div className="p-2 bg-white rounded border text-sm">{model.description}</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Доступність</label>
                <Select value={model.availability} onValueChange={(value) => handleAvailabilityChange(model.id, value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availabilityOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => handleDeleteModel(model.id)} className="bg-red-600 hover:bg-red-700">
                  <Trash2 className="w-4 h-4 mr-1" />
                  Видалити
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Model Statistics */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Статистика моделей</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{models.length}</div>
              <div className="text-sm text-gray-600">Всього моделей</div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {models.filter(m => m.availability === 'Активна').length}
              </div>
              <div className="text-sm text-gray-600">Активних моделей</div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">
                {models.filter(m => m.availability === 'Скрита').length}
              </div>
              <div className="text-sm text-gray-600">Прихованих моделей</div>
            </div>
          </div>
        </div>
      </CardContent>
    </div>
  );
};
