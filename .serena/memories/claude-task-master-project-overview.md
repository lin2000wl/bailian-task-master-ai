# Claude Task Master 项目概览

## 项目基本信息
- **项目名称**: Claude Task Master
- **项目类型**: AI驱动的任务管理系统
- **主要语言**: JavaScript (ES模块)
- **许可证**: MIT License with Commons Clause
- **项目路径**: H:\AI\claude-task-master-main

## 项目架构
- **CLI工具**: 支持命令行界面和MCP协议
- **多AI支持**: 集成多种AI提供商 (Anthropic, OpenAI, Google, Perplexity, xAI, OpenRouter等)
- **标签化任务系统**: 支持多上下文任务管理
- **MCP集成**: 支持Model Control Protocol

## 目录结构
```
├── .changeset/          # 版本管理
├── .cursor/             # Cursor AI配置
├── .github/             # GitHub Actions
├── .taskmaster/         # 任务管理配置
├── assets/              # 静态资源
├── bin/                 # 可执行文件
├── context/             # 上下文文档
├── docs/                # 文档
├── mcp-server/          # MCP服务器实现
├── scripts/             # 核心脚本
├── src/                 # 源代码
├── tests/               # 测试文件
├── index.js             # 主入口文件
└── README.md            # 项目说明
```

## 关键问题
**缺少package.json文件**: 项目代码中多处引用package.json，但根目录下没有此文件。这是一个需要解决的重要问题。

## 主要特性
- MCP协议支持
- 多种AI提供商集成
- 标签化任务列表
- 研究功能
- CLI和图形界面支持
- 多编辑器集成 (Cursor, Windsurf, VS Code)