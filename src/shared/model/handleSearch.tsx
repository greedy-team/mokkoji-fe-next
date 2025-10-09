const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
  const form = e.currentTarget;
  const input = form.querySelector<HTMLInputElement>('input[name="q"]');
  const value = input?.value.trim();
  if (!value) {
    e.preventDefault();
    input?.focus();
  }
};
export default handleSearch;
