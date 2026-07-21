/**
 * Starter list of real Brown County, TX communities near Brownwood.
 * TODO(client): confirm which of these Justin actually serves and add/remove
 * as needed — this list is a placeholder scaffold, not a confirmed service area.
 */
export interface Neighborhood {
  slug: string;
  name: string;
  blurb: string;
  image: string;
  localInfo: string;
}

export const neighborhoods: Neighborhood[] = [
  {
    slug: "brownwood",
    name: "Brownwood",
    blurb: "{{NEIGHBORHOOD_BLURB_BROWNWOOD}}",
    image: "{{NEIGHBORHOOD_IMAGE_BROWNWOOD}}",
    localInfo: "{{LOCAL_INFO_BROWNWOOD}}",
  },
  {
    slug: "early",
    name: "Early",
    blurb: "{{NEIGHBORHOOD_BLURB_EARLY}}",
    image: "{{NEIGHBORHOOD_IMAGE_EARLY}}",
    localInfo: "{{LOCAL_INFO_EARLY}}",
  },
  {
    slug: "bangs",
    name: "Bangs",
    blurb: "{{NEIGHBORHOOD_BLURB_BANGS}}",
    image: "{{NEIGHBORHOOD_IMAGE_BANGS}}",
    localInfo: "{{LOCAL_INFO_BANGS}}",
  },
  {
    slug: "lake-brownwood",
    name: "Lake Brownwood",
    blurb: "{{NEIGHBORHOOD_BLURB_LAKE_BROWNWOOD}}",
    image: "{{NEIGHBORHOOD_IMAGE_LAKE_BROWNWOOD}}",
    localInfo: "{{LOCAL_INFO_LAKE_BROWNWOOD}}",
  },
  {
    slug: "blanket",
    name: "Blanket",
    blurb: "{{NEIGHBORHOOD_BLURB_BLANKET}}",
    image: "{{NEIGHBORHOOD_IMAGE_BLANKET}}",
    localInfo: "{{LOCAL_INFO_BLANKET}}",
  },
  {
    slug: "comanche",
    name: "Comanche",
    blurb: "{{NEIGHBORHOOD_BLURB_COMANCHE}}",
    image: "{{NEIGHBORHOOD_IMAGE_COMANCHE}}",
    localInfo: "{{LOCAL_INFO_COMANCHE}}",
  },
];
