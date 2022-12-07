import express from 'express';
import { Restroom } from '../model/entity/Restroom';
import { AppError } from '../model/constants/AppError';
import { RestroomResponse } from '../model/response/RestroomResponse';
import * as restroomService from '../service/restroom.service';


const router = express.Router();

router.get('/:restroomId', async (req, res, next) => {
    const restroom: Restroom | null = await restroomService.getRestroomById(req.params.restroomId);
    if (!restroom){
        return next(new AppError("Restroom not found!", 404));
    }
    res.json(RestroomResponse.toDto(restroom));

});

module.exports = router;
