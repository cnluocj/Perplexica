import MedicalEmptyChatMessageInput from './MedicalEmptyChatMessageInput';

const MedicalEmptyChat = ({
  sendMessage,
  prefilledTitle = '',
  onTitleUsed = () => {},
}: {
  sendMessage: (message: string) => void;
  prefilledTitle?: string;
  onTitleUsed?: () => void;
}) => {
  return (
    <div className="relative">
      <div className="flex flex-col items-center justify-center min-h-screen max-w-screen-sm mx-auto p-2 space-y-4">
        <div className="flex flex-col items-center justify-center w-full space-y-8">
          <h2 className="text-black/70 dark:text-white/70 text-3xl font-medium -mt-8">
            医学科普写作助手
          </h2>
          <MedicalEmptyChatMessageInput 
            sendMessage={sendMessage}
            prefilledTitle={prefilledTitle}
            onTitleUsed={onTitleUsed}
          />
        </div>
      </div>
    </div>
  );
};

export default MedicalEmptyChat; 