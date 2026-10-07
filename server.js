const app = require('./server/app');
const { initializeDatabase } = require('./server/config/database');

const port = process.env.PORT || 3000;

async function startServer() {
  try {
    await initializeDatabase();
    app.listen(port, () => {
      console.log(`Anime Atlas server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }
}

startServer();
