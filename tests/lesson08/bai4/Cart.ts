class Product_bai4 {
    name: string;
    price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }
}

class Cart4 {
    private items: Product_bai4[];
    readonly maxSize: number;

    constructor(maxSize: number) {
        this.items = [];
        this.maxSize = maxSize;
    }

    addItem = (product: Product_bai4) => {
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

const cart1_bai4 = new Cart4(2);
const p5_bai4 = new Product_bai4("Book", 100);
const p6_bai4 = new Product_bai4("Pen", 20);
cart1_bai4.addItem(p5_bai4);
console.log("So luong cart 1 sau khi add p5: ", cart1_bai4.getCount());
cart1_bai4.addItem(p6_bai4);
console.log("So luong cart 1 sau khi add p6: ", cart1_bai4.getCount());
console.log("Tong cart 1: ", cart1_bai4.getTotal());

const cart2_bai4 = new Cart4(2);
const p7_bai4 = new Product_bai4("Book", 110);
const p8_bai4 = new Product_bai4("Pen", 50);
const p9_bai4 = new Product_bai4("Notebook", 20);
cart2_bai4.addItem(p7_bai4);
console.log("So luong cart 2 sau khi add p7: ", cart2_bai4.getCount());
cart2_bai4.addItem(p8_bai4);
console.log("So luong cart 2 sau khi add p8: ", cart2_bai4.getCount());
cart2_bai4.addItem(p9_bai4);
console.log("So luong cart 2 sau khi add p9: ", cart2_bai4.getCount());
console.log("Tong cart 2: ", cart2_bai4.getTotal());

export {};