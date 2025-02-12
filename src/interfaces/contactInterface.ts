export interface Message {
    photo: string;
    date: string;
    messageId: string;
    fullName: string;
    email: string;
    phone: string;
    subject: string;
    content: string;
    status: "read" | "unread";
  }