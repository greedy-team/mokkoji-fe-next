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
          className="h-10 w-10 cursor-pointer lg:h-[49px] lg:w-[49px]"
        />
        <h1 className="text-xl font-bold lg:text-4xl">무엇을 도와드릴까요?</h1>
      </header>
    </div>
  );
}

export default Search;
