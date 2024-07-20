// import { ContactsCollection } from '../models/contacts.js';
import {ContactsCollection} from "../models/contacts.js";


// function getContacts() {
//   return ContactsCollection.find();
// }

// function getContactById(contactId) {
//   return ContactsCollection.findById(contactId);
// }

// function createContact(contact) {
//   return ContactsCollection.create(contact);
// }

// function deleteContact(contactId) {
//   return ContactsCollection.findByIdAndDelete(contactId);
// }

// function changeContact(contactId, payload) {
//   return ContactsCollection.findByIdAndUpdate(contactId, payload, { new: true });
// }

// export {
//   getContacts,
//   getContactById,
//   createContact,
//   deleteContact,
//   changeContact,
// };
export const createContact = async (payload) => {
    const contact = await ContactsCollection.create(payload);
    return contact;
    };
    
export const deleteContact = async (contactId) => {
    const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    });

    return contact;
    };

 export const updateContact = async (contactId, payload, options = {}) => {
    const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
    );

    if (!rawResult || !rawResult.value) return null;

    return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
    };
