import express from 'express'

import contactsController from '../../controllers/contacts-controller.js'

import isValidId from '../../middlewares/isValid.js'

const contactsRouter = express.Router()

contactsRouter.get('/', contactsController.getList )

contactsRouter.get('/:contactId', isValidId, contactsController.getContactById )

contactsRouter.post('/',contactsController.addContact )

contactsRouter.delete('/:contactId', isValidId, contactsController.delContact )

contactsRouter.put('/:contactId', isValidId, contactsController.updateContact)

contactsRouter.patch('/:contactId/favorite', isValidId, contactsController.updateContact )


export default contactsRouter;
