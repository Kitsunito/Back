class Product {
	constructor(title, description, price, thumbnail, code, stock) {
		this.title = title;
		this.description = description;
		this.price = price;
		this.thumbnail = thumbnail;
		this.code = code;
		this.stock = stock;
	}
}

class ProductManager {
	constructor() {
		this.products = [];
	}

	//Añade un producto, valida que no se repita el código de producto y asigna un
	// ID incremental
	// (como el ejercicio no pide eliminar, no se toma en cuenta la necesidad de que el ID
	// se respete aún después de eliminado un producto)
	addProduct(title, description, price, thumbnail, code, stock) {
		const product = new Product(
			title,
			description,
			price,
			thumbnail,
			code,
			stock
		);

		if (!this.products.length) {
			product.id = 1;
			this.products = [product];
		} else {
			//Buscamos el índice de algún objeto con el mismo código
			// para identificar si el mismo ya existe
			const index = this.products.findIndex((x) => x.code === product.code);

			if (index !== -1) {
				return {
					status: 400,
					message: "Error: el código de producto ya se encuentra ingresado",
				};
			}

			// Asignamos un ID igual a la cantidad de elementos ya existentes +1
			product.id = this.products.length++;
			// Incorporamos el producto en el array
			this.products = [...this.products, product];
		}
		return { status: 200, message: `Producto agregado con id ${product.id}` };
	}

	//Devuelve el listado de todos los productos
	getProducts() {
		return this.products;
	}

	//Devuelve un producto según su ID
	getProductById(id) {
		let index = this.products.findIndex((x) => x.id === id);

		if (index !== -1) return this.products[index];
		else {
			const response = { status: 404, message: "NOT FOUND" };
			console.log(response.message);
			return response;
		}
	}
}

//--------------------------
//        Pruebas
//--------------------------
let productManager = new ProductManager();

//Validamos que el listado esté vacío
console.log(productManager.getProducts());

//Añadimos un producto
console.log(
	productManager.addProduct(
		"producto prueba",
		"Este es un producto prueba",
		200,
		"Sin imagen",
		"abc123",
		25
	)
);

//Validamos el listado de productos
console.log(productManager.getProducts());

//Intentamos añadir de nuevo el mismo producto
console.log(
	productManager.addProduct(
		"producto prueba",
		"Este es un producto prueba",
		200,
		"Sin imagen",
		"abc123",
		25
	)
);

//Buscamos el elemento con ID 1
console.log(productManager.getProductById(1));

//Buscamos un elemento con ID 100
console.log(productManager.getProductById(100));