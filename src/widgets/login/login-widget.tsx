import LoginHeader from '@/entities/login/ui/login-header';
import LoginButton from '@/features/login/login-button';

function LoginWidget() {
  return (
    <div className="flex h-full w-full flex-col justify-between">
      <LoginHeader />
      <LoginButton />
    </div>
  );
}

export default LoginWidget;
