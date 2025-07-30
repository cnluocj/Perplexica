import MedicalChatWindow from '@/components/MedicalChatWindow';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '医学科普写作助手 - 医职帮',
  description: '专业的医学科普文章生成与AI智能问答平台',
};

const Page = () => {
  return (
    <Suspense>
      <MedicalChatWindow />
    </Suspense>
  );
};

export default Page; 