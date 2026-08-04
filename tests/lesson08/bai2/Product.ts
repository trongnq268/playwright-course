class Product2 {
    name: string;
    price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }



}


const p1 = new Product2("Dress", 500);
console.log(p1);

const p2 = new Product2("Top", 400);
console.log(p2);


// Bản rút gọn:
class ProductShort {
    constructor(public name: string, public price: number) { }
}

const p3 = new ProductShort("T-shirt", 150);
console.log(p3);
const p4 = new ProductShort("Pants", 250);
console.log(p4);




