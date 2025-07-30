import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '医路达医学科普写作助手',
  description: '专业的医学科普文章生成与AI智能问答平台',
};

const Home = () => {
  // 重定向到医学科普页面
  redirect('/medical-science');
};

export default Home;
