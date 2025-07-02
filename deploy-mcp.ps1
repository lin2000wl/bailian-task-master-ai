# Claude Task Master MCP 服务部署脚本
# 用于在Windows系统上部署Task Master MCP服务

Write-Host "=== Claude Task Master MCP 服务部署脚本 ===" -ForegroundColor Green

# 检查Node.js版本
Write-Host "检查Node.js版本..." -ForegroundColor Yellow
$nodeVersion = node --version
Write-Host "Node.js版本: $nodeVersion" -ForegroundColor Cyan

# 检查npm版本  
Write-Host "检查npm版本..." -ForegroundColor Yellow
$npmVersion = npm --version
Write-Host "npm版本: $npmVersion" -ForegroundColor Cyan

# 安装依赖
Write-Host "安装项目依赖..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "依赖安装失败!" -ForegroundColor Red
    exit 1
}

Write-Host "依赖安装完成!" -ForegroundColor Green

# 检查MCP配置文件
$mcpConfigPath = ".cursor\mcp.json"
if (Test-Path $mcpConfigPath) {
    Write-Host "MCP配置文件已存在: $mcpConfigPath" -ForegroundColor Green
} else {
    Write-Host "警告: MCP配置文件不存在: $mcpConfigPath" -ForegroundColor Yellow
    Write-Host "请确保在Cursor中正确配置MCP服务器" -ForegroundColor Yellow
}

# 创建环境变量模板
$envTemplatePath = ".env.template"
if (-not (Test-Path $envTemplatePath)) {
    Write-Host "创建环境变量模板文件..." -ForegroundColor Yellow
    @"
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
"@ | Out-File -FilePath $envTemplatePath -Encoding UTF8
    Write-Host "环境变量模板已创建: $envTemplatePath" -ForegroundColor Green
}

# 测试MCP服务器连接性
Write-Host "验证MCP服务器配置..." -ForegroundColor Yellow

# 检查关键文件是否存在
$requiredFiles = @(
    "mcp-server/server.js",
    "mcp-server/src/index.js",
    "package.json"
)

foreach ($file in $requiredFiles) {
    if (-not (Test-Path $file)) {
        Write-Host "错误: 缺少关键文件 $file" -ForegroundColor Red
        exit 1
    }
}

Write-Host "所有关键文件检查通过!" -ForegroundColor Green

# 显示部署完成信息
Write-Host ""
Write-Host "=== 部署完成 ===" -ForegroundColor Green
Write-Host "MCP服务器已准备就绪!" -ForegroundColor Green
Write-Host ""
Write-Host "下一步操作:" -ForegroundColor Yellow
Write-Host "1. 复制 .env.template 为 .env 并配置你的API密钥" -ForegroundColor White
Write-Host "2. 在Cursor中配置MCP服务器 (.cursor/mcp.json)" -ForegroundColor White
Write-Host "3. 使用以下命令启动MCP服务器:" -ForegroundColor White
Write-Host "   npm run mcp-server" -ForegroundColor Cyan
Write-Host ""
Write-Host "MCP工具将在Cursor中可用，包括:" -ForegroundColor Yellow
Write-Host "- initialize_project: 初始化项目" -ForegroundColor White
Write-Host "- parse_prd: 解析PRD生成任务" -ForegroundColor White
Write-Host "- get_tasks: 获取任务列表" -ForegroundColor White
Write-Host "- add_task: 添加新任务" -ForegroundColor White
Write-Host "- expand_task: 展开复杂任务" -ForegroundColor White
Write-Host "- research: AI研究功能" -ForegroundColor White
Write-Host "- 以及更多任务管理工具..." -ForegroundColor White

# 询问是否立即启动MCP服务器
$response = Read-Host "是否立即启动MCP服务器进行测试? (y/N)"
if ($response -eq "y" -or $response -eq "Y") {
    Write-Host "启动MCP服务器..." -ForegroundColor Green
    npm run mcp-server
}