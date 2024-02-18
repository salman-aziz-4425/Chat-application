export interface Message {
  id: number;
  author: string;
  messages: singleMessage[];
}
export interface singleMessage {
  id: 1;
  avatar: string;
  name: string;
  message: string;
}
