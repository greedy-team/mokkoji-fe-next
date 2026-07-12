import {
  ApplicationCardItem,
  ClubApplicationType,
  MyClubMasterApplicationType,
} from '../model/type';

export function toCreateCardItem(
  application: ClubApplicationType,
): ApplicationCardItem {
  return {
    id: application.clubApplicationId,
    clubName: application.clubName,
    universityName: application.universityName,
    status: application.status,
    rejectReason: application.rejectReason,
    createdAt: application.createdAt,
  };
}

export function toMasterCardItem(
  application: MyClubMasterApplicationType,
): ApplicationCardItem {
  return {
    id: application.id,
    clubName: application.clubName,
    universityName: application.universityName,
    status: application.status,
    rejectReason: application.rejectReason,
    logo: null,
    createdAt: application.createdAt,
  };
}

export function sortByLatest(
  items: ApplicationCardItem[],
): ApplicationCardItem[] {
  return [...items].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}
