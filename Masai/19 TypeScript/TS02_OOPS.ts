/*
TypeScript Classes
*/
class Products {
    static ID: number = 0;
    id: number;
    name: string;
    desc: string;
    private cost: number;
    count: number;

    constructor(name: string, desc: string, price: number) {
        this.name = name;
        this.desc = desc;
        this.cost = price;
        this.count = 0;
        this.id = Products.ID;
        Products.ID++;
    }

    buy(price: number) {
        if (price >= this.cost) {
            return true;
        } else {
            return false;
        }
    }

    get Cost() {
        return this.cost;
    }

    set Cost(price: number) {
        this.cost = price;
    }
}

const p1 = new Products('Shirt', 'Good', 100);
p1.Cost;
p1.Cost = 10;

/*
TypeScript Inheritance
*/

class Mamals {
    legs: number;
    head: number;
    teeth: number;
    eye: number;

    constructor(legs: number) {
        this.legs = legs;
        this.head = 1;
        this.teeth = 32;
        this.eye = 2;
    }
}

class Cow extends Mamals {
    hasHorn: boolean;
    constructor(hasHorn: boolean) {
        super(4);
        this.hasHorn = hasHorn;
    }
}
