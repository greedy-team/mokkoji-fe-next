function Footer() {
  return (
    <footer className="flex h-[74px] w-full items-center justify-center gap-4 text-[10px] text-[#545454] lg:gap-10 lg:text-sm">
      <p className="cursor-default">
        COPYRIGHT @ 2025 모꼬지. ALL RIGHT RESERVED.
      </p>
      <a
        href="https://docs.google.com/forms/d/1u6AGdUKGkL6pmVTZ7I8YteotetlHK6DBsoC4jJ6Yv9I/edit"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-500 underline"
      >
        버그 제보
      </a>
    </footer>
  );
}

export default Footer;
