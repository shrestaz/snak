import { MessageDB } from '../../../interfaces/message';

/**
 * This helper function transforms the date from mongoDB documents to human readable.
 * @example: `2021-02-23T18:13:16.788Z` --> `19:13 on 23/02/2021`
 *
 * @export
 * @param {MessageDB[]} Array of MessageDB
 * @return {MessageDB[]} Array of MessageDB
 */
export function transformDateToHumanReadable(messages: MessageDB[]) {
  return messages.map((message) => {
    const date = message.sentAt;

    const hour = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    const day = new Date(date).getUTCDay();
    const month = new Date(date).getUTCMonth() + 1; // Because getmonth() start from 0
    const year = new Date(date).getUTCFullYear();

    const transformedDate = `${hour}:${minutes} on ${day}/${month}/${year}`;

    return { ...message, sentAt: transformedDate };
  });
}
