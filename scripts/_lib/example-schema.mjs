export const META_SCHEMA = {
  type: 'object',
  required: [
    'id',
    'title',
    'tags',
    'author',
    'duration',
    'resolution',
    'gif',
    'description',
  ],
  additionalProperties: true,
  properties: {
    id: { type: 'string', pattern: '^[a-z0-9][a-z0-9-]*$' },
    title: { type: 'string', minLength: 1 },
    tags: {
      type: 'array',
      minItems: 1,
      items: { type: 'string', minLength: 1 },
    },
    author: { type: 'string', minLength: 1 },
    duration: { type: 'number', exclusiveMinimum: 0 },
    resolution: {
      type: 'string',
      pattern: '^[0-9]+x[0-9]+$',
    },
    gif: { type: 'string', minLength: 1 },
    description: { type: 'string', minLength: 1 },
    level: { type: 'integer', minimum: 1, maximum: 5 },
  },
};

export const REQUIRED_README_SECTIONS = [
  '## 适用场景',
  '## 一行运行',
  '## 关键参数解释',
  '## 进阶改造',
  '## 用到的 cutcli 能力',
];

export const URL_WHITELIST_PATTERNS = [
  /^https:\/\/cutcli\.com\//,
  /^https:\/\/[a-z0-9-]+\.r2\.dev\//,
  /^https:\/\/[a-z0-9-]+\.r2\.cloudflarestorage\.com\//,
  /^https:\/\/cdn\.jsdelivr\.net\//,
  /^https:\/\/raw\.githubusercontent\.com\//,
  /^https:\/\/[a-z0-9-]+\.githubusercontent\.com\//,
];
