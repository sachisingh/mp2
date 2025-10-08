interface Props {
  sortKey: 'name' | 'base_experience';
  setSortKey: (v: 'name' | 'base_experience') => void;
  dir: 'asc' | 'desc';
  setDir: (v: 'asc' | 'desc') => void;
}

export default function SortControls({ sortKey, setSortKey, dir, setDir }: Props) {
  return (
    <div className="row">
      {/* Dropdown to choose sort field */}
      <select
        className="select"
        value={sortKey}
        onChange={(e) => setSortKey(e.target.value as 'name' | 'base_experience')}
      >
        <option value="name">Name</option>
        <option value="base_experience">Base Experience</option>
      </select>

      {/* Button to toggle direction */}
      <button
        className="button brand"
        onClick={() => setDir(dir === 'asc' ? 'desc' : 'asc')}
      >
        {dir === 'asc' ? 'Asc' : 'Desc'}
      </button>
    </div>
  );
}