import Link from 'next/link';

const BetaBadge = () => {
  return (
    <div className="fixed top-20 right-4 z-40">
      <Link href="/changelog">
        <div className="bg-[#24A0ED] text-white px-2 py-1 rounded text-xs font-medium shadow-sm border border-[#1976D2] cursor-pointer hover:bg-[#1976D2] transition-colors duration-200">
          BETA
        </div>
      </Link>
    </div>
  );
};

export default BetaBadge;