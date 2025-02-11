"use client";

import { useState, useEffect } from "react";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [bestCombination, setBestCombination] = useState<Product[]>([]);
  const [budget, setBudget] = useState<number>(0);

  useEffect(() => {
    // Simulando la API para obtener productos
    const fetchedProducts = [
      { id: 1, name: "Producto 1", price: 60 },
      { id: 2, name: "Producto 2", price: 100 },
      { id: 3, name: "Producto 3", price: 120 },
      { id: 4, name: "Producto 4", price: 70 },
    ];
    setProducts(fetchedProducts);
  }, []);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const findBestCombination = (products: Product[], budget: number) => {
    let bestCombination: Product[] = [];
    let bestTotal = 0;

    const findCombinations = (arr: Product[], index = 0, current: Product[] = []) => {
      const total = current.reduce((sum, product) => sum + product.price, 0);

      if (total <= budget && total > bestTotal) {
        bestTotal = total;
        bestCombination = [...current];
      }

      for (let i = index; i < arr.length; i++) {
        findCombinations(arr, i + 1, [...current, arr[i]]);
      }
    };

    findCombinations(products);
    return bestCombination;
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredBudget = Number(e.target.value);
    setBudget(enteredBudget);

    const selectedProducts = findBestCombination(products, enteredBudget);
    setBestCombination(selectedProducts);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Lista de Productos</h1>
      <div style={styles.productList}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              ...styles.productCard,
              backgroundColor: cart.some(item => item.id === product.id) ? "#eaf7f7" : "#f9f9f9",
            }}
          >
            <h2 style={styles.productTitle}>{product.name}</h2>
            <p style={styles.productPrice}>${product.price}</p>
            <button style={styles.button} onClick={() => addToCart(product)}>
              <FaShoppingCart style={styles.icon} />
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>

      <h2 style={styles.cartTitle}>Carrito</h2>
      <div style={styles.cartContainer}>
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.id} style={styles.cartItem}>
              <p style={styles.cartItemText}>{item.name} - ${item.price}</p>
              <button
                style={styles.removeButton}
                onClick={() => removeFromCart(item.id)}
              >
                <FaTrashAlt style={styles.icon} />
                Eliminar
              </button>
            </div>
          ))
        ) : (
          <p style={styles.noItemsText}>No hay productos en el carrito.</p>
        )}
      </div>

      <h2 style={styles.budgetTitle}>Selecciona un presupuesto para obtener la mejor combinación</h2>
      <input
        type="number"
        style={styles.budgetInput}
        placeholder="Ingresa tu presupuesto"
        value={budget}
        onChange={handleBudgetChange}
      />

      <h3 style={styles.bestCombinationTitle}>Mejor combinación de productos</h3>
      <div style={styles.bestCombinationContainer}>
        {bestCombination.length > 0 ? (
          <>
            {bestCombination.map((item) => (
              <div key={item.id} style={styles.bestCombinationItem}>
                <p style={styles.bestCombinationText}>{item.name} - ${item.price}</p>
              </div>
            ))}
            <p style={styles.totalText}>
              <strong>Total: ${bestCombination.reduce((sum, item) => sum + item.price, 0)}</strong>
            </p>
          </>
        ) : (
          <p style={styles.noCombinationText}>No se encontraron productos dentro del presupuesto.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "900px",
    margin: "auto",
    padding: "20px",
  },
  title: {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#3498db", 
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "20px",
    fontSize: "2rem", 
    fontWeight: "bold",
  },
  productList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  productCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
    padding: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "pointer",
  },
  productTitle: {
    fontSize: "18px",
    color: "#444",
    marginBottom: "10px",
  },
  productPrice: {
    fontSize: "16px",
    color: "#777",
    marginBottom: "15px",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cartTitle: {
    textAlign: "center",
    color: "#333",
    marginTop: "40px",
    marginBottom: "10px",
    fontSize: "1.6rem",
    fontWeight: "bold",
  },
  cartContainer: {
    backgroundColor: "#2d3436", 
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    color: "#fff", 
  },
  cartItem: {
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cartItemText: {
    fontSize: "16px",
    color: "#fff", 
  },
  removeButton: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    marginLeft: "10px",
    transition: "background-color 0.3s ease",
  },
  budgetTitle: {
    textAlign: "center",
    color: "#333",
    marginTop: "30px",
    fontSize: "1.3rem",
  },
  budgetInput: {
    display: "block",
    margin: "20px auto",
    padding: "12px",
    width: "100%",
    maxWidth: "300px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f4f4f4",
    color: "#3498db",
  },
  bestCombinationTitle: {
    textAlign: "center",
    color: "#333",
    marginTop: "40px",
  },
  bestCombinationContainer: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    marginTop: "20px",
  },
  bestCombinationItem: {
    marginBottom: "10px",
  },
  bestCombinationText: {
    fontSize: "16px",
    color: "#444",
  },
  totalText: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#3498db",
    textAlign: "center",
    marginTop: "15px",
  },
  noCombinationText: {
    textAlign: "center",
    color: "#777",
    fontStyle: "italic",
  },
  icon: {
    marginRight: "8px",
  },
  noItemsText: {
    textAlign: "center",
    color: "#f39c12",
    fontStyle: "italic",
  },
};

