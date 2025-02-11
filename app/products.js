// pages/api/products.js
export default function handler(req, res) {
    const products = [
      { id: 1, name: "Producto 1", price: 100 },
      { id: 2, name: "Producto 2", price: 200 }
    ];
    res.status(200).json(products);
  }
  