import { ClubApplicationType } from '@/entities/my/model/type';
import ClubApplicationCard from './club-application-card';

type ClubApplicationStatusProps = {
  applications: ClubApplicationType[];
};

function ClubApplicationStatus({ applications }: ClubApplicationStatusProps) {
  return (
    <div className="mb-10 flex flex-col gap-3">
      <div className="font-semibold">신청 현황</div>
      <ul className="flex flex-col gap-3">
        {applications.map((application) => (
          <ClubApplicationCard
            key={application.clubApplicationId}
            application={application}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClubApplicationStatus;
