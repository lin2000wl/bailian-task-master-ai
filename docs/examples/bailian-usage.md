# 阿里云百炼平台使用指南

## 概述

Task Master 现已支持阿里云百炼平台的通义千问系列模型，为用户提供更多AI模型选择。百炼平台提供了强大的中文语言理解和生成能力，特别适合中文项目开发。

## 支持的模型

| 模型ID | 名称 | 最大令牌 | 输入成本 (CNY/1M) | 输出成本 (CNY/1M) | 适用场景 |
|--------|------|----------|------------------|------------------|----------|
| `qwen-max-latest` | 通义千问Max（最新版） | 8192 | 20 | 60 | 复杂推理、代码生成、创意写作 |
| `qwen-plus-latest` | 通义千问Plus（最新版） | 8192 | 4 | 12 | 日常对话、文档处理、简单编程 |
| `qwen-turbo-latest` | 通义千问Turbo（最新版） | 8192 | 2 | 6 | 快速响应、批量处理、基础任务 |

## 配置步骤

### 1. 获取API密钥

1. 访问 [阿里云百炼平台](https://dashscope.aliyuncs.com/)
2. 注册或登录阿里云账号
3. 开通百炼服务
4. 在控制台获取API密钥

### 2. 配置环境变量

#### MCP配置（推荐）

在你的MCP配置文件中添加百炼API密钥：

**Cursor/Windsurf** (`~/.cursor/mcp.json` 或 `~/.codeium/windsurf/mcp_config.json`):
```json
{
  "mcpServers": {
    "taskmaster-ai": {
      "command": "npx",
      "args": ["-y", "--package=task-master-ai", "task-master-ai"],
      "env": {
        "BAILIAN_API_KEY": "YOUR_BAILIAN_API_KEY_HERE",
        "ANTHROPIC_API_KEY": "YOUR_ANTHROPIC_API_KEY_HERE"
      }
    }
  }
}
```

**VS Code** (`.vscode/mcp.json`):
```json
{
  "servers": {
    "taskmaster-ai": {
      "command": "npx",
      "args": ["-y", "--package=task-master-ai", "task-master-ai"],
      "env": {
        "BAILIAN_API_KEY": "YOUR_BAILIAN_API_KEY_HERE",
        "ANTHROPIC_API_KEY": "YOUR_ANTHROPIC_API_KEY_HERE"
      },
      "type": "stdio"
    }
  }
}
```

#### CLI配置

在项目根目录创建 `.env` 文件：

```bash
# 百炼平台API密钥
BAILIAN_API_KEY=your_bailian_api_key_here

# 其他AI提供商密钥（可选）
ANTHROPIC_API_KEY=your_anthropic_key_here
OPENAI_API_KEY=your_openai_key_here
```

### 3. 配置模型

使用以下方式配置百炼模型：

#### 通过AI助手配置（MCP）

在编辑器的AI聊天面板中说：

```txt
Change the main model to qwen-max-latest
```

或者配置完整的模型设置：

```txt
Change the main, research and fallback models to qwen-max-latest, qwen-plus-latest and qwen-turbo-latest respectively.
```

#### 通过CLI配置

```bash
# 设置主模型
task-master models --set-main qwen-max-latest

# 设置研究模型
task-master models --set-research qwen-plus-latest

# 设置备用模型
task-master models --set-fallback qwen-turbo-latest

# 交互式配置
task-master models --setup
```

## 使用示例

### 基础任务管理

```bash
# 初始化项目
task-master init

# 解析PRD并生成任务（使用百炼模型）
task-master parse-prd prd.txt

# 查看下一个任务
task-master next

# 展开复杂任务
task-master expand --id=3 --research
```

### 研究功能

百炼模型特别适合中文内容的研究：

```bash
# 研究最新的前端技术趋势
task-master research "2024年最新的React开发最佳实践"

# 研究特定技术栈
task-master research "Vue 3 Composition API与React Hooks的对比分析"

# 结合项目上下文研究
task-master research "如何优化我们当前的Node.js API性能" --files=src/api.js,src/routes.js
```

### AI助手集成（MCP）

在编辑器中通过AI助手使用：

```txt
# 初始化项目
Initialize taskmaster-ai in my project

# 解析需求文档
Can you parse my PRD at docs/requirements.txt?

# 查看任务状态
What's the next task I should work on?

# 实现特定任务
Can you help me implement task 5?

# 研究技术方案
Research the best practices for implementing user authentication in a Node.js application

# 展开任务
Can you expand task 3 with detailed subtasks?
```

## 模型特点

### qwen-max-latest（推荐用作主模型）
- **优势**：最强的推理能力，适合复杂编程任务
- **适用场景**：
  - 复杂算法实现
  - 架构设计决策
  - 代码重构建议
  - 创意功能开发

### qwen-plus-latest（推荐用作研究模型）
- **优势**：平衡性能和成本，适合日常开发
- **适用场景**：
  - 代码审查和优化
  - 文档生成
  - 技术方案研究
  - 问题解决方案

### qwen-turbo-latest（推荐用作备用模型）
- **优势**：快速响应，成本最低
- **适用场景**：
  - 简单代码生成
  - 快速问答
  - 批量处理任务
  - 基础功能实现

## 最佳实践

### 1. 模型选择策略

```bash
# 复杂项目配置
task-master models --set-main qwen-max-latest      # 主要开发工作
task-master models --set-research qwen-plus-latest # 技术研究
task-master models --set-fallback qwen-turbo-latest # 备用方案

# 成本敏感配置
task-master models --set-main qwen-plus-latest     # 平衡性能和成本
task-master models --set-research qwen-turbo-latest # 快速研究
task-master models --set-fallback qwen-turbo-latest # 备用方案

# 高性能配置
task-master models --set-main qwen-max-latest      # 最高质量
task-master models --set-research qwen-max-latest  # 深度研究
task-master models --set-fallback qwen-plus-latest # 高质量备用
```

### 2. 中文项目优化

百炼模型在中文项目中表现优异：

```txt
# 中文需求分析
Can you parse my Chinese PRD at docs/需求文档.txt?

# 中文代码注释
Can you help me add comprehensive Chinese comments to task 3?

# 中文技术文档
Research 微服务架构在电商系统中的最佳实践

# 中文错误处理
Can you help implement proper error handling with Chinese error messages for task 5?
```

### 3. 性能优化

- **批量操作**：使用 `expand --all` 一次性展开多个任务
- **研究缓存**：相似的研究查询会利用之前的结果
- **模型切换**：根据任务复杂度动态调整模型选择

## 故障排除

### 常见问题

#### 1. API密钥错误
```
错误：百炼平台API密钥无效
解决：检查BAILIAN_API_KEY环境变量是否正确设置
```

#### 2. 请求频率限制
```
错误：百炼平台API请求频率超限
解决：稍等片刻后重试，或升级API套餐
```

#### 3. 模型不可用
```
错误：模型qwen-max-latest不可用
解决：检查模型ID是否正确，或尝试其他模型
```

### 调试方法

```bash
# 检查当前配置
task-master models

# 测试API连接
task-master research "测试连接" --detail low

# 查看详细日志
TASKMASTER_LOG_LEVEL=debug task-master next
```

## 迁移指南

### 从其他AI提供商迁移

如果你之前使用其他AI提供商，可以轻松切换到百炼：

```bash
# 查看当前配置
task-master models

# 切换到百炼模型
task-master models --set-main qwen-max-latest

# 验证配置
task-master models
```

### 混合使用策略

你可以同时使用多个AI提供商：

```bash
# 百炼作为主模型，OpenAI作为研究模型
task-master models --set-main qwen-max-latest
task-master models --set-research gpt-4

# 或者相反
task-master models --set-main gpt-4
task-master models --set-research qwen-plus-latest
```

## 总结

阿里云百炼平台为Task Master带来了强大的中文AI能力，特别适合：

- 🇨🇳 **中文项目开发**：优秀的中文理解和生成能力
- 💰 **成本控制**：灵活的定价策略，适合不同预算
- 🚀 **高性能推理**：qwen-max-latest提供顶级的代码生成质量
- 🔄 **无缝集成**：与现有Task Master工作流完美兼容

开始使用百炼平台，体验更智能的AI驱动开发！ 