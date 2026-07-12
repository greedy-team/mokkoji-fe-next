import Link from 'next/link';
import { ApplicationCardItem } from '@/entities/my/model/type';
import { APPLICATION_SECTION } from '@/entities/my/model/constants';
import { sortByLatest } from '@/entities/my/lib/application-card';
import ClubApplicationCard from './club-application-card';

type ApplicationSectionProps = {
  title: string;
  moreHref: string;
  items: ApplicationCardItem[];
  showLogo?: boolean;
};

function ApplicationSection({
  title,
  moreHref,
  items,
  showLogo = false,
}: ApplicationSectionProps) {
  if (items.length === 0) {
    return null;
  }

  const latest = sortByLatest(items)[0];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-text-tertiary text-sm">{title}</span>
        <Link href={moreHref} className="text-text-secondary text-sm">
          더보기
        </Link>
      </div>
      <ul>
        <ClubApplicationCard item={latest} showLogo={showLogo} />
      </ul>
    </div>
  );
}

type ClubApplicationStatusProps = {
  createItems: ApplicationCardItem[];
  masterItems: ApplicationCardItem[];
  universityCode: string;
};

function ClubApplicationStatus({
  createItems,
  masterItems,
  universityCode,
}: ClubApplicationStatusProps) {
  if (createItems.length === 0 && masterItems.length === 0) {
    return null;
  }

  return (
    <div className="mb-10 flex flex-col gap-3">
      <div className="font-semibold">신청 현황</div>
      <div className="flex flex-col gap-5">
        <ApplicationSection
          title={APPLICATION_SECTION.master.title}
          moreHref={`/${universityCode}/my/applications/${APPLICATION_SECTION.master.path}`}
          items={masterItems}
          showLogo
        />
        <ApplicationSection
          title={APPLICATION_SECTION.create.title}
          moreHref={`/${universityCode}/my/applications/${APPLICATION_SECTION.create.path}`}
          items={createItems}
        />
      </div>
    </div>
  );
}

export default ClubApplicationStatus;
