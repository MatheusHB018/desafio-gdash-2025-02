import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

interface AuthUser {
  email: string;
  name: string;
  id: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar usuário do localStorage e validar token
  useEffect(() => {
    const checkAuth = async () => {
      const stored = localStorage.getItem("auth_user");
      const token = localStorage.getItem("access_token");

      if (stored && token) {
        try {
          // Validar token fazendo uma requisição
          const response = await fetch(`${API_URL}/users`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.ok) {
            setUser(JSON.parse(stored));
          } else {
            localStorage.removeItem("auth_user");
            localStorage.removeItem("access_token");
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          localStorage.removeItem("auth_user");
          localStorage.removeItem("access_token");
        }
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      try {
        const response = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Login falhou");
        }

        const data = await response.json();
        const newUser: AuthUser = {
          email,
          name: email.split("@")[0],
          id: data.sub || email,
        };

        setUser(newUser);
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("auth_user", JSON.stringify(newUser));

        return true;
      } catch (error) {
        console.error("Login error:", error);
        return false;
      }
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("auth_user");
    localStorage.removeItem("access_token");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
