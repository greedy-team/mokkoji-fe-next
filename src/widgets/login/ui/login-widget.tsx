import LoginHeader from '@/entities/login/ui/login-header';
import LoginButton from '@/features/login/ui/login-button';

interface LoginWidgetProps {
  onClose: () => void;
}

function LoginWidget({ onClose }: LoginWidgetProps) {
  return (
    <>
      <LoginHeader />
      <LoginButton onClose={onClose} />
    </>
  );
}

export default LoginWidget;
