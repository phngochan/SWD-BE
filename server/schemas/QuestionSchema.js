module.exports = {
  Question: {
    type: 'object',
    properties: {
      _id: {
        type: 'string',
        description: 'The auto-generated id of the question',
      },
      questionText: {
        type: 'string',
        description: 'The text of the question',
      },
      answerOptions: {
        type: 'array',
        items: {
          type: 'string',
        },
        description: 'The answer options for the question',
      },
    },
    required: ['questionText', 'answerOptions'],
  },
};