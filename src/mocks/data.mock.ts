// emission in Kg/pkm
export const vehicles = {
  car: {
    id: 'car',
    label: 'Car',
    emissions: 0.147,
  },
  train: {
    id: 'train',
    label: 'Train',
    emissions: 0.032,
  },
};

export const places = [
  {
    id: 'FRA',
    label: 'Frankfurt Airport',
    lat: '50.037919',
    long: '8.562045',
  },
  {
    id: 'MUC',
    label: 'Munich Airport',
    lat: '48.353747',
    long: '11.774993',
  },
  {
    id: 'TXL',
    label: 'Berlin Tegel Airport',
    lat: '52.558872',
    long: '13.288394',
  },
  {
    id: 'HAM',
    label: 'Hamburg Airport',
    lat: '53.633647',
    long: '9.997542',
  },
];

// distances in Km
export const routes = [
  {
    origin: 'FRA',
    destination: 'MUC',
    vehicle: 'car',
    distance: 388,
  },
  {
    origin: 'FRA',
    destination: 'TXL',
    vehicle: 'car',
    distance: 558,
  },
  {
    origin: 'FRA',
    destination: 'HAM',
    vehicle: 'car',
    distance: 516,
  },
  {
    origin: 'MUC',
    destination: 'TXL',
    vehicle: 'car',
    distance: 572,
  },
  {
    origin: 'MUC',
    destination: 'HAM',
    vehicle: 'car',
    distance: 802,
  },
  {
    origin: 'TXL',
    destination: 'HAM',
    vehicle: 'car',
    distance: 283,
  },
  {
    origin: 'FRA',
    destination: 'MUC',
    vehicle: 'train',
    distance: 388,
  },
  {
    origin: 'FRA',
    destination: 'TXL',
    vehicle: 'train',
    distance: 558,
  },
  {
    origin: 'FRA',
    destination: 'HAM',
    vehicle: 'train',
    distance: 516,
  },
  {
    origin: 'MUC',
    destination: 'TXL',
    vehicle: 'train',
    distance: 572,
  },
  {
    origin: 'MUC',
    destination: 'HAM',
    vehicle: 'train',
    distance: 802,
  },
  {
    origin: 'TXL',
    destination: 'HAM',
    vehicle: 'train',
    distance: 283,
  },
];
