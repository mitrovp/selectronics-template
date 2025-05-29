import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Rule {
  id: string;
  group: string;
  subgroup: string;
  article: string;
}

export const RulesManagement = () => {
  const [rules, setRules] = useState<Rule[]>([
    { id: '1', group: 'Група №1', subgroup: 'Підгрупа №1', article: '1234' },
  ]);

  const [newRule, setNewRule] = useState<Omit<Rule, 'id'>>({
    group: '',
    subgroup: '',
    article: '',
  });

  const [editingRule, setEditingRule] = useState<Rule | null>(null);

  const handleAddRule = () => {
    if (newRule.group && newRule.subgroup && newRule.article) {
      const rule: Rule = {
        ...newRule,
        id: Date.now().toString(),
      };
      setRules([...rules, rule]);
      setNewRule({ group: '', subgroup: '', article: '' });
    }
  };

  const handleEditRule = (rule: Rule) => {
    setEditingRule(rule);
  };

  const handleUpdateRule = () => {
    if (editingRule) {
      setRules(rules.map(r => r.id === editingRule.id ? editingRule : r));
      setEditingRule(null);
    }
  };

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };

  const groupOptions = ['Група №1', 'Група №2', 'Група №3'];
  const subgroupOptions = ['Підгрупа №1', 'Підгрупа №2', 'Підгрупа №3'];

  return (
    <div className="p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">Управління правилами</CardTitle>
        <p className="text-gray-600 mt-2">
          Правило 4.2: Якщо "Номер типу" або "Номер для замовлення" є у списку → аксесуар входить до складу пристрою (і може бути не розміщений у просторі ярлика).
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Existing Rules */}
        <div className="space-y-4">
          {rules.map((rule) => (
            <div key={rule.id} className="grid grid-cols-4 gap-4 items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Група</label>
                {editingRule?.id === rule.id ? (
                  <Select value={editingRule.group} onValueChange={(value) => setEditingRule({ ...editingRule, group: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {groupOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="p-2 bg-white rounded border">{rule.group}</div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Підгрупа</label>
                {editingRule?.id === rule.id ? (
                  <Select value={editingRule.subgroup} onValueChange={(value) => setEditingRule({ ...editingRule, subgroup: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {subgroupOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="p-2 bg-white rounded border">{rule.subgroup}</div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Артикул</label>
                {editingRule?.id === rule.id ? (
                  <Input
                    value={editingRule.article}
                    onChange={(e) => setEditingRule({ ...editingRule, article: e.target.value })}
                    className="w-full"
                  />
                ) : (
                  <div className="p-2 bg-white rounded border">{rule.article}</div>
                )}
              </div>
              
              <div className="flex space-x-2">
                {editingRule?.id === rule.id ? (
                  <>
                    <Button onClick={handleUpdateRule} className="bg-blue-600 hover:bg-blue-700">
                      Зберегти
                    </Button>
                    <Button onClick={() => setEditingRule(null)} variant="outline">
                      Скасувати
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => handleEditRule(rule)} className="bg-blue-600 hover:bg-blue-700">
                      <Edit className="w-4 h-4 mr-1" />
                      Редагувати
                    </Button>
                    <Button onClick={() => handleDeleteRule(rule.id)} className="bg-red-600 hover:bg-red-700">
                      <Trash2 className="w-4 h-4 mr-1" />
                      Видалити
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add New Rule */}
        <div className="grid grid-cols-4 gap-4 items-end p-4 bg-blue-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Група</label>
            <Select value={newRule.group} onValueChange={(value) => setNewRule({ ...newRule, group: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Виберіть групу" />
              </SelectTrigger>
              <SelectContent>
                {groupOptions.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Підгрупа</label>
            <Select value={newRule.subgroup} onValueChange={(value) => setNewRule({ ...newRule, subgroup: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Виберіть підгрупу" />
              </SelectTrigger>
              <SelectContent>
                {subgroupOptions.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Артикул</label>
            <Input
              value={newRule.article}
              onChange={(e) => setNewRule({ ...newRule, article: e.target.value })}
              placeholder="Введіть артикул"
            />
          </div>
          
          <div>
            <Button onClick={handleAddRule} className="bg-blue-600 hover:bg-blue-700 w-full">
              <Plus className="w-4 h-4 mr-2" />
              Додати
            </Button>
          </div>
        </div>
      </CardContent>
    </div>
  );
};
