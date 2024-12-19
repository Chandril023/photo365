// lib/env.ts

import { cleanEnv, str } from 'envalid';

const env = cleanEnv(process.env, {
PEXELS_API_KEY: str({ desc: 'Pexels API key' }),
});

export default env;
