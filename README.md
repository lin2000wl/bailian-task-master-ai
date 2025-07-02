# 🚀 Bailian Task Master AI

> AI驱动的智能任务管理系统，集成阿里云百炼平台支持

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2018.0.0-brightgreen.svg)](https://nodejs.org/)
[![GitHub issues](https://img.shields.io/github/issues/YOUR_USERNAME/bailian-task-master-ai)](https://github.com/YOUR_USERNAME/bailian-task-master-ai/issues)

## ✨ 特性

- 🤖 **AI 驱动**：集成阿里云百炼平台（通义千问）和多种 AI 提供商
- 📋 **智能任务管理**：自动生成、分解和管理开发任务
- 🏷️ **标签化系统**：支持多上下文任务列表，适合团队协作
- 🔌 **MCP 协议**：完整的 Model Context Protocol 支持，可作为 Cursor 全局服务
- 🛠️ **CLI 工具**：强大的命令行界面
- 📊 **复杂度分析**：AI 驱动的任务复杂度评估
- 🔍 **智能研究**：集成 Perplexity AI 进行实时研究
- 🎯 **依赖管理**：智能任务依赖关系处理
- 🌐 **中文优化**：完整的中文界面和文档生成支持
- 🚀 **一键部署**：自动化脚本快速部署到 Cursor 全局环境

## 🆕 最新更新

### v1.0.0 - 百炼平台集成版本

- ✅ **完整百炼平台支持**：集成阿里云百炼平台 API，支持通义千问系列模型
- ✅ **MCP 全局部署**：支持作为 Cursor 全局 MCP 服务器运行
- ✅ **中文文档生成**：PRD 解析和复杂度分析现在生成中文文档
- ✅ **优化配置参数**：百炼模型温度调整为 0.2，maxTokens 增加到 16384
- ✅ **自动部署脚本**：提供 Windows 和 Unix 系统的一键部署脚本
- ✅ **完整测试覆盖**：包含单元测试、集成测试和功能验证

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

## 🔌 Cursor 全局 MCP 部署

Task Master AI 支持作为 Cursor 的全局 MCP 服务器运行，让您在任何项目中都能使用强大的 AI 任务管理功能。

### 快速部署

#### 1. 克隆并设置项目

```bash
# 克隆仓库到全局位置
git clone https://github.com/YOUR_USERNAME/bailian-task-master-ai.git ~/task-master-ai
cd ~/task-master-ai

# 安装依赖
npm install
```

#### 2. 配置 API 密钥

创建 `.env` 文件并添加您的 API 密钥：

```bash
# 复制示例配置
cp assets/env.example .env

# 编辑 .env 文件，添加您的真实 API 密钥
nano .env
```

`.env` 文件示例：

```env
# 阿里云百炼平台（推荐）
BAILIAN_API_KEY=sk-your-bailian-api-key

# 核心 AI 提供商
ANTHROPIC_API_KEY=sk-ant-api03-your-claude-key
PERPLEXITY_API_KEY=pplx-your-perplexity-key

# 其他可选提供商
OPENAI_API_KEY=sk-your-openai-key
GOOGLE_API_KEY=your-google-key
```

#### 3. 配置 Cursor 全局 MCP

编辑 Cursor 的全局配置文件：

**Windows**: `%APPDATA%\Cursor\User\globalStorage\mcp.json`
**macOS**: `~/Library/Application Support/Cursor/User/globalStorage/mcp.json`
**Linux**: `~/.config/Cursor/User/globalStorage/mcp.json`

```json
{
  "mcpServers": {
    "task-master-ai": {
      "command": "node",
      "args": ["/path/to/your/task-master-ai/mcp-server/server.js"],
      "env": {
        "ANTHROPIC_API_KEY": "sk-ant-api03-your-actual-key",
        "PERPLEXITY_API_KEY": "pplx-your-actual-key", 
        "BAILIAN_API_KEY": "sk-your-bailian-key",
        "OPENAI_API_KEY": "sk-your-openai-key",
        "GOOGLE_API_KEY": "your-google-key"
      }
    }
  }
}
```

#### 4. 自动部署脚本

我们提供了自动部署脚本：

**Windows (PowerShell)**:
```powershell
# 运行部署脚本
.\deploy-mcp.ps1
```

**macOS/Linux (Bash)**:
```bash
# 运行部署脚本
chmod +x deploy-mcp.sh
./deploy-mcp.sh
```

#### 5. 验证部署

1. 重启 Cursor
2. 打开任意项目
3. 在聊天中输入：`@task-master-ai 你好，请介绍一下你的功能`

### 🛠️ 可用功能

部署成功后，您可以在任何 Cursor 项目中使用以下功能：

#### 项目初始化
```
@task-master-ai 为这个项目初始化任务管理系统
```

#### 智能任务生成
```
@task-master-ai 基于这个 PRD 文档生成开发任务列表
```

#### 复杂度分析
```
@task-master-ai 分析当前项目的任务复杂度
```

#### 智能研究
```
@task-master-ai 研究 React 18 的最新特性和最佳实践
```

#### 任务管理
```
@task-master-ai 显示所有待办任务
@task-master-ai 将任务 1 标记为完成
@task-master-ai 展开任务 3 为更详细的子任务
```

### 🔧 高级配置

#### 自定义模型配置

```bash
# 在项目中设置首选模型
@task-master-ai 将主要模型设置为 qwen-max-latest
```

#### 多标签管理

```bash
# 为不同功能创建标签
@task-master-ai 创建一个名为 "frontend" 的任务标签
@task-master-ai 切换到 "backend" 标签上下文
```

#### 研究增强

```bash
# 启用研究模式进行任务生成
@task-master-ai 使用研究模式生成用户认证相关的任务
```

### 📊 监控和调试

#### 检查服务状态
```bash
# 在项目目录中测试 MCP 连接
node ~/task-master-ai/test-mcp.js
```

#### 查看日志
```bash
# 查看 MCP 服务器日志
tail -f ~/task-master-ai/mcp-server.log
```

### 🔄 更新部署

```bash
# 更新到最新版本
cd ~/task-master-ai
git pull origin main
npm install

# 重启 Cursor 以应用更新
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
│   ├── server.js            # 主服务器文件
│   └── src/                 # 服务器源码
├── deploy-mcp.sh            # 部署脚本 (Unix)
├── deploy-mcp.ps1           # 部署脚本 (Windows)
├── tests/                   # 测试套件
└── docs/                    # 文档
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

1. 查看 [完整文档](docs/)
2. 阅读 [Cursor MCP 配置指南](docs/CURSOR-MCP-SETUP.md)
3. 查看 [百炼平台使用指南](docs/examples/bailian-usage.md)
4. 搜索 [已有问题](https://github.com/YOUR_USERNAME/bailian-task-master-ai/issues)
5. [创建新问题](https://github.com/YOUR_USERNAME/bailian-task-master-ai/issues/new)

### 📖 相关文档

- [完整命令参考](docs/command-reference.md)
- [模型配置指南](docs/models.md)
- [MCP 部署指南](docs/MCP-DEPLOYMENT.md)
- [任务结构说明](docs/task-structure.md)
- [贡献指南](docs/contributor-docs/)

### 🛠️ 故障排除

**常见问题**：
- [MCP 连接问题](docs/CURSOR-MCP-SETUP.md#故障排除)
- [API 密钥配置](docs/configuration.md)
- [百炼平台集成](docs/examples/bailian-usage.md)

---

**让 AI 助力你的项目管理！** 🚀
