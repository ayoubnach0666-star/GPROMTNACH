
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Gallery from './components/Gallery';
import AdminPanel from './components/AdminPanel';
import PromptDetailModal from './components/PromptDetailModal';
import JoinModal from './components/JoinModal';
import Toast from './components/Toast';
import { MOCK_PROMPTS } from './constants';
import { AIPrompt } from './types';

/**
 * MASTER ADMIN FLAG
 * Set to 'true' to enable Admin Access via /admin path.
 * Set to 'false' for Public View only (Production).
 */
const IS_ADMIN = false;

const App: React.FC = () => {
  const [prompts, setPrompts] = useState<AIPrompt[]>(MOCK_PROMPTS);
  const [selectedPrompt, setSelectedPrompt] = useState<AIPrompt | null>(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddPrompt = (newPrompt: AIPrompt) => {
    setPrompts((prev) => [newPrompt, ...prev]);
    showToast("Prompt published successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col transition-opacity duration-1000 opacity-100">
      <Navbar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        isAdmin={IS_ADMIN}
        onJoinClick={() => setIsJoinModalOpen(true)}
      />
      
      <main className="flex-1 relative z-10">
        <Routes>
          {/* PUBLIC GALLERY ROUTE */}
          <Route 
            path="/" 
            element={
              <Gallery 
                prompts={prompts} 
                searchQuery={searchQuery} 
                onViewDetails={setSelectedPrompt}
                onCopy={() => showToast("Directive Copied")}
              />
            } 
          />

          {/* ADMIN ROUTE - Strictly guarded by IS_ADMIN flag */}
          {IS_ADMIN && (
            <Route 
              path="/admin" 
              element={<AdminPanel onAdd={handleAddPrompt} />} 
            />
          )}

          {/* CATCH-ALL REDIRECT: Prevents white screens on broken paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="border-t border-white/5 py-16 px-10 mt-20 bg-black/40 text-center">
        <p className="text-[#8B5E3C] text-[10px] font-bold uppercase tracking-[0.4em]">
          &copy; 2025 G.PROMTNACH &bull; Engineered for Gemini
        </p>
      </footer>

      {/* Shared Modals and Notifications */}
      {selectedPrompt && (
        <PromptDetailModal 
          prompt={selectedPrompt} 
          onClose={() => setSelectedPrompt(null)} 
          onCopy={() => showToast("Directive Copied")}
        />
      )}

      {isJoinModalOpen && (
        <JoinModal onClose={() => setIsJoinModalOpen(false)} />
      )}

      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
};

export default App;
