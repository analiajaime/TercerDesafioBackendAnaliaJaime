// app.js
const express = require('express');
const app = express();
const ProductManager = require('./ProductManager.js'); 

// Instancia de ProductManager
const productManager = new ProductManager("./productos.json");

// Endpoint para obtener productos
// Ruta: '/products'
// Opcionalmente acepta un query param 'limit' para limitar el número de productos devueltos
app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit;
        const products = await productManager.getProducts(limit);
        res.json(products);
    } catch (error) {
        res.status(500).send('Error al obtener los productos: ' + error.message);
    }
});

// Endpoint para obtener un producto específico por su ID
// Ruta: '/products/:pid'
app.get('/products/:pid', async (req, res) => {
    try {
        const pid = req.params.pid;
        const product = await productManager.getProductById(pid); 
        if (product) {
            res.json(product);
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error al obtener el producto: ' + error.message);
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
