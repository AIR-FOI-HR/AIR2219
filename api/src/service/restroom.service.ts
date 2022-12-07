import { Restroom } from '../model/entity/Restroom';
import { RestroomRepository } from '../dao/restroom.repository';

export const getRestroomById = async (id: string): Promise<Restroom | null> => {
    if(id.length !== 36 || id.split(",").length - 1 !== 4) {
      return null;
    }
    return RestroomRepository.findOne({where: {id}, relations: {city: true}});
};
