import { transformDateToHumanReadable } from './transform-date-to-human-readable';

describe('transformDateToHumanReadable', () => {
  it('should exist', () => {
    expect(transformDateToHumanReadable).toBeTruthy();
  });

  it('should transform Date object to human readable', () => {
    const messages = [
      { messageText: 'Message1', sentAt: new Date('2021-02-23T18:13:16.788Z') },
      {
        messageText: 'Second message',
        sentAt: new Date('2021-02-23T18:27:21.157Z'),
      },
    ] as any;
    const actualResult = transformDateToHumanReadable(messages);
    const expectedResult = [
      { messageText: 'Message1', sentAt: '19:13 on 2/2/2021' },
      { messageText: 'Second message', sentAt: '19:27 on 2/2/2021' },
    ];
    expect(actualResult).toEqual(expectedResult);
  });
});
