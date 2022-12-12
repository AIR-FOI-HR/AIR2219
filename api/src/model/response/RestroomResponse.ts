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
        console.log(restroom);
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

    public static toDtos(restrooms: Restroom[]): RestroomResponse[] {
        let restroomResponses: RestroomResponse[] = [];
        restrooms.forEach((restroom: Restroom) => {restroomResponses.push(RestroomResponse.toDto(restroom))});
        return restroomResponses;
    }
}
