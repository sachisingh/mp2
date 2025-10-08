    interface Props {
  allTypes: string[];
  active: string[];
  toggle: (t: string) => void;
}

export default function TypeFilters({ allTypes, active, toggle }: Props) {
  return (
    <div className="chips">
      {allTypes.map((t) => (
        <div
          key={t}
          className={`chip ${active.includes(t) ? 'active' : ''}`}
          onClick={() => toggle(t)}
        >
          {t}
        </div>
      ))}
    </div>
  );
}