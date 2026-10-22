import { expect, test } from 'bun:test'
import server from './index'

test('exports the configured server and fetch handler', () => {
  expect(server.port).toBe(3000)
  expect(typeof server.fetch).toBe('function')
})

test('unknown GET routes return 404', async () => {
  const response = await server.fetch(new Request('http://localhost/missing'))
  expect(response.status).toBe(404)
})

test('CORS preflight allows cross-origin requests', async () => {
  const response = await server.fetch(
    new Request('http://localhost/missing', {
      method: 'OPTIONS',
      headers: {
        Origin: 'https://example.com',
        'Access-Control-Request-Method': 'GET'
      }
    })
  )
  expect(response.status).toBe(204)
  expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*')
})

test('CSRF rejection uses the configured internal error handler', async () => {
  const response = await server.fetch(
    new Request('http://localhost/missing', {
      method: 'POST',
      headers: {
        Origin: 'https://example.com',
        'Sec-Fetch-Site': 'cross-site',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'value=example'
    })
  )
  expect(response.status).toBe(500)
  expect(await response.text()).toBe('Internal Server Error')
})
