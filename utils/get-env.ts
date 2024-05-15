export function getEnv(key: string): string {
  const env = process.env[key];

  if (env === undefined || env === null) {
    throw new Error(`${key} is not a valid env.`);
  }

  return env;
}

const ENV_KEYS = [
  'S3_KEY_ID',
  'S3_ACCESS_KEY',
  'S3_URL',
  'S3_BUCKET_NAME',
  'S3_BUCKET_REGION',
] as const;

type EnvKey = (typeof ENV_KEYS)[number];

type EnvValue = string;

type EnvVars = {
  [key in EnvKey]: EnvValue;
};

export const ENV: EnvVars = ENV_KEYS.reduce((acc, currEnvKey) => {
  const key: EnvKey = currEnvKey;
  acc[key] = getEnv(key);

  return acc;
}, {} as EnvVars);
