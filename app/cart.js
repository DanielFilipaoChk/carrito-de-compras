// pages/api/cart.js
let cart = [];  // En memoria, no se necesita persistir datos.

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(cart);
  }
  if (req.method === 'POST') {
    const { id } = req.body;
    const product = { id, name: `Producto ${id}`, price: id * 100 };  // Producto ficticio
    cart.push(product);
    return res.status(201).json(cart);
  }
  return res.status(405).json({ message: 'Método no permitido' });
}
