interface Instrument {
    id: number,
    name: string,
    color: string,
    type: string,
    inStock?: boolean,
    price: number
};

export { Instrument };