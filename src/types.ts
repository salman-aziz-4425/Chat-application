


export interface Message {
  id: number;
  sender: string;
  recipient?: string;
  message: string;
}
export interface singleMessage {
  id: number;
  avatar?: string;
  name: string;
  message: string;
}
