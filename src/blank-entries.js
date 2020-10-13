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
        prompt: 'My intention for today is...',
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
        prompt: '3 great things that happened today were...',
        promptId: 4,
        responses: [
          '',
          '',
          '',
        ],
      },
      {
        prompt: 'One thing I let go of today was...',
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
