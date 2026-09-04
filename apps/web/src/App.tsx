import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SyncEngineProvider } from "./core/sync/SyncEngine";
import { MainApp } from "./features/MainApp";
import { DesignSystemPage } from "./core/design-system/DesignSystemPage";
import { AppLayout } from "./components/layout/AppLayout";
import { LoginForm } from "./features/auth/components/LoginForm";
import { authClient } from "./features/auth/model/useAuth";
import { SettingsPage } from "./features/settings/SettingsPage";
import { ToastProvider } from "@jqbtx/ui";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initSession = async () => {
      const isValid = await authClient.checkSession();
      setIsAuthenticated(isValid);
      setIsInitializing(false);
    };

    initSession();
  }, []);

  if (isInitializing) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <div className="text-muted animate-pulse font-medium tracking-widest text-sm uppercase">
          Waking up node...
        </div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          {/* === LOGGED-OUT/PUBLIC ROUTES === */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <LoginForm onLoginSuccess={() => setIsAuthenticated(true)} />
              )
            }
          />

          {/* === LOGGED-IN ROUTES === */}
          <Route
            element={
              isAuthenticated ? (
                <SyncEngineProvider>
                  <AppLayout />
                </SyncEngineProvider>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          >
            <Route path="/" element={<MainApp />} />
            <Route path="/status/:statusId" element={<MainApp />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/category/:categoryName" element={<MainApp />} />
            <Route path="/tag/:tagName" element={<MainApp />} />
          </Route>

          {/* === DEV ROUTES === */}
          <Route path="/design-system" element={<DesignSystemPage />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}
