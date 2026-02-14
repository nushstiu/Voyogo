interface FilterButtonsProps {
  categories: string[];
  active: string;
  onFilter: (category: string) => void;
}

export default function FilterButtons({ categories, active, onFilter }: FilterButtonsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onFilter(cat)}
          className={`px-6 py-2 rounded font-medium transition-colors ${
            active === cat
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-black hover:bg-gray-300'
          }`}
        >
          {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
        </button>
      ))}
    </div>
  );
}