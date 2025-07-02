#!/bin/bash

# Claude Task Master MCP 服务部署脚本 (Linux/macOS)
# 用于在Unix系统上部署Task Master MCP服务

set -e  # 遇到错误时退出

echo "=== Claude Task Master MCP 服务部署脚本 ==="

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# 检查Node.js版本
echo -e "${YELLOW}检查Node.js版本...${NC}"
if command -v node >/dev/null 2>&1; then
    NODE_VERSION=$(node --version)
    echo -e "${CYAN}Node.js版本: $NODE_VERSION${NC}"
    
    # 检查版本是否满足要求 (>=18.0.0)
    NODE_MAJOR=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
    if [ "$NODE_MAJOR" -lt 18 ]; then
        echo -e "${RED}错误: 需要Node.js 18.0.0或更高版本${NC}"
        echo -e "${YELLOW}请访问 https://nodejs.org 下载最新版本${NC}"
        exit 1
    fi
else
    echo -e "${RED}错误: 未找到Node.js${NC}"
    echo -e "${YELLOW}请先安装Node.js: https://nodejs.org${NC}"
    exit 1
fi

# 检查npm版本  
echo -e "${YELLOW}检查npm版本...${NC}"
if command -v npm >/dev/null 2>&1; then
    NPM_VERSION=$(npm --version)
    echo -e "${CYAN}npm版本: $NPM_VERSION${NC}"
else
    echo -e "${RED}错误: 未找到npm${NC}"
    exit 1
fi

# 安装依赖
echo -e "${YELLOW}安装项目依赖...${NC}"
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}依赖安装失败!${NC}"
    exit 1
fi

echo -e "${GREEN}依赖安装完成!${NC}"

# 检查MCP配置文件
MCP_CONFIG_PATH=".cursor/mcp.json"
if [ -f "$MCP_CONFIG_PATH" ]; then
    echo -e "${GREEN}MCP配置文件已存在: $MCP_CONFIG_PATH${NC}"
else
    echo -e "${YELLOW}警告: MCP配置文件不存在: $MCP_CONFIG_PATH${NC}"
    echo -e "${YELLOW}请确保在Cursor中正确配置MCP服务器${NC}"
fi

# 创建环境变量模板
ENV_TEMPLATE_PATH=".env.template"
if [ ! -f "$ENV_TEMPLATE_PATH" ]; then
    echo -e "${YELLOW}创建环境变量模板文件...${NC}"
    cat > "$ENV_TEMPLATE_PATH" << 'EOF'
# Claude Task Master 环境变量配置
# 复制此文件为 .env 并填入你的API密钥

# 必须配置的API密钥（根据使用的AI提供商选择）
ANTHROPIC_API_KEY=your_anthropic_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
GOOGLE_API_KEY=your_google_api_key_here
PERPLEXITY_API_KEY=your_perplexity_api_key_here
XAI_API_KEY=your_xai_api_key_here
BAILIAN_API_KEY=your_bailian_api_key_here

# 可选的API密钥
OPENROUTER_API_KEY=your_openrouter_api_key_here
MISTRAL_API_KEY=your_mistral_api_key_here
AZURE_OPENAI_API_KEY=your_azure_openai_api_key_here
AZURE_OPENAI_ENDPOINT=your_azure_endpoint_here
OLLAMA_API_KEY=your_ollama_api_key_here
OLLAMA_BASE_URL=http://localhost:11434/api
GITHUB_API_KEY=your_github_api_key_here

# 日志级别
TASKMASTER_LOG_LEVEL=info
EOF
    echo -e "${GREEN}环境变量模板已创建: $ENV_TEMPLATE_PATH${NC}"
fi

# 检查.env文件
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}创建.env文件...${NC}"
    cp "$ENV_TEMPLATE_PATH" ".env"
    echo -e "${CYAN}请编辑 .env 文件并配置你的API密钥${NC}"
fi

# 测试MCP服务器
echo -e "${YELLOW}测试MCP服务器启动...${NC}"
echo -e "${CYAN}注意: 这将启动MCP服务器，使用Ctrl+C停止${NC}"

# 显示部署完成信息
echo ""
echo -e "${GREEN}=== 部署完成 ===${NC}"
echo -e "${GREEN}MCP服务器已准备就绪!${NC}"
echo ""
echo -e "${YELLOW}下一步操作:${NC}"
echo -e "${NC}1. 编辑 .env 文件并配置你的API密钥${NC}"
echo -e "${NC}2. 在Cursor中配置MCP服务器 (.cursor/mcp.json)${NC}"
echo -e "${NC}3. 使用以下命令启动MCP服务器:${NC}"
echo -e "${CYAN}   npm run mcp-server${NC}"
echo ""
echo -e "${YELLOW}MCP工具将在Cursor中可用，包括:${NC}"
echo -e "${NC}- initialize_project: 初始化项目${NC}"
echo -e "${NC}- parse_prd: 解析PRD生成任务${NC}"
echo -e "${NC}- get_tasks: 获取任务列表${NC}"
echo -e "${NC}- add_task: 添加新任务${NC}"
echo -e "${NC}- expand_task: 展开复杂任务${NC}"
echo -e "${NC}- research: AI研究功能${NC}"
echo -e "${NC}- 以及更多任务管理工具...${NC}"

# 询问是否立即启动MCP服务器
echo ""
read -p "是否立即启动MCP服务器进行测试? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${GREEN}启动MCP服务器...${NC}"
    npm run mcp-server
fi