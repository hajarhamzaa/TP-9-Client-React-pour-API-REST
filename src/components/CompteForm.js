import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

function CompteForm({ onCompteAdded }) {
  const [compte, setCompte] = useState({
    solde: '',
    dateCreation: '',
    type: 'COURANT'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setCompte({
      ...compte,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      // Validation simple
      if (!compte.solde || isNaN(compte.solde) || parseFloat(compte.solde) <= 0) {
        throw new Error('Veuillez entrer un solde valide (supérieur à 0)');
      }

      const compteToSend = {
        ...compte,
        solde: parseFloat(compte.solde),
        dateCreation: compte.dateCreation || new Date().toISOString().split('T')[0]
      };

      const response = await axios.post(`${API_BASE_URL}/comptes`, compteToSend);
      
      setSuccess('Compte ajouté avec succès !');
      
      // Réinitialisation du formulaire
      setCompte({
        solde: '',
        dateCreation: '',
        type: 'COURANT'
      });

      // Appeler la fonction de rappel pour actualiser la liste
      if (onCompteAdded) {
        onCompteAdded();
      }

      // Effacer le message de succès après 3 secondes
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du compte:', error);
      setError(error.response?.data?.message || error.message || 'Une erreur est survenue lors de l\'ajout du compte');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title mb-4">Ajouter un Compte</h2>
          
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          
          {success && (
            <div className="alert alert-success" role="alert">
              {success}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="solde" className="form-label fw-bold">
                Solde (€)
              </label>
              <div className="input-group">
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  className="form-control"
                  id="solde"
                  name="solde"
                  value={compte.solde}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  placeholder="Entrez le solde initial"
                />
                <span className="input-group-text">€</span>
              </div>
            </div>
            
            <div className="mb-3">
              <label htmlFor="dateCreation" className="form-label fw-bold">
                Date de Création
              </label>
              <input
                type="date"
                className="form-control"
                id="dateCreation"
                name="dateCreation"
                value={compte.dateCreation}
                onChange={handleChange}
                disabled={isSubmitting}
                max={new Date().toISOString().split('T')[0]}
              />
              <div className="form-text text-muted">
                Laissez vide pour utiliser la date du jour
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="type" className="form-label fw-bold">
                Type de Compte
              </label>
              <select
                className="form-select"
                id="type"
                name="type"
                value={compte.type}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="COURANT">Compte Courant</option>
                <option value="EPARGNE">Compte Épargne</option>
              </select>
            </div>
            
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button 
                type="button" 
                className="btn btn-outline-secondary me-md-2"
                onClick={() => {
                  setCompte({
                    solde: '',
                    dateCreation: '',
                    type: 'COURANT'
                  });
                  setError('');
                }}
                disabled={isSubmitting}
              >
                Réinitialiser
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Ajout en cours...
                  </>
                ) : (
                  'Ajouter le Compte'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CompteForm;
