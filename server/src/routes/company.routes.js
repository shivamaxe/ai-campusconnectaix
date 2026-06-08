import { Router } from 'express';
import * as companyController from '../controllers/company.controller.js';
import { protect } from '../middlewares/auth.js';
import { authorize } from '../middlewares/authorize.js';
import { PERMISSIONS } from '../config/permissions.js';

const router = Router();

router.use(protect);

router
  .route('/')
  .get(companyController.getAllCompanies)
  .post(
    authorize(PERMISSIONS.COMPANY_MANAGE),
    companyController.createCompany
  );

router
  .route('/:id')
  .get(companyController.getCompany)
  .put(
    authorize(PERMISSIONS.COMPANY_MANAGE),
    companyController.updateCompany
  )
  .delete(
    authorize(PERMISSIONS.COMPANY_MANAGE),
    companyController.deleteCompany
  );

export default router;
