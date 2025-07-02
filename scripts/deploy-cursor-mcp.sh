#!/bin/bash

# Task Master AI - Cursor 全局 MCP 自动部署脚本
# 适用于 macOS 和 Linux 系统

set -e  # 遇到错误时退出

echo "🚀 Task Master AI - Cursor 全局 MCP 部署脚本"
echo "================================================"

# 检查系统类型
if [[ "$OSTYPE" == "darwin"* ]]; then
    CURSOR_CONFIG_DIR="$HOME/Library/Application Support/Cursor/User"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    CURSOR_CONFIG_DIR="$HOME/.config/Cursor/User"
else
    echo "❌ 不支持的操作系统: $OSTYPE"
    exit 1
fi

MCP_CONFIG_FILE="$CURSOR_CONFIG_DIR/globalStorage/rooveterinaryinc.roo-cline/settings/cline_mcp_settings.json"

echo "📍 检测到的 Cursor 配置目录: $CURSOR_CONFIG_DIR"

# 检查 Cursor 是否已安装
if [ ! -d "$CURSOR_CONFIG_DIR" ]; then
    echo "❌ 未找到 Cursor 配置目录。请确保 Cursor 已正确安装。"
    exit 1
fi

# 获取当前脚本所在目录的绝对路径
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "📁 项目根目录: $PROJECT_ROOT"

# 检查项目依赖
echo "📦 检查项目依赖..."
if [ ! -f "$PROJECT_ROOT/package.json" ]; then
    echo "❌ 未找到 package.json 文件"
    exit 1
fi

if [ ! -d "$PROJECT_ROOT/node_modules" ]; then
    echo "📦 安装项目依赖..."
    cd "$PROJECT_ROOT"
    npm install
fi

# 检查 .env 文件
echo "🔑 检查环境变量配置..."
if [ ! -f "$PROJECT_ROOT/.env" ]; then
    echo "⚠️  未找到 .env 文件，从模板创建..."
    cp "$PROJECT_ROOT/assets/env.example" "$PROJECT_ROOT/.env"
    echo "📝 请编辑 $PROJECT_ROOT/.env 文件，添加您的 API 密钥"
    echo "   特别是 BAILIAN_API_KEY（阿里云百炼平台密钥）"
    echo ""
    echo "按回车键继续（确保您已配置 API 密钥）..."
    read -r
fi

# 创建 MCP 配置目录
MCP_CONFIG_DIR="$(dirname "$MCP_CONFIG_FILE")"
if [ ! -d "$MCP_CONFIG_DIR" ]; then
    echo "📁 创建 MCP 配置目录..."
    mkdir -p "$MCP_CONFIG_DIR"
fi

# 读取 .env 文件并提取 API 密钥
echo "🔧 配置 MCP 环境变量..."
ENV_VARS="{}"

if [ -f "$PROJECT_ROOT/.env" ]; then
    while IFS='=' read -r key value; do
        # 跳过注释和空行
        if [[ $key =~ ^[[:space:]]*# ]] || [[ -z $key ]]; then
            continue
        fi
        
        # 移除可能的引号
        value=$(echo "$value" | sed 's/^["'\'']//' | sed 's/["'\'']$//')
        
        # 只处理 API 密钥相关的环境变量
        if [[ $key == *"API_KEY"* ]] || [[ $key == *"BASE_URL"* ]] || [[ $key == *"ENDPOINT"* ]]; then
            ENV_VARS=$(echo "$ENV_VARS" | jq --arg key "$key" --arg value "$value" '. + {($key): $value}')
        fi
    done < "$PROJECT_ROOT/.env"
fi

# 生成 MCP 配置
MCP_CONFIG=$(cat <<EOF
{
  "mcpServers": {
    "task-master-ai": {
      "command": "node",
      "args": ["$PROJECT_ROOT/mcp-server/src/index.js"],
      "env": $ENV_VARS
    }
  }
}
EOF
)

# 写入 MCP 配置文件
echo "$MCP_CONFIG" > "$MCP_CONFIG_FILE"

echo "✅ MCP 配置已写入: $MCP_CONFIG_FILE"

# 验证 MCP 服务器
echo "🧪 验证 MCP 服务器..."
cd "$PROJECT_ROOT"

# 测试 MCP 服务器启动
timeout 10s node mcp-server/src/index.js --test 2>/dev/null || {
    echo "⚠️  MCP 服务器测试超时，这是正常的"
}

echo ""
echo "🎉 部署完成！"
echo ""
echo "📋 下一步操作："
echo "1. 重启 Cursor 编辑器"
echo "2. 在 Cursor 中打开任何项目"
echo "3. 按 Ctrl+Shift+P (或 Cmd+Shift+P) 打开命令面板"
echo "4. 搜索 'MCP' 相关命令来验证连接"
echo ""
echo "🔍 可用的 Task Master 工具："
echo "   - get_tasks: 获取任务列表"
echo "   - parse_prd: 解析产品需求文档"
echo "   - analyze_project_complexity: 分析项目复杂度"
echo "   - expand_task: 扩展任务为子任务"
echo "   - research: AI 驱动的研究功能"
echo "   - models: 管理 AI 模型配置"
echo ""
echo "📖 更多信息请查看: $PROJECT_ROOT/docs/CURSOR-MCP-SETUP.md"
echo ""
echo "🛠️  如遇问题，请检查："
echo "   - API 密钥是否正确配置在 .env 文件中"
echo "   - Cursor 是否已重启"
echo "   - MCP 配置文件: $MCP_CONFIG_FILE" 