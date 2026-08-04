class Product_bai5 {
    name: string;
    price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }
}

class Cart5 {
    private items: Product_bai5[];
    readonly maxSize: number;

    constructor(maxSize: number) {
        this.items = [];
        this.maxSize = maxSize;
    }

    addItem = (product: Product_bai5) => {
        if (this.items.length < this.maxSize) {
            this.items.push(product);
        } else {
            console.log("Cart is full");
        }
    }

    getCount = (): number => {
        return this.items.length;
    }

    getTotal = (): number => {
        let total: number = 0;
        for (let i = 0; i < this.items.length; i++) {
            total += this.items[i].price;
        }
        return total;
    }
}

class ProductPage {
    constructor(private cart: Cart5) { }

    addProductToCart = (product: Product_bai5) => {
        this.cart.addItem(product);
    }

    verifyCartCount = (expected: number): boolean => {
        return this.cart.getCount() === expected;
    }

}

//kich ban mo phong
const cart_bai5 = new Cart5(1);
const page_bai5 = new ProductPage(cart_bai5);
page_bai5.addProductToCart(new Product_bai5("Dress", 500));
page_bai5.addProductToCart(new Product_bai5("Pant", 300));
console.log(page_bai5.verifyCartCount(1));
