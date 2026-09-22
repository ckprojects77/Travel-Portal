import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, CalendarDays, Users, Search } from "lucide-react";

export default function SearchBar() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState(2);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set("q", destination);
    if (date) params.set("date", date);
    params.set("travelers", travelers);
    navigate(`/destinations?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="glass flex w-full max-w-3xl flex-col gap-3 rounded-3xl p-3 shadow-2xl sm:flex-row sm:items-center sm:gap-0 sm:p-2"
    >
      <label className="flex flex-1 items-center gap-3 rounded-2xl px-4 py-3 sm:border-r sm:border-ink-900/10">
        <MapPin className="h-4.5 w-4.5 flex-shrink-0 text-teal-600" />
        <input
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          type="text"
          placeholder="Where to?"
          className="w-full bg-transparent text-sm font-medium text-ink-900 outline-none placeholder:text-ink-900/40"
        />
      </label>

      <label className="flex flex-1 items-center gap-3 rounded-2xl px-4 py-3 sm:border-r sm:border-ink-900/10">
        <CalendarDays className="h-4.5 w-4.5 flex-shrink-0 text-teal-600" />
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
          className="w-full bg-transparent text-sm font-medium text-ink-900 outline-none"
        />
      </label>

      <label className="flex flex-1 items-center gap-3 rounded-2xl px-4 py-3">
        <Users className="h-4.5 w-4.5 flex-shrink-0 text-teal-600" />
        <input
          value={travelers}
          onChange={(e) => setTravelers(e.target.value)}
          type="number"
          min={1}
          max={20}
          className="w-full bg-transparent text-sm font-medium text-ink-900 outline-none"
        />
      </label>

      <button type="submit" className="btn-primary !rounded-2xl sm:ml-2">
        <Search className="h-4 w-4" />
        <span className="sm:hidden">Search</span>
      </button>
    </form>
  );
}
