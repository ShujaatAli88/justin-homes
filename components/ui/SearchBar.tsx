"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

export function SearchBar({ className }: { className?: string }) {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [beds, setBeds] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (beds) params.set("minBeds", beds);
    router.push(`/home-search/listings?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-3 bg-white p-4 shadow-xl sm:flex-row sm:items-end ${className ?? ""}`}
    >
      <div className="flex-1">
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">
          Location
        </label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City or ZIP"
          className="w-full border border-gray-300 px-3 py-2 text-sm text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-kw-red"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">
          Min Price
        </label>
        <input
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="No Min"
          inputMode="numeric"
          className="w-full border border-gray-300 px-3 py-2 text-sm text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-kw-red sm:w-28"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">
          Max Price
        </label>
        <input
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="No Max"
          inputMode="numeric"
          className="w-full border border-gray-300 px-3 py-2 text-sm text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-kw-red sm:w-28"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">
          Beds
        </label>
        <select
          value={beds}
          onChange={(e) => setBeds(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 text-sm text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-kw-red sm:w-24"
        >
          <option value="">Any</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
        </select>
      </div>
      <Button type="submit" size="md">
        Search Homes
      </Button>
    </form>
  );
}
