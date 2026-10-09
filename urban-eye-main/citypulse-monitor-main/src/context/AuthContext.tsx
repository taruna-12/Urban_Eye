import React, { createContext, useContext, useState } from 'react';
import { UserRole } from '@/types/city';

interface AuthContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  userName: string;
}

const AuthContext = createContext<AuthContextType>({
  role: 'citizen',
  setRole: () => {},
  userName: 'Citizen',
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('official');
  const userName = role === 'official' ? 'City Official' : 'Citizen';

  return (
    <AuthContext.Provider value={{ role, setRole, userName }}>
      {children}
    </AuthContext.Provider>
  );
};
