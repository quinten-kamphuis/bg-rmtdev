type Props = {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
};

export default function SearchForm({ searchTerm, setSearchTerm }: Props) {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert("Search form submitted!");
        setSearchTerm("");
      }}
      action="#"
      className="search"
    >
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        onChange={handleOnChange}
        value={searchTerm}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
