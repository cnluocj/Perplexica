import Sidebar from '@/components/Sidebar';
import MainHeader from '@/components/MainHeader';
import BetaBadge from '@/components/BetaBadge';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '更新日志 - 医路达写作助手',
  description: '查看医路达AI写作助手的最新功能更新和改进',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white min-h-screen">
      <MainHeader />
      <BetaBadge />
      <Sidebar>{children}</Sidebar>
    </div>
  );
};

export default Layout;