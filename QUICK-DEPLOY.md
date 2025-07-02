# 🚀 Task Master AI - 快速部署指南

将 Task Master AI 部署为 Cursor 全局 MCP 服务器的最快方法。

## 📋 前置要求

- ✅ **Node.js** (版本 16 或更高)
- ✅ **Cursor 编辑器** (已安装并运行过至少一次)
- ✅ **阿里云百炼平台 API 密钥** (推荐) 或其他 AI 提供商密钥

## 🎯 一键部署

### Windows 系统

1. **下载项目**
   ```bash
   git clone https://github.com/YOUR_USERNAME/bailian-task-master-ai.git
   cd bailian-task-master-ai
   ```

2. **运行自动部署脚本**
   ```bash
   scripts\deploy-cursor-mcp.bat
   ```

3. **按提示配置 API 密钥**
   - 脚本会自动创建 `.env` 文件
   - 编辑文件添加您的 `BAILIAN_API_KEY`

4. **重启 Cursor** 即可使用！

### macOS / Linux 系统

1. **下载项目**
   ```bash
   git clone https://github.com/YOUR_USERNAME/bailian-task-master-ai.git
   cd bailian-task-master-ai
   ```

2. **运行自动部署脚本**
   ```bash
   chmod +x scripts/deploy-cursor-mcp.sh
   ./scripts/deploy-cursor-mcp.sh
   ```

3. **按提示配置 API 密钥**
   - 脚本会自动创建 `.env` 文件
   - 编辑文件添加您的 `BAILIAN_API_KEY`

4. **重启 Cursor** 即可使用！

## 🔑 API 密钥配置

### 推荐：阿里云百炼平台

```env
# 阿里云百炼平台（推荐）
BAILIAN_API_KEY=sk-your-bailian-api-key-here
BAILIAN_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
```

### 其他支持的提供商

```env
# Anthropic (Claude)
ANTHROPIC_API_KEY=sk-ant-your-key

# OpenAI
OPENAI_API_KEY=sk-your-openai-key

# Google
GOOGLE_API_KEY=your-google-api-key

# Perplexity (用于研究功能)
PERPLEXITY_API_KEY=pplx-your-key
```

## 🧪 验证部署

1. **重启 Cursor 编辑器**

2. **打开任何项目**

3. **按 `Ctrl+Shift+P` (Windows) 或 `Cmd+Shift+P` (macOS)**

4. **搜索 "MCP" 或 "Task Master"**

5. **尝试使用以下工具**：
   - `get_tasks` - 获取任务列表
   - `models` - 查看/配置 AI 模型
   - `parse_prd` - 解析产品需求文档

## 🛠️ 故障排除

### 常见问题

**问题**: "未找到 MCP 服务器"
- **解决**: 确保 Cursor 已完全重启
- **检查**: MCP 配置文件是否正确生成

**问题**: "API 调用失败"
- **解决**: 检查 `.env` 文件中的 API 密钥
- **验证**: 密钥是否有效且有足够余额

**问题**: "命令找不到"
- **解决**: 确保 Node.js 已正确安装
- **检查**: `node --version` 输出版本号

### 配置文件位置

**Windows**:
```
%APPDATA%\Cursor\User\globalStorage\rooveterinaryinc.roo-cline\settings\cline_mcp_settings.json
```

**macOS**:
```
~/Library/Application Support/Cursor/User/globalStorage/rooveterinaryinc.roo-cline/settings/cline_mcp_settings.json
```

**Linux**:
```
~/.config/Cursor/User/globalStorage/rooveterinaryinc.roo-cline/settings/cline_mcp_settings.json
```

## 🎉 开始使用

部署成功后，您可以在任何 Cursor 项目中使用以下功能：

### 📋 任务管理
- **智能任务生成**: 从 PRD 自动生成开发任务
- **复杂度分析**: AI 评估任务复杂度
- **任务分解**: 自动将复杂任务拆分为子任务
- **依赖管理**: 智能处理任务间依赖关系

### 🔍 AI 研究
- **实时研究**: 获取最新技术信息和最佳实践
- **上下文感知**: 基于项目文件提供针对性建议
- **多语言支持**: 支持中文和英文文档生成

### 🏷️ 多上下文管理
- **标签系统**: 为不同功能/分支创建独立任务列表
- **团队协作**: 避免任务冲突，支持并行开发
- **版本管理**: 与 Git 分支无缝集成

## 📚 更多资源

- [完整文档](docs/)
- [命令参考](docs/command-reference.md)
- [MCP 集成指南](docs/CURSOR-MCP-SETUP.md)
- [百炼平台使用指南](docs/examples/bailian-usage.md)

## 🆘 获取帮助

遇到问题？
1. 查看 [故障排除指南](docs/CURSOR-MCP-SETUP.md#故障排除)
2. 搜索 [已知问题](https://github.com/YOUR_USERNAME/bailian-task-master-ai/issues)
3. [提交新问题](https://github.com/YOUR_USERNAME/bailian-task-master-ai/issues/new)

---

**快速开始只需 3 步**：下载 → 运行脚本 → 重启 Cursor ✨ 