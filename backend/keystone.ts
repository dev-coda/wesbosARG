import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360,
  secret: process.env.COOKIE_SECRET,
};

export default config({
  server: {
    cors: {
      origin: ['process.env.FRONTEND_URL'],
      credentials: true,
    },
  },
  lists: createSchema({}),
  db: {
    adapter: 'mongoose',
    url: databaseURL,
  },
  ui: {
    // Todo: Change this to roles
    isAccessAllowed: () => true,
  },
  // Add session values here
});