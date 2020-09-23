export class GoClimateServiceMock {
  getFootprint(origin: string, destination: string) {
    return {
      footprint: 200,
      offset_prices: [
        {
          amount: 80,
          currency: 'EUR',
          offset_url:
            'https://www.goclimate.com/flight_offsets/new?offset_params=economy%2CFRA%2CMUC',
          locale: 'en',
        },
        {
          amount: 80,
          currency: 'EUR',
          offset_url:
            'https://www.goclimate.com/de/flight_offsets/new?offset_params=economy%2CFRA%2CMUC',
          locale: 'de-DE',
        },
      ],
      details_url:
        'https://www.goclimate.com/se/flight_offsets/new?offset_params=economy%2CFRA%2CMUC',
    };
  }
}
