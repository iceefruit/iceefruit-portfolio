import { describe, it, expect } from 'vitest';
import { GET } from '../app/api/github/repos/route';

describe('GitHub Repos API Route', () => {
  it('returns valid JSON array with repo schema even under network fallback', async () => {
    const req = new Request('http://localhost:3000/api/github/repos?username=iceefruit');
    const res = await GET(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(Array.isArray(data.repos)).toBe(true);
    expect(data.repos.length).toBeGreaterThan(0);
    expect(data.repos[0]).toHaveProperty('name');
    expect(data.repos[0]).toHaveProperty('html_url');
    expect(data.repos[0]).toHaveProperty('stargazers_count');
  });
});
