import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { app } from '../app';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      signup(): string[];
    }
  }
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'ASDFAasdfsdf';
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signup = () => {
  // Build a JWT payload. { id, email }
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };

  // Create the JWT.
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session object. { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionsJSON = JSON.stringify(session);

  // Take JSON and encode it as base64.
  const base64 = Buffer.from(sessionsJSON).toString('base64');

  // Return a string thats the cookie with the encoded data.
  return [`express:sess=${base64}`];
};
