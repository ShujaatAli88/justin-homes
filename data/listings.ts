/**
 * Real, currently active Brownwood/Early, TX listings, client-supplied.
 * Photos and copy sourced directly from the live MLS feed; swap for a
 * connected IDX/MLS feed via /lib/idx.ts once that access is set up (see
 * README) so this list stays in sync automatically instead of being
 * hand-maintained.
 */
export type PropertyType = "single-family" | "manufactured" | "land" | "acreage" | "ranch" | "townhome";
export type ListingStatus = "active" | "pending" | "sold";

export interface Listing {
  id: string;
  slug: string;
  mlsId: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  price: number;
  originalPrice?: number;
  estimatedPayment?: number;
  beds: number;
  baths: number;
  sqft: number;
  lotSizeAcres: number;
  yearBuilt?: number;
  daysOnSite?: number;
  hvac?: string;
  parking?: string;
  propertyType: PropertyType;
  status: ListingStatus;
  description: string;
  images: string[];
  neighborhoodSlug: string;
  featured: boolean;
  listedDate: string;
}

export const listings: Listing[] = [
  {
    id: "1",
    slug: "1611-avenue-k-brownwood",
    mlsId: "MLS #21227860",
    address: { street: "1611 Avenue K", city: "Brownwood", state: "TX", zip: "76801" },
    price: 140000,
    estimatedPayment: 884,
    beds: 2,
    baths: 1,
    sqft: 952,
    lotSizeAcres: 0.14,
    propertyType: "single-family",
    status: "active",
    description:
      "Charming Craftsman-style cottage packed with updates and efficiency! This 2-bedroom, 1-bath home offers 952 square feet of comfortable living with a functional layout and inviting character throughout. The updated kitchen features granite countertops, stainless steel appliances, and a clean, modern feel that flows easily into the main living space. Inside, you’ll find a beautiful decorative white brick mantel that adds warmth and charm, while the bathroom showcases a nicely tiled shower surround for a fresh, updated look. Natural light fills the home, creating a bright and welcoming atmosphere.\n\nStep outside to enjoy the spacious backyard. Installed solar panels offer added energy efficiency and long-term savings. With its classic curb appeal and thoughtful updates, this home is perfect for first-time buyers, downsizers, or anyone looking for a move-in ready property with character. Don’t miss out on this centrally located home with a charming",
    images: ["/images/listings/listing-1.jpg"],
    neighborhoodSlug: "brownwood",
    featured: true,
    listedDate: "2026-06-20",
  },
  {
    id: "2",
    slug: "1700-austin-avenue-brownwood",
    mlsId: "MLS #21226237",
    address: { street: "1700 Austin Avenue", city: "Brownwood", state: "TX", zip: "76801" },
    price: 340000,
    estimatedPayment: 2026,
    beds: 4,
    baths: 3,
    sqft: 2975,
    lotSizeAcres: 0.32,
    yearBuilt: 1914,
    daysOnSite: 110,
    hvac: "Ceiling Fan(s), Central, Natural Gas, Central Air, Electric",
    parking: "2 Parking Spaces",
    propertyType: "single-family",
    status: "active",
    description:
      "A timeless Craftsman beauty situated on a prominent corner lot in the heart of Brownwood. From the moment you arrive, the phenomenal curb appeal and mature shade trees set the tone for this character-rich home, while the expansive, oversized front porch invites you to slow down and stay awhile. Inside, you’ll find a perfect blend of historic charm and everyday functionality. Gorgeous windows fill the home with natural light, highlighted by stunning stained glass accents that add warmth and personality throughout. Two spacious living areas, each lined with windows, create bright and inviting spaces for gathering or relaxing. Original hardwood floors, a grand wooden staircase, and built-in china cabinets in the dining room showcase the craftsmanship and detail that make this home truly special. The kitchen offers a classic, eye-catching touch with its checkered black and white tile flooring, while each of the three bedrooms feature their own private ensuite bathrooms- a rare and highly desirable layout. A downstairs bonus room provides flexibility and options for either a fourth bedroom or an ideal at-home office. The primary suite includes a unique tiled shower and a large soaking tub, creating a relaxing retreat at the end of the day. Adding even more versatility, this property includes a rare-for-Brownwood basement space- ideal for storage, hobbies, or additional living possibilities. Step outside to an established backyard designed for both entertaining and everyday enjoyment with a lawn irrigation system. With privacy fencing, plenty of room to play, and a separate safety-fenced cowboy pool area, this outdoor space is ready for summer memories. A detached two-car carport with additional storage completes the package. This is a one-of-a-kind Craftsman home full of character, charm, and thoughtful updates- all in a prime Brownwood location. Call today to schedule your private showing!",
    images: ["/images/listings/listing-2.jpg"],
    neighborhoodSlug: "brownwood",
    featured: true,
    listedDate: "2026-04-03",
  },
  {
    id: "3",
    slug: "4416-mimosa-drive-brownwood",
    mlsId: "MLS #21265079",
    address: { street: "4416 Mimosa Drive", city: "Brownwood", state: "TX", zip: "76801" },
    price: 215000,
    originalPrice: 229000,
    estimatedPayment: 1277,
    beds: 3,
    baths: 2,
    sqft: 1783,
    lotSizeAcres: 0.21,
    daysOnSite: 73,
    parking: "Yes",
    propertyType: "single-family",
    status: "active",
    description:
      "Welcome to 4416 Mimosa Drive in Brownwood, Texas — a well-maintained 3 bedroom, 2 bathroom home offering 1,783 square feet of comfortable living space in a convenient, established neighborhood. With inviting curb appeal, mature trees, and a beautifully cared-for yard, this property makes a wonderful first impression from the moment you arrive. Inside, you’ll find two spacious living areas that provide flexibility for entertaining, relaxing, a game room, formal dining, or even a home office setup. The home has been thoughtfully maintained, with major updates already completed including the HVAC system and roof, both replaced in 2023 for added peace of mind. Conveniently located with quick access to Hwy 377, this property offers an easy commute to Brownwood’s medical and industrial districts while still being just minutes from shopping, dining, and everyday conveniences around town. Whether you’re looking for your first home, more space, or a move-in ready investment, this home offers comfort, functionality, and a fantastic location all in one package.",
    images: ["/images/listings/listing-3.jpg"],
    neighborhoodSlug: "brownwood",
    featured: true,
    listedDate: "2026-05-10",
  },
  {
    id: "4",
    slug: "131-mitsy-lane-early",
    mlsId: "MLS #21313615",
    address: { street: "131 Mitsy Lane", city: "Early", state: "TX", zip: "76802" },
    price: 445000,
    estimatedPayment: 2219,
    beds: 4,
    baths: 3,
    sqft: 2247,
    lotSizeAcres: 1.46,
    yearBuilt: 2000,
    daysOnSite: 24,
    hvac: "Electric, Central Air, Fireplace(s), Central, Ceiling Fan(s)",
    parking: "2 Parking Spaces",
    propertyType: "single-family",
    status: "active",
    description:
      "Welcome home to this beautifully maintained property nestled on an expansive 1.4-acre triple lot in the highly sought-after Early ISD. Built in 2000 and offering 2,247 square feet, this immaculate 4-bedroom, 2.5-bathroom home combines timeless appeal with a peaceful charm of country-style living. From the moment you arrive, you'll appreciate the exceptional curb appeal, mature shade trees, and pride of ownership that is evident throughout. Inside, you'll find a spacious, well-cared-for floor plan designed for comfortable everyday living and effortless entertaining. Step outside to your own private retreat where a serene, tree-covered backyard and inviting patio create the perfect setting for morning coffee, evening gatherings, or simply enjoying the tranquility of nature. Green thumbs will love the established vegetable garden, while hobbyists and outdoor enthusiasts will appreciate the additional storage workshop, carports, and abundant space for equipment, boats, or recreational vehicles. For added peace of mind, the property also features a storm shelter, attached two-car garage, and plenty of room to spread out on this rare triple-lot property. If you've been searching for a home that offers space, functionality, and meticulous care in one of the area's most desirable school districts, 131 Mitsy Lane is a must-see.",
    images: ["/images/listings/listing-4.jpg"],
    neighborhoodSlug: "early",
    featured: true,
    listedDate: "2026-06-28",
  },
  {
    id: "5",
    slug: "213-wills-way-early",
    mlsId: "MLS #21229891",
    address: { street: "213 Wills Way", city: "Early", state: "TX", zip: "76802" },
    price: 215000,
    estimatedPayment: 1200,
    beds: 2,
    baths: 2,
    sqft: 1358,
    lotSizeAcres: 0.08,
    yearBuilt: 2003,
    daysOnSite: 105,
    hvac: "Central Air, Central, Ceiling Fan(s), Electric",
    parking: "1 Parking Space",
    propertyType: "single-family",
    status: "active",
    description:
      "Low-maintenance living in the desirable Ridgewood Gardens 55+ community in Early, Texas! This charming duplex at 213 Wills Way offers comfort, convenience, and thoughtful updates throughout. Step inside to find a beautifully refreshed interior featuring vaulted ceilings, granite countertops, durable vinyl plank flooring, and a functional layout designed for easy living. A beautiful kitchen is the heart of the home with peninsula barstool dining and plenty of room to entertain. In addition to the main living area, a versatile bonus room provides the perfect space for a hobby room, home office, or second living area—tailored to fit your lifestyle. Enjoy peace of mind with a roof replaced in 2024, along with the added benefit of an attached one-car garage for convenience and storage. Living in Ridgewood Gardens means truly carefree homeownership—HOA services include yard maintenance, sprinkler system care, water, sewer, trash, and pest control, allowing you to spend more time enjoying what matters most. Whether you’re downsizing or seeking a relaxed, community-focused lifestyle, this move-in ready home is a fantastic opportunity in a sought-after 55+ neighborhood. Call today to schedule a private showing!",
    images: ["/images/listings/listing-5.jpg"],
    neighborhoodSlug: "early",
    featured: true,
    listedDate: "2026-04-08",
  },
  {
    id: "6",
    slug: "204-sunnydale-drive-early",
    mlsId: "MLS #21241224",
    address: { street: "204 Sunnydale Drive", city: "Early", state: "TX", zip: "76802" },
    price: 315000,
    estimatedPayment: 1893,
    beds: 6,
    baths: 4,
    sqft: 2960,
    lotSizeAcres: 0.37,
    yearBuilt: 1962,
    daysOnSite: 96,
    hvac: "Ceiling Fan(s), Central, Natural Gas, Central Air, Wall Furnace",
    parking: "Yes",
    propertyType: "single-family",
    status: "active",
    description:
      "Located at 204 Sunnydale Drive in Early, Texas, this incredibly spacious home was designed to fit it all! Boasting 2,960 square feet, this rare find offers 6 bedrooms and 3.5 bathrooms, providing plenty of room for large families, guests, or flexible spaces like a home office, gym, or hobby rooms. From the moment you arrive, you’ll appreciate the timeless rock exterior, mature shade trees, and inviting curb appeal. Inside, enjoy the updated kitchen and oversized living room serving as the heart of the home—perfect for gathering, entertaining, or simply spreading out and enjoying the space. The layout offers exceptional versatility, with generous bedroom sizes and storage throughout. Step outside to find even more to love, including a backyard storage building for added convenience and an above-ground pool—just in time for those hot Texas summers. Topped with a durable metal roof and located in a great central spot within Early ISD, this property combines size, function, and location in one impressive package. If you’ve been searching for space to grow without sacrificing convenience, this is one you don’t want to miss!",
    images: ["/images/listings/listing-6.jpg"],
    neighborhoodSlug: "early",
    featured: true,
    listedDate: "2026-04-17",
  },
  {
    id: "7",
    slug: "4701-county-road-337-early",
    mlsId: "MLS #21127732",
    address: { street: "4701 County Road 337", city: "Early", state: "TX", zip: "76802" },
    price: 345000,
    estimatedPayment: 1927,
    beds: 3,
    baths: 3,
    sqft: 2489,
    lotSizeAcres: 1.75,
    yearBuilt: 1969,
    daysOnSite: 224,
    hvac: "Central, Electric, Fireplace(s), Ceiling Fan(s), Central Air",
    parking: "2 Parking Spaces",
    propertyType: "single-family",
    status: "active",
    description:
      "Discover the space, setting, and potential you’ve been searching for with this 2,489 sq. ft. home situated on approximately 1.75 acres in a desirable rural location just minutes from town. This property offers the best of both worlds, peaceful country living with quick, convenient access to local amenities. Inside, the home features 3 spacious bedrooms and 2.5 bathrooms, along with an abundance of living space that’s perfect for gathering, entertaining, or relaxing at home. The primary bedroom is coupled with a functional split design bathroom that is perfect for a shared space. You’ll find two dining areas, a large living room, and an oversized den centered around a cozy wood-burning fireplace. A standout feature of the home is the large windows that line the rear of the home in the den, living, and primary bedroom, offering an abundance of natural lighting. Enjoy the convenience of the attached, unique, and oversized garage with glass doors. With excellent potential, generous square footage, and a beautiful rural setting on manageable acreage, this property is ready for its next chapter. Bring your vision and make this remarkable home your own.",
    images: ["/images/listings/listing-7.jpg"],
    neighborhoodSlug: "early",
    featured: true,
    listedDate: "2025-12-10",
  },
  {
    id: "8",
    slug: "496-county-road-198-brownwood",
    mlsId: "MLS #21213932",
    address: { street: "496 County Road 198", city: "Brownwood", state: "TX", zip: "76801" },
    price: 315000,
    estimatedPayment: 1578,
    beds: 4,
    baths: 2,
    sqft: 1792,
    lotSizeAcres: 10.58,
    yearBuilt: 2023,
    daysOnSite: 123,
    hvac: "Central, Electric, Ceiling Fan(s), Central Air",
    parking: "2 Parking Spaces",
    propertyType: "manufactured",
    status: "active",
    description:
      "Peaceful country living just minutes from town! Located at 496 County Road 198 in Brownwood, Texas, this 2023 manufactured home offers the perfect blend of modern comfort and wide-open space. Featuring 1,792 square feet, this 4-bedroom, 2-bathroom home boasts a spacious open-concept layout designed for both everyday living and entertaining. The heart of the home is the large kitchen, complete with a central island, ample cabinetry, and seamless flow into the dining and living areas—creating a bright and inviting space for gathering with family and friends. The split-bedroom arrangement provides privacy, with a comfortable primary suite and well-sized secondary bedrooms. Thoughtfully designed with modern finishes and functionality in mind, this home is truly move-in ready. Situated on 10.58 acres outside the city limits, you’ll enjoy the freedom and tranquility of country living with plenty of room for animals, recreation, or future improvements. Conveniently located just a short drive from both Bangs and Brownwood, you get the best of rural serenity without sacrificing accessibility. If you’ve been looking for acreage, a newer home, and space to spread out—this property checks all the boxes!",
    images: ["/images/listings/listing-8.jpg"],
    neighborhoodSlug: "brownwood",
    featured: true,
    listedDate: "2026-03-21",
  },
  {
    id: "9",
    slug: "7511-seagull-drive-brownwood",
    mlsId: "MLS #21110458",
    address: { street: "7511 Seagull Drive", city: "Brownwood", state: "TX", zip: "76801" },
    price: 119900,
    estimatedPayment: 715,
    beds: 0,
    baths: 0,
    sqft: 0,
    lotSizeAcres: 0.78,
    daysOnSite: 250,
    parking: "Yes",
    propertyType: "land",
    status: "active",
    description:
      "Discover an exceptional opportunity to build your dream home on this prime .78-acre double lot, perfectly positioned along the 4th green of The Hideout Golf Club & Resort's golf course. This oversized property offers golf-course living and is surrounded by meticulous custom homes tucked into a truly serene setting. Scattered mature oak trees frame the landscape, providing shade, privacy, and the perfect canvas for a stunning homesite. From your back porch, enjoy gorgeous sunset views across the manicured golf course and breathe in the peaceful atmosphere that makes The Hideout so special. Located just minutes from Lake Brownwood, you’ll have quick access to boating, fishing, swimming, and all the resort amenities, including the clubhouse's restaurant, bar, and dining rooms, pro shop, community pool and hot tub. Homeowners are provided with stays in the hotel rooms and cabins, RV passes, and 4 rounds of golf per month. Additional amenities include a workout center, pickle-ball courts, tennis courts and more. Whether you’re envisioning a full-time residence or vacation home, this property delivers a rare combination of space, scenery, and prime location with endless building opportunities.",
    images: ["/images/listings/listing-9.jpg"],
    neighborhoodSlug: "brownwood",
    featured: true,
    listedDate: "2025-11-14",
  },
  {
    id: "10",
    slug: "9224-highway-279-brownwood",
    mlsId: "MLS #21298541",
    address: { street: "9224 Highway 279", city: "Brownwood", state: "TX", zip: "76801" },
    price: 165000,
    estimatedPayment: 1000,
    beds: 2,
    baths: 1,
    sqft: 1254,
    lotSizeAcres: 1.48,
    daysOnSite: 40,
    hvac: "Electric, Central Air, Ceiling Fan(s), Central",
    parking: "2 Parking Spaces",
    propertyType: "single-family",
    status: "active",
    description:
      "Welcome to 9224 Highway 279 near beautiful Lake Brownwood! Just a short drive from from the lake and 15 minutes to Brownwood, this property has incredible possibilities! Thinking about a weekend getaway or a short term rental for Lake Brownwood guests? This may be just the place you've been waiting for! Many updates over the past few years include replaced roof on home, detached garage, and storage building in 2024, updated and refinished flooring, updated kitchen countertops and appliances, updated paint throughout and on the exterior of the house. Situated on just under 1.5 acres, there is plenty of room for parking vehicles and lake toys. Detached double garage for extra parking or storage, plus a large shed in excellent condition that could be used as a workshop. Conveniently located within walking distance to E-Z Mart for necessities and gas. Call today for a private showing!",
    images: ["/images/listings/listing-10.jpg"],
    neighborhoodSlug: "brownwood",
    featured: true,
    listedDate: "2026-06-12",
  },
];
