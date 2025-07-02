/**
 * Basic functional tests for Bailian provider
 */

import { BailianProvider } from '../../src/ai-providers/bailian.js';

describe('Bailian Provider Basic Functionality', () => {
  let bailianProvider;

  beforeEach(() => {
    bailianProvider = new BailianProvider();
  });

  test('should initialize with correct properties', () => {
    expect(bailianProvider.name).toBe('Bailian');
    expect(bailianProvider.baseURL).toBe('http://dashscope.aliyuncs.com/compatible-mode/v1');
  });

  test('should validate auth correctly', () => {
    // Should not throw with valid API key
    expect(() => {
      bailianProvider.validateAuth({ apiKey: 'valid-key' });
    }).not.toThrow();

    // Should throw with missing API key
    expect(() => {
      bailianProvider.validateAuth({});
    }).toThrow('Bailian API key is required');
  });

  test('should handle errors with Chinese messages', () => {
    const error401 = { response: { status: 401 } };
    expect(() => {
      bailianProvider.handleError('test', error401);
    }).toThrow('百炼平台API密钥无效');

    const error429 = { response: { status: 429 } };
    expect(() => {
      bailianProvider.handleError('test', error429);
    }).toThrow('百炼平台API请求频率超限');

    const error500 = { response: { status: 500 } };
    expect(() => {
      bailianProvider.handleError('test', error500);
    }).toThrow('百炼平台服务器错误');
  });

  test('should require API key for client creation', () => {
    expect(() => {
      bailianProvider.getClient({});
    }).toThrow('Bailian API key is required');
  });
}); 