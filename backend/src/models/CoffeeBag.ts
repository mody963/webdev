import { User } from "./User.js";
let nextCoffeeBagId = 1;

class CoffeeBag {
    id: number
    owner: User
    bean: string
    roaster: string
    grams: number
    dayOfArival: string
    bagFreshness: string
    finished: boolean

    constructor(o: User, b: string,r: string, g: number, doa: string, bf: string, f: boolean) {
        this.id = nextCoffeeBagId++;
        this.owner = o;
        this.bean = b;
        this.roaster = r;
        this.grams = g;
        this.dayOfArival = doa;
        this.bagFreshness = bf;
        this.finished = f;
    }
}

const coffeeBags: CoffeeBag[] = [];

function addCoffeeBag(c: CoffeeBag) {
    coffeeBags.push(c);
}

function getAllCoffeeBags(): CoffeeBag[] {
    return coffeeBags;
}

export { CoffeeBag, coffeeBags, addCoffeeBag, getAllCoffeeBags };
