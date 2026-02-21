import express from 'express';
import { Roles } from '../../../generated/prisma/enums';
import { checkAuth } from '../../middleware/checkAuth';
import { validateRequest } from '../../middleware/validateRequest';
import { ReviewController } from './review.controller';
import { ReviewValidation } from './review.validation';

const router = express.Router();

router.get('/', ReviewController.getAllReviews);

router.post(
    '/',
    checkAuth(Roles.PATIENT),
    validateRequest(ReviewValidation.createReviewZodSchema),
    ReviewController.giveReview
);

router.get('/my-reviews', checkAuth(Roles.PATIENT, Roles.DOCTOR), ReviewController.myReviews);

router.patch('/:id', checkAuth(Roles.PATIENT), validateRequest(ReviewValidation.updateReviewZodSchema), ReviewController.updateReview);

router.delete('/:id', checkAuth(Roles.PATIENT), ReviewController.deleteReview);




export const ReviewRoutes = router;