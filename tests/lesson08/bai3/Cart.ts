class Product_bai3 {
    name: string;
    price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }
}

class Cart3_bai3 {
    items: Product_bai3[];

    constructor() {
        this.items = [];
    }

    addItem = (product: Product_bai3) => {
        this.items.push(product);
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

const cart1_bai3 = new Cart3_bai3();
const p5_bai3 = new Product_bai3("Book", 100);
const p6_bai3 = new Product_bai3("Pen", 20);
cart1_bai3.addItem(p5_bai3);
cart1_bai3.addItem(p6_bai3);
console.log("So luong cart 1: ", cart1_bai3.getCount());
console.log("Tong cart 1: ", cart1_bai3.getTotal());

const cart2_bai3 = new Cart3_bai3();
const p7_bai3 = new Product_bai3("Book", 110);
const p8_bai3 = new Product_bai3("Pen", 50);
const p9_bai3 = new Product_bai3("Notebook", 20);
cart2_bai3.addItem(p7_bai3);
cart2_bai3.addItem(p8_bai3);
cart2_bai3.addItem(p9_bai3);
console.log("So luong cart 2: ", cart2_bai3.getCount());
console.log("Tong cart 2: ", cart2_bai3.getTotal());

export { };
