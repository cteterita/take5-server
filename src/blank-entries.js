// These are the default questions to send when a day's entries are incomplete. In the future
// they can be dynamic, user-generated, etc, which is why they're stored on the server.
const blankEntries = {
  morning: {
    complete: false,
    prompts: [
      {
        prompt: '3 things I\'m grateful for...',
        promptId: 1,
        responses: [
          '',
          '',
          '',
        ],
      },
      {
        prompt: '3 things that will make today great...',
        promptId: 2,
        responses: [
          '',
          '',
          '',
        ],
      },
      {
        prompt: 'One creative thing I will do today is...',
        promptId: 3,
        responses: [
          '',
        ],
      },
    ],
  },
  evening: {
    complete: false,
    prompts: [
      {
        prompt: '3 things that delighted me today were...',
        promptId: 4,
        responses: [
          '',
          '',
          '',
        ],
      },
      {
        prompt: 'I was proud of myself today because...',
        promptId: 5,
        responses: [
          '',
        ],
      },
      {
        prompt: 'I am excited about tomorrow because...',
        promptId: 6,
        responses: [
          '',
        ],
      },
    ],
  },
};

module.exports = blankEntries;
