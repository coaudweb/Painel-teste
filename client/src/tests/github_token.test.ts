import { describe, it, expect } from 'vitest';
import axios from 'axios';

describe('GitHub Token Validation', () => {
  it('should be able to access the repository using the provided token', async () => {
    // In client-side vitest, process.env might need special handling or be mocked/injected
    // However, for this specific validation task in the sandbox, we rely on the env var being available to the test runner process.
    const token = process.env.GITHUB_TOKEN;
    const repoOwner = 'coaudweb';
    const repoName = 'painel-teste';

    if (!token) {
      // If running in browser-like env, env vars might be exposed via import.meta.env.VITE_... 
      // but GITHUB_TOKEN is a secret and shouldn't be exposed to client bundle.
      // Since we are running this test in the sandbox via `vitest run`, it runs in Node.js environment.
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
           throw new Error(`Repository ${repoOwner}/${repoName} not found or token does not have access. Please ensure the repository exists and the token has 'repo' scope.`);
        }
        if (error.response.status === 401) {
            throw new Error('Invalid GitHub Token. Please check if the token is correct and not expired.');
        }
      }
      throw error;
    }
  });
});
