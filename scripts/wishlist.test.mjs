import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/worker.mjs';
const request = (data, headers = {}) => new Request('https://oselementos.com.br/api/wishlist', { method: 'POST', headers: { Origin: 'https://oselementos.com.br', 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(data) });
const valid = { name: '<Pedro>', email: 'visitor@example.com', consent: true };
test('sends a safe inscription to configured recipients', async () => {
 let sent;
 const env = { CONTACT_RECIPIENTS: 'procics@procics.com,pedro.bastos@procics.com', EMAIL: { send: async data => { sent = data; } } };
 const result = await worker.fetch(request(valid), env);
 assert.equal(result.status, 200);
 assert.equal((await result.json()).success, true);
 assert.deepEqual(sent.to, ['procics@procics.com', 'pedro.bastos@procics.com']);
 assert.equal(sent.from.email, 'site@procics.com.br');
 assert.equal(sent.replyTo, valid.email);
 assert.ok(sent.html.includes('&lt;Pedro&gt;'));
});
test('rejects invalid data, absent consent, bots and foreign origins without sending', async () => {
 const env = { EMAIL: { send: async () => { assert.fail('Must not send'); } } };
 for(const data of [{...valid,email:'invalid'}, {...valid,consent:false}, {...valid,website:'spam'}, null]) assert.equal((await worker.fetch(request(data),env)).status,400);
 assert.equal((await worker.fetch(request(valid,{Origin:'https://other.example'}),env)).status,403);
 assert.equal((await worker.fetch(request({...valid,name:'x'.repeat(5000)}),env)).status,413);
});
test('email failure is not reported as success', async () => {
 const result = await worker.fetch(request(valid), { CONTACT_RECIPIENTS: 'procics@procics.com', EMAIL: { send: async () => { throw Error('Unavailable'); } } });
 assert.equal(result.status,502);
 assert.equal((await result.json()).success,undefined);
});
test('normal pages use the assets binding', async () => {
 const result = await worker.fetch(new Request('https://oselementos.com.br/'), { ASSETS: { fetch: async () => new Response('site') } });
 assert.equal(await result.text(),'site');
});
