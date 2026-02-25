import React, { createContext, useContext, useState } from 'react';

type UserRole = 'judge' | 'team-lead' | 'team-member' | null;

interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  teamId?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (
  email: string,
  password: string,
  role: UserRole
) => {

  console.log("LOGIN PAYLOAD:", {email,
  password,
  role});

  const res = await fetch(
    "http://localhost:5000/api/auth/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    }
  );

  const data = await res.json();

  if (!res.ok) throw new Error(data.msg);

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  setUser(data.user);
};

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
