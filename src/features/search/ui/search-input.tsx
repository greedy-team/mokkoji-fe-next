import Image from 'next/image';
import SaveClientInput from './save-client-input';

function SearchInput() {
  return (
    <div className="mt-10 flex w-[85%] justify-center lg:w-full">
      <div className="w-full lg:w-[43%]">
        <h1 className="mb-8 ml-2 text-3xl font-bold lg:ml-0">동아리 검색</h1>
        <form
          action="/search"
          method="GET"
          className="relative mx-auto w-[95%] lg:w-[80%]"
        >
          <SaveClientInput />
          <button
            type="submit"
            className="absolute top-1/2 right-2 -translate-y-1/2 pb-2"
          >
            <Image
              src="/header/search.svg"
              alt="검색"
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchInput;
