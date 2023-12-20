const ProductManager = require('./productManager');
const express = require('express');

// Crear la instancia de Express
const app = express();


// Iniciar el servidor
const PORT = process.env.PORT || 8080;

// Instancia de ProductManager
const manager = new ProductManager("./src/productos.json");

// Endpoint para obtener productos
// Ruta: '/productos'
app.get('/productos', async (req, res) => {
    try {
        
        const arrayProductos = await manager.leerArchivo();
        let limite = parseInt(req.query.limit);

        if (limit) {
            
            const arrayConLimite = arrayProductos.slice(0, limite);
            return res.json(arrayConLimite);

        } else {
            return res.json(arrayProductos);
        }
    } catch (error) {
        console.log (error)
        return res.send ("Error al obtener los productos / Error al procesar la solicitud")
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

app.listen(PORT, () => {
    console.log(`Ya tenes el servidor corriendo en el puerto ${PORT}`);
});