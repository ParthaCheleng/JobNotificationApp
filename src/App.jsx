import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PlaceholderPage from './pages/PlaceholderPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PlaceholderPage title="Dashboard" />} />
          <Route path="dashboard" element={<PlaceholderPage title="Dashboard" />} />
          <Route path="saved" element={<PlaceholderPage title="Saved Jobs" />} />
          <Route path="digest" element={<PlaceholderPage title="Daily Digest" />} />
          <Route path="settings" element={<PlaceholderPage title="Settings" />} />
          <Route path="proof" element={<PlaceholderPage title="Proof & Validation" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
