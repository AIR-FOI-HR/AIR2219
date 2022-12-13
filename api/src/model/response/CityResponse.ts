import { City } from "../entity/City";

export class CityResponse {
    constructor(
        public id: string,
        public name: string,
        public code: string,

    ) {}

    public static toDto(city: City): CityResponse {
        return new CityResponse(
            city.id,
            city.name,
            city.code
        );
    }
}
