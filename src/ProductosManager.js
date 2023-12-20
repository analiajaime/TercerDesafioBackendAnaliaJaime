const fs = require('fs').promises;

class ProductManager {
    constructor() {
        this.filePath = '../productos.json';
    }

    async getProducts(limit) {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            let products = JSON.parse(data);

            if (limit) {
                products = products.slice(0, limit);
            }

            return products;
        } catch (error) {
            console.error('Error al leer el archivo de productos:', error);
            throw error;
        }
    }

    async getProductById(id) {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            const products = JSON.parse(data);

            return products.find(product => product.id == id) || null;
        } catch (error) {
            console.error('Error al leer el archivo de productos:', error);
            throw error;
        }
    }
}

module.exports = ProductManager;
