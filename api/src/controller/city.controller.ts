import express from 'express';
import { City } from '../model/entity/City';
import { CityResponse } from '../model/response/CityResponse';
import * as cityService from '../service/city.service';
import { authenticateRequest } from '../middleware/auth';

const router = express.Router();

router.use(authenticateRequest)

router.get('', async (_, res) => {
    const cities: City[] = await cityService.getAllCities();
    res.json(CityResponse.toDtos(cities));
});

module.exports = router;
