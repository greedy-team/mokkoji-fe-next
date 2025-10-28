import Image from 'next/image';

function Search() {
  return (
    <div className="mt-10 flex w-full flex-col items-center">
      <header className="mb-10 flex items-center gap-2">
        <Image
          src="/support/ghost.gif"
          alt="고객센터"
          width={49}
          height={49}
          className="cursor-pointer"
        />
        <h1 className="text-[36px] font-bold">무엇을 도와드릴까요?</h1>
      </header>
    </div>
  );
}

export default Search;
