import express from 'express'

import contactsController from '../../controllers/contacts-controller.js'

import { isValidId } from '../../middlewares/index.js';

import {authenticate} from '../../middlewares/index.js';

import validateBody from '../../decorators/validateBody.js';

import contactSchemas from '../../schemas/contact-schemas.js';

import isEmptyBody from '../../middlewares/isEmptyBody.js'


const contactsRouter = express.Router()

contactsRouter.use(authenticate);

contactsRouter.get('/', contactsController.getList )

contactsRouter.get('/:contactId', isValidId, contactsController.getContactById )

contactsRouter.post('/', isEmptyBody, validateBody(contactSchemas.contactAddSchema),contactsController.addContact )

contactsRouter.delete('/:contactId', isValidId, contactsController.delContact )

contactsRouter.put('/:contactId', isEmptyBody, isValidId, validateBody(contactSchemas.contactAddSchema), contactsController.updateContact)

contactsRouter.patch('/:contactId/favorite', isValidId, validateBody(contactSchemas.contactUpdateFavoriteSchema), contactsController.updateContact )


export default contactsRouter;
