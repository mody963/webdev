class Tasting {
    title: string;
    host: string;
    capacity: number;
    lineup: string;

    constructor(title: string, host: string, capacity: number, lineup: string) {
        this.title = title;
        this.host = host;
        this.capacity = capacity;
        this.lineup = lineup;
    }
}

const tastings: Tasting[] = [];

function addTasting(t: Tasting) {
    tastings.push(t);
}

function getAllTastings(): Tasting[] {
    return tastings;
}

export { Tasting, tastings, addTasting, getAllTastings };
