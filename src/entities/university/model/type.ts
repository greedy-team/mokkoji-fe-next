export interface University {
  id: number;
  name: string;
  code: string;
  logo: string;
}

export interface UniversitiesResponse {
  universities: University[];
}
