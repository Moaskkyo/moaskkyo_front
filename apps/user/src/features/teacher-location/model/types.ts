export interface Place {
  placeId: number;
  placeName: string;
  floor: number;
}

export interface TeacherLocationType {
  teacherId: number;
  teacherName: string;
  place: Place | null;
}
