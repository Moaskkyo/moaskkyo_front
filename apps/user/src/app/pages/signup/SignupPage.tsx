import { SignupForm } from "@/features/signup";
import AuthLayout from "@/widgets/AuthLayout";

export default function SignupPage() {
  return (
    <AuthLayout description="몇 가지만 알려 주면 우리 학교 정보를 바로 볼 수 있어요">
      <SignupForm />
    </AuthLayout>
  );
}
