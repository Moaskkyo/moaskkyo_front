import { LoginForm } from "@/features/login";
import AuthLayout from "@/widgets/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout description="급식부터 시간표, 하교까지 남은 시간까지 학교 생활을 한곳에서 확인해요">
      <LoginForm />
    </AuthLayout>
  );
}
