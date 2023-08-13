import Contact from '../models/contact.js'

import cnrWrapper from '../decorators/cnrWrapper.js';

import HttpError  from '../helpers/HttpError.js'

import contactAddSchema from '../schemas/contact-schemas.js'

import contactUpdateFavoriteSchema from '../schemas/contact-schemas.js'

const getList = async (req, res, next) => {
    const result = await Contact.find();
    res.json(result);
}

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.json(result);
}

const addContact = async (req, res, next) => { 
    const { error } = contactAddSchema.validate(req.body)
    if (error) {
      throw HttpError(400,"missing required name field")
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
}

const delContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId, req.params);
    if (!result) {
      throw HttpError(404, 'Not found')
    }  
    res.json(200,"Contact deleted")
}

const updateContact = async (req, res, next) => {
    const { error } = contactAddSchema.validate(req.body)
    if (error) {
      throw HttpError(400,"missing fields")
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.json(result);
}

const updateFavorite = async (req, res, next) => {
    const { error } = contactUpdateFavoriteSchema.validate(req.body)
    if (error) {
      throw HttpError(400,"missing fields")
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.json(result);
}

export default {
  getList: cnrWrapper(getList),
  addContact: cnrWrapper(addContact),
    getContactById: cnrWrapper(getContactById),
    delContact: cnrWrapper(delContact),
    updateContact: cnrWrapper(updateContact),
    updateFavorite: cnrWrapper(updateFavorite),
}