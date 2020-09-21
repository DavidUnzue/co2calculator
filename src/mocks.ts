// emission in pkm/Kg
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

// emission in pkm/Kg
export const emissions = {
  car: 0.147,
  train: 0.032,
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
export const distances = {
  'FRA-MUC': 388,
  'FRA-TXL': 558,
  'FRA-HAM': 516,
  'MUC-TXL': 572,
  'MUC-HAM': 802,
  'TXL-HAM': 283,
};

export const routes = [
  {
    id: 1,
    origin: 'FRA',
    destination: 'MUC',
    vehicle: 'car',
    distance: 388,
  },
  {
    id: 2,
    origin: 'FRA',
    destination: 'TXL',
    vehicle: 'car',
    distance: 558,
  },
  {
    id: 3,
    origin: 'FRA',
    destination: 'HAM',
    vehicle: 'car',
    distance: 516,
  },
  {
    id: 4,
    origin: 'MUC',
    destination: 'TXL',
    vehicle: 'car',
    distance: 572,
  },
  {
    id: 5,
    origin: 'MUC',
    destination: 'HAM',
    vehicle: 'car',
    distance: 802,
  },
  {
    id: 6,
    origin: 'TXL',
    destination: 'HAM',
    vehicle: 'car',
    distance: 283,
  },
  {
    id: 7,
    origin: 'FRA',
    destination: 'MUC',
    vehicle: 'train',
    distance: 388,
  },
  {
    id: 8,
    origin: 'FRA',
    destination: 'TXL',
    vehicle: 'train',
    distance: 558,
  },
  {
    id: 9,
    origin: 'FRA',
    destination: 'HAM',
    vehicle: 'train',
    distance: 516,
  },
  {
    id: 10,
    origin: 'MUC',
    destination: 'TXL',
    vehicle: 'train',
    distance: 572,
  },
  {
    id: 11,
    origin: 'MUC',
    destination: 'HAM',
    vehicle: 'train',
    distance: 802,
  },
  {
    id: 12,
    origin: 'TXL',
    destination: 'HAM',
    vehicle: 'train',
    distance: 283,
  },
];
