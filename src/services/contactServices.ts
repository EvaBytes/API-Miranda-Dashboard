import { Message } from "../interfaces/contactInterface";
import messageData from "../data/Messages.json";

export class ContactService {
    private messages: Message[] = messageData as Message[];

    fetchAll(): Message[] {
        return this.messages;
    }

    fetchById(messageId: string): Message | undefined {
        return this.messages.find((message) => message.messageId === messageId);
    }
    

    create(message: Message): Message {
        const newMessage = { ...message, messageId: (this.messages.length + 1).toString() }; 
        this.messages.push(newMessage);
        return newMessage;
    }    

    update(messageId: string, message: Message): Message | null {
        const messageToUpdate = this.messages.find((m) => m.messageId === messageId);
        if (messageToUpdate) {
            const updatedMessage = { ...messageToUpdate, ...message };
            this.messages = this.messages.map((m) => (m.messageId === messageId ? updatedMessage : m));
            return updatedMessage;
        }
        return null;
    }    

    delete(messageId: string): boolean {
        const messageToDelete = this.messages.find((message) => message.messageId === messageId);
        if (messageToDelete) {
            this.messages = this.messages.filter((message) => message.messageId !== messageId);
            return true;
        }
        return false;
    }
}    

const service = new ContactService(); 

export const getAllMessages = () => service.fetchAll();
export const getMessage = (messageId: string) => service.fetchById(messageId);
export const createMessage = (message: Message) => service.create(message);
export const updateMessage = (messageId: string, message: Message) => service.update(messageId, message);
export const deleteMessage = (messageId: string) => service.delete(messageId);
