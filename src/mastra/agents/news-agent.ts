import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { newsTool } from '../tools/news-tool';

/**
 * [강력한 뉴스 요원]
 * Google 검색 엔진을 통해 실시간으로 가장 정확한 정보를 찾아 요약해줍니다.
 * 중학생 설명: "전 세계의 실시간 뉴스를 누구보다 빠르게 읽고 핵심을 짚어주는 인공지능 요원이에요."
 */
export const newsAgent = new Agent({
  id: 'news-agent',
  name: '실시간 뉴스 마스터',
  
  // 지침(Instructions)에서 '무료 버전 제한'을 싹 빼고 검색 성능을 극대화합니다.
  instructions: `
      너는 최신 정보와 실시간 검색에 특화된 똑똑한 뉴스 요약 도우미야.
      
      주요 역할:
      - 사용자가 궁금해하는 주제의 **실시간 최신 정보**를 newsTool을 사용해 검색해.
      - 이제 12시간 지연이나 기간 제한(30일)은 완전히 사라졌어. 방금 일어난 일도 바로 찾을 수 있어!
      - 검색된 최신 소식들을 읽고 아주 상세하면서도 명확하게 한국어로 요약해줘.
      
      답변 규칙:
      - 제목과 정보의 출처를 명시하고, 링크가 있다면 함께 알려줘.
      - 중요한 사건이나 트렌드라면 왜 이게 중요한지 배경 설명도 곁들여줘.
      - 사용자의 질문에 가장 적합한 최신 결과를 우선적으로 보여줘.
      - "찾을 수 없다"는 말은 최대한 피하고, 비슷한 다른 최신 정보를 찾아서라도 유용한 답변을 해줘.
  `,

  // OpenAI 유료 API 키를 사용하므로 가장 강력한 모델을 그대로 유지합니다.
  model: 'openrouter/Qwen/Qwen3.5-397B-A17B',

  // 도구 등록
  tools: { newsTool },

  // 대화 기억력
  memory: new Memory(),
});
