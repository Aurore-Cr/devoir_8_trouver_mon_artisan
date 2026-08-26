import { Component } from 'react';

// Filet de sécurité : évite qu'une erreur JS dans un composant ne fasse
// disparaître toute l'application (page blanche silencieuse).
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Erreur applicative interceptée :', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container py-5 text-center">
          <h1>Une erreur est survenue</h1>
          <p>Merci de recharger la page. Si le problème persiste, contactez-nous.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
