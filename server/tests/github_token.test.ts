import { describe, it, expect } from 'vitest';
import axios from 'axios';

describe('GitHub Token Validation', () => {
  it('should be able to access the repository using the provided token', async () => {
    const token = process.env.GITHUB_TOKEN;
    const repoOwner = 'coaudweb';
    const repoName = 'painel-teste';

    if (!token) {
      throw new Error('GITHUB_TOKEN not found in environment variables');
    }

    try {
      const response = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}`, {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      expect(response.status).toBe(200);
      expect(response.data.full_name).toBe(`${repoOwner}/${repoName}`);
      // Check if we have push permissions
      expect(response.data.permissions.push).toBe(true);

    } catch (error: any) {
      if (error.response) {
        console.error('GitHub API Error:', error.response.status, error.response.data);
        if (error.response.status === 404) {
           throw new Error(`Repository ${repoOwner}/${repoName} not found or token does not have access.`);
        }
        if (error.response.status === 401) {
            throw new Error('Invalid GitHub Token.');
        }
      }
      throw error;
    }
  });
});
