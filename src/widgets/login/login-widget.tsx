import LoginHeader from '@/entities/login/ui/login-header';
import LoginButton from '@/features/login/ui/login-button';

function LoginWidget() {
  return (
    <div className="box-border flex h-auto w-auto flex-col justify-between rounded-4xl bg-white p-10">
      <LoginHeader />
      <LoginButton />
    </div>
  );
}

export default LoginWidget;
