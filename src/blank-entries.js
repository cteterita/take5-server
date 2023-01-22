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
        prompt: 'One thing that will make today great is...',
        promptId: 2,
        responses: [
          '',
        ],
      },
      {
        prompt: 'I am proud of myself today because...',
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
        prompt: 'One novel thing I did today was...',
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
