export interface Region {
  id: number;
  name: string;
}

export interface Country {
    alpha2Code: string,
    name: string,
    population: number,
    capital: string,
    currencies: Currencies[],
    flag: string
}
export interface Currencies {
    code: string,
    name: string,
    symbol: string
}
