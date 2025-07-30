function Footer() {
  return (
    <footer className="flex h-[74px] w-full items-center justify-center gap-4 text-[10px] text-[#545454] lg:gap-10 lg:text-sm">
      <p className="cursor-default">
        COPYRIGHT @ 2025 모꼬지. ALL RIGHT RESERVERD.
      </p>
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSdygIgS8J90t8Y1kYnHMWuq9FIXuwr4jVRmCjGnP9q_RIduzQ/viewform"
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        버그 제보
      </a>
    </footer>
  );
}

export default Footer;
