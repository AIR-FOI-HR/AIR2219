import { City } from '../model/entity/City';
import { CityRepository } from '../dao/city.repository';


export const getAllCities = async (): Promise<City[]> => {
    return CityRepository.find();
};
