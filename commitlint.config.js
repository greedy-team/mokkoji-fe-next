/* eslint-disable no-useless-escape */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^\[(#\d+|no\-issue)\]\s(\w+):\s(.+)$/,
      headerCorrespondence: ['issue', 'type', 'subject'],
    },
  },
  plugins: [
    {
      rules: {
        'header-match-pattern': (parsed) => {
          const { issue, type, subject } = parsed;

          if (!issue || !type || !subject) {
            return [
              false,
              '해당 컨벤션을 사용해 주세요. [#IssueNo|no-issue] type: subject',
            ];
          }

          return [true, ''];
        },
      },
    },
  ],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'comment',
        'design',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'remove',
        'revert',
        'style',
        'test',
      ],
    ],
    'header-match-pattern': [2, 'always'],
    'body-max-line-length': [0, 'always'],
    'footer-leading-blank': [0, 'always'],
    'footer-max-line-length': [0, 'always'],
  },
};
