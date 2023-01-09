import express, { NextFunction, Request, Response } from 'express';
import { Restroom } from '../model/entity/Restroom';
import { AppError } from '../model/constants/AppError';
import { RestroomResponse } from '../model/response/RestroomResponse';
import * as restroomService from '../service/restroom.service';
import { authenticateRequest } from '../auth/auth';

const router = express.Router();

router.use(authenticateRequest);

router.get('/:restroomId', async (req: Request, res: Response, next: NextFunction) => {
    const restroom: Restroom | null = await restroomService.getRestroomById(req.params.restroomId);
    if (!restroom){
        return next(new AppError("Restroom not found!", 404));
    }
    res.json(RestroomResponse.toDto(restroom));

});

router.get('/byCity/:cityId', async (req: Request, res: Response, next: NextFunction) => {
    const restrooms: Restroom[] | null = await restroomService.getRestroomsByCityId(req.params.cityId);
    if (!restrooms){
        return next(new AppError("Restrooms not found for this city!", 404));
    }
    res.json(RestroomResponse.toDtos(restrooms));

});

module.exports = router;
