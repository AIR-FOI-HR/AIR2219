import { City } from "../entity/City";

export class CityResponse {
    constructor(
        public id: string,
        public name: string,
        public code: string,
        public latitude: number,
        public longitude: number,
    ) {}

    public static toDto(city: City): CityResponse {
        return new CityResponse(
            city.id,
            city.name,
            city.code,
            city.latitude,
            city.longitude
        );
    }

    public static toDtos(cities: City[]): CityResponse[] {
        let cityResponses: CityResponse[] = [];
        cities.forEach((city: City) => {cityResponses.push(CityResponse.toDto(city))});
        return cityResponses;
    }
}
