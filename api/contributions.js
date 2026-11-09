import app from '../backend/server.js';

export default function handler(request, response) {
  response.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
  return app(request, response);
}
