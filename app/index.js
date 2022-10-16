import Fastify from 'fastify'
import FastifyView from '@fastify/view';
import FastifyStatic from '@fastify/static'
import ejs from 'ejs';
import path from 'path';
import fs from 'fs';
import { v4 } from 'uuid'
import process from 'process';

const fastify = Fastify({
  logger: true
});

fastify.register(FastifyStatic, {
  root: path.join(process.cwd(), 'public'),
  prefix: '/public/',
})

fastify.register(FastifyView, {
  engine: {
    ejs: ejs,
  },
});

// Declare a route
fastify.get('/', function (request, reply) {
  return reply.view("/templates/index.ejs");
})

// fastify.get('/api/content', async function(request, reply) {
//   // ejs/html response
//   const uuid = v4();
//   return reply.view("/templates/test.ejs", { text: "Eric was here", uuid });
// })

fastify.get('/api/content', async function(request, reply) {
  const template = fs.readFileSync(path.join('templates', 'test.ejs'), {encoding:'utf8'})
  const uuid = v4();
  const html = ejs.render(template, { text: "Eric was json", uuid: uuid });

  reply.send({ html, __meta: { uuid } })
})


// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})