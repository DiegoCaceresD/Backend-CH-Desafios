const productProperties = [
  "code",
  "title",
  "description",
  "price",
  "thumbnail",
  "stock",
];

class ProductManager {
  static products;
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    //valido que el producto ingresado tenga todas las propiedades
    let redFlag = false;
    let invalidProp;
    let keys = Object.keys(product);
    productProperties.forEach((i) => {
      if (!keys.includes(i)) {
        invalidProp = i;
      }
    });
    if (invalidProp != null) {
      console.log(
        `Producto inválido, la propiedad ${invalidProp} es requerida`
      );
      redFlag = true;
    }

    // valido que la propiedad code no se repita
    this.products.forEach((i) => {
      if (product.code == i.code) {
        console.log(
          `Error: code duplicado. \nEl code del producto ingresado: "${product.title}" ya existe, El producto: "${i.title}" ya cuenta con un code: "${i.code}"`
        );
        redFlag = true;
      }
    });

    // uso la variable redflag para controlar que el producto cumple con las validaciones y se haga el push en el array.
    if (!redFlag) {
        let id = this.products.length +1;
      this.products.push({
        id: id,
        ...product
      });
      console.log(`Producto ${product.title} añadido exitosamente!`);
    }
  }

  getProducts(){
    return console.log(this.products);
  }

  getProductById(id){
    let isProduct = false;
    this.products.forEach((product) => {
        if (id == product.id) {
            console.log(product);
            isProduct = true
        }
    })
    if (!isProduct) {
        console.log("Error: Not Found");
    }
  }
}

const producto1 = {
  code: 145623,
  title: "Aceite",
  description: "marca natura",
  price: 200,
  thumbnail: "aceite.jpg",
  stock: 9,
};
const producto2 = {
  code: 12235143,
  title: "Agua",
  description: "marca king",
  price: 100,
  thumbnail: "agua.jpg",
  stock: 5,
};
const producto3 = {
  code: 1223453,
  title: "gaseosa",
  description: "marca pepsi",
  price: 250,
  thumbnail: "gaseos.jpg",
  stock: 3,
};

const productManager1 = new ProductManager();
productManager1.getProducts();
productManager1.addProduct(producto1);
productManager1.addProduct(producto2);
productManager1.addProduct(producto3);
productManager1.getProducts();
productManager1.getProductById(1);
