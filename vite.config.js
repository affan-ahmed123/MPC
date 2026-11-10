import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import handler from './api/reviews.js';

function reviewsApiPlugin(env) {
  return {
    name: 'reviews-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/reviews', async (req, res) => {
        if (env.MONGODB_URI && !process.env.MONGODB_URI) {
          process.env.MONGODB_URI = env.MONGODB_URI;
        }

        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              req.body = body ? JSON.parse(body) : {};
            } catch {
              req.body = {};
            }
            await handler(req, res);
          });
        } else {
          await handler(req, res);
        }
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/reviews', async (req, res) => {
        if (env.MONGODB_URI && !process.env.MONGODB_URI) {
          process.env.MONGODB_URI = env.MONGODB_URI;
        }

        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              req.body = body ? JSON.parse(body) : {};
            } catch {
              req.body = {};
            }
            await handler(req, res);
          });
        } else {
          await handler(req, res);
        }
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), reviewsApiPlugin(env)],
  };
});
