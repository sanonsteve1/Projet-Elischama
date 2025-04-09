import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';

// Import des images
import butterCreamCake from './images/crème.jpg';
import chocolateCake from './images/be98c9e21a5e9a741de1ae523366141e.jpg';
import chantillyCake from './images/chantilly.jpg';
import photoCake from './images/photo.jpg';
import letterCake from './images/letter.jpg';
import cartoonCake from './images/cartoon.jpg';

function App() {
  const [activeTab, setActiveTab] = useState('products');
  const [orders, setOrders] = useState([]);
  const [productions, setProductions] = useState([]);
  const [newOrder, setNewOrder] = useState({
    customerName: '',
    phone: '',
    productType: 'Gâteau crème au beurre',
    parts: 6,
    advance: 0,
    totalPrice: 0,
    status: 'En attente',
    date: new Date().toISOString().split('T')[0],
    photoOption: 'none'
  });
  const [newProduction, setNewProduction] = useState({
    date: new Date().toISOString().split('T')[0],
    cakesProduced: 0,
    eggsUsed: 0,
    flourUsed: 0,
    sugarUsed: 0,
    aromaUsed: 0,
    milkUsed: 0,
    foilUsed: 0
  });

  const productPrices = {
    'Gâteau crème au beurre': {
      6: 7000,
      8: 8500,
      10: 10000,
      12: 12500,
      15: 15000,
      20: 20000,
      25: 25000,
      30: 30000,
      35: 35000
    },
    'Gâteau au chocolat': {
      6: 8000,
      8: 10000,
      10: 13000
    },
    'Gâteau crème chantilly': {
      6: 8500,
      8: 10000,
      10: 13000,
      12: 14500,
      15: 16000,
      20: 20000,
      25: 25000,
      30: 30000
    },
    'Gâteau avec photo': {
      10: 16000,
      12: 18000,
      15: 21000,
      20: 26000
    },
    'Gâteau en lettre/chiffre': {
      1: 13000
    },
    'Gâteau dessin animé': {
      1: 10000
    }
  };

  const productImages = {
    'Gâteau crème au beurre': butterCreamCake,
    'Gâteau au chocolat': chocolateCake,
    'Gâteau crème chantilly': chantillyCake,
    'Gâteau avec photo': photoCake,
    'Gâteau en lettre/chiffre': letterCake,
    'Gâteau dessin animé': cartoonCake
  };

  const calculateTotalPrice = (productType, parts, photoOption) => {
    let basePrice = 0;

    if (productType === 'Gâteau avec photo') {
      basePrice = productPrices[productType][parts] || 0;
      if (photoOption === 'edible') basePrice += 5000;
      else if (photoOption === 'non-edible') basePrice += 1000;
    } else if (productType === 'Gâteau en lettre/chiffre') {
      basePrice = productPrices[productType][1] * parts;
    } else if (productType === 'Gâteau dessin animé') {
      basePrice = productPrices[productType][1] + (parts * 1000);
    } else {
      basePrice = productPrices[productType][parts] || 0;
    }

    return basePrice;
  };

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setNewOrder(prev => {
      const updatedOrder = { ...prev, [name]: value };

      if (name === 'productType' || name === 'parts' || name === 'photoOption') {
        updatedOrder.totalPrice = calculateTotalPrice(
          name === 'productType' ? value : updatedOrder.productType,
          name === 'parts' ? parseInt(value) : updatedOrder.parts,
          name === 'photoOption' ? value : updatedOrder.photoOption
        );
      }

      return updatedOrder;
    });
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    setOrders([...orders, { ...newOrder, id: Date.now() }]);
    setNewOrder({
      customerName: '',
      phone: '',
      productType: 'Gâteau crème au beurre',
      parts: 6,
      advance: 0,
      totalPrice: 0,
      status: 'En attente',
      date: new Date().toISOString().split('T')[0],
      photoOption: 'none'
    });
  };

  const handleProductionChange = (e) => {
    const { name, value } = e.target;
    setNewProduction({ ...newProduction, [name]: parseInt(value) || 0 });
  };

  const handleProductionSubmit = (e) => {
    e.preventDefault();
    setProductions([...productions, { ...newProduction, id: Date.now() }]);
    setNewProduction({
      date: new Date().toISOString().split('T')[0],
      cakesProduced: 0,
      eggsUsed: 0,
      flourUsed: 0,
      sugarUsed: 0,
      aromaUsed: 0,
      milkUsed: 0,
      foilUsed: 0
    });
  };

  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    const savedProductions = localStorage.getItem('productions');

    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedProductions) setProductions(JSON.parse(savedProductions));
  }, []);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem('productions', JSON.stringify(productions));
  }, [orders, productions]);

  return (
    <div className="App">
      <motion.header
        className="App-header"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <motion.h1
          whileHover={{ scale: 1.05 }}
          className="main-title"
        >
          🎂 Aux Délices Des Gâteaux 🎂
        </motion.h1>
        <nav className="nav-tabs">
          {['products', 'orders', 'production', 'costs'].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab-button ${activeTab === tab ? 'active' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab === 'products' && 'Produits & Services'}
              {tab === 'orders' && 'Commandes'}
              {tab === 'production' && 'Production'}
              {tab === 'costs' && 'Coûts'}
            </motion.button>
          ))}
        </nav>
      </motion.header>

      <main>
        {activeTab === 'products' && (
          <motion.div
            className="products-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ type: "spring" }}
            >
              Nos Produits et Services
            </motion.h2>

            <motion.div
              className="product-category"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3>Gâteaux d'anniversaire</h3>

              {[
                {
                  title: "Gâteau crème au beurre ❤",
                  image: butterCreamCake,
                  items: [
                    "6 parts: 7,000 FCFA",
                    "8 parts: 8,500 FCFA",
                    "10 parts: 10,000 FCFA",
                    "12 parts: 12,500 FCFA",
                    "15 parts: 15,000 FCFA",
                    "20 parts: 20,000 FCFA",
                    "25 parts: 25,000 FCFA",
                    "30 parts: 30,000 FCFA",
                    "35 parts: 35,000 FCFA",
                    "... jusqu'à 100 parts"
                  ]
                },
                {
                  title: "Gâteau au chocolat 🍫",
                  image: chocolateCake,
                  items: [
                    "6 parts: 8,000 FCFA",
                    "8 parts: 10,000 FCFA",
                    "10 parts: 13,000 FCFA"
                  ]
                },
                {
                  title: "Gâteau crème chantilly ❤",
                  image: chantillyCake,
                  items: [
                    "6 parts: 8,500 FCFA",
                    "8 parts: 10,000 FCFA",
                    "10 parts: 13,000 FCFA",
                    "12 parts: 14,500 FCFA",
                    "15 parts: 16,000 FCFA",
                    "20 parts: 20,000 FCFA",
                    "25 parts: 25,000 FCFA",
                    "30 parts: 30,000 FCFA"
                  ]
                },
                {
                  title: "Gâteau avec photo de la personne 😍",
                  image: photoCake,
                  note: "NB: Photo mangeable: +5,000 FCFA, Photo non mangeable: +1,000 FCFA",
                  items: [
                    "10 parts: 16,000 FCFA",
                    "12 parts: 18,000 FCFA",
                    "15 parts: 21,000 FCFA",
                    "20 parts: 26,000 FCFA"
                  ]
                },
                {
                  title: "Gâteau en lettre ou chiffre 🎂",
                  image: letterCake,
                  items: ["À partir de 13,000 FCFA l'unité"]
                },
                {
                  title: "Gâteau avec dessin animé des enfants 🎂",
                  image: cartoonCake,
                  items: ["À partir de 10,000 FCFA"]
                }
              ].map((product, index) => (
                <motion.div
                  key={index}
                  className="product-card"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="product-content">
                    <div className="product-details">
                      <h4>{product.title}</h4>
                      {product.note && <p className="note">{product.note}</p>}
                      <ul>
                        {product.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <motion.div
                      className="product-image-container"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="product-image"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}

              <motion.div
                className="payment-info"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p><strong>Politique de commande:</strong> Une avance de 5,000 FCFA est requise pour confirmer la commande.</p>
                <p><strong>Orange Money:</strong> 55648759 (Nom du compte: jaazielle) - Merci d'ajouter les frais.</p>
              </motion.div>
            </motion.div>

            <motion.div
              className="product-category"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3>Autres Services</h3>
              <ul>
                <li>Gâteau de mariage</li>
                <li>Gâteau Trompe l'oeil</li>
                <li>Petits Fours (25 pièces, 50 pièces, 100 pièces, 200 pièces)</li>
                <li>Restauration</li>
                <li>Service traiteur</li>
                <li>Sweet box entreprises (livraison des boxes aux employés des entreprises)</li>
                <li>Location de matériel de cérémonies (Assiettes, plateau, tréteaux, glacières, chauffandise, verres, marmites, foyers)</li>
              </ul>
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'orders' && (
          <motion.div
            className="orders-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Gestion des Commandes</h2>

            <div className="order-form-container">
              <motion.div
                className="order-form"
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                transition={{ type: "spring" }}
              >
                <h3>Nouvelle Commande</h3>
                <form onSubmit={handleOrderSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nom du client:</label>
                      <input
                        type="text"
                        name="customerName"
                        value={newOrder.customerName}
                        onChange={handleOrderChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Téléphone:</label>
                      <input
                        type="text"
                        name="phone"
                        value={newOrder.phone}
                        onChange={handleOrderChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Date de livraison:</label>
                      <input
                        type="date"
                        name="date"
                        value={newOrder.date}
                        onChange={handleOrderChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Type de produit:</label>
                      <select
                        name="productType"
                        value={newOrder.productType}
                        onChange={handleOrderChange}
                      >
                        <option value="Gâteau crème au beurre">Gâteau crème au beurre</option>
                        <option value="Gâteau au chocolat">Gâteau au chocolat</option>
                        <option value="Gâteau crème chantilly">Gâteau crème chantilly</option>
                        <option value="Gâteau avec photo">Gâteau avec photo</option>
                        <option value="Gâteau en lettre/chiffre">Gâteau en lettre/chiffre</option>
                        <option value="Gâteau dessin animé">Gâteau dessin animé</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Nombre de parts:</label>
                      <input
                        type="number"
                        name="parts"
                        value={newOrder.parts}
                        onChange={handleOrderChange}
                        min="1"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Avance reçue:</label>
                      <input
                        type="number"
                        name="advance"
                        value={newOrder.advance}
                        onChange={handleOrderChange}
                        min="0"
                      />
                    </div>
                  </div>

                  {newOrder.productType === 'Gâteau avec photo' && (
                    <div className="form-row">
                      <div className="form-group">
                        <label>Option photo:</label>
                        <select
                          name="photoOption"
                          value={newOrder.photoOption}
                          onChange={handleOrderChange}
                        >
                          <option value="none">Pas de photo</option>
                          <option value="edible">Photo mangeable (+5,000 FCFA)</option>
                          <option value="non-edible">Photo non mangeable (+1,000 FCFA)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div className="form-row">
                    <div className="form-group">
                      <label>Prix total:</label>
                      <input
                        type="number"
                        name="totalPrice"
                        value={newOrder.totalPrice}
                        readOnly
                      />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="submit-button"
                  >
                    Enregistrer la commande
                  </motion.button>
                </form>
              </motion.div>

              <motion.div
                className="orders-list"
                initial={{ x: 50 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", delay: 0.1 }}
              >
                <h3>Liste des Commandes</h3>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Client</th>
                        <th>Produit</th>
                        <th>Parts</th>
                        <th>Prix</th>
                        <th>Avance</th>
                        <th>Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, index) => (
                        <motion.tr
                          key={order.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`status-${order.status.replace(/\s+/g, '-').toLowerCase()}`}
                        >
                          <td>{order.date}</td>
                          <td>{order.customerName}</td>
                          <td>
                            <div className="product-info">
                              <img
                                src={productImages[order.productType]}
                                alt={order.productType}
                                className="product-thumbnail"
                              />
                              {order.productType}
                            </div>
                          </td>
                          <td>{order.parts}</td>
                          <td>{order.totalPrice.toLocaleString()} FCFA</td>
                          <td>{order.advance.toLocaleString()} FCFA</td>
                          <td>
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order.id, e.target.value)}
                              className={`status-select status-${order.status.replace(/\s+/g, '-').toLowerCase()}`}
                            >
                              <option value="En attente">En attente</option>
                              <option value="En préparation">En préparation</option>
                              <option value="Prêt">Prêt</option>
                              <option value="Livré">Livré</option>
                              <option value="Soldé">Soldé</option>
                            </select>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {activeTab === 'production' && (
          <motion.div
            className="production-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Suivi de Production</h2>

            <div className="production-container">
              <motion.div
                className="production-form"
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                transition={{ type: "spring" }}
              >
                <h3>Nouvelle Entrée de Production</h3>
                <form onSubmit={handleProductionSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Date:</label>
                      <input
                        type="date"
                        name="date"
                        value={newProduction.date}
                        onChange={handleProductionChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Gâteaux produits:</label>
                      <input
                        type="number"
                        name="cakesProduced"
                        value={newProduction.cakesProduced}
                        onChange={handleProductionChange}
                        min="0"
                      />
                    </div>

                    <div className="form-group">
                      <label>Œufs utilisés:</label>
                      <input
                        type="number"
                        name="eggsUsed"
                        value={newProduction.eggsUsed}
                        onChange={handleProductionChange}
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Farine (kg):</label>
                      <input
                        type="number"
                        name="flourUsed"
                        value={newProduction.flourUsed}
                        onChange={handleProductionChange}
                        min="0"
                        step="0.1"
                      />
                    </div>

                    <div className="form-group">
                      <label>Sucre (kg):</label>
                      <input
                        type="number"
                        name="sugarUsed"
                        value={newProduction.sugarUsed}
                        onChange={handleProductionChange}
                        min="0"
                        step="0.1"
                      />
                    </div>

                    <div className="form-group">
                      <label>Arômes:</label>
                      <input
                        type="number"
                        name="aromaUsed"
                        value={newProduction.aromaUsed}
                        onChange={handleProductionChange}
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Lait utilisé:</label>
                      <input
                        type="number"
                        name="milkUsed"
                        value={newProduction.milkUsed}
                        onChange={handleProductionChange}
                        min="0"
                      />
                    </div>

                    <div className="form-group">
                      <label>Feuilles d'alu:</label>
                      <input
                        type="number"
                        name="foilUsed"
                        value={newProduction.foilUsed}
                        onChange={handleProductionChange}
                        min="0"
                      />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="submit-button"
                  >
                    Enregistrer la production
                  </motion.button>
                </form>
              </motion.div>

              <motion.div
                className="production-list"
                initial={{ x: 50 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", delay: 0.1 }}
              >
                <h3>Historique de Production</h3>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Gâteaux</th>
                        <th>Œufs</th>
                        <th>Farine</th>
                        <th>Sucre</th>
                        <th>Arômes</th>
                        <th>Lait</th>
                        <th>Alu</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productions.map((prod, index) => (
                        <motion.tr
                          key={prod.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <td>{prod.date}</td>
                          <td>{prod.cakesProduced}</td>
                          <td>{prod.eggsUsed}</td>
                          <td>{prod.flourUsed} kg</td>
                          <td>{prod.sugarUsed} kg</td>
                          <td>{prod.aromaUsed}</td>
                          <td>{prod.milkUsed}</td>
                          <td>{prod.foilUsed}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {activeTab === 'costs' && (
          <motion.div
            className="costs-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Analyse des Coûts</h2>

            <motion.div
              className="costs-summary"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
            >
              <h3>Résumé des Commandes</h3>
              <div className="stats">
                <motion.div
                  className="stat-card"
                  whileHover={{ scale: 1.03 }}
                >
                  <h4>Commandes totales</h4>
                  <p>{orders.length}</p>
                </motion.div>
                <motion.div
                  className="stat-card"
                  whileHover={{ scale: 1.03 }}
                >
                  <h4>Chiffre d'affaires</h4>
                  <p>{orders.reduce((sum, order) => sum + order.totalPrice, 0).toLocaleString()} FCFA</p>
                </motion.div>
                <motion.div
                  className="stat-card"
                  whileHover={{ scale: 1.03 }}
                >
                  <h4>Avances reçues</h4>
                  <p>{orders.reduce((sum, order) => sum + order.advance, 0).toLocaleString()} FCFA</p>
                </motion.div>
              </div>

              <h3>Popularité des Produits</h3>
              <div className="product-stats">
                {Object.keys(productPrices).map((product, index) => (
                  <motion.div
                    key={product}
                    className="product-stat"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="product-info">
                      <img
                        src={productImages[product]}
                        alt={product}
                        className="product-thumbnail"
                      />
                      <h4>{product}</h4>
                    </div>
                    <p>Commandes: {orders.filter(o => o.productType === product).length}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="production-costs"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3>Coûts de Production</h3>
              <div className="stats">
                <motion.div
                  className="stat-card"
                  whileHover={{ scale: 1.03 }}
                >
                  <h4>Gâteaux produits</h4>
                  <p>{productions.reduce((sum, prod) => sum + prod.cakesProduced, 0)}</p>
                </motion.div>
                <motion.div
                  className="stat-card"
                  whileHover={{ scale: 1.03 }}
                >
                  <h4>Œufs utilisés</h4>
                  <p>{productions.reduce((sum, prod) => sum + prod.eggsUsed, 0)} plaquettes</p>
                </motion.div>
                <motion.div
                  className="stat-card"
                  whileHover={{ scale: 1.03 }}
                >
                  <h4>Farine utilisée</h4>
                  <p>{productions.reduce((sum, prod) => sum + prod.flourUsed, 0)} kg</p>
                </motion.div>
                <motion.div
                  className="stat-card"
                  whileHover={{ scale: 1.03 }}
                >
                  <h4>Sucre utilisé</h4>
                  <p>{productions.reduce((sum, prod) => sum + prod.sugarUsed, 0)} kg</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p>© {new Date().getFullYear()} Aux Délices Des Gâteaux - Tous droits réservés</p>
      </motion.footer>

      {/* Flottants décoratifs */}
      <motion.div
        className="floating-cake cake1"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🎂
      </motion.div>
      <motion.div
        className="floating-cake cake2"
        animate={{
          y: [0, -15, 0],
          rotate: [0, -3, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        🍰
      </motion.div>
      <motion.div
        className="floating-cake cake3"
        animate={{
          y: [0, -25, 0],
          rotate: [0, 8, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        🧁
      </motion.div>
    </div>
  );
}

export default App;