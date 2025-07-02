# Claude Task Master MCP 服务部署指南

## 概述

本指南将帮助您将 Claude Task Master 部署为 MCP (Model Context Protocol) 服务，以便在 Cursor、Claude Desktop 或其他支持 MCP 的 AI 工具中使用。

## 前置要求

- Node.js 18.0.0 或更高版本
- npm 或 yarn 包管理器
- 至少一个 AI 提供商的 API 密钥

## 快速部署

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制环境变量模板文件：
```bash
cp .env.template .env
```

编辑 `.env` 文件，添加您的 API 密钥：
```env
# 必须配置至少一个 AI 提供商
ANTHROPIC_API_KEY=your_anthropic_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
BAILIAN_API_KEY=your_bailian_api_key_here
# ... 其他 API 密钥
```

### 3. 测试 MCP 服务器

```bash
npm run mcp-server
```

如果看到以下输出，说明服务器启动成功：
```
[FastMCP warning] could not infer client capabilities after 10 attempts. Connection may be unstable.
```

这个警告是正常的，因为我们在命令行中测试而不是通过 MCP 客户端连接。

## 在 Cursor 中配置

### 1. 检查配置文件

确认 `.cursor/mcp.json` 文件存在且配置正确：

```json
{
	"mcpServers": {
		"task-master-ai": {
			"command": "node",
			"args": ["./mcp-server/server.js"],
			"env": {
				"ANTHROPIC_API_KEY": "ANTHROPIC_API_KEY_HERE",
				"PERPLEXITY_API_KEY": "PERPLEXITY_API_KEY_HERE",
				"OPENAI_API_KEY": "OPENAI_API_KEY_HERE",
				"GOOGLE_API_KEY": "GOOGLE_API_KEY_HERE",
				"XAI_API_KEY": "XAI_API_KEY_HERE",
				"OPENROUTER_API_KEY": "OPENROUTER_API_KEY_HERE",
				"MISTRAL_API_KEY": "MISTRAL_API_KEY_HERE",
				"AZURE_OPENAI_API_KEY": "AZURE_OPENAI_API_KEY_HERE",
				"OLLAMA_API_KEY": "OLLAMA_API_KEY_HERE",
				"GITHUB_API_KEY": "GITHUB_API_KEY_HERE",
				"BAILIAN_API_KEY": "BAILIAN_API_KEY_HERE"
			}
		}
	}
}
```

### 2. 更新 API 密钥

将配置文件中的占位符替换为您的真实 API 密钥：
- 将 `ANTHROPIC_API_KEY_HERE` 替换为您的 Anthropic API 密钥
- 将 `BAILIAN_API_KEY_HERE` 替换为您的百炼平台 API 密钥
- 根据需要配置其他 API 密钥

### 3. 重启 Cursor

配置完成后，重启 Cursor 以加载 MCP 服务器。

## 在 Claude Desktop 中配置

### 1. 找到配置文件位置

**Windows:**
```
%APPDATA%\Claude\claude_desktop_config.json
```

**macOS:**
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Linux:**
```
~/.config/Claude/claude_desktop_config.json
```

### 2. 添加配置

在配置文件中添加以下内容：

```json
{
  "mcpServers": {
    "task-master": {
      "command": "node",
      "args": ["/path/to/your/claude-task-master/mcp-server/server.js"],
      "env": {
        "ANTHROPIC_API_KEY": "your_anthropic_api_key",
        "BAILIAN_API_KEY": "your_bailian_api_key"
      }
    }
  }
}
```

**注意：** 将 `/path/to/your/claude-task-master` 替换为项目的实际路径。

### 3. 重启 Claude Desktop

配置完成后，重启 Claude Desktop 应用程序。

## 在 VS Code 中配置

### 1. 创建配置文件

创建 `.vscode/mcp.json` 文件：

```json
{
	"mcpServers": {
		"task-master-ai": {
			"command": "node",
			"args": ["./mcp-server/server.js"],
			"env": {
				"ANTHROPIC_API_KEY": "your_anthropic_api_key",
				"BAILIAN_API_KEY": "your_bailian_api_key"
			}
		}
	}
}
```

### 2. 安装 MCP 扩展

在 VS Code 中安装支持 MCP 的扩展（如果有的话）。

## 可用的 MCP 工具

部署成功后，以下工具将在您的 AI 助手中可用：

### 项目管理
- `initialize_project` - 初始化新项目
- `parse_prd` - 解析 PRD 文档生成任务

### 任务管理
- `get_tasks` - 获取任务列表
- `add_task` - 添加新任务
- `update_task` - 更新任务
- `set_task_status` - 设置任务状态
- `remove_task` - 删除任务
- `expand_task` - 展开复杂任务
- `expand_all_tasks` - 展开所有任务

