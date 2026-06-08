import { PlacementDrive } from '../models/PlacementDrive.js';
import * as factory from './handlerFactory.js';

export const createDrive = factory.createOne(PlacementDrive);
export const getDrive = factory.getOne(PlacementDrive, { path: 'companyId', select: 'name logo tier' });
export const getAllDrives = factory.getAll(PlacementDrive);
export const updateDrive = factory.updateOne(PlacementDrive);
export const deleteDrive = factory.deleteOne(PlacementDrive);
