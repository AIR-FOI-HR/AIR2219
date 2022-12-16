import express, { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { check } from 'express-validator';
import * as orderService from '../service/order.service';
import * as dotenv from 'dotenv';


dotenv.config();

const router = express.Router();
