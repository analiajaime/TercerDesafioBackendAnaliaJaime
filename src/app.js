const express = require('express');
const app = express();
const ProductManager = require('./ProductManager'); 

// Instancia de ProductManager
const manager = new ProductManager("./src/productos.json");

// Endpoint para obtener productos
// Ruta: '/productos'
// Opcionalmente acepta un query param 'limit' para limitar el número de productos devueltos
app.get('/productos', async (req, res) => {
    try {
        let limit = req.query.limit;
        if (limit) {
            limit = parseInt(limit);
            if (isNaN(limit)) {
                return res.status(400).send('El límite debe ser un número válido');
            }
        }
        
        const products = await productManager.getProducts(limit);
        res.json(products);
    } catch (error) {
        res.status(500).send('Analia. Le pifiaste en algo. Hay un error al obtener los productos: ' + error.message);
    }
});

// Endpoint para obtener un producto específico por su ID
// Ruta: '/productos/:pid'
app.get('/productos/:pid', async (req, res) => {
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
