require('dotenv').config();

const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[Express] Server running on http://localhost:${PORT}`);
  console.log(`[Express] Environment: ${process.env.NODE_ENV || 'development'}`);
});
