import CustomCalendar from '@/features/favorite/ui/custom-calendar';

function FavoriteDateSection() {
  return (
    <div>
      <h1 className="mb-8 text-sm font-bold text-[#00E457]">모집 일정</h1>
      <div className="flex flex-row items-center justify-between">
        <CustomCalendar />
        <div className="flex flex-col">
          <div className="rounded-xl bg-[#F8F8F8] p-5">
            <p>모집 일정</p>
          </div>
          <div className="rounded-xl bg-[#F8F8F8] p-5">
            <p>fsafasfaf</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FavoriteDateSection;
