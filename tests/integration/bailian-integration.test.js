/**
 * Integration tests for Bailian provider with AI services
 */

import { jest } from '@jest/globals';

// Mock dependencies
const mockGenerateText = jest.fn();
const mockStreamText = jest.fn();
const mockGenerateObject = jest.fn();

jest.unstable_mockModule('ai', () => ({
  generateText: mockGenerateText,
  streamText: mockStreamText,
  generateObject: mockGenerateObject
}));

const mockCreateOpenAI = jest.fn();
jest.unstable_mockModule('@ai-sdk/openai', () => ({
  createOpenAI: mockCreateOpenAI
}));

const mockGetMainProvider = jest.fn();
const mockGetMainModelId = jest.fn();
const mockGetParametersForRole = jest.fn();
const mockIsApiKeySet = jest.fn();

jest.unstable_mockModule('../../scripts/modules/config-manager.js', () => ({
  getMainProvider: mockGetMainProvider,
  getMainModelId: mockGetMainModelId,
  getParametersForRole: mockGetParametersForRole,
  isApiKeySet: mockIsApiKeySet,
  MODEL_MAP: {
    bailian: [
      {
        id: 'qwen-max-latest',
        swe_score: 0.45,
        cost_per_1m_tokens: { input: 20, output: 60, currency: 'CNY' },
        allowed_roles: ['main', 'fallback', 'research'],
        max_tokens: 8192
      }
    ]
  }
}));

const mockResolveEnvVariable = jest.fn();
const mockLog = jest.fn();

jest.unstable_mockModule('../../scripts/modules/utils.js', () => ({
  resolveEnvVariable: mockResolveEnvVariable,
  log: mockLog,
  findProjectRoot: jest.fn().mockReturnValue('/test/project')
}));

// Import after mocking
const { generateTextService } = await import('../../scripts/modules/ai-services-unified.js');

