import Image from 'next/image';
import SaveClientInput from './save-client-input';

function SearchInput() {
  return (
    <div className="mt-10 flex w-full justify-center">
      <div className="w-full">
        <h1 className="mb-8 text-3xl font-bold">동아리 검색</h1>
        <form action="/search" method="GET" className="relative w-full">
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
