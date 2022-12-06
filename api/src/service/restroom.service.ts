import { Restroom } from '../model/entity/Restroom';
import { RestroomRepository } from '../dao/restroom.repository';

export const getRestroomById = async (id: string): Promise<Restroom> => {
  return RestroomRepository.findOneByOrFail({id});
};
