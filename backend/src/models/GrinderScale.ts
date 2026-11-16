class GrinderScale {
    id: number;
    grinderScale: string;

    constructor(id: number, grinderScale: string) {
        this.id = id;
        this.grinderScale = grinderScale;
    }
}

const grinderscales: GrinderScale[] = [];

function addReservation(g: GrinderScale) {
    grinderscales.push(g);
}

function getAllReservations(): GrinderScale[] {
    return grinderscales;
}

export { GrinderScale, grinderscales, addReservation, getAllReservations };
