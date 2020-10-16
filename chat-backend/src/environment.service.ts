interface EnvironmentConfig {
  PORT: number;
  WS_PORT: number;
  NODE_ENV: 'production' | 'development';
  MATCHING_INTERVAL: number;
  MONGO_CONNECTION: string;
}

function interpolateNodeEnv() {
  return process.env.NODE_ENV === 'production' ? 'production' : 'development';
}

function interpolateMongoConnection() {
  const {
    MONGO_USER,
    MONGO_URL,
    MONGO_PASSWORD,
    MONGO_PORT,
    MONGO_DB,
  } = process.env;
  const connectionUser =
    MONGO_USER && MONGO_PASSWORD ? `${MONGO_USER}:${MONGO_PASSWORD}` : '';
  const connectionAddress = MONGO_URL ? MONGO_URL : 'mongo';
  const connectionPort = MONGO_PORT ? MONGO_PORT : '27017';
  const connectionDb = MONGO_DB ? MONGO_DB : 'chatDebate';
  return `mongodb://${connectionUser}${connectionAddress}:${connectionPort}/${connectionDb}`;
}

export const EnvironmentService: EnvironmentConfig = {
  PORT: parseInt(process.env.PORT) || 4000,
  WS_PORT: parseInt(process.env.WS_PORT) || 4001,
  NODE_ENV: interpolateNodeEnv(),
  MATCHING_INTERVAL: parseInt(process.env.MATCHING_INTERVAL) || 5000,
  MONGO_CONNECTION: interpolateMongoConnection(),
};
