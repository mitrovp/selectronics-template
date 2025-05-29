
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Rule {
  id: string;
  version: string;
  title: string;
  description: string;
  groups: RuleGroup[];
}

interface RuleGroup {
  id: string;
  name: string;
  items: RuleItem[];
}

interface RuleItem {
  id: string;
  value: string;
  subgroup?: string;
}

export const RulesManagement = () => {
  const [rules, setRules] = useState<Rule[]>([
    {
      id: '1',
      version: '1.1',
      title: 'Best Practices',
      description: 'Випрямлячі → (будь-яка підгрупа)\nПеретворювачі → (будь-яка підгрупа)\n(включаючи випрямлячі, частотні перетворювачі)\nТрансформатори → (будь-яка підгрупа)\nПідсилювачі, регулятори → (будь-яка підгрупа)\n\nБільш важке обладнання розміщується в самому низу шафи.',
      groups: [
        {
          id: 'g1',
          name: 'Група',
          items: [
            { id: 'i1', value: '5' },
            { id: 'i2', value: '13' },
            { id: 'i3', value: '22' },
            { id: 'i4', value: '107' }
          ]
        },
        {
          id: 'g2',
          name: 'Підгрупа',
          items: []
        },
        {
          id: 'g3',
          name: 'Вага',
          items: [
            { id: 'i5', value: '10' }
          ]
        }
      ]
    },
    {
      id: '2',
      version: '1.2',
      title: 'Best Practices',
      description: 'Випрямлячі → (будь-яка підгрупа)\nПеретворювачі → (будь-яка підгрупа)\n(включаючи випрямлячі, частотні перетворювачі)\nТрансформатори → (будь-яка підгрупа)\nПідсилювачі, регулятори → (будь-яка підгрупа)\n\nЯкщо інтервал не вказано, застосовувати інтервал між пристроями — 30 мм',
      groups: [
        {
          id: 'g4',
          name: 'Група',
          items: [
            { id: 'i6', value: '5, 13, 22, 107' }
          ]
        },
        {
          id: 'g5',
          name: 'Підгрупа',
          items: []
        },
        {
          id: 'g6',
          name: 'Відстань',
          items: [
            { id: 'i7', value: '10' }
          ]
        }
      ]
    }
  ]);

  const [editingRule, setEditingRule] = useState<string | null>(null);
  const [newItemValue, setNewItemValue] = useState('');

  const handleEditRule = (ruleId: string) => {
    setEditingRule(editingRule === ruleId ? null : ruleId);
  };

  const handleAddItem = (ruleId: string, groupId: string) => {
    if (!newItemValue.trim()) return;
    
    setRules(rules.map(rule => {
      if (rule.id === ruleId) {
        return {
          ...rule,
          groups: rule.groups.map(group => {
            if (group.id === groupId) {
              return {
                ...group,
                items: [...group.items, {
                  id: Date.now().toString(),
                  value: newItemValue
                }]
              };
            }
            return group;
          })
        };
      }
      return rule;
    }));
    
    setNewItemValue('');
  };

  const handleDeleteItem = (ruleId: string, groupId: string, itemId: string) => {
    setRules(rules.map(rule => {
      if (rule.id === ruleId) {
        return {
          ...rule,
          groups: rule.groups.map(group => {
            if (group.id === groupId) {
              return {
                ...group,
                items: group.items.filter(item => item.id !== itemId)
              };
            }
            return group;
          })
        };
      }
      return rule;
    }));
  };

  return (
    <div className="p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">Управління правилами</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {rules.map((rule) => (
          <Card key={rule.id} className="border-2">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h3 className="text-lg font-semibold">Правило {rule.version}</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {rule.title}
                  </span>
                </div>
                <Button
                  onClick={() => handleEditRule(rule.id)}
                  variant="outline"
                  className="text-blue-600 border-blue-600 hover:bg-blue-50"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Редагувати
                </Button>
              </div>
              <div className="mt-4 text-sm text-gray-700 whitespace-pre-line bg-gray-50 p-4 rounded-lg">
                {rule.description}
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-2 gap-8">
                {rule.groups.map((group, groupIndex) => (
                  <div key={group.id} className="space-y-4">
                    <h4 className="font-medium text-gray-700">{group.name}</h4>
                    
                    <div className="space-y-2">
                      {group.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-2">
                          <div className="flex-1 p-3 bg-gray-100 rounded border">
                            {item.value}
                          </div>
                          <Button
                            onClick={() => handleDeleteItem(rule.id, group.id, item.id)}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4"
                          >
                            Редагувати
                          </Button>
                        </div>
                      ))}
                      
                      {editingRule === rule.id && (
                        <div className="flex items-center space-x-2 pt-2">
                          <Input
                            value={newItemValue}
                            onChange={(e) => setNewItemValue(e.target.value)}
                            placeholder={`Додати до ${group.name.toLowerCase()}`}
                            className="flex-1"
                          />
                          <Button
                            onClick={() => handleAddItem(rule.id, group.id)}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </div>
  );
};
