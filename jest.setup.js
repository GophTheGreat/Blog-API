const {connectTestDB, closeTestDB} = require('./test-db');

beforeAll(async() => {
  await connectTestDB();
});

afterAll(async() => {
  await closeTestDB();
})