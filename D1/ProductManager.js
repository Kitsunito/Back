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

		if (this.products.length) {
			product.id = 1;
			this.products = [product];
		} else {
      this.products.map((x) => {
        if (x.code === product.code)
          return {
            message: "Error: el código de producto ya se encuentra ingresado",
          };
      });
			product.id = this.products.length++;
			this.products = [...this.products, product];
		}

		return { status: 200, message: `Producto agregado con id ${product.id}` };
	}

	//Devuelve el listado de todos los productos
	getProducts() {
		return this.products;
	}
}

//--------------------------
//        Pruebas
//--------------------------
let productManager = new ProductManager();

console.log(productManager.getProducts());
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
console.log(productManager.getProducts());
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
console.log(productManager.getProducts());
