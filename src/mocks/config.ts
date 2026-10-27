export const shouldEnableMocking = (
  nodeEnv: string | undefined,
  mockingFlag: string | undefined,
) => nodeEnv !== 'production' && mockingFlag === 'enabled';

// Next가 빌드 시점에 치환할 수 있도록 process.env를 리터럴로 접근한다
export const isMockingEnabled = shouldEnableMocking(
  process.env.NODE_ENV,
  process.env.NEXT_PUBLIC_API_MOCKING,
);
