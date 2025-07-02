/**
 * Unit tests for BailianProvider
 */

import { jest } from '@jest/globals';

// Mock @ai-sdk/openai before importing BailianProvider
const mockCreateOpenAI = jest.fn();
jest.unstable_mockModule('@ai-sdk/openai', () => ({
  createOpenAI: mockCreateOpenAI
}));

// Import after mocking
const { BailianProvider } = await import('../../../src/ai-providers/bailian.js');

describe('BailianProvider', () => {
  let bailianProvider;

  beforeEach(() => {
    bailianProvider = new BailianProvider();
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    test('should initialize with correct name and baseURL', () => {
      expect(bailianProvider.name).toBe('Bailian');
      expect(bailianProvider.baseURL).toBe('http://dashscope.aliyuncs.com/compatible-mode/v1');
    });
  });

  describe('getClient', () => {
    test('should create client with valid API key', () => {
      const mockClient = jest.fn();
      mockCreateOpenAI.mockReturnValue(mockClient);

      const params = {
        apiKey: 'test-api-key',
        baseURL: 'http://custom-url.com'
      };

      const result = bailianProvider.getClient(params);

      expect(mockCreateOpenAI).toHaveBeenCalledWith({
        apiKey: 'test-api-key',
        baseURL: 'http://custom-url.com',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      expect(result).toBe(mockClient);
    });

    test('should use default baseURL when not provided', () => {
      const mockClient = jest.fn();
      mockCreateOpenAI.mockReturnValue(mockClient);

      const params = {
        apiKey: 'test-api-key'
      };

      bailianProvider.getClient(params);

      expect(mockCreateOpenAI).toHaveBeenCalledWith({
        apiKey: 'test-api-key',
        baseURL: 'http://dashscope.aliyuncs.com/compatible-mode/v1',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    });

    test('should throw error when API key is missing', () => {
      const params = {};

      expect(() => {
        bailianProvider.getClient(params);
      }).toThrow('Bailian API key is required. Please set BAILIAN_API_KEY environment variable.');
    });

    test('should handle client creation errors', () => {
      const error = new Error('Client creation failed');
      mockCreateOpenAI.mockImplementation(() => {
        throw error;
      });

      const params = {
        apiKey: 'test-api-key'
      };

      expect(() => {
        bailianProvider.getClient(params);
      }).toThrow('Bailian API error during client initialization');
    });
  });

  describe('validateAuth', () => {
    test('should pass validation with valid API key', () => {
      const params = { apiKey: 'valid-key' };
      
      expect(() => {
        bailianProvider.validateAuth(params);
      }).not.toThrow();
    });

    test('should throw error when API key is missing', () => {
      const params = {};
      
      expect(() => {
        bailianProvider.validateAuth(params);
      }).toThrow('Bailian API key is required. Please set BAILIAN_API_KEY environment variable and ensure it\'s properly configured.');
    });
  });

  describe('handleError', () => {
    test('should handle 401 unauthorized error', () => {
      const error = {
        response: { status: 401 }
      };

      expect(() => {
        bailianProvider.handleError('test operation', error);
      }).toThrow('Bailian API error during test operation: 百炼平台API密钥无效，请检查BAILIAN_API_KEY环境变量');
    });

    test('should handle 429 rate limit error', () => {
      const error = {
        response: { status: 429 }
      };

      expect(() => {
        bailianProvider.handleError('test operation', error);
      }).toThrow('Bailian API error during test operation: 百炼平台API请求频率超限，请稍后重试');
    });

    test('should handle 400 bad request error', () => {
      const error = {
        response: { 
          status: 400,
          data: { error: { message: 'Invalid parameter' } }
        }
      };

      expect(() => {
        bailianProvider.handleError('test operation', error);
      }).toThrow('Bailian API error during test operation: 百炼平台API请求参数错误：Invalid parameter');
    });

    test('should handle 500 server error', () => {
      const error = {
        response: { status: 500 }
      };

      expect(() => {
        bailianProvider.handleError('test operation', error);
      }).toThrow('Bailian API error during test operation: 百炼平台服务器错误，请稍后重试');
    });

    test('should handle generic errors', () => {
      const error = {
        message: 'Generic error'
      };

      expect(() => {
        bailianProvider.handleError('test operation', error);
      }).toThrow('Bailian API error during test operation: Generic error');
    });

    test('should preserve original error', () => {
      const originalError = new Error('Original error');
      
      try {
        bailianProvider.handleError('test operation', originalError);
      } catch (thrownError) {
        expect(thrownError.originalError).toBe(originalError);
      }
    });
  });
}); 