import ClubRegisterHeader from '@/entities/club-register/ui/club-register-header';
import ClubRegisterForm from '@/features/club-register/ui/club-register-form';

function ClubRegisterWidget() {
  return (
    <div className="w-[30%]">
      <ClubRegisterHeader />
      <ClubRegisterForm />
    </div>
  );
}

export default ClubRegisterWidget;
