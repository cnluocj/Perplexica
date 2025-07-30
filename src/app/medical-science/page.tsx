import ChatWindow from '@/components/ChatWindow';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '医疗科普 - Perplexica',
  description: '专业的医疗科普文章生成与AI智能问答平台',
};

const Page = () => {
  return (
    <div>
      <Suspense>
        <ChatWindow />
      </Suspense>
    </div>
  );
};

export default Page; 