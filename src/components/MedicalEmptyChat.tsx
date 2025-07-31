import MedicalEmptyChatMessageInput from './MedicalEmptyChatMessageInput';
import TypewriterTitle from './TypewriterTitle';

const MedicalEmptyChat = ({
  sendMessage,
  prefilledTitle = '',
  onTitleUsed = () => {},
  optimizationMode,
  setOptimizationMode,
}: {
  sendMessage: (message: string) => void;
  prefilledTitle?: string;
  onTitleUsed?: () => void;
  optimizationMode: string;
  setOptimizationMode: (mode: string) => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)] max-w-screen-sm mx-auto p-2 space-y-4">
      <div className="flex flex-col items-center justify-center w-full space-y-8">
        <TypewriterTitle />
        <MedicalEmptyChatMessageInput 
          sendMessage={sendMessage}
          prefilledTitle={prefilledTitle}
          onTitleUsed={onTitleUsed}
          optimizationMode={optimizationMode}
          setOptimizationMode={setOptimizationMode}
        />
      </div>
    </div>
  );
};

export default MedicalEmptyChat; 