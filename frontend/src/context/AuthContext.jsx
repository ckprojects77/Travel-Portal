import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../utils/api";

const AuthContext = createContext(null);

function readStoredToken() {
  try {
    return JSON.parse(localStorage.getItem("wanderly_token") || "null");
  } catch {
    return null;
  }
}

// Admin verification is intentionally sessionStorage, not localStorage:
// closing the tab/browser requires re-entering the admin code next time,
// even though the login token itself (in localStorage) persists longer.
function readAdminVerified() {
  return sessionStorage.getItem("wanderly_admin_verified") === "true";
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(readStoredToken);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adminVerified, setAdminVerified] = useState(readAdminVerified);

  const persistToken = (t) => {
    if (t) localStorage.setItem("wanderly_token", JSON.stringify(t));
    else localStorage.removeItem("wanderly_token");
    setToken(t);
  };

  useEffect(() => {
    let cancelled = false;
    async function loadUser() {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const data = await api.get("/auth/me", { auth: true });
        if (!cancelled) {
          setUser(data.user);
          if (data.user.role !== "admin") {
            sessionStorage.removeItem("wanderly_admin_verified");
            setAdminVerified(false);
          }
        }
      } catch {
        if (!cancelled) {
          persistToken(null);
          setUser(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadUser();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const login = useCallback(async (email, password) => {
    const data = await api.post("/auth/login", { email, password });
    persistToken(data.token);
    setUser(data.user);
    return data.user;
  }, []);

  const register = useCallback(async (name, email, password, phone) => {
    const data = await api.post("/auth/register", { name, email, password, phone });
    persistToken(data.token);
    setUser(data.user);
    return data.user;
  }, []);

  const logout = useCallback(() => {
    persistToken(null);
    setUser(null);
    sessionStorage.removeItem("wanderly_admin_verified");
    setAdminVerified(false);
  }, []);

  const verifyAdminCode = useCallback(async (code) => {
    await api.post("/auth/verify-admin-secret", { code }, { auth: true });
    sessionStorage.setItem("wanderly_admin_verified", "true");
    setAdminVerified(true);
  }, []);

  const updateProfile = useCallback(async (updates) => {
    const data = await api.put("/auth/me", updates, { auth: true });
    setUser(data.user);
    return data.user;
  }, []);

  const toggleSaved = useCallback(async (destinationId) => {
    const data = await api.post(`/auth/me/saved/${destinationId}`, {}, { auth: true });
    setUser((u) => (u ? { ...u, savedDestinations: data.savedDestinations } : u));
    return data.savedDestinations;
  }, []);

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    adminVerified,
    loading,
    login,
    register,
    logout,
    updateProfile,
    toggleSaved,
    verifyAdminCode,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