describe('Bailian Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock setup
    mockGetMainProvider.mockReturnValue('bailian');
    mockGetMainModelId.mockReturnValue('qwen-max-latest');
    mockGetParametersForRole.mockReturnValue({
      maxTokens: 8192,
      temperature: 0.7
    });
    mockIsApiKeySet.mockReturnValue(true);
    mockResolveEnvVariable.mockReturnValue('test-bailian-key');
    
    // Mock OpenAI client creation
    const mockClient = jest.fn((modelId) => `client-${modelId}`);
    mockCreateOpenAI.mockReturnValue(mockClient);
  });

  describe('generateTextService with Bailian provider', () => {
    test('should successfully generate text using Bailian provider', async () => {
      const mockResponse = {
        text: '这是百炼平台生成的测试回复',
        usage: {
          promptTokens: 100,
          completionTokens: 50,
          totalTokens: 150
        }
      };

      mockGenerateText.mockResolvedValue(mockResponse);

      const result = await generateTextService({
        role: 'main',
        session: null,
        systemPrompt: '你是一个有用的AI助手',
        prompt: '请介绍一下阿里云百炼平台'
      });

      expect(result).toBe('这是百炼平台生成的测试回复');
      
      // Verify the correct provider was used
      expect(mockGetMainProvider).toHaveBeenCalled();
      expect(mockGetMainModelId).toHaveBeenCalled();
      
      // Verify API key resolution
      expect(mockResolveEnvVariable).toHaveBeenCalledWith('BAILIAN_API_KEY', null, null);
      
      // Verify client creation with correct parameters
      expect(mockCreateOpenAI).toHaveBeenCalledWith({
        apiKey: 'test-bailian-key',
        baseURL: 'http://dashscope.aliyuncs.com/compatible-mode/v1',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // Verify generateText was called with correct parameters
      expect(mockGenerateText).toHaveBeenCalledWith({
        model: 'client-qwen-max-latest',
        messages: [
          { role: 'system', content: '你是一个有用的AI助手' },
          { role: 'user', content: '请介绍一下阿里云百炼平台' }
        ],
        maxTokens: 8192,
        temperature: 0.7
      });
    });

    test('should handle API key missing error', async () => {
      mockIsApiKeySet.mockReturnValue(false);
      mockResolveEnvVariable.mockReturnValue(null);

      await expect(generateTextService({
        role: 'main',
        session: null,
        systemPrompt: '你是一个有用的AI助手',
        prompt: '测试提示'
      })).rejects.toThrow();
    });

    test('should handle Bailian API errors gracefully', async () => {
      const apiError = new Error('百炼平台API调用失败');
      apiError.response = { status: 401 };
      
      mockGenerateText.mockRejectedValue(apiError);

      await expect(generateTextService({
        role: 'main',
        session: null,
        systemPrompt: '你是一个有用的AI助手',
        prompt: '测试提示'
      })).rejects.toThrow();
    });

    test('should work with session environment variables', async () => {
      const mockSession = {
        env: { BAILIAN_API_KEY: 'session-bailian-key' }
      };

      mockResolveEnvVariable.mockReturnValue('session-bailian-key');
      
      const mockResponse = {
        text: '使用会话密钥的回复',
        usage: { promptTokens: 50, completionTokens: 25, totalTokens: 75 }
      };

      mockGenerateText.mockResolvedValue(mockResponse);

      const result = await generateTextService({
        role: 'main',
        session: mockSession,
        systemPrompt: '你是一个有用的AI助手',
        prompt: '使用会话密钥测试'
      });

      expect(result).toBe('使用会话密钥的回复');
      expect(mockResolveEnvVariable).toHaveBeenCalledWith('BAILIAN_API_KEY', mockSession, null);
    });

    test('should use correct model parameters for different roles', async () => {
      // Test research role
      mockGetParametersForRole.mockReturnValue({
        maxTokens: 4096,
        temperature: 0.3
      });

      const mockResponse = {
        text: '研究角色的回复',
        usage: { promptTokens: 80, completionTokens: 40, totalTokens: 120 }
      };

      mockGenerateText.mockResolvedValue(mockResponse);

      await generateTextService({
        role: 'research',
        session: null,
        systemPrompt: '你是一个研究助手',
        prompt: '进行深度分析'
      });

      expect(mockGetParametersForRole).toHaveBeenCalledWith('research', null);
      expect(mockGenerateText).toHaveBeenCalledWith({
        model: 'client-qwen-max-latest',
        messages: [
          { role: 'system', content: '你是一个研究助手' },
          { role: 'user', content: '进行深度分析' }
        ],
        maxTokens: 4096,
        temperature: 0.3
      });
    });
  });

  describe('Model configuration validation', () => {
    test('should validate Bailian models are properly configured', () => {
      const { MODEL_MAP } = require('../../scripts/modules/config-manager.js');
      
      expect(MODEL_MAP.bailian).toBeDefined();
      expect(MODEL_MAP.bailian).toHaveLength(1);
      
      const qwenMaxModel = MODEL_MAP.bailian.find(m => m.id === 'qwen-max-latest');
      expect(qwenMaxModel).toBeDefined();
      expect(qwenMaxModel.cost_per_1m_tokens.currency).toBe('CNY');
      expect(qwenMaxModel.allowed_roles).toContain('main');
      expect(qwenMaxModel.allowed_roles).toContain('research');
    });

    test('should handle custom baseURL configuration', async () => {
      const customBaseURL = 'https://custom-bailian-endpoint.com/v1';
      
      // Mock configuration to return custom base URL
      const mockGetBaseUrlForRole = jest.fn().mockReturnValue(customBaseURL);
      jest.doMock('../../scripts/modules/config-manager.js', () => ({
        ...jest.requireActual('../../scripts/modules/config-manager.js'),
        getBaseUrlForRole: mockGetBaseUrlForRole
      }));

      const mockResponse = {
        text: '自定义端点回复',
        usage: { promptTokens: 60, completionTokens: 30, totalTokens: 90 }
      };

      mockGenerateText.mockResolvedValue(mockResponse);

      await generateTextService({
        role: 'main',
        session: null,
        systemPrompt: '你是一个有用的AI助手',
        prompt: '使用自定义端点测试'
      });

      // Verify custom baseURL was used
      expect(mockCreateOpenAI).toHaveBeenCalledWith({
        apiKey: 'test-bailian-key',
        baseURL: customBaseURL,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    });
  });
}); 