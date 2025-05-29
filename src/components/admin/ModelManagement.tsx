import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2 } from 'lucide-react';

interface Model {
  id: string;
  version: string;
  description: string;
  availability: string;
}

interface TrainingProject {
  id: string;
  code: string;
  checked: boolean;
}

export const ModelManagement = () => {
  const [models, setModels] = useState<Model[]>([
    { id: '1', version: '1.0', description: 'Оригінальна модель', availability: 'Скрита' },
    { id: '2', version: '1.1', description: 'Оригінальна модель + донавчання проектами 03.2025', availability: 'Активна' },
  ]);

  const [trainingData, setTrainingData] = useState({
    preTrainingVersion: '1.1',
    preTrainingDescription: 'Оригінальна модель + донавчання проектами 03.2025',
    postTrainingVersion: '1.2',
    description: 'Free text',
    startDate: '01.04.2025',
    endDate: '30.04.2025',
    accuracy: '90%'
  });

  const [trainingProjects, setTrainingProjects] = useState<TrainingProject[]>([
    { id: '1', code: '01234567.X1', checked: true },
    { id: '2', code: '01234567.X2', checked: false },
    { id: '3', code: '01234568.X2', checked: false },
    { id: '4', code: '01234569.X1', checked: false },
    { id: '5', code: '01234569.X2', checked: false },
    { id: '6', code: '01234565.X1', checked: false },
    { id: '7', code: '01234565.X2', checked: false },
    { id: '8', code: '01234565.X3', checked: false },
    { id: '9', code: '01234565.X4', checked: false },
    { id: '10', code: '01234565.X5', checked: false },
  ]);

  const [trainingVariants, setTrainingVariants] = useState([
    { id: '1', name: 'Варіант №1', description: 'Оригінальний датасет + нові проекти', checked: true },
    { id: '2', name: 'Варіант №2', description: 'Вибірка з оригінального датасету + нові проекти', checked: false },
    { id: '3', name: 'Варіант №3', description: 'Тільки нові проекти', checked: false },
  ]);

  const [trainingModules, setTrainingModules] = useState([
    { id: '1', name: 'Модуль Mount', description: 'Визначення спорядженості', checked: true },
    { id: '2', name: 'Модуль Rail Part Number', description: 'Вибір монтажної рейки', checked: true },
    { id: '3', name: 'Модуль Sorting', description: 'Визначення порядкового номера', checked: true },
  ]);

  const handleDeleteModel = (id: string) => {
    setModels(models.filter(m => m.id !== id));
  };

  const handleAvailabilityChange = (id: string, availability: string) => {
    setModels(models.map(m => m.id === id ? { ...m, availability } : m));
  };

  const handleProjectCheck = (id: string, checked: boolean) => {
    setTrainingProjects(trainingProjects.map(p => 
      p.id === id ? { ...p, checked } : p
    ));
  };

  const handleVariantCheck = (id: string, checked: boolean) => {
    setTrainingVariants(trainingVariants.map(v => 
      v.id === id ? { ...v, checked } : v
    ));
  };

  const handleModuleCheck = (id: string, checked: boolean) => {
    setTrainingModules(trainingModules.map(m => 
      m.id === id ? { ...m, checked } : m
    ));
  };

  const handleSelectAll = () => {
    const allChecked = trainingProjects.every(p => p.checked);
    setTrainingProjects(trainingProjects.map(p => ({ ...p, checked: !allChecked })));
  };

  const availabilityOptions = ['Скрита', 'Активна', 'Архівна'];

  return (
    <div className="p-6 space-y-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">Управління моделями</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Existing Models List */}
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
                  Видалити
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Model Training Section */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">Тренування моделі</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Training Configuration */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Версія моделі для донавчання</label>
                <Select value={trainingData.preTrainingVersion} onValueChange={(value) => setTrainingData({...trainingData, preTrainingVersion: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1.1">1.1</SelectItem>
                    <SelectItem value="1.0">1.0</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-sm text-gray-600 mt-1">{trainingData.preTrainingDescription}</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Версія моделі після донавчання</label>
                <Input 
                  value={trainingData.postTrainingVersion}
                  onChange={(e) => setTrainingData({...trainingData, postTrainingVersion: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Опис</label>
              <Input 
                value={trainingData.description}
                onChange={(e) => setTrainingData({...trainingData, description: e.target.value})}
                className="bg-gray-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Початок періоду</label>
                <Input 
                  value={trainingData.startDate}
                  onChange={(e) => setTrainingData({...trainingData, startDate: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Кінець періоду</label>
                <Input 
                  value={trainingData.endDate}
                  onChange={(e) => setTrainingData({...trainingData, endDate: e.target.value})}
                />
              </div>
            </div>

            {/* Training Projects */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800">Проекти, що будуть використані для навчання</h3>
                <Button onClick={handleSelectAll} variant="outline" className="text-blue-600 border-blue-600">
                  Вибрати все
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {trainingProjects.map((project) => (
                  <div key={project.id} className="flex items-center space-x-3">
                    <Checkbox
                      checked={project.checked}
                      onCheckedChange={(checked) => handleProjectCheck(project.id, checked as boolean)}
                    />
                    <span className="text-sm text-gray-700">{project.code}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Training Type */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Тип навчання</h3>
              
              <div className="space-y-3">
                {trainingVariants.map((variant) => (
                  <div key={variant.id} className="flex items-start space-x-3">
                    <Checkbox
                      checked={variant.checked}
                      onCheckedChange={(checked) => handleVariantCheck(variant.id, checked as boolean)}
                    />
                    <div>
                      <div className="font-medium text-sm text-gray-800">{variant.name}</div>
                      <div className="text-xs text-gray-600">{variant.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Training Scope */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Обсяг навчання</h3>
              
              <div className="grid grid-cols-3 gap-4">
                {trainingModules.map((module) => (
                  <div key={module.id} className="flex items-start space-x-3">
                    <Checkbox
                      checked={module.checked}
                      onCheckedChange={(checked) => handleModuleCheck(module.id, checked as boolean)}
                    />
                    <div>
                      <div className="font-medium text-sm text-gray-800">{module.name}</div>
                      <div className="text-xs text-gray-600">{module.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Training Button and Status */}
            <div className="flex items-center justify-between pt-6 border-t">
              <div className="flex items-center space-x-2 text-green-600">
                <div className="w-4 h-4 bg-green-100 rounded flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-600 rounded"></div>
                </div>
                <span className="text-sm">Тренування моделі завершено. Точність по бенчмарку 90%</span>
              </div>
              
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                Тренувати модель
              </Button>
            </div>
          </CardContent>
        </Card>

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
