import Sidebar from '@/components/Sidebar';
import MainHeader from '@/components/MainHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '医学科普写作助手 - 医职帮',
  description: '专业的医学科普文章生成与AI智能问答平台',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white min-h-screen">
      <MainHeader />
      <Sidebar>{children}</Sidebar>
    </div>
  );
};

export default Layout;