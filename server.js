const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: '*' }));

app.use(express.static(path.join(__dirname, 'public')));
// Start server
var listener = app.listen(process.env.PORT || 4041, function () {
  logMessage('INFO', `Your Pipefy App is running on port ${listener.address().port}`);
});

// Logging function
function logMessage(level, message, data = null, error = null) {
  const logEntry = {
      time: new Date().toISOString(),
      level: level,
      msg: message,
      data: data ? JSON.stringify(data) : null,
      error: error ? { message: error.message, stack: error.stack } : null,
  };
  console.log(JSON.stringify(logEntry));
}
