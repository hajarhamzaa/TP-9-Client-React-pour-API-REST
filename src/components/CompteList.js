import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

function CompteList() {
  const [comptes, setComptes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComptes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/comptes`);
        setComptes(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des comptes:', err);
        setError('Impossible de charger les comptes. Vérifiez que le serveur JSON est en cours d\'exécution.');
        setLoading(false);
      }
    };

    fetchComptes();
  }, []);

  if (loading) return <div className="text-center mt-4">Chargement des comptes...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2>Liste des Comptes</h2>
      {comptes.length === 0 ? (
        <div className="alert alert-info">Aucun compte trouvé.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Solde</th>
                <th>Date de Création</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {comptes.map(compte => (
                <tr key={compte.id}>
                  <td>{compte.id}</td>
                  <td>{compte.solde} €</td>
                  <td>{new Date(compte.dateCreation).toLocaleDateString('fr-FR')}</td>
                  <td>
                    <span className={`badge ${compte.type === 'COURANT' ? 'bg-primary' : 'bg-success'}`}>
                      {compte.type === 'COURANT' ? 'Courant' : 'Épargne'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CompteList;
