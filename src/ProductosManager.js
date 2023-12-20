const fs = require('fs').promises;

// Define la clase ProductManager para manejar operaciones relacionadas con productos.
class ProductManager {
    constructor() {
        // Define la ruta al archivo JSON que contiene los datos de los productos.
        this.filePath = './productos.json';
    }

    // Método asincrónico para obtener productos con un límite opcional.
    async getProducts(limit) {
        try {
            // Lee el archivo de productos de forma asincrónica.
            const data = await fs.readFile(this.filePath, 'utf8');
            // Convierte los datos del archivo JSON a un objeto JavaScript.
            let products = JSON.parse(data);

            // Si se especifica un límite, devuelve solo esa cantidad de productos.
            if (limit) {
                products = products.slice(0, limit);
            }

            // Devuelve la lista de productos.
            return products;
        } catch (error) {
            // Imprime un error en la consola y lanza una excepción si algo sale mal.
            console.error('Error al leer el archivo de productos:', error);
            throw error;
        }
    }

    // Método asincrónico para obtener un producto específico por su ID.
    async getProductById(id) {
        try {
            // Lee el archivo de productos de forma asincrónica.
            const data = await fs.readFile(this.filePath, 'utf8');
            const products = JSON.parse(data);

            // Busca y devuelve el producto con el ID correspondiente.
            return products.find(product => product.id == id) || null;
        } catch (error) {
            // Imprime un error en la consola y lanza una excepción si algo sale mal.
            console.error('Error al leer el archivo de productos:', error);
            throw error;
        }
    }
}

// Exporta la clase ProductManager para su uso en otros archivos.
module.exports = ProductManager;
