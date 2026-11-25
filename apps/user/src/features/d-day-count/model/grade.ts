export const getGrade = (): number | null => {
  const grade = Number(localStorage.getItem("grade"));
  return Number.isInteger(grade) && grade >= 1 && grade <= 3 ? grade : null;
};