### 子任务管理
- `add_subtask` - 添加子任务
- `update_subtask` - 更新子任务
- `remove_subtask` - 删除子任务
- `clear_subtasks` - 清除所有子任务

### 标签管理
- `list_tags` - 列出所有标签
- `add_tag` - 创建新标签
- `use_tag` - 切换到指定标签
- `rename_tag` - 重命名标签
- `delete_tag` - 删除标签
- `copy_tag` - 复制标签

### 依赖管理
- `add_dependency` - 添加任务依赖
- `remove_dependency` - 删除任务依赖
- `validate_dependencies` - 验证依赖关系
- `fix_dependencies` - 修复依赖问题

### 分析和研究
- `analyze_project_complexity` - 分析项目复杂度
- `research` - AI 研究功能
- `complexity_report` - 生成复杂度报告

### 配置管理
- `models` - 管理 AI 模型配置
- `rules` - 管理项目规则

## 故障排除

### 常见问题

#### 1. MCP 服务器无法启动

**错误：** `Cannot find module 'xxx'`
**解决：** 运行 `npm install` 安装所有依赖

#### 2. API 密钥错误

**错误：** `API key not found` 或 `Unauthorized`
**解决：** 检查 `.env` 文件或 MCP 配置中的 API 密钥是否正确

#### 3. 端口冲突

**错误：** `Port already in use`
**解决：** 更改 MCP 配置中的端口号或停止占用端口的进程

#### 4. 权限问题

**错误：** `Permission denied`
**解决：** 确保有读写项目目录的权限

### 调试模式

启用调试模式以获取更多日志信息：

```bash
DEBUG=1 npm run mcp-server
```

或在 `.env` 文件中设置：
```env
DEBUG=1
TASKMASTER_LOG_LEVEL=debug
```

### 日志查看

MCP 服务器的日志会输出到控制台。如果在 Cursor 或 Claude Desktop 中使用，可以查看应用程序的开发者工具或日志文件。

## 性能优化

### 1. 缓存配置

MCP 服务器使用 LRU 缓存来提高性能。可以在启动时配置缓存参数：

```javascript
// 在 mcp-server/src/core/context-manager.js 中调整
const contextManager = new ContextManager({
    maxCacheSize: 1000,     // 最大缓存项数
    ttl: 1000 * 60 * 5,     // 缓存过期时间（5分钟）
    maxContextSize: 4000    // 最大上下文大小
});
```

### 2. 并发连接

MCP 服务器支持多个并发连接。如果需要处理大量请求，可以考虑：
- 增加 Node.js 的内存限制
- 使用进程管理器（如 PM2）
- 配置负载均衡

## 安全注意事项

1. **API 密钥安全**
   - 不要将 API 密钥提交到版本控制系统
   - 定期轮换 API 密钥
   - 使用环境变量存储敏感信息

2. **网络安全**
   - MCP 服务器默认只监听本地连接
   - 如需远程访问，请配置适当的防火墙规则
   - 考虑使用 HTTPS/TLS 加密

3. **文件权限**
   - 确保任务文件和配置文件有适当的权限
   - 定期备份重要数据

## 升级和维护

### 更新依赖

定期更新项目依赖：
```bash
npm update
```

### 备份数据

定期备份以下重要文件：
- `.taskmaster/tasks.json` - 任务数据
- `.taskmasterconfig` - 项目配置
- `.env` - 环境变量（注意排除敏感信息）

### 监控

监控 MCP 服务器的运行状态：
- 检查内存使用情况
- 监控 API 调用频率
- 查看错误日志

## 支持和反馈

如果在部署过程中遇到问题，请：

1. 查看本文档的故障排除部分
2. 检查项目的 GitHub Issues
3. 提交新的 Issue 并提供详细的错误信息

---

## 附录

### A. 完整的环境变量列表

```env
# AI 提供商 API 密钥
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
GOOGLE_API_KEY=
PERPLEXITY_API_KEY=
XAI_API_KEY=
BAILIAN_API_KEY=
OPENROUTER_API_KEY=
MISTRAL_API_KEY=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
OLLAMA_API_KEY=
OLLAMA_BASE_URL=
GITHUB_API_KEY=

# 系统配置
TASKMASTER_LOG_LEVEL=info
DEBUG=0
MCP_PORT=3000
```

### B. 自动化部署脚本

使用提供的 PowerShell 脚本进行自动化部署：

```powershell
.\deploy-mcp.ps1
```

该脚本将：
- 检查 Node.js 环境
- 安装依赖
- 创建配置模板
- 测试 MCP 服务器
- 提供下一步指导