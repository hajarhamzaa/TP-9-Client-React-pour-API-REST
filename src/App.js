import React, { useState, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CompteForm from './components/CompteForm';
import CompteList from './components/CompteList';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  // Fonction pour forcer le rafraîchissement de la liste des comptes
  const handleCompteAdded = useCallback(() => {
    setRefreshKey(prevKey => prevKey + 1);
  }, []);

  return (
    <div className="App">
      <div className="container py-4">
        <header className="text-center mb-5">
          <h1 className="display-4 fw-bold text-primary">Gestion des Comptes Clients</h1>
          <p className="lead">Application de gestion des comptes bancaires</p>
          <hr className="my-4" />
        </header>
        
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <CompteForm onCompteAdded={handleCompteAdded} />
          </div>
        </div>
        
        <div className="row mt-5">
          <div className="col-12">
            <CompteList key={refreshKey} />
          </div>
        </div>
      </div>
      
      <footer className="bg-light py-4 mt-5">
        <div className="container text-center">
          <p className="mb-0 text-muted">
            &copy; {new Date().getFullYear()} Gestion des Comptes - Tous droits réservés
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
