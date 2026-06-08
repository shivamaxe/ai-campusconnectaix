import { Company } from '../models/Company.js';
import * as factory from './handlerFactory.js';

export const createCompany = factory.createOne(Company);
export const getCompany = factory.getOne(Company);
export const getAllCompanies = factory.getAll(Company);
export const updateCompany = factory.updateOne(Company);
export const deleteCompany = factory.deleteOne(Company);
