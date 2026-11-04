import { describe, it, expect } from 'vitest';
import { profileData } from '../data/profile';
import { privateProjects } from '../data/private-projects';

describe('Core Data & Identity', () => {
  it('exposes Iceefruit profile data with required fields', () => {
    expect(profileData.name).toBe('Iceefruit');
    expect(profileData.handle).toBe('iceefruit');
    expect(profileData.status).toContain('ONLINE');
    expect(profileData.socials.length).toBeGreaterThan(0);
    expect(profileData.skills.length).toBeGreaterThan(0);
  });

  it('exposes curated private projects with NDA badges and metrics', () => {
    expect(privateProjects.length).toBeGreaterThanOrEqual(2);
    privateProjects.forEach(proj => {
      expect(proj.classification).toBe('CLASSIFIED / INTERNAL');
      expect(proj.techStack.length).toBeGreaterThan(0);
      expect(proj.metrics.length).toBeGreaterThan(0);
    });
  });
});
