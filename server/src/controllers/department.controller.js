import { Department } from '../models/Department.js';
import * as factory from './handlerFactory.js';

export const createDepartment = factory.createOne(Department);
export const getDepartment = factory.getOne(Department, { path: 'hodId', select: 'firstName lastName' });
export const getAllDepartments = factory.getAll(Department);
export const updateDepartment = factory.updateOne(Department);
export const deleteDepartment = factory.deleteOne(Department);
