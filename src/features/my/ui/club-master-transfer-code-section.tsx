'use client';

import { Copy } from 'lucide-react';
import { toast } from 'react-toastify';

type ClubMasterTransferCodeSectionProps = {
  userCode: string;
};

function ClubMasterTransferCodeSection({
  userCode,
}: ClubMasterTransferCodeSectionProps) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(userCode);
    toast.success('코드가 복사되었습니다.');
  };

  return (
    <div className="flex flex-col gap-2 py-4">
      <span className="text-text-secondary text-sm font-bold">
        권한 위임 코드
      </span>
      <p className="text-gray -mt-1 text-xs">
        현재 동아리장에게 코드를 전달하면 관리 권한을 위임받을 수 있습니다.
      </p>
      <div className="flex items-center gap-2">
        <span className="text-text-secondary text-sm">{userCode}</span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="코드 복사하기"
          className="text-text-secondary hover:text-text-primary transition-colors duration-200"
        >
          <Copy size={16} />
        </button>
      </div>
    </div>
  );
}

export default ClubMasterTransferCodeSection;
