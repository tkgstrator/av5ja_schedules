import { describe, expect, it } from 'bun:test'
import server from './index'

describe('server', () => {
  it('serves on port 3000', () => {
    expect(server.port).toBe(3000)
  })

  it('returns 404 for an unknown path', async () => {
    const res = await server.fetch(new Request('http://localhost/unknown'))
    expect(res.status).toBe(404)
  })

  it('allows cross origin requests', async () => {
    const res = await server.fetch(
      new Request('http://localhost/unknown', {
        method: 'OPTIONS',
        headers: {
          Origin: 'https://example.com',
          'Access-Control-Request-Method': 'GET'
        }
      })
    )
    expect(res.headers.get('access-control-allow-origin')).toBe('*')
  })
})
