'use client';

import { useEffect, useRef, useState } from 'react';
import { Document } from '@langchain/core/documents';
import Navbar from './Navbar';
import Chat from './Chat';
import MedicalEmptyChat from './MedicalEmptyChat';
import crypto from 'crypto';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import { Settings } from 'lucide-react';
import Link from 'next/link';
import NextError from 'next/error';

export type Message = {
  messageId: string;
  chatId: string;
  createdAt: Date;
  content: string;
  role: 'user' | 'assistant';
  suggestions?: string[];
  sources?: Document[];
};

interface ChatModelProvider {
  name: string;
  provider: string;
}

interface EmbeddingModelProvider {
  name: string;
  provider: string;
}

const MedicalChatWindow = ({ id }: { id?: string }) => {
  const searchParams = useSearchParams();
  const newParam = searchParams.get('new');
  
  const [chatId, setChatId] = useState<string | undefined>(id);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(true);
  const [lastTitle, setLastTitle] = useState<string>(''); // 保存最后输入的标题
  const [prefilledTitle, setPrefilledTitle] = useState<string>(''); // 预填充的标题

  useEffect(() => {
    if (!chatId) {
      setChatId(crypto.randomBytes(20).toString('hex'));
    }
  }, []);

  // 检测new参数，重置状态
  useEffect(() => {
    if (newParam) {
      setMessages([]);
      setChatId(crypto.randomBytes(20).toString('hex'));
      setLoading(false);
      setLastTitle('');
      setPrefilledTitle('');
      
      // 清除URL参数但不触发页面刷新
      const url = new URL(window.location.href);
      url.searchParams.delete('new');
      window.history.replaceState({}, '', url.toString());
    }
  }, [newParam]);

  const sendMessage = async (message: string) => {
    if (loading || !chatId) return;

    // 保存输入的标题
    setLastTitle(message);
    setLoading(true);

    const messageId = crypto.randomBytes(7).toString('hex');

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        content: message,
        messageId: messageId,
        chatId: chatId,
        role: 'user',
        createdAt: new Date(),
      },
    ]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: message,
          message: {
            messageId: messageId,
            chatId: chatId,
            content: message,
          },
          chatId: chatId,
          files: [],
          focusMode: 'medicalWriting',
          optimizationMode: 'speed',
          history: [],
          systemInstructions: localStorage.getItem('systemInstructions'),
        }),
      });

      if (!res.body) throw new Error('No response body');

      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');

      let partialChunk = '';
      let assistantMessage = '';
      let sources: Document[] | undefined = undefined;
      let assistantMessageAdded = false;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        partialChunk += decoder.decode(value, { stream: true });

        try {
          const messages = partialChunk.split('\n');
          for (const msg of messages) {
            if (!msg.trim()) continue;
            const data = JSON.parse(msg);

            if (data.type === 'error') {
              toast.error(data.data);
              setLoading(false);
              return;
            }

            if (data.type === 'sources') {
              sources = data.data;
            }

            if (data.type === 'message') {
              if (!assistantMessageAdded) {
                setMessages((prevMessages) => [
                  ...prevMessages,
                  {
                    content: data.data,
                    messageId: data.messageId,
                    chatId: chatId,
                    role: 'assistant',
                    sources: sources,
                    createdAt: new Date(),
                  },
                ]);
                assistantMessageAdded = true;
              } else {
                setMessages((prev) =>
                  prev.map((message) => {
                    if (message.messageId === data.messageId) {
                      return { ...message, content: message.content + data.data };
                    }
                    return message;
                  }),
                );
              }
              assistantMessage += data.data;
            }

            if (data.type === 'messageEnd') {
              setLoading(false);
            }
          }
          partialChunk = '';
        } catch (error) {
          console.warn('Incomplete JSON, waiting for next chunk...');
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('发送消息时出错');
      setLoading(false);
    }
  };

  // 重写功能：重新开始并预填标题，但不自动发送
  const rewrite = () => {
    // 重置状态
    setMessages([]);
    setChatId(crypto.randomBytes(20).toString('hex'));
    setLoading(false);
    
    // 设置预填充标题
    if (lastTitle) {
      setPrefilledTitle(lastTitle);
    }
  };

  return isReady ? (
    <div>
      {messages.length > 0 ? (
        <>
          <Navbar chatId={chatId!} messages={messages} />
          <Chat
            loading={loading}
            messages={messages}
            sendMessage={sendMessage}
            messageAppeared={true}
            rewrite={rewrite}
            fileIds={[]}
            setFileIds={() => {}}
            files={[]}
            setFiles={() => {}}
            hideMessageInput={true}
          />
        </>
      ) : (
        <MedicalEmptyChat 
          sendMessage={sendMessage} 
          prefilledTitle={prefilledTitle}
          onTitleUsed={() => setPrefilledTitle('')}
        />
      )}
    </div>
  ) : (
    <div className="flex flex-row items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-black/70 dark:text-white/70 text-sm">正在初始化...</p>
      </div>
    </div>
  );
};

export default MedicalChatWindow; 