type Props = {
  /** 점 지름(px) */
  size?: number;
  /** 점 사이 간격(px) */
  gap?: number;
  /** 점 색상 */
  color?: string;
  /** 한 주기 시간(sec) */
  speed?: number;
  /** 추가 className */
  className?: string;
  /** 추가 wrapper className */
  wrapperClassName?: string;
};

export default function DotsPulseLoader({
  size = 10,
  gap = 8,
  color = '#00E804',
  speed = 0.9,
  className,
  wrapperClassName,
}: Props) {
  const style = {
    ['--dot-size' as any]: `${size}px`,
    ['--dot-gap' as any]: `${gap}px`,
    ['--dot-color' as any]: color,
    ['--dot-speed' as any]: `${speed}s`,
  } as React.CSSProperties;

  return (
    <div className={wrapperClassName}>
      <div
        className={`dots-loader ${className ?? ''}`}
        role="status"
        aria-label="로딩 중"
        style={style}
      >
        <span />
        <span />
        <span />

        <style>{`
        .dots-loader {
          display: inline-flex;
          align-items: center;
          gap: var(--dot-gap);
        }
        .dots-loader > span {
          width: var(--dot-size);
          height: var(--dot-size);
          border-radius: 9999px;
          background: var(--dot-color);
          opacity: 0.6;
          transform: scale(0.6);
          animation: dotPulse var(--dot-speed) ease-in-out infinite;
        }
        .dots-loader > span:nth-child(2) { animation-delay: calc(var(--dot-speed) / 3); }
        .dots-loader > span:nth-child(3) { animation-delay: calc(2 * var(--dot-speed) / 3); }

        @keyframes dotPulse {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
          40%           { transform: scale(1.0); opacity: 1;   }
        }

        /* 접근성: 모션 최소화 환경에서는 정지 */
        @media (prefers-reduced-motion: reduce) {
          .dots-loader > span { animation: none; }
        }
      `}</style>
      </div>
      <span className="mt-2 text-sm text-[#595959]">
        폼을 제출하고 있어요...
      </span>
    </div>
  );
}
