import Contact from '../models/contact.js'

import cnrWrapper from '../decorators/cnrWrapper.js';

import HttpError  from '../helpers/HttpError.js'


const getList = async (req, res, next) => {
    const { _id: owner } = req.user;
    const result = await Contact.find({owner}).populate("owner");
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

const addContact = async (req, res) => { 
  const { _id: owner } = req.user;
    const result = await Contact.create({...req.body, owner });
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
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.json(result);
}

const updateFavorite = async (req, res, next) => {
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