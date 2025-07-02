# Cursor MCP 配置指南

本指南将帮助您在Cursor中配置Task Master AI的MCP服务器。

## 🚀 快速配置步骤

### 1. 准备API密钥

首先，您需要获取以下API密钥（根据需要选择）：

#### 必需的API密钥：
- **Anthropic API Key** - 用于Claude模型（核心功能）
- **Perplexity API Key** - 用于研究功能

#### 可选的API密钥：
- **阿里云百炼平台API Key** - 用于通义千问模型（新增支持）
- **OpenAI API Key** - 用于GPT模型
- **Google API Key** - 用于Gemini模型
- **其他提供商** - 根据需要添加

### 2. 配置环境变量

编辑项目根目录下的 `.env` 文件，填入您的真实API密钥：

```bash
# 必需的API密钥
ANTHROPIC_API_KEY=sk-ant-api03-your-actual-key-here
PERPLEXITY_API_KEY=pplx-your-actual-key-here

# 百炼平台API密钥（新增支持）
BAILIAN_API_KEY=sk-your-bailian-key-here

# 可选的API密钥
OPENAI_API_KEY=sk-your-openai-key-here
GOOGLE_API_KEY=your-google-key-here
# ... 其他密钥
```

### 3. 更新Cursor MCP配置

编辑 `.cursor/mcp.json` 文件，将占位符替换为您的真实API密钥：

```json
{
  "mcpServers": {
    "task-master-ai": {
      "command": "node",
      "args": ["./mcp-server/server.js"],
      "env": {
        "ANTHROPIC_API_KEY": "sk-ant-api03-your-actual-key-here",
        "PERPLEXITY_API_KEY": "pplx-your-actual-key-here",
        "BAILIAN_API_KEY": "sk-your-bailian-key-here",
        "OPENAI_API_KEY": "sk-your-openai-key-here",
        "GOOGLE_API_KEY": "your-google-key-here",
        "XAI_API_KEY": "your-xai-key-here",
        "OPENROUTER_API_KEY": "your-openrouter-key-here",
        "MISTRAL_API_KEY": "your-mistral-key-here",
        "AZURE_OPENAI_API_KEY": "your-azure-key-here",
        "OLLAMA_API_KEY": "your-ollama-key-here",
        "GITHUB_API_KEY": "your-github-token-here"
      }
    }
  }
}
```

### 4. 重启Cursor

1. 保存所有配置文件
2. 完全关闭Cursor
3. 重新启动Cursor
4. 等待MCP服务器连接（可能需要1-2分钟）

## 🔧 验证配置

### 检查MCP连接状态

1. 在Cursor中打开命令面板 (`Ctrl+Shift+P`)
2. 搜索 "MCP" 或 "Model Context Protocol"
3. 查看是否显示 "task-master-ai" 服务器已连接

### 测试可用工具

在Cursor中尝试以下命令来测试MCP工具：

```bash
# 初始化项目
@task-master-ai 请初始化一个新的任务管理项目

# 列出任务
@task-master-ai 显示当前所有任务

# 添加任务
@task-master-ai 添加一个新任务：实现用户认证功能
```

## 🛠️ 可用的MCP工具

配置成功后，您将可以使用以下30+个工具：

### 核心功能
- `initialize_project` - 初始化项目
- `parse_prd` - 解析需求文档
- `get_tasks` - 获取任务列表
- `add_task` - 添加新任务
- `expand_task` - 展开复杂任务

### AI功能
- `research` - AI研究功能
- `analyze_project_complexity` - 项目复杂度分析
- `models` - AI模型管理

### 标签管理
- `add_tag` - 创建新标签
- `use_tag` - 切换标签上下文
- `list_tags` - 列出所有标签

### 任务管理
- `set_task_status` - 设置任务状态
- `update_task` - 更新任务
- `move_task` - 移动任务
- `remove_task` - 删除任务

[完整工具列表请参考 MCP-DEPLOYMENT.md]

## 🔍 故障排除

### 常见问题

#### 1. MCP服务器无法启动
**症状**：Cursor显示连接失败
**解决方案**：
```bash
# 检查依赖是否完整
npm install

# 手动测试MCP服务器
node test-mcp.js

# 检查Node.js版本（需要18+）
node --version
```

#### 2. API密钥错误
**症状**：工具调用失败，显示认证错误
**解决方案**：
- 检查 `.cursor/mcp.json` 中的API密钥是否正确
- 确保密钥格式正确（如Anthropic密钥以 `sk-ant-api03-` 开头）
- 验证密钥是否有效且有足够余额

#### 3. 百炼平台连接问题
**症状**：百炼模型调用失败
**解决方案**：
```bash
# 测试百炼平台连接
node scripts/test-bailian-standalone.js

# 检查API密钥格式
echo $BAILIAN_API_KEY
```

#### 4. 工具不可见
**症状**：在Cursor中看不到task-master-ai工具
**解决方案**：
- 重启Cursor
- 检查 `.cursor/mcp.json` 语法是否正确
- 查看Cursor开发者工具中的错误信息

### 调试技巧

1. **查看MCP服务器日志**：
   ```bash
   # 手动启动服务器查看详细日志
   node mcp-server/server.js
   ```

2. **测试特定功能**：
   ```bash
   # 测试基础功能
   node test-mcp.js
   
   # 测试百炼平台
   node scripts/test-bailian-standalone.js
   ```

3. **检查配置文件**：
   ```bash
   # 验证JSON格式
   node -e "console.log(JSON.parse(require('fs').readFileSync('.cursor/mcp.json')))"
   ```

## 📚 相关文档

- [完整MCP部署指南](MCP-DEPLOYMENT.md)
- [百炼平台使用指南](examples/bailian-usage.md)
- [Task Master命令参考](command-reference.md)
- [模型配置指南](models.md)

## 🎯 下一步

配置完成后，您可以：

1. 使用 `@task-master-ai 初始化项目` 开始新项目
2. 尝试 `@task-master-ai 研究最新的React最佳实践` 体验研究功能
3. 使用百炼平台模型：`@task-master-ai 使用qwen-max-latest模型分析代码`
4. 探索标签化任务管理功能

享受AI驱动的任务管理体验！🚀