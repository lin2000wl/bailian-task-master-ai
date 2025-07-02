/**
 * bailian.js
 * AI provider implementation for Alibaba Cloud Bailian (通义千问) models using Vercel AI SDK.
 * Uses OpenAI-compatible API format.
 */

import { createOpenAI } from '@ai-sdk/openai';
import { BaseAIProvider } from './base-provider.js';

export class BailianProvider extends BaseAIProvider {
	constructor() {
		super();
		this.name = 'Bailian';
		this.baseURL = 'https://dashscope.aliyuncs.com/compatible-mode/v1';
	}

	/**
	 * Creates and returns a Bailian client instance using OpenAI-compatible interface.
	 * @param {object} params - Parameters for client initialization
	 * @param {string} params.apiKey - Bailian API key (BAILIAN_API_KEY)
	 * @param {string} [params.baseURL] - Optional custom API endpoint (defaults to Bailian's OpenAI-compatible endpoint)
	 * @returns {Function} Bailian client function compatible with Vercel AI SDK
	 * @throws {Error} If API key is missing or initialization fails
	 */
	getClient(params) {
		try {
			const { apiKey, baseURL } = params;

			if (!apiKey) {
				throw new Error('Bailian API key is required. Please set BAILIAN_API_KEY environment variable.');
			}

			// Use the provided baseURL or default to Bailian's OpenAI-compatible endpoint
			const effectiveBaseURL = baseURL || this.baseURL;

			return createOpenAI({
				apiKey,
				baseURL: effectiveBaseURL,
				// Additional headers for Bailian compatibility if needed
				headers: {
					'Content-Type': 'application/json'
				}
			});
		} catch (error) {
			this.handleError('client initialization', error);
		}
	}

	/**
	 * Override validateAuth to provide Bailian-specific error messages
	 * @param {object} params - Parameters to validate
	 */
	validateAuth(params) {
		if (!params.apiKey) {
			throw new Error(
				'Bailian API key is required. Please set BAILIAN_API_KEY environment variable and ensure it\'s properly configured.'
			);
		}
	}

	/**
	 * Override handleError to provide Bailian-specific error handling
	 */
	handleError(operation, error) {
		let errorMessage = error.message || 'Unknown error occurred';
		
		// Handle common Bailian API errors
		if (error.response?.status === 401) {
			errorMessage = '百炼平台API密钥无效，请检查BAILIAN_API_KEY环境变量';
		} else if (error.response?.status === 429) {
			errorMessage = '百炼平台API请求频率超限，请稍后重试';
		} else if (error.response?.status === 400) {
			errorMessage = '百炼平台API请求参数错误：' + (error.response?.data?.error?.message || errorMessage);
		} else if (error.response?.status >= 500) {
			errorMessage = '百炼平台服务器错误，请稍后重试';
		}

		const enhancedError = new Error(`${this.name} API error during ${operation}: ${errorMessage}`);
		enhancedError.originalError = error;
		
		throw enhancedError;
	}
} 