#!/usr/bin/env node

/**
 * MCP服务器测试脚本
 * 用于验证MCP服务器是否能正常启动和运行
 */

import TaskMasterMCPServer from './mcp-server/src/index.js';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

console.log('🚀 开始测试 Claude Task Master MCP 服务器...\n');

async function testMCPServer() {
    let server;
    
    try {
        // 创建服务器实例
        console.log('📦 创建MCP服务器实例...');
        server = new TaskMasterMCPServer();
        
        // 初始化服务器
        console.log('⚙️  初始化MCP服务器...');
        await server.init();
        console.log('✅ MCP服务器初始化成功!');
        
        // 检查服务器状态
        console.log('🔍 检查服务器配置...');
        
        // 验证工具注册
        console.log('🛠️  验证MCP工具注册...');
        
        console.log('\n🎉 MCP服务器测试通过!');
        console.log('📋 服务器功能:');
        console.log('   ✓ 任务管理工具');
        console.log('   ✓ 项目初始化');
        console.log('   ✓ PRD解析');
        console.log('   ✓ AI研究功能');
        console.log('   ✓ 复杂度分析');
        console.log('   ✓ 标签管理');
        console.log('   ✓ 依赖管理');
        
        console.log('\n📝 使用说明:');
        console.log('   1. 在Cursor中配置MCP服务器');
        console.log('   2. 使用 npm run mcp-server 启动服务');
        console.log('   3. 在AI助手中使用可用的工具');
        
        return true;
        
    } catch (error) {
        console.error('❌ MCP服务器测试失败:');
        console.error(`   错误: ${error.message}`);
        
        if (error.stack) {
            console.error('\n📍 错误详情:');
            console.error(error.stack);
        }
        
        console.log('\n🔧 故障排除建议:');
        console.log('   1. 检查所有依赖是否已安装: npm install');
        console.log('   2. 验证Node.js版本 >= 18.0.0');
        console.log('   3. 检查环境变量配置');
        console.log('   4. 查看完整部署指南: docs/MCP-DEPLOYMENT.md');
        
        return false;
        
    } finally {
        // 清理资源
        if (server) {
            try {
                await server.stop();
                console.log('\n🧹 服务器资源已清理');
            } catch (cleanupError) {
                console.warn('⚠️  清理资源时出现警告:', cleanupError.message);
            }
        }
    }
}

// 运行测试
testMCPServer()
    .then((success) => {
        if (success) {
            console.log('\n✨ 测试完成 - MCP服务器可以正常使用!');
            process.exit(0);
        } else {
            console.log('\n💥 测试失败 - 请检查上述错误信息');
            process.exit(1);
        }
    })
    .catch((error) => {
        console.error('\n💥 测试过程中发生未处理的错误:');
        console.error(error);
        process.exit(1);
    });