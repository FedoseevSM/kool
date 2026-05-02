import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './lib/theme';
import { LanguageProvider } from './lib/i18n';
import { AuthProvider, useAuth } from './lib/auth';
import { Layout } from './components/Layout';
import { AuthPage } from './pages/AuthPage';
import { HomePage } from './pages/HomePage';
import { ForumPage } from './pages/ForumPage';
import { TopicPage } from './pages/TopicPage';
// Protected Route wrapper
function ProtectedRoute({ children }: {children: React.ReactNode;}) {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        Loading...
      </div>);

  }
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
}
function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/forum/:slug" element={<ForumPage />} />
        <Route path="/topic/:id" element={<TopicPage />} />
      </Route>
    </Routes>);

}
export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>);

}