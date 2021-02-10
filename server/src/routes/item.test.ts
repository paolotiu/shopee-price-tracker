import app from '../app';
import supertest from 'supertest';
import mongoose from 'mongoose';
const request = supertest(app);

// beforeAll(async () => {
//   const url = <URL_HERE>
//   await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
// });

// it('Gets the test endpoint', async (done) => {
//   const res = await request.get('/test');

//   expect(res.status).toBe(200);
//   expect(res.body).toBe('Tested');
//   done();
// });

// it('Item check', async (done) => {
//   const res = await request.get('/item/4901820744');

//   expect(res.status).toBe(200);
//   done();
// });
