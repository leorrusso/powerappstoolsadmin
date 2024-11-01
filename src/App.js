import React, { useState, useEffect } from "react";
import { supabase } from "./components/SupabaseClient"; 
import Users from "./components/Users"; 
import CodeSnippets from './components/FXSnippets'; 
import Dashboard from "./components/Dashboard"
import Header from "./components/Header"; 
import Login from './components/Login';
import Sidebar from './components/Sidebar'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

if (process.env.NODE_ENV === 'development') {
  const originalConsoleError = console.error;
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('ResizeObserver loop completed with undelivered notifications')
    ) {
      return;
    }
    originalConsoleError(...args);
  };
}

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check if the user is logged in when the app loads
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for changes in authentication
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe();
  }, []);

  // Logout function
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Logout error:', error.message);
    else setSession(null); // Clear session after successful logout
  };

  // Render the Login component if the user is not logged in
  if (!session) {
    return <Login />;
  }

  // If the user is logged in, render the app with the Header containing the logout button
  return (
    <Router>
      <div>
        {/* Pass the handleLogout function to Header */}
        <Header handleLogout={handleLogout} />
        <div className="flex">
        <Sidebar handleLogout={handleLogout} />
          <div className="flex flex-col w-full h-screen space-y-2">
            <Routes>
              <Route path="/users" element={<Users />} />
              <Route path="/snippets" element={<CodeSnippets />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}