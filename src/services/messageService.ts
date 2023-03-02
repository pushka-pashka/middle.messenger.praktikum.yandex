export const sortMessages = (messages: Message[]) => {
  return messages.sort((a, b) => new Date(a.time) - new Date(b.time));
};
