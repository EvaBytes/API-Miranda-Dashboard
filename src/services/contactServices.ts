import { Contact } from '../models/contactModels'; 
import { Message } from '../interfaces/contactInterface'; 

export class ContactService {
    static async fetchAll(): Promise<Message[]> {
        return await Contact.find(); 
    }

    static async fetchById(messageId: string): Promise<Message | null> {
        return await Contact.findOne({ messageId }); 
    }

    static async create(messageData: Message): Promise<Message> {
        const newMessage = new Contact(messageData);
        return await newMessage.save(); 
    }

    static async update(messageId: string, messageData: Partial<Message>): Promise<Message | null> {
        return await Contact.findOneAndUpdate(
            { messageId },
            messageData,
            { new: true }
        ); 
    }

    static async delete(messageId: string): Promise<boolean> {
        const result = await Contact.deleteOne({ messageId });
        return result.deletedCount > 0;
    }
}

export const getAllMessages = ContactService.fetchAll;
export const getMessage = ContactService.fetchById;
export const createMessage = ContactService.create;
export const updateMessage = ContactService.update;
export const deleteMessage = ContactService.delete;