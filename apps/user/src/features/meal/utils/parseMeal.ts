import {
  MEAL_TYPES,
  type Dish,
  type MealEachProps,
  type MealRow,
  type MealType,
} from "../model/type";

const isMealType = (name: string): name is MealType =>
  MEAL_TYPES.some((type) => type === name);

const ALLERGIES: Record<string, string> = {
  "1": "난류",
  "2": "우유",
  "3": "메밀",
  "4": "땅콩",
  "5": "대두",
  "6": "밀",
  "7": "고등어",
  "8": "게",
  "9": "새우",
  "10": "돼지고기",
  "11": "복숭아",
  "12": "토마토",
  "13": "아황산류",
  "14": "호두",
  "15": "닭고기",
  "16": "쇠고기",
  "17": "오징어",
  "18": "조개류",
  "19": "잣",
};

const ALLERGY_PATTERN = /\(([\d.]+)\)/;

const parseDish = (dish: string): Dish => {
  const numbers = dish.match(ALLERGY_PATTERN)?.[1].split(".") ?? [];

  return {
    name: dish.replace(ALLERGY_PATTERN, "").trim(),
    allergies: numbers.flatMap((number) =>
      ALLERGIES[number] ? [ALLERGIES[number]] : [],
    ),
  };
};

const parseDishes = (dishes: string) =>
  dishes
    .split("<br/>")
    .map(parseDish)
    .filter(({ name }) => name);

export const toMeals = (rows: MealRow[]): MealEachProps[] =>
  rows.flatMap(({ MMEAL_SC_NM, DDISH_NM, CAL_INFO }) =>
    isMealType(MMEAL_SC_NM)
      ? [
          {
            title: MMEAL_SC_NM,
            meal: parseDishes(DDISH_NM),
            calorie: CAL_INFO,
          },
        ]
      : [],
  );

export const toDishesByDate = (
  rows: MealRow[],
  title: MealType,
): Record<string, Dish[]> =>
  Object.fromEntries(
    rows
      .filter(({ MMEAL_SC_NM }) => MMEAL_SC_NM === title)
      .map(({ MLSV_YMD, DDISH_NM }) => [MLSV_YMD, parseDishes(DDISH_NM)]),
  );
