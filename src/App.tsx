import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { PokemonProvider } from './context/PokemonContext';
import ListView from './views/ListView';
import GalleryView from './views/GalleryView';
import DetailView from './views/DetailView';

export default function App() {
  return (
    <PokemonProvider>
      <header className="header">
        <div className="brand">PokéDex React App</div>
        <nav className="nav">
          <NavLink to="/list" className={({ isActive }: { isActive: boolean }) => (isActive ? 'active' : '')}>
            List
          </NavLink>
          <NavLink to="/gallery" className={({ isActive }: { isActive: boolean }) => (isActive ? 'active' : '')}>
            Gallery
          </NavLink>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<ListView />} />
          <Route path="/list" element={<ListView />} />
          <Route path="/gallery" element={<GalleryView />} />
          <Route path="/pokemon/:name" element={<DetailView />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>© 2025 PokéDex React App · Built with PokeAPI</p>
      </footer>
    </PokemonProvider>
  );
}