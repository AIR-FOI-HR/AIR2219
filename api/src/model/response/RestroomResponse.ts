import { Restroom } from "../entity/Restroom";

export class RestroomResponse {
    constructor(
        public id: string,
        public name: string,
        public price: number,
        public address: string,
        public latitude: number,
        public longitude: number,
        public cityName: string,
        public cityCode: string,

    ) {}

    public static toDto(restroom: Restroom): RestroomResponse {
        return new RestroomResponse(
            restroom.id,
            restroom.name,
            restroom.price,
            restroom.address,
            restroom.latitude,
            restroom.longitude,
            restroom.city.name,
            restroom.city.code

        );
    }
}
