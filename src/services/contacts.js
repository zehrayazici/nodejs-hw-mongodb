import { Contact } from '../db/models/Contact.js';

export const getAllContacts = async ({ page, perPage, sortBy, sortOrder, type, isFavourite, userId }) => {
  const skip = (page - 1) * perPage;

  const filter = { userId };
  if (type) filter.contactType = type;
  if (isFavourite !== undefined) filter.isFavourite = isFavourite;

  const totalItems = await Contact.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / perPage);

  const contacts = await Contact.find(filter)
    .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
    .skip(skip)
    .limit(perPage);

  return {
    data: contacts,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({ _id: contactId, userId });
  return contact;
};

export const createContact = async (payload) => {
  const contact = await Contact.create(payload);
  return contact;
};

export const updateContact = async (contactId, userId, payload) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    { new: true }
  );
  return contact;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await Contact.findOneAndDelete({ _id: contactId, userId });
  return contact;
};