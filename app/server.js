import Fastify from 'fastify';
import FastifyView from '@fastify/view';
import FastifyStatic from '@fastify/static';
import ejs from 'ejs';
import path from 'path';
import fs from 'fs';
import process from 'process';

const fastify = Fastify({
  logger: true,
});

fastify.register(FastifyStatic, {
  root: path.join(process.cwd(), 'public'),
  prefix: '/public/',
});

fastify.register(FastifyView, {
  engine: {
    ejs: ejs,
  },
});

/*
 * Load the homepage
 */
fastify.get('/', function (request, reply) {
  return reply.view('/templates/pages/index.ejs');
});

/*
 * Define API endpoints
 */
fastify.get('/api/example', async function (request, reply) {
  // fetch the template from the file system

  const script = '/public/partials/example.js';
  const stylesheet = '/public/partials/example.css';
  const template = fs.readFileSync(path.join('templates', 'partials/example.ejs'), { encoding: 'utf8' });

  // apply the data to the template to compute the final HTML
  const html = ejs.render(template, { title: request.query.title });

  /*
   * if ?html=true query string is provided, we wrap the response in a pre-fab HTML
   * template that will render and execute the hydrate function
   */
  if (request.query.html) {
    const wrapperTemplate = fs.readFileSync(path.join('templates', 'pages', 'ajaxHtml.ejs'), { encoding: 'utf8' });
    const completeHtml = ejs.render(wrapperTemplate, {
      html,
      script,
      hydrateArgs: request.query.hydrateArgs,
    });
    return reply.type('text/html').send(completeHtml);
  }
  // send the JSON
  reply.send({ html, script, stylesheet });
});

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
