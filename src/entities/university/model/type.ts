export interface University {
  id: number;
  name: string;
  universityCode: string;
}

export interface UniversitiesResponse {
  universities: University[];
}
