#!/usr/bin/env node

/**
 * Manual verification script for Bailian integration
 */

import { BailianProvider } from '../src/ai-providers/bailian.js';
import { PROVIDERS } from '../scripts/modules/ai-services-unified.js';

console.log('🧪 百炼平台集成验证开始...\n');

// Test 1: Provider initialization
console.log('1️⃣  测试提供商初始化...');
try {
  const bailianProvider = new BailianProvider();
  console.log('✅ BailianProvider 初始化成功');
  console.log(`   - 名称: ${bailianProvider.name}`);
  console.log(`   - 基础URL: ${bailianProvider.baseURL}`);
} catch (error) {
  console.log('❌ BailianProvider 初始化失败:', error.message);
}

// Test 2: Provider registration in unified service
console.log('\n2️⃣  测试提供商注册...');
try {
  if (PROVIDERS.bailian) {
    console.log('✅ 百炼提供商已在统一服务中注册');
    console.log(`   - 提供商类型: ${PROVIDERS.bailian.constructor.name}`);
  } else {
    console.log('❌ 百炼提供商未在统一服务中注册');
  }
} catch (error) {
  console.log('❌ 检查提供商注册失败:', error.message);
}

// Test 3: Model configuration
console.log('\n3️⃣  测试模型配置...');
try {
  const fs = await import('fs');
  const modelsConfig = JSON.parse(fs.readFileSync('./scripts/modules/supported-models.json', 'utf8'));
  
  if (modelsConfig.bailian) {
    console.log('✅ 百炼模型配置已添加');
    console.log(`   - 模型数量: ${modelsConfig.bailian.length}`);
    modelsConfig.bailian.forEach(model => {
      console.log(`   - ${model.id}: 最大令牌 ${model.max_tokens}, 成本 ${model.cost_per_1m_tokens.input}/${model.cost_per_1m_tokens.output} ${model.cost_per_1m_tokens.currency}`);
    });
  } else {
    console.log('❌ 百炼模型配置未找到');
  }
} catch (error) {
  console.log('❌ 检查模型配置失败:', error.message);
}

// Test 4: Environment variable configuration
console.log('\n4️⃣  测试环境变量配置...');
try {
  const fs = await import('fs');
  const envExample = fs.readFileSync('./assets/env.example', 'utf8');
  
  if (envExample.includes('BAILIAN_API_KEY')) {
    console.log('✅ 环境变量示例已更新');
    const bailianLine = envExample.split('\n').find(line => line.includes('BAILIAN_API_KEY'));
    console.log(`   - ${bailianLine?.trim()}`);
  } else {
    console.log('❌ 环境变量示例未更新');
  }
} catch (error) {
  console.log('❌ 检查环境变量配置失败:', error.message);
}

// Test 5: API key validation
console.log('\n5️⃣  测试API密钥验证...');
try {
  const bailianProvider = new BailianProvider();
  
  // Test with missing API key
  try {
    bailianProvider.validateAuth({});
    console.log('❌ API密钥验证应该失败但没有失败');
  } catch (error) {
    if (error.message.includes('Bailian API key is required')) {
      console.log('✅ API密钥缺失验证正常');
    } else {
      console.log('❌ API密钥验证错误消息不正确:', error.message);
    }
  }
  
  // Test with valid API key
  try {
    bailianProvider.validateAuth({ apiKey: 'test-key' });
    console.log('✅ 有效API密钥验证通过');
  } catch (error) {
    console.log('❌ 有效API密钥验证失败:', error.message);
  }
} catch (error) {
  console.log('❌ API密钥验证测试失败:', error.message);
}

// Test 6: Error handling
console.log('\n6️⃣  测试错误处理...');
try {
  const bailianProvider = new BailianProvider();
  
  const testErrors = [
    { response: { status: 401 }, expected: '百炼平台API密钥无效' },
    { response: { status: 429 }, expected: '百炼平台API请求频率超限' },
    { response: { status: 500 }, expected: '百炼平台服务器错误' }
  ];
  
  testErrors.forEach(({ response, expected }, index) => {
    try {
      bailianProvider.handleError('test', { response });
      console.log(`❌ 错误处理测试 ${index + 1} 应该抛出异常但没有`);
    } catch (error) {
      if (error.message.includes(expected)) {
        console.log(`✅ 错误处理测试 ${index + 1} (${response.status}) 正常`);
      } else {
        console.log(`❌ 错误处理测试 ${index + 1} 消息不正确: ${error.message}`);
      }
    }
  });
} catch (error) {
  console.log('❌ 错误处理测试失败:', error.message);
}

console.log('\n🎉 百炼平台集成验证完成！');
console.log('\n📝 下一步：');
console.log('   1. 配置 BAILIAN_API_KEY 环境变量');
console.log('   2. 在 .taskmasterconfig 中设置百炼为主要提供商');
console.log('   3. 运行实际的AI调用测试');
console.log('   4. 验证MCP工具集成'); 