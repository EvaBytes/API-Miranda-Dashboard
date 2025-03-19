import {MessageModel} from "../models/contactModels";
import { Message } from "../interfaces/contactInterface"; 

export class ContactService {

    async fetchAll(): Promise<Message[]> {
        try{
            const contact = await MessageModel.findAll();
            return contact;
        }catch(error){
            throw new Error('Error fetching messages');
        }

    }

    async fetchById(messageId: string): Promise<Message | null> {
        try {
            const contact = await MessageModel.findByPk(messageId);
            return contact;
        } catch (error) {
            throw new Error('Error fetching message by id');
        }
    }

    async create(messageData: Message): Promise<Message> {
        try {
            const newMessage = await MessageModel.create(messageData);
            return newMessage;
        } catch (error) {
            throw new Error('Error creating message');
        }
    }

    async update(messageId: string, messageData: Partial<Message>): Promise<Message | null> {
        try {
            const [affectedRows, updatedMessages] = await MessageModel.update(messageData, {
                where: { messageId },
                returning: true,
            });

            if (affectedRows === 0) return null; 
            return updatedMessages[0];
        } catch (error) {
            throw new Error('Error updating message');
        }
    }

    async delete(messageId: string): Promise<boolean> {
        try {
            const deletedRows = await MessageModel.destroy({
                where: { messageId }
            });

            return deletedRows > 0; 
        } catch (error) {
            throw new Error('Error deleting message');
        }
    }
}

export const contactService = new ContactService();

export const fetchAllMessages = async () => contactService.fetchAll();
export const fetchMessageById = async (messageId: string) => contactService.fetchById(messageId);
export const createMessage = async (messageData: Message) => contactService.create(messageData);
export const updateMessage = async (messageId: string, messageData: Partial<Message>) => contactService.update(messageId, messageData);
export const deleteMessage = async (messageId: string) => contactService.delete(messageId);