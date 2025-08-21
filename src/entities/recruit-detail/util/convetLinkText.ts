const convertLinkText = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(
    urlRegex,

    '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-[#20E86C] underline">$1</a>',

};

export default convertLinkText;
