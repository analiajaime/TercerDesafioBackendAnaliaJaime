// Importa el módulo fs con soporte de promesas para operaciones de archivo.
const fs = require('fs').promises;

// Define la clase ProductManager para manejar operaciones relacionadas con productos.
class ProductManager {
    // Variable estática para llevar el seguimiento del último ID de producto asignado.
    static ultId = 0;

    constructor() {
        // Ruta al archivo JSON que contiene los datos de los productos.
        this.filePath = './src/productos.json';
    }

    // Método asincrónico para obtener una lista de productos.
    // Opcionalmente, se puede limitar el número de productos devueltos.
    async getProducts(limit) {
        try {
            // Lee todos los productos del archivo.
            const products = await this.leerArchivo();
            // Devuelve una cantidad limitada de productos si se especifica un límite, de lo contrario devuelve todos.
            return limit ? products.slice(0, limit) : products;
        } catch (error) {
            // Maneja cualquier error que ocurra durante la lectura del archivo.
            console.error('Error al leer el archivo de productos:', error);
            throw error;
        }
    }

    // Método asincrónico para obtener un producto específico por su ID.
    async getProductById(id) {
        try {
            // Lee todos los productos del archivo.
            const products = await this.leerArchivo();
            // Devuelve el producto que coincide con el ID dado, o null si no se encuentra.
            return products.find(product => product.id == id) || null;
        } catch (error) {
            // Maneja cualquier error que ocurra durante la lectura del archivo.
            console.error('Error al leer el archivo de productos:', error);
            throw error;
        }
    }

    // Método asincrónico para agregar un nuevo producto al archivo.
    async addProduct(nuevoObjeto) {
        // Lee todos los productos actuales del archivo.
        const products = await this.leerArchivo();
        let { title, description, price, img, code, stock } = nuevoObjeto;

        // Valida que todos los campos requeridos estén presentes.
        if (!title || !description || !price || !img || !code || !stock) {
            throw new Error("Todos los campos son obligatorios");
        }

        // Verifica que el código del producto sea único.
        if (products.some(item => item.code === code)) {
            throw new Error("El código debe ser único");
        }

        // Crea un nuevo objeto de producto y lo añade a la lista.
        const newProduct = {
            id: products.length + 1,
            title,
            description,
            price,
            img,
            code,
            stock
        }

        products.push(newProduct);
        // Guarda la lista actualizada de productos en el archivo.
        await this.guardarArchivo(products);
    }

    // Método asincrónico para actualizar un producto existente en el archivo.
    async updateProduct(id, productoActualizado) {
        // Lee todos los productos actuales del archivo.
        const products = await this.leerArchivo();
        // Encuentra el índice del producto a actualizar.
        const index = products.findIndex(item => item.id === id);

        // Si el producto existe, lo actualiza con los nuevos datos.
        if (index !== -1) {
            products[index] = { ...products[index], ...productoActualizado };
            // Guarda la lista actualizada de productos en el archivo.
            await this.guardarArchivo(products);
        } else {
            throw new Error("El producto no pudo ser encontrado. Compruebe el ID y vuelva a intentarlo.");
        }
    }

    // Método asincrónico para leer los productos del archivo JSON.
    async leerArchivo() {
        try {
            // Lee los datos del archivo y los convierte de JSON a objetos JavaScript.
            const data = await fs.readFile(this.filePath, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            // Maneja cualquier error que ocurra durante la lectura del archivo.
            console.error("Error al leer el archivo", error);
            throw error;
        }
    }

    // Método asincrónico para guardar los productos en el archivo JSON.
    async guardarArchivo(products) {
        try {
            // Convierte los objetos JavaScript a una cadena JSON y los escribe en el archivo.
            await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
        } catch (error) {
            // Maneja cualquier error que ocurra durante la escritura del archivo.
            console.error("Error al guardar el archivo", error);
            throw error;
        }
    }
}

// Exporta la clase ProductManager para su uso en otros archivos.
module.exports = ProductManager;
