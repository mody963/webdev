class CoffeeBag {
    owner: string;
    bean: string;
    roaster: string;
    grams: number;
    bagFreshness: string;
    finished: boolean;

    constructor(
        owner: string,
        bean: string,
        roaster: string,
        grams: number,
        bagFreshness: string
    ) {
        this.owner = owner;
        this.bean = bean;
        this.roaster = roaster;
        this.grams = grams;
        this.bagFreshness = bagFreshness;
        this.finished = false;
    }
}

const coffeeBags: CoffeeBag[] = [];

function addCoffeeBag(bag: CoffeeBag) {
    coffeeBags.push(bag);
}

function getAllCoffeeBags(): CoffeeBag[] {
    return coffeeBags;
}

export {
    CoffeeBag,
    coffeeBags,
    addCoffeeBag,
    getAllCoffeeBags
};