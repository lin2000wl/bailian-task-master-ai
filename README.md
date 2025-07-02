# 🚀 Bailian Task Master AI

> AI驱动的智能任务管理系统，集成阿里云百炼平台支持

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2018.0.0-brightgreen.svg)](https://nodejs.org/)
[![GitHub issues](https://img.shields.io/github/issues/YOUR_USERNAME/bailian-task-master-ai)](https://github.com/YOUR_USERNAME/bailian-task-master-ai/issues)

## ✨ 特性

- 🤖 **AI 驱动**：集成阿里云百炼平台（通义千问）和多种 AI 提供商
- 📋 **智能任务管理**：自动生成、分解和管理开发任务
- 🏷️ **标签化系统**：支持多上下文任务列表，适合团队协作
- 🔌 **MCP 协议**：完整的 Model Context Protocol 支持
- 🛠️ **CLI 工具**：强大的命令行界面
- 📊 **复杂度分析**：AI 驱动的任务复杂度评估
- 🔍 **智能研究**：集成 Perplexity AI 进行实时研究
- 🎯 **依赖管理**：智能任务依赖关系处理

## 🎯 支持的 AI 提供商

- 🇨🇳 **阿里云百炼**（通义千问系列）
- 🤖 **Anthropic**（Claude 系列）
- 🧠 **OpenAI**（GPT 系列）
- 🔍 **Perplexity**（研究专用）
- 🌐 **Google**（Gemini 系列）
- ⚡ **Mistral AI**
- 🔷 **Azure OpenAI**
- 🎭 **OpenRouter**
- 🚀 **xAI**（Grok）
- 🏠 **Ollama**（本地模型）

## 🚀 快速开始

### 安装

```bash
# 全局安装
npm install -g bailian-task-master-ai

# 或者使用 npx
npx bailian-task-master-ai --help
```

### 初始化项目

```bash
# 初始化新项目
task-master init

# 或者快速初始化
task-master init -y --name="我的项目"
```

### 配置 AI 模型

```bash
# 交互式配置
task-master models --setup

# 设置主要模型（推荐使用百炼平台）
task-master models --set-main qwen-max-latest
```

### 从 PRD 生成任务

```bash
# 解析产品需求文档
task-master parse-prd requirements.txt

# 使用研究增强
task-master parse-prd requirements.txt --research
```

## 📖 使用示例

### 基本任务管理

```bash
# 查看任务列表
task-master list

# 获取下一个任务
task-master next

# 查看特定任务
task-master show 1

# 设置任务状态
task-master set-status --id=1 --status=done
```

### AI 增强功能

```bash
# 智能任务分解
task-master expand --id=1 --research

# 复杂度分析
task-master analyze-complexity --research

# 智能研究
task-master research "React 18 最新特性"

# 添加 AI 生成的任务
task-master add-task --prompt="实现用户认证" --research
```

### 标签化管理

```bash
# 创建新标签
task-master add-tag feature-auth

# 切换标签上下文
task-master use-tag feature-auth

# 查看所有标签
task-master tags
```

## 🔧 配置

### 环境变量

在项目根目录创建 `.env` 文件：

```env
# 阿里云百炼平台（推荐）
BAILIAN_API_KEY=your_bailian_api_key

# 其他 AI 提供商
ANTHROPIC_API_KEY=your_anthropic_key
OPENAI_API_KEY=your_openai_key
PERPLEXITY_API_KEY=your_perplexity_key
GOOGLE_API_KEY=your_google_key
```

### 模型配置

使用交互式配置：

```bash
task-master models --setup
```

或者直接设置：

```bash
# 设置主要模型
task-master models --set-main qwen-max-latest

# 设置研究模型
task-master models --set-research perplexity-llama-3.1-sonar-large-128k-online

# 设置备用模型
task-master models --set-fallback claude-3-haiku-20240307
```

## 🏗️ 架构

```
bailian-task-master-ai/
├── src/
│   ├── ai-providers/          # AI 提供商实现
│   │   ├── bailian.js        # 阿里云百炼平台
│   │   ├── anthropic.js      # Claude
│   │   └── ...
│   ├── profiles/             # 编辑器配置文件
│   └── utils/                # 工具函数
├── scripts/
│   └── modules/              # 核心模块
├── mcp-server/               # MCP 服务器
├── tests/                    # 测试套件
└── docs/                     # 文档
```

## 🤝 贡献

欢迎贡献代码！请查看 [贡献指南](CONTRIBUTING.md)。

### 开发环境设置

```bash
# 克隆仓库
git clone https://github.com/YOUR_USERNAME/bailian-task-master-ai.git
cd bailian-task-master-ai

# 安装依赖
npm install

# 运行测试
npm test

# 启动开发服务器
npm run dev
```

## 📝 许可证

本项目采用 MIT 许可证。详情请查看 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- [阿里云百炼平台](https://bailian.aliyun.com/) - 提供强大的 AI 能力
- [Anthropic](https://www.anthropic.com/) - Claude AI 支持
- [OpenAI](https://openai.com/) - GPT 系列模型
- [Perplexity](https://www.perplexity.ai/) - 实时研究能力

## 📞 支持

如果你遇到问题或有建议，请：

1. 查看 [文档](docs/)
2. 搜索 [已有问题](https://github.com/YOUR_USERNAME/bailian-task-master-ai/issues)
3. [创建新问题](https://github.com/YOUR_USERNAME/bailian-task-master-ai/issues/new)

---

**让 AI 助力你的项目管理！** 🚀
