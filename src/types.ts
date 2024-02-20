export interface Message {
  id: number;
  author: string;
  messages: singleMessage[];
}
export interface singleMessage {
  id: number;
  avatar: string;
  name: string;
  message: string;
}
