import React from 'react';
import { Route, Routes } from 'react-router';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage.jsx';
import CreatePage from './pages/CreatePage.jsx';
import NoteDetailPage from './pages/NoteDetailPage.jsx';

const App = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/note/:id" element={<NoteDetailPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
