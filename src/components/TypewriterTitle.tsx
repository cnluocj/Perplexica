'use client';

import { useState, useEffect } from 'react';

const TypewriterTitle = () => {
  const titles = [
    "你好呀，我是医路达写作AI小助手",
    "你想写什么文章呢？",
    "Hi! I'm YILUDA AI",
    "What shall we write today?"
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typeSpeed, setTypeSpeed] = useState(100);

  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];

    const handleTyping = () => {
              if (!isDeleting) {
          // 正在打字
          if (currentText.length < currentTitle.length) {
            let nextLength = currentText.length + 1;
            
            // 如果下一个字符是空格，连同空格一起显示，避免视觉停顿
            while (nextLength < currentTitle.length && currentTitle[nextLength] === ' ') {
              nextLength += 1;
            }
            
            setCurrentText(currentTitle.substring(0, nextLength));
            setTypeSpeed(100); // 打字速度
          } else {
          // 完成打字，等待后开始删除
          setTimeout(() => setIsDeleting(true), 2000); // 等待2秒
        }
      } else {
        // 正在删除
        if (currentText.length > 0) {
          setCurrentText(currentTitle.substring(0, currentText.length - 1));
          setTypeSpeed(50); // 删除速度更快
        } else {
          // 删除完成，切换到下一个标题
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
          setTypeSpeed(100);
        }
      }
    };

    const timer = setTimeout(handleTyping, typeSpeed);

    return () => clearTimeout(timer);
  }, [currentText, currentTitleIndex, isDeleting, typeSpeed, titles]);

  return (
    <h2 className="text-black/70 dark:text-white/70 text-3xl font-medium -mt-8 min-h-[3.5rem] flex items-center justify-center text-center">
      {currentText}
      <span className="animate-pulse text-[#24A0ED] ml-1">|</span>
    </h2>
  );
};

export default TypewriterTitle;