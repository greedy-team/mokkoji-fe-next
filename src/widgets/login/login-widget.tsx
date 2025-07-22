import LoginHeader from '@/entities/login/ui/login-header';
import LoginButton from '@/features/login/login-button';

function LoginWidget() {
  return (
    <div className="box-border flex h-[40%] w-[20%] flex-col justify-between rounded-4xl bg-white p-10">
      <LoginHeader />
      <LoginButton />
    </div>
  );
}

export default LoginWidget;
