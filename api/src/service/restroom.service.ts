import { Restroom } from '../model/entity/Restroom';
import { RestroomRepository } from '../dao/restroom.repository';
import { CityRepository } from '../dao/city.repository';

export const getRestroomById = async (id: string): Promise<Restroom | null> => {
    if(id.length !== 36 || id.split("-").length - 1 !== 4) {
      return null;
    }
    return RestroomRepository.findOne({where: {id}, relations: {city: true}});
};

export const getRestroomsByCityId= async (cityId: string): Promise<Restroom[] | null> => {
  if(cityId.length !== 36 || cityId.split("-").length - 1 !== 4) {
    return null;
  }

  const city = await CityRepository.findOne({where: {id: cityId}, relations: {restrooms: {city: true}}});
  return city ? city.restrooms : null;

};
