import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

it('returns a 404 if the provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signup())
    .send({
      title: 'asdfasf',
      price: 20,
    });

  expect(response.status).toEqual(404);
});

it('returns a 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app).put(`/api/tickets/${id}`).send({
    title: 'asdfasf',
    price: 20,
  });

  expect(response.status).toEqual(401);
});

it('returns a 401 if the user does not own the ticket', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app)
    .post(`/api/tickets/`)
    .set('Cookie', global.signup())
    .send({
      title: 'asdfasf',
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signup())
    .send({
      title: 'newtitle',
      price: 2000,
    })
    .expect(401);
});

it('returns a 400 if the user provided an invalid title or price', async () => {
  const cookie = global.signup();

  const response = await request(app)
    .post(`/api/tickets/`)
    .set('Cookie', cookie)
    .send({
      title: 'asdfasf',
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 20,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      price: 20,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'newtitle',
      price: -10,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'newtitle',
    })
    .expect(400);
});

it('update the tickets provided valid inputs', async () => {
  const cookie = global.signup();

  const response = await request(app)
    .post(`/api/tickets/`)
    .set('Cookie', cookie)
    .send({
      title: 'asdfasf',
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'new title',
      price: 50,
    })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual('new title');
  expect(ticketResponse.body.price).toEqual(50);
});
