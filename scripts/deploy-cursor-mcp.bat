@echo off
setlocal enabledelayedexpansion

REM Task Master AI - Cursor 全局 MCP 自动部署脚本
REM 适用于 Windows 系统

echo 🚀 Task Master AI - Cursor 全局 MCP 部署脚本
echo ================================================

REM 设置 Cursor 配置目录
set "CURSOR_CONFIG_DIR=%APPDATA%\Cursor\User"
set "MCP_CONFIG_FILE=%CURSOR_CONFIG_DIR%\globalStorage\rooveterinaryinc.roo-cline\settings\cline_mcp_settings.json"

echo 📍 检测到的 Cursor 配置目录: %CURSOR_CONFIG_DIR%

REM 检查 Cursor 是否已安装
if not exist "%CURSOR_CONFIG_DIR%" (
    echo ❌ 未找到 Cursor 配置目录。请确保 Cursor 已正确安装。
    pause
    exit /b 1
)

REM 获取项目根目录
set "SCRIPT_DIR=%~dp0"
for %%i in ("%SCRIPT_DIR%..") do set "PROJECT_ROOT=%%~fi"

echo 📁 项目根目录: %PROJECT_ROOT%

REM 检查项目依赖
echo 📦 检查项目依赖...
if not exist "%PROJECT_ROOT%\package.json" (
    echo ❌ 未找到 package.json 文件
    pause
    exit /b 1
)

if not exist "%PROJECT_ROOT%\node_modules" (
    echo 📦 安装项目依赖...
    cd /d "%PROJECT_ROOT%"
    call npm install
    if errorlevel 1 (
        echo ❌ 依赖安装失败
        pause
        exit /b 1
    )
)

REM 检查 .env 文件
echo 🔑 检查环境变量配置...
if not exist "%PROJECT_ROOT%\.env" (
    echo ⚠️  未找到 .env 文件，从模板创建...
    copy "%PROJECT_ROOT%\assets\env.example" "%PROJECT_ROOT%\.env"
    echo 📝 请编辑 %PROJECT_ROOT%\.env 文件，添加您的 API 密钥
    echo    特别是 BAILIAN_API_KEY（阿里云百炼平台密钥）
    echo.
    echo 按任意键继续（确保您已配置 API 密钥）...
    pause >nul
)

REM 创建 MCP 配置目录
for %%i in ("%MCP_CONFIG_FILE%") do set "MCP_CONFIG_DIR=%%~dpi"
if not exist "%MCP_CONFIG_DIR%" (
    echo 📁 创建 MCP 配置目录...
    mkdir "%MCP_CONFIG_DIR%"
)

REM 读取 .env 文件并构建环境变量 JSON
echo 🔧 配置 MCP 环境变量...
set "ENV_VARS="
set "FIRST_VAR=true"

if exist "%PROJECT_ROOT%\.env" (
    for /f "usebackq tokens=1,2 delims==" %%a in ("%PROJECT_ROOT%\.env") do (
        set "key=%%a"
        set "value=%%b"
        
        REM 跳过注释行
        if not "!key:~0,1!"=="#" (
            REM 移除可能的引号
            set "value=!value:"=!"
            set "value=!value:'=!"
            
            REM 只处理 API 密钥相关的环境变量
            echo !key! | findstr /C:"API_KEY" >nul || echo !key! | findstr /C:"BASE_URL" >nul || echo !key! | findstr /C:"ENDPOINT" >nul
            if not errorlevel 1 (
                if "!FIRST_VAR!"=="true" (
                    set "ENV_VARS=    "!key!": "!value!""
                    set "FIRST_VAR=false"
                ) else (
                    set "ENV_VARS=!ENV_VARS!,^
    "!key!": "!value!""
                )
            )
        )
    )
)

REM 生成 MCP 配置文件内容
set "NODE_PATH=%PROJECT_ROOT%\mcp-server\src\index.js"
set "NODE_PATH=!NODE_PATH:\=/!"

(
echo {
echo   "mcpServers": {
echo     "task-master-ai": {
echo       "command": "node",
echo       "args": ["!NODE_PATH!"],
echo       "env": {
echo !ENV_VARS!
echo       }
echo     }
echo   }
echo }
) > "%MCP_CONFIG_FILE%"

echo ✅ MCP 配置已写入: %MCP_CONFIG_FILE%

REM 验证 MCP 服务器
echo 🧪 验证 MCP 服务器...
cd /d "%PROJECT_ROOT%"

REM 测试 MCP 服务器启动（超时10秒）
timeout /t 10 /nobreak >nul 2>&1 & node mcp-server\src\index.js --test >nul 2>&1
echo ⚠️  MCP 服务器测试完成

echo.
echo 🎉 部署完成！
echo.
echo 📋 下一步操作：
echo 1. 重启 Cursor 编辑器
echo 2. 在 Cursor 中打开任何项目
echo 3. 按 Ctrl+Shift+P 打开命令面板
echo 4. 搜索 'MCP' 相关命令来验证连接
echo.
echo 🔍 可用的 Task Master 工具：
echo    - get_tasks: 获取任务列表
echo    - parse_prd: 解析产品需求文档
echo    - analyze_project_complexity: 分析项目复杂度
echo    - expand_task: 扩展任务为子任务
echo    - research: AI 驱动的研究功能
echo    - models: 管理 AI 模型配置
echo.
echo 📖 更多信息请查看: %PROJECT_ROOT%\docs\CURSOR-MCP-SETUP.md
echo.
echo 🛠️  如遇问题，请检查：
echo    - API 密钥是否正确配置在 .env 文件中
echo    - Cursor 是否已重启
echo    - MCP 配置文件: %MCP_CONFIG_FILE%
echo.
pause 