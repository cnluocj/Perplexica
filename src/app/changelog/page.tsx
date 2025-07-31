import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '更新日志 - 医路达写作助手',
  description: '查看医路达AI写作助手的最新功能更新和改进',
};

const ChangelogPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
          更新日志
        </h1>
        <p className="text-black/70 dark:text-white/70">
          追踪医路达AI写作助手的最新功能和改进
        </p>
      </div>

      <div className="space-y-8">
        {/* 版本 Beta 1.0.0 */}
        <div className="border-l-4 border-[#24A0ED] pl-6">
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-semibold text-black dark:text-white">
                Beta版首次上线！
              </h2>
              <span className="bg-[#24A0ED] text-white px-3 py-1 rounded-full text-sm font-medium">
                Beta v1.0.0
              </span>
            </div>
            <time className="text-sm text-black/60 dark:text-white/60">
              {new Date().toLocaleDateString('zh-CN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </time>
          </div>
          
          <div className="prose prose-blue max-w-none">
            <h3 className="text-lg font-medium text-black dark:text-white mb-3">
              🎉 重大功能更新
            </h3>
            <ul className="space-y-2 text-black/80 dark:text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>医学科普写作核心功能</strong> - 专为医学科普文章优化的AI写作助手，支持专业术语和规范表达</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>智能文章检索引擎</strong> - 全新升级的知识检索系统，快速获取医学相关资讯、文献和专业知识</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>双模式智能优化</strong> - 提供"极速"和"平衡"两种写作模式，满足不同场景的速度和质量需求</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>响应式界面设计</strong> - 完美适配桌面端和移动端，随时随地进行医学写作</span>
              </li>
            </ul>

            <h3 className="text-lg font-medium text-black dark:text-white mb-3 mt-6">
              🔧 技术特性
            </h3>
            <ul className="space-y-2 text-black/80 dark:text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">●</span>
                <span>基于最新AI大模型技术，专门针对医学写作场景优化</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">●</span>
                <span>集成PubMed等专业医学数据库，确保内容的权威性和准确性</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">●</span>
                <span>实时流式输出，边写边看，提升创作效率</span>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Beta版本说明：</strong> 当前为测试版本，我们正在持续优化产品功能和用户体验。如果您在使用过程中遇到任何问题或有改进建议，欢迎反馈给我们！
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangelogPage;