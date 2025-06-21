import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './ApolloClient';

import { SearchContext } from './context/SearchContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import CommandMenu from './components/CommandMenu';

import About from './pages/About';
import Resume from './pages/Resume';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header toggleSidebar={toggleSidebar} />
        {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}

        <main style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<CommandMenu />} />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </SearchContext.Provider>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <AppLayout />
      </Router>
    </ApolloProvider>
  );
}

export default App;
