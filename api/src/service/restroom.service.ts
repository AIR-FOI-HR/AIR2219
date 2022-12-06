import { Restroom } from '../model/entity/Restroom';
import { RestroomRepository } from '../dao/restroom.repository';

export const getRestroomById = async (id: string): Promise<Restroom | null> => {
  return RestroomRepository.findOne({where: {id}, relations: {city: true}});
};
