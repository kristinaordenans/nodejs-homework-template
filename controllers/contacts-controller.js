
// import contactsService from '../models/contact.js'

import Contact from '../models/contact.js'

// import HttpError  from '../helpers/HttpError.js'

// import contactAddSchema from '../schemas/contact-schemas.js'

const getList = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  }
  catch (error) {
    next(error);
  }
}

// const getContactById = async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contactsService.getContactById(contactId);
//     if (!result) {
//       throw HttpError(404, 'Not found');
//     }
//     res.json(result);
//   }
//   catch (error) {
//     next(error);
//   }
// }

// const addContact = async (req, res, next) => {
//   try {
//     const { error } = contactAddSchema.validate(req.body)
//     if (error) {
//       throw HttpError(400,"missing required name field")
//     }
//     const result = await contactsService.addContact(req.body);
//     res.status(201).json(result);
//   }
//   catch (error) {
//     next(error);
//   }
// }

// const delContact = async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contactsService.removeContact(contactId, req.params);
//     if (!result) {
//       throw HttpError(404, 'Not found')
//     }  
//     res.json(200,"Contact deleted")
//   }
//   catch (error) {
//     next(error);
//   }
// }

// const updateContact = async (req, res, next) => {
//   try {
//     const { error } = contactAddSchema.validate(req.body)
//     if (error) {
//       throw HttpError(400,"missing fields")
//     }
//     const { contactId } = req.params;
//     const result = await contactsService.updateContact(contactId, req.body);
//     if (!result) {
//       throw HttpError(404, 'Not found');
//     }
//     res.json(result);
//   }
//   catch (error) {
//     next(error);
//   }
// }

export default {
    getList,
    // getContactById,
    // addContact,
    // delContact,
    // updateContact
}