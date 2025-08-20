'use client';

import SafeForm from '@/shared/ui/safe-form';
import Input from '@/shared/ui/input';
import Textarea from '@/shared/ui/textarea';
import { Button } from '@/shared/ui/button';
import SelectDate from '@/features/post-recruitment/ui/select-date';
import reducer from '@/features/post-recruitment/model/reducer/recruitmentFormReducer';
import { useReducer, useState } from 'react';
import {
  RecruitmentFormData,
  StateProp,
} from '@/features/post-recruitment/model/type';
import cn from '@/shared/lib/utils';
import { toast } from 'react-toastify';
import ky from 'ky';
import patchRecruitmentForm from '../api/patchRecruitment';

interface RecruitDetailEditProps {
  title: string;
  content: string;
  recruitForm: string;
  images: string[];
  recruitStart: string;
  recruitEnd: string;
  clubId: number;
  setIsEditing: (isEditing: boolean) => void;
}

function ClubDetailRecruitmentEdit({
  title,
  content,
  recruitForm,
  images,
  recruitStart,
  recruitEnd,
  clubId,
  setIsEditing,
}: RecruitDetailEditProps) {
  const initialState: StateProp = {
    formData: {
      title,
      images,
      content,
      recruitStart,
      recruitEnd,
      recruitForm,
    },
    errors: {},
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const { formData, errors } = state;

  const handleChange = (name: keyof RecruitmentFormData, value: string) => {
    dispatch({ type: 'UPDATE_FIELD', name, value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;

    const newFiles = Array.from(files);
    setImageFiles((prev) => [...prev, ...newFiles]);

    const newFileNames = newFiles.map(
      (file) =>
        `/club${clubId}/recruitment${crypto.randomUUID()}.${file.name.split('.').pop()}`,
    );

    dispatch({
      type: 'UPDATE_FIELD',
      name: 'images',
      value: [...formData.images, ...newFileNames],
    });
  };

  const handleImageRemove = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      title: formData.title,
      content: formData.content,
      recruitStart: formData.recruitStart,
      recruitEnd: formData.recruitEnd,
      recruitForm: formData.recruitForm,
      images: formData.images,
    };

    const res = await patchRecruitmentForm(data, clubId!);

    if (!res.ok) {
      toast.error(res.message);
      return;
    }

    await Promise.all([
      ...(res.data?.deleteImageUrls?.map((url: string) => ky.delete(url)) ??
        []),
      ...(res.data?.uploadImageUrls?.map((url: string, i: number) =>
        ky.put(url, {
          body: imageFiles[i],
          headers: { 'Content-Type': imageFiles[i].type },
        }),
      ) ?? []),
    ]);
    toast.success('모집 공고가 성공적으로 업로드되었습니다!', {
      toastId: 'unique-toast',
    });
    setIsEditing(false);
  };

  return (
    <div>
      <SafeForm
        onSubmit={handleSubmit}
        title="수정하기"
        formClassName="flex flex-col gap-2 my-1"
      >
        <label htmlFor="title" className="indent-1 text-sm font-bold">
          제목
        </label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
        />
        <label htmlFor="content" className="indent-1 text-sm font-bold">
          모집 공고
        </label>
        <Textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={(e) => handleChange('content', e.target.value)}
          maxLength={5000}
        />
        <label htmlFor="recruitForm" className="indent-1 text-sm font-bold">
          모집폼 URL
        </label>
        <Input
          id="recruitForm"
          name="recruitForm"
          value={formData.recruitForm}
          onChange={(e) => handleChange('recruitForm', e.target.value)}
        />
        <label htmlFor="recruitPeriod" className="mt-4 flex gap-2 font-bold">
          모집 기간
        </label>
        <SelectDate
          startDate={formData.recruitStart}
          endDate={formData.recruitEnd}
          onChange={handleChange}
        />
        <label htmlFor="image" className="mt-4 font-bold">
          이미지 파일 업로드
        </label>
        <div
          className={cn(
            'mt-2 rounded-md border-2 px-4 py-3',
            imageFiles.length > 0 && 'border-[#00D451]',
          )}
        >
          <input
            name="image"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="flex cursor-pointer items-center justify-center text-sm"
          />

          {imageFiles.length > 0 && (
            <ul className="mt-2 list-inside list-disc text-sm text-gray-700">
              {imageFiles.map((file, index) => (
                <li
                  key={file.name}
                  className="flex items-center justify-between"
                >
                  <span>{file.name}</span>
                  <button
                    type="button"
                    onClick={() => handleImageRemove(index)}
                    className="ml-4 cursor-pointer text-red-500 hover:underline"
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </SafeForm>
      <Button
        className="w-full cursor-pointer border-2 bg-white text-center text-black hover:bg-[#bdbdbd]"
        onClick={() => setIsEditing(false)}
      >
        취소
      </Button>
    </div>
  );
}

export default ClubDetailRecruitmentEdit;
