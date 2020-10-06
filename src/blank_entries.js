// These are the default questions to send when a day's entries are incomplete
const blankEntries = {
  morning: {
    complete: false,
    prompts: [
      {
        prompt: '3 things I\'m grateful for...',
        promptId: 1,
        responses: [
          null,
          null,
          null,
        ],
      },
      {
        prompt: '3 things that will make today great...',
        promptId: 2,
        responses: [
          null,
          null,
          null,
        ],
      },
      {
        prompt: 'My intention for today is...',
        promptId: 3,
        responses: [
          null,
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
          null,
          null,
          null,
        ],
      },
      {
        prompt: 'One thing I let go of today was...',
        promptId: 5,
        responses: [
          null,
        ],
      },
      {
        prompt: 'I am excited about tomorrow because...',
        promptId: 6,
        responses: [
          null,
        ],
      },
    ],
  },
};

module.exports = blankEntries;
