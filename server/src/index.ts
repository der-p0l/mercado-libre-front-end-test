import express from 'express';
import corsMiddleware from './infrastructure/rest/middlewares/CorsMiddleware';

// Create app
const app = express();
const port = 3000;

// Set middlewares
app.use(corsMiddleware);

// Set routes
app.use('/api', require('./infrastructure/rest/routes'));

// Listen on specified port
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
