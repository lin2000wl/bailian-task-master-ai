/**
 * Unit tests for Bailian support in config-manager.js
 */

import { jest } from '@jest/globals';

// Mock dependencies
const mockResolveEnvVariable = jest.fn();
const mockFindProjectRoot = jest.fn();

jest.unstable_mockModule('../../scripts/modules/utils.js', () => ({
  resolveEnvVariable: mockResolveEnvVariable,
  findProjectRoot: mockFindProjectRoot,
  log: jest.fn()
}));

// Import after mocking
const { isApiKeySet, getMcpApiKeyStatus } = await import('../../scripts/modules/config-manager.js');

describe('Config Manager - Bailian Support', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('isApiKeySet', () => {
    test('should return true when BAILIAN_API_KEY is set', () => {
      mockResolveEnvVariable.mockReturnValue('valid-bailian-key');

      const result = isApiKeySet('bailian');

      expect(mockResolveEnvVariable).toHaveBeenCalledWith('BAILIAN_API_KEY', null, null);
      expect(result).toBe(true);
    });

    test('should return false when BAILIAN_API_KEY is empty', () => {
      mockResolveEnvVariable.mockReturnValue('');

      const result = isApiKeySet('bailian');

      expect(result).toBe(false);
    });

    test('should return false when BAILIAN_API_KEY is undefined', () => {
      mockResolveEnvVariable.mockReturnValue(undefined);

      const result = isApiKeySet('bailian');

      expect(result).toBe(false);
    });

    test('should return false when BAILIAN_API_KEY is a placeholder', () => {
      mockResolveEnvVariable.mockReturnValue('YOUR_BAILIAN_API_KEY_HERE');

      const result = isApiKeySet('bailian');

      expect(result).toBe(false);
    });

    test('should return false when BAILIAN_API_KEY contains KEY_HERE', () => {
      mockResolveEnvVariable.mockReturnValue('SOME_KEY_HERE');

      const result = isApiKeySet('bailian');

      expect(result).toBe(false);
    });

    test('should handle session and projectRoot parameters', () => {
      const mockSession = { env: { BAILIAN_API_KEY: 'session-key' } };
      const mockProjectRoot = '/test/project';
      
      mockResolveEnvVariable.mockReturnValue('session-key');

      const result = isApiKeySet('bailian', mockSession, mockProjectRoot);

      expect(mockResolveEnvVariable).toHaveBeenCalledWith('BAILIAN_API_KEY', mockSession, mockProjectRoot);
      expect(result).toBe(true);
    });
  });

  describe('getMcpApiKeyStatus', () => {
    const mockFs = {
      existsSync: jest.fn(),
      readFileSync: jest.fn()
    };

    beforeEach(() => {
      // Mock fs module
      jest.unstable_mockModule('fs', () => mockFs);
      mockFindProjectRoot.mockReturnValue('/test/project');
    });

    test('should return true when bailian key is properly set in mcp.json', () => {
      const mcpConfig = {
        mcpServers: {
          'task-master-ai': {
            env: {
              BAILIAN_API_KEY: 'valid-bailian-key'
            }
          }
        }
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mcpConfig));

      const result = getMcpApiKeyStatus('bailian', '/test/project');

      expect(result).toBe(true);
    });

    test('should return false when bailian key is placeholder in mcp.json', () => {
      const mcpConfig = {
        mcpServers: {
          'task-master-ai': {
            env: {
              BAILIAN_API_KEY: 'YOUR_BAILIAN_API_KEY_HERE'
            }
          }
        }
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mcpConfig));

      const result = getMcpApiKeyStatus('bailian', '/test/project');

      expect(result).toBe(false);
    });

    test('should return false when bailian key ends with KEY_HERE', () => {
      const mcpConfig = {
        mcpServers: {
          'task-master-ai': {
            env: {
              BAILIAN_API_KEY: 'SOME_KEY_HERE'
            }
          }
        }
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mcpConfig));

      const result = getMcpApiKeyStatus('bailian', '/test/project');

      expect(result).toBe(false);
    });

    test('should return false when mcp.json does not exist', () => {
      mockFs.existsSync.mockReturnValue(false);

      const result = getMcpApiKeyStatus('bailian', '/test/project');

      expect(result).toBe(false);
    });

    test('should return false when bailian key is missing from mcp.json', () => {
      const mcpConfig = {
        mcpServers: {
          'task-master-ai': {
            env: {
              ANTHROPIC_API_KEY: 'some-other-key'
            }
          }
        }
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mcpConfig));

      const result = getMcpApiKeyStatus('bailian', '/test/project');

      expect(result).toBe(false);
    });

    test('should handle alternative taskmaster-ai server name', () => {
      const mcpConfig = {
        mcpServers: {
          'taskmaster-ai': {
            env: {
              BAILIAN_API_KEY: 'valid-bailian-key'
            }
          }
        }
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mcpConfig));

      const result = getMcpApiKeyStatus('bailian', '/test/project');

      expect(result).toBe(true);
    });

    test('should return false when JSON parsing fails', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue('invalid json');

      const result = getMcpApiKeyStatus('bailian', '/test/project');

      expect(result).toBe(false);
    });

    test('should use findProjectRoot when projectRoot is not provided', () => {
      mockFindProjectRoot.mockReturnValue('/found/project');
      mockFs.existsSync.mockReturnValue(false);

      getMcpApiKeyStatus('bailian');

      expect(mockFindProjectRoot).toHaveBeenCalled();
      expect(mockFs.existsSync).toHaveBeenCalledWith('/found/project/.cursor/mcp.json');
    });

    test('should return false when project root cannot be found', () => {
      mockFindProjectRoot.mockReturnValue(null);

      const result = getMcpApiKeyStatus('bailian');

      expect(result).toBe(false);
    });
  });
}); 