import express from 'express';
import { City } from '../model/entity/City';
import { CityResponse } from '../model/response/CityResponse';
import * as cityService from '../service/city.service';


const router = express.Router();

router.get('', async (_, res) => {
    const cities: City[] = await cityService.getAllCities();
    res.json(cities.map(city => CityResponse.toDto(city)));
});

module.exports = router;
