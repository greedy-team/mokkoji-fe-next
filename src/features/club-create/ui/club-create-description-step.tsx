'use client';

import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Underline as UnderlineIcon,
  Italic,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/shared/ui/button';

const TEXT_STYLE_OPTIONS = [
  { label: '본문', value: 'paragraph' },
  { label: '제목 1', value: 'heading1' },
  { label: '제목 2', value: 'heading2' },
  { label: '제목 3', value: 'heading3' },
];

const ALIGN_OPTIONS = [
  { icon: AlignLeft, value: 'left' },
  { icon: AlignCenter, value: 'center' },
  { icon: AlignRight, value: 'right' },
];

interface Props {
  onSubmit: (description: string) => void;
}

function ClubCreateDescriptionStep({ onSubmit }: Props) {
  const [styleOpen, setStyleOpen] = useState(false);
  const [alignOpen, setAlignOpen] = useState(false);
  const [, rerender] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: '',
    onTransaction: () => rerender((v) => v + 1),
    editorProps: {
      attributes: {
        class: 'tiptap outline-none min-h-[400px] px-4 py-4 text-sm',
      },
    },
  });

  const isEmpty = !editor || editor.isEmpty;

  const getCurrentStyle = () => {
    if (!editor) return '본문';
    if (editor.isActive('heading', { level: 1 })) return '제목 1';
    if (editor.isActive('heading', { level: 2 })) return '제목 2';
    if (editor.isActive('heading', { level: 3 })) return '제목 3';
    return '본문';
  };

  const getCurrentAlign = () => {
    if (!editor) return AlignLeft;
    if (editor.isActive({ textAlign: 'center' })) return AlignCenter;
    if (editor.isActive({ textAlign: 'right' })) return AlignRight;
    return AlignLeft;
  };

  const setStyle = (value: string) => {
    if (!editor) return;
    if (value === 'paragraph') {
      editor.chain().focus().setParagraph().run();
    } else if (value === 'heading1') {
      editor.chain().focus().toggleHeading({ level: 1 }).run();
    } else if (value === 'heading2') {
      editor.chain().focus().toggleHeading({ level: 2 }).run();
    } else if (value === 'heading3') {
      editor.chain().focus().toggleHeading({ level: 3 }).run();
    }
    setStyleOpen(false);
  };

  const AlignIcon = getCurrentAlign();

  return (
    <div className="flex flex-col gap-6 py-8">
      <h2 className="text-base font-bold">동아리 한줄 소개</h2>

      <div className="overflow-hidden rounded-lg">
        <div className="flex items-center gap-1 border-b border-[#E5E5E5] px-3 py-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setStyleOpen((v) => !v);
                setAlignOpen(false);
              }}
              className="flex items-center gap-0.5 rounded px-2 py-1 text-sm hover:bg-[#F4F4F4]"
            >
              {getCurrentStyle()}
              <ChevronDown size={13} />
            </button>
            {styleOpen && (
              <div className="absolute top-full left-0 z-10 mt-1 w-24 rounded-md border border-[#E5E5E5] bg-white shadow-sm">
                {TEXT_STYLE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setStyle(opt.value)}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-[#F4F4F4]"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mx-1 h-4 w-px bg-[#E5E5E5]" />

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setAlignOpen((v) => !v);
                setStyleOpen(false);
              }}
              className="rounded p-1.5 hover:bg-[#F4F4F4]"
            >
              <AlignIcon size={16} />
            </button>
            {alignOpen && (
              <div className="absolute top-full left-0 z-10 mt-1 flex rounded-md border border-[#E5E5E5] bg-white shadow-sm">
                {ALIGN_OPTIONS.map(({ icon: Icon, value }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      editor?.chain().focus().setTextAlign(value).run();
                      setAlignOpen(false);
                    }}
                    className={`p-2 hover:bg-[#F4F4F4] ${editor?.isActive({ textAlign: value }) ? 'bg-[#F4F4F4]' : ''}`}
                  >
                    <Icon size={16} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={`rounded p-1.5 hover:bg-[#F4F4F4] ${editor?.isActive('bold') ? 'bg-[#E8E8E8]' : ''}`}
          >
            <Bold size={16} />
          </button>

          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
            className={`rounded p-1.5 hover:bg-[#F4F4F4] ${editor?.isActive('underline') ? 'bg-[#E8E8E8]' : ''}`}
          >
            <UnderlineIcon size={16} />
          </button>

          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={`rounded p-1.5 hover:bg-[#F4F4F4] ${editor?.isActive('italic') ? 'bg-[#E8E8E8]' : ''}`}
          >
            <Italic size={16} />
          </button>
        </div>

        <div className="relative min-h-[400px]">
          {isEmpty && (
            <p className="pointer-events-none absolute top-4 left-4 text-sm text-[#C0C0C0] select-none">
              동아리에 대한 내용을 구체적으로 적어주세요.
            </p>
          )}
          <EditorContent editor={editor} />
        </div>
      </div>

      <Button
        type="button"
        variant="submit-default"
        disabled={isEmpty}
        onClick={() => editor && onSubmit(editor.getHTML())}
      >
        제출하기
      </Button>
    </div>
  );
}

export default ClubCreateDescriptionStep;
