import { Assignment } from '../models/Assignment.js';
import * as factory from './handlerFactory.js';

export const createAssignment = factory.createOne(Assignment);
export const getAssignment = factory.getOne(Assignment, { path: 'courseId', select: 'name code' });
export const getAllAssignments = factory.getAll(Assignment);
export const updateAssignment = factory.updateOne(Assignment);
export const deleteAssignment = factory.deleteOne(Assignment);
