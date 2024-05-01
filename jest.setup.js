const {connectTestDB, closeTestDB} = require('./test-db');

afterAll(async() => {
  await closeTestDB();
})