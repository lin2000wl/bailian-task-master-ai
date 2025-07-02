# Claude Task Master AI提供商架构分析

## 当前支持的AI提供商
- **Anthropic**: Claude系列模型
- **OpenAI**: GPT系列模型  
- **Google**: Gemini系列模型
- **Perplexity**: Sonar系列模型
- **xAI**: Grok系列模型
- **OpenRouter**: 多模型代理服务
- **Ollama**: 本地模型服务
- **Bedrock**: AWS Bedrock服务
- **Azure**: Azure OpenAI服务
- **Vertex**: Google Cloud Vertex AI
- **Claude Code**: 内置Claude代码服务

## 架构设计模式
1. **基础类**: `BaseAIProvider` 定义标准接口
2. **提供商实现**: 每个AI提供商继承基础类并实现`getClient()`方法
3. **统一服务**: `ai-services-unified.js`提供统一的调用接口
4. **配置管理**: `config-manager.js`管理模型配置和API密钥
5. **模型定义**: `supported-models.json`定义支持的模型及其参数

## 核心接口方法
- `generateText()`: 生成文本
- `streamText()`: 流式文本生成  
- `generateObject()`: 结构化对象生成
- `getClient()`: 获取提供商客户端实例

## 配置系统
- 支持三种角色: main, research, fallback
- 每个角色可配置不同的提供商和模型
- 支持API密钥管理和基础URL配置
- 模型参数包括: maxTokens, temperature, cost等