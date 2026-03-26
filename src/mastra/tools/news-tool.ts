import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

/**
 * [실시간 뉴스 RSS 도구]
 * 별도의 API 키 없이 Google News RSS를 통해 실시간 뉴스를 가져옵니다.
 */
export const newsTool = createTool({
  id: 'get-news',
  description: '최신 뉴스 및 실시간 정보를 검색합니다.',
  
  inputSchema: z.object({
    query: z.string().describe('검색하고 싶은 뉴스 키워드'),
  }),

  outputSchema: z.object({
    articles: z.array(
      z.object({
        title: z.string().describe('제목'),
        url: z.string().describe('링크'),
        source: z.string().describe('출처'),
        publishedAt: z.string().describe('보도 시각'),
      }),
    ),
  }),

  // [중요] 인자 방식을 { inputData }가 아니라 weather-tool과 같은 (inputData) 방식으로 맞췄습니다.
  execute: async (inputData) => {
    // inputData가 { query: '...' } 형태로 들어옵니다.
    const query = inputData.query;
    
    if (!query) {
      console.error('❌ 검색어가 없습니다.');
      return { articles: [] };
    }

    console.log(`🔍 실시간 RSS 뉴스 검색 중: ${query}`);

    try {
      const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=ko&gl=KR&ceid=KR:ko`;
      
      const response = await fetch(rssUrl);
      const xmlText = await response.text();

      // RSS XML 파싱
      const items = xmlText.match(/<item>[\s\S]*?<\/item>/g) || [];
      
      const articles = items.slice(0, 5).map(item => {
        const title = item.match(/<title>(.*?)<\/title>/)?.[1] || '제목 없음';
        const url = item.match(/<link>(.*?)<\/link>/)?.[1] || '';
        const source = item.match(/<source[^>]*>(.*?)<\/source>/)?.[1] || 'Google News';
        const publishedAt = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || '';
        
        return { 
          title: title.replace(/&quot;/g, '"').replace(/&amp;/g, '&'), 
          url, 
          source, 
          publishedAt 
        };
      });

      console.log(`✅ ${articles.length}개의 실시간 뉴스를 찾았습니다.`);
      return { articles };
    } catch (error) {
      console.error('❌ RSS 검색 중 오류 발생:', error);
      return { articles: [] };
    }
  },
});
