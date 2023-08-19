import express from 'express';

import contactsController from '../../controllers/contacts-controller.js';

import { isValidId } from '../../middlewares/index.js';

import {authenticate} from '../../middlewares/index.js';

import validateBody from '../../decorators/validateBody.js';

import contactSchemas from '../../schemas/contact-schemas.js';

import isEmptyBody from '../../middlewares/isEmptyBody.js'


const contactsRouter = express.Router()

contactsRouter.get('/',authenticate, contactsController.getList )

contactsRouter.get('/:contactId',authenticate, isValidId, contactsController.getContactById )

contactsRouter.post('/',authenticate, isEmptyBody, validateBody(contactSchemas.contactAddSchema),contactsController.addContact )

contactsRouter.delete('/:contactId', authenticate, isValidId, contactsController.delContact )

contactsRouter.put('/:contactId', authenticate, isEmptyBody, isValidId, validateBody(contactSchemas.contactAddSchema), contactsController.updateContact)

contactsRouter.patch('/:contactId/favorite', authenticate, isValidId, validateBody(contactSchemas.contactUpdateFavoriteSchema), contactsController.updateContact )


export default contactsRouter;
