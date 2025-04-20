'use client';
import { FunnelIcon } from '@heroicons/react/24/outline';

export default function Search({ search, setSearch, onFilterClick }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-300 bg-white p-2 mt-10 shadow-sm">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search projects..."
        className="flex-1 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none"
      />
      <button
        onClick={onFilterClick}
        className="ml-4 flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
      >
        <FunnelIcon className="h-5 w-5 text-gray-500" />
        Filter
      </button>
    </div>
  );
}
