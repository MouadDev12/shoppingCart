# Nike Store - Application E-commerce React

Une application e-commerce moderne construite avec React, Redux Toolkit et Vite.

## Fonctionnalités

### Redux Slices

#### Product Slice
- **fetchProducts**: Récupère les données depuis l'API
- **filterByCategory**: Filtre par catégorie (Sneakers, Flats, etc.)
- **filterByPrice**: Filtre par gamme de prix
- **filterByColor**: Filtre par couleur
- **filterByBrand**: Filtre par marque
- **modifyRating**: Modifie la note d'un produit
- **resetFilters**: Remet à zéro tous les filtres

#### Cart Slice
- **addToCart**: Ajoute un produit au panier
- **removeFromCart**: Supprime un produit du panier
- **modifyQuantity**: Modifie la quantité d'un produit
- **clearCart**: Vide le panier

### Composants

#### ProductCard
- Affiche les informations d'un produit
- Système de notation interactif (étoiles cliquables)
- Bouton d'ajout au panier
- Design responsive

#### ProductsList
- Liste tous les produits avec filtres
- Sidebar de filtres (catégorie, prix, couleur, marque)
- Affichage des filtres actifs
- Gestion des états de chargement et d'erreur

#### Cart
- Panier latéral (sidebar)
- Modification des quantités
- Suppression d'articles
- Calcul automatique du total
- Bouton de vidage du panier

## Installation et Démarrage

```bash
# Installation des dépendances
npm install @reduxjs/toolkit react-redux @testing-library/react @testing-library/jest-dom vitest jsdom

# Démarrage en mode développement
npm run dev

# Construction pour la production
npm run build

# Lancement des tests
npm run test
```

## Structure du Projet

```
src/
├── components/
│   ├── ProductCard.jsx
│   ├── ProductCard.css
│   ├── ProductsList.jsx
│   ├── ProductsList.css
│   ├── Cart.jsx
│   ├── Cart.css
│   └── __tests__/
│       ├── ProductCard.test.js
│       └── ProductsList.test.js
├── store/
│   ├── store.js
│   └── slices/
│       ├── productSlice.js
│       └── cartSlice.js
├── App.jsx
├── App.css
└── main.jsx
```

## Technologies Utilisées

- **React 19**: Framework frontend
- **Redux Toolkit**: Gestion d'état
- **React Redux**: Connexion React-Redux
- **Vite**: Outil de build
- **Testing Library**: Tests unitaires
- **CSS Modules**: Styles composants

## Fonctionnalités Avancées

- **Filtrage en temps réel**: Les produits sont filtrés instantanément
- **Persistance du panier**: Le panier maintient son état
- **Interface responsive**: Adaptée mobile et desktop
- **Tests complets**: Couverture des composants principaux
- **Performance optimisée**: Utilisation de Redux Toolkit pour la performance

## API Mock

L'application utilise actuellement des données mockées. Pour connecter une vraie API, modifiez la fonction `fetchProducts` dans `productSlice.js`.

## Tests

Les tests couvrent :
- Rendu des composants
- Interactions utilisateur
- Actions Redux
- Filtrage des produits
- Gestion du panier

Exécutez `npm run test` pour lancer la suite de tests.# shoppingCart
