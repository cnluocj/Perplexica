import MedicalChatWindow from '@/components/MedicalChatWindow';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '医路达医学科普写作助手',
  description: '专业的医学科普文章生成与AI智能问答平台',
};

const Page = () => {
  return (
    <div>
      <Suspense>
        <MedicalChatWindow />
      </Suspense>
    </div>
  );
};

export default Page; 