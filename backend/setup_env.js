const fs = require('fs');
const content = `DATABASE_URL=file:./dev.db
JWT_SECRET=supersecretkey
PORT=3000`;
fs.writeFileSync('.env', content, { encoding: 'utf8' });
console.log('.env file created successfully');
