import { Message } from "../interfaces/contactInterface";
import messageData from "../data/Messages.json";

export class ContactService {
    private messages: Message[] = messageData as Message[];

    fetchAll(): Message[] {
        return this.messages;
    }

    fetchById(messageId: string): Message | undefined {
        return this.messages.find((message) => message.messageId === messageId.toString());
    }

    create(messageId: string): Message {
        const newMessage: Message = { messageId: (this.messages.length + 1).toString(), content: messageId };
        this.messages.push(newMessage);
        return newMessage;
    }

    update(messageId: string, message: Message): Message | null {
        const messageToUpdate = this.messages.find((message) => message.messageId === messageId.toString());
        if (messageToUpdate) {
            const updatedMessage = { ...messageToUpdate, ...message };
            this.messages = this.messages.map((m) => (m.messageId === messageId.toString() ? updatedMessage : m));
            return updatedMessage;
        }
        return null;
    }

    delete(messageId: string): boolean {
        const messageToDelete = this.messages.find((message) => message.messageId === messageId.toString());
        if (messageToDelete) {
            this.messages = this.messages.filter((message) => message.messageId !== messageId.toString());
            return true;
        }
        return false;
    }
}

export const getAllMessages = () => {const service = new ContactService();return service.fetchAll();};
export const getMessage = (messageId: string) => {const service = new ContactService();return service.fetchById(messageId);};
export const createMessage = (message: Message) => {const service = new ContactService();return service.create(message);};
export const updateMessage = (messageId: string, message: Message) => {const service = new ContactService();return service.update(messageId, message);};
export const deleteMessage = (messageId: string) => {const service = new ContactService();return service.delete(messageId);};