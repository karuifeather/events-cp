const express = require('express');
const fs = require('fs');
const path = require('path');

const eventsRouter = require('./routes/events');

const app = express();
const clientBuildPath = path.join(__dirname, '..', 'client', 'dist');
const clientIndexPath = path.join(clientBuildPath, 'index.html');

// The API always accepts JSON, and the React build is served only when it exists.
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/events', eventsRouter);

if (fs.existsSync(clientIndexPath)) {
  app.use(express.static(clientBuildPath));

  app.use((request, response, next) => {
    if (request.method === 'GET' && !request.path.startsWith('/api')) {
      response.sendFile(clientIndexPath);
      return;
    }

    next();
  });
}

app.use((request, response) => {
  if (request.path.startsWith('/api')) {
    response.status(404).json({ error: 'API route not found.' });
    return;
  }

  response.status(404).send('Page not found.');
});

module.exports = app;
