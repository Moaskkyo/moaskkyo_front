import styled from "@emotion/styled";
import type { MealEachProps } from "../model/type";

export default function MealEach({ title, meal, calorie }: MealEachProps) {
  return (
    <Wrapper>
      <Header>
        <Title>{title}</Title>
        {calorie && <Calorie>{calorie}</Calorie>}
      </Header>
      <Meals>
        {meal.map(({ name, allergies }) => (
          <Meal key={name}>
            {name}
            {allergies.length > 0 && (
              <Allergies>{allergies.join(", ")}</Allergies>
            )}
          </Meal>
        ))}
      </Meals>
    </Wrapper>
  );
}

const Meal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Allergies = styled.div`
  font-size: 12px;
  color: #94a3b8;
`;

const Wrapper = styled.div`
  padding: 20px;
  background-color: white;
  width: 362px;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Calorie = styled.div`
  font-size: 14px;
  color: #64748b;
`;

const Meals = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
