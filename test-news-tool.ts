import { newsTool } from './src/mastra/tools/news-tool';
import * as dotenv from 'dotenv';
import path from 'path';

// .env 파일을 명시적으로 로드합니다.
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function testNews() {
  console.log('--- 뉴스 도구 진단 시작 ---');
  console.log('GNEWS_API_KEY 존재 여부:', process.env.GNEWS_API_KEY ? '✅ 있음' : '❌ 없음');
  
  try {
    const result = await newsTool.execute({
      inputData: {
        query: '삼성',
        language: 'ko',
        maxResults: 1
      },
      // mastra 인스턴스가 없어도 실행 가능하도록 설정
      mastra: undefined as any
    });
    
    console.log('검색 결과 성공!');
    console.log('가져온 기사 수:', result.articles.length);
    if (result.articles.length > 0) {
      console.log('첫 번째 기사 제목:', result.articles[0].title);
    }
  } catch (error: any) {
    console.error('--- 에러 발생 상세 내용 ---');
    console.error('메시지:', error.message);
    if (error.stack) {
      console.error('스택 트레이스:', error.stack);
    }
  }
}

testNews();
