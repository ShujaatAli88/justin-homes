/**
 * IDX / MLS provider abstraction.
 *
 * TODO(client): This currently serves typed mock data from /data/listings.ts.
 * Swap `mockIdxProvider` below for a real feed once the client has IDX/MLS
 * access, e.g. via Keller Williams KW Command, IDX Broker, Realtyna, or
 * Showcase IDX. The `IdxProvider` interface is the integration seam — a real
 * provider only needs to implement these same methods so no page/component
 * code has to change.
 */
import { listings, type Listing, type PropertyType, type ListingStatus } from "@/data/listings";

export type { Listing, PropertyType, ListingStatus };

export interface ListingFilters {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  minBeds?: number;
  minBaths?: number;
  propertyType?: PropertyType | "any";
  status?: ListingStatus | "any";
}

export interface IdxProvider {
  searchListings(filters: ListingFilters): Promise<Listing[]>;
  getListingBySlug(slug: string): Promise<Listing | null>;
  getFeaturedListings(limit?: number): Promise<Listing[]>;
  getListingsByNeighborhood(neighborhoodSlug: string): Promise<Listing[]>;
}

class MockIdxProvider implements IdxProvider {
  async searchListings(filters: ListingFilters): Promise<Listing[]> {
    return listings.filter((listing) => {
      if (
        filters.location &&
        !`${listing.address.city} ${listing.address.state} ${listing.address.zip}`
          .toLowerCase()
          .includes(filters.location.toLowerCase())
      ) {
        return false;
      }
      if (filters.minPrice && listing.price < filters.minPrice) return false;
      if (filters.maxPrice && listing.price > filters.maxPrice) return false;
      if (filters.minBeds && listing.beds < filters.minBeds) return false;
      if (filters.minBaths && listing.baths < filters.minBaths) return false;
      if (
        filters.propertyType &&
        filters.propertyType !== "any" &&
        listing.propertyType !== filters.propertyType
      )
        return false;
      if (filters.status && filters.status !== "any" && listing.status !== filters.status)
        return false;
      return true;
    });
  }

  async getListingBySlug(slug: string): Promise<Listing | null> {
    return listings.find((l) => l.slug === slug) ?? null;
  }

  async getFeaturedListings(limit = 6): Promise<Listing[]> {
    return listings.filter((l) => l.featured).slice(0, limit);
  }

  async getListingsByNeighborhood(neighborhoodSlug: string): Promise<Listing[]> {
    return listings.filter((l) => l.neighborhoodSlug === neighborhoodSlug);
  }
}

export const idxProvider: IdxProvider = new MockIdxProvider();
