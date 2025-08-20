import Image from 'next/image';
import convertLinkText from '../util/convetLinkText';

interface RecruitDetailViewProps {
  title: string;
  content: string;
  recruitForm: string;
  imageUrls: string[];
}

function RecruitDetailView({
  title,
  content,
  recruitForm,
  imageUrls,
}: RecruitDetailViewProps) {
  console.log(imageUrls);
  return (
    <div className="flex flex-col gap-4">
      <div className="mb-5 text-sm font-bold">
        동아리 지원하러 가기: <br />
        <a
          href={recruitForm}
          className="text-sm text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {recruitForm}
        </a>
      </div>
      <h4 className="text-md mb-5 font-bold">[{title}]</h4>
      <div className="flex gap-2">
        {imageUrls.map((imgsrc) => (
          <div
            key={imgsrc}
            className="relative aspect-square w-[30%] overflow-hidden"
          >
            <Image
              src={imgsrc}
              alt="동아리 이미지"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
        ))}
      </div>
      <p
        dangerouslySetInnerHTML={{ __html: convertLinkText(content) }}
        className="mb-3 max-w-4xl text-sm leading-[1.4] whitespace-pre-wrap text-black"
      />
    </div>
  );
}

export default RecruitDetailView;
