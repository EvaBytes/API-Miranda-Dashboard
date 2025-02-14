import { Message } from "../interfaces/contactInterface";

class MessageValidator {
  validate(message: Message): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!message.photo || typeof message.photo !== "string" || message.photo.trim() === "") {
      errors.push("Photo URL is required and must be a valid non-empty string.");
    }

    if (!message.date || isNaN(new Date(message.date).getTime())) {
      errors.push("Date must be a valid date string.");
    }

    if (!message.messageId || typeof message.messageId !== "string" || message.messageId.trim() === "") {
      errors.push("Message ID is required and must be a valid non-empty string.");
    }

    if (!message.fullName || typeof message.fullName !== "string" || message.fullName.trim() === "") {
      errors.push("Full name is required and must be a valid non-empty string.");
    }

    if (!message.email || !/\S+@\S+\.\S+/.test(message.email)) {
      errors.push("Email must be a valid email address.");
    }

    if (!message.phone || typeof message.phone !== "string" || message.phone.trim() === "") {
      errors.push("Phone number is required and must be a valid non-empty string.");
    }

    if (!message.subject || typeof message.subject !== "string" || message.subject.trim() === "") {
      errors.push("Subject is required and must be a valid non-empty string.");
    }

    if (!message.comment || typeof message.comment !== "string" || message.comment.trim() === "") {
      errors.push("Comment is required and must be a valid non-empty string.");
    }

    if (!message.status || !["read", "unread"].includes(message.status)) {
      errors.push("Status must be either 'read' or 'unread'.");
    }

    return {
      valid: errors.length === 0,
      errors:errors,
    };
  }
}

export default MessageValidator;
