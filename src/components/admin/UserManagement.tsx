import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface User {
  id: string;
  login: string;
  password: string;
  role: string;
}

export const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([
    { id: '1', login: 'Admin', password: '1234', role: 'Адміністратор' },
    { id: '2', login: 'User_1', password: '1234', role: 'Користувач' },
  ]);

  const [newUser, setNewUser] = useState<Omit<User, 'id'>>({
    login: '',
    password: '',
    role: '',
  });

  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleAddUser = () => {
    if (newUser.login && newUser.password && newUser.role) {
      const user: User = {
        ...newUser,
        id: Date.now().toString(),
      };
      setUsers([...users, user]);
      setNewUser({ login: '', password: '', role: '' });
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleUpdateUser = () => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
      setEditingUser(null);
    }
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div className="p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">Управління користувачами</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Existing Users */}
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="grid grid-cols-4 gap-4 items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Логін</label>
                {editingUser?.id === user.id ? (
                  <Input
                    value={editingUser.login}
                    onChange={(e) => setEditingUser({ ...editingUser, login: e.target.value })}
                    className="w-full"
                  />
                ) : (
                  <div className="p-2 bg-white rounded border">{user.login}</div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
                {editingUser?.id === user.id ? (
                  <Input
                    value={editingUser.password}
                    onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                    className="w-full"
                  />
                ) : (
                  <div className="p-2 bg-white rounded border">{user.password}</div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Роль</label>
                {editingUser?.id === user.id ? (
                  <Select value={editingUser.role} onValueChange={(value) => setEditingUser({ ...editingUser, role: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Адміністратор">Адміністратор</SelectItem>
                      <SelectItem value="Користувач">Користувач</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="p-2 bg-white rounded border">{user.role}</div>
                )}
              </div>
              
              <div className="flex space-x-2">
                {editingUser?.id === user.id ? (
                  <>
                    <Button onClick={handleUpdateUser} className="bg-blue-600 hover:bg-blue-700">
                      Зберегти
                    </Button>
                    <Button onClick={() => setEditingUser(null)} variant="outline">
                      Скасувати
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => handleEditUser(user)} className="bg-blue-600 hover:bg-blue-700">
                      <Edit className="w-4 h-4 mr-1" />
                      Редагувати
                    </Button>
                    <Button onClick={() => handleDeleteUser(user.id)} className="bg-red-600 hover:bg-red-700">
                      <Trash2 className="w-4 h-4 mr-1" />
                      Видалити
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add New User */}
        <div className="grid grid-cols-4 gap-4 items-end p-4 bg-blue-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Логін</label>
            <Input
              value={newUser.login}
              onChange={(e) => setNewUser({ ...newUser, login: e.target.value })}
              placeholder="Введіть логін"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
            <Input
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              placeholder="Введіть пароль"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Роль</label>
            <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Виберіть роль" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Адміністратор">Адміністратор</SelectItem>
                <SelectItem value="Користувач">Користувач</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Button onClick={handleAddUser} className="bg-blue-600 hover:bg-blue-700 w-full">
              <Plus className="w-4 h-4 mr-2" />
              Додати
            </Button>
          </div>
        </div>
      </CardContent>
    </div>
  );
};
