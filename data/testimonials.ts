/**
 * Real, client-supplied reviews (screenshots provided by the client).
 * These mention both Justin and Abby Cadenhead, who the reviews indicate
 * work together on transactions — kept verbatim as supplied.
 */
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  date: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "We just sold our lake and ranch property at Lake Brownwood! Abby did an excellent job in handling the sale! We were timely updated on the progress of the showings and details of the sale…Very committed and professional !!",
    author: "Mahan W",
    role: "Seller",
    location: "Brownwood, TX",
    date: "Jan 2023",
    rating: 5,
  },
  {
    id: "2",
    quote:
      "Working with Justin and Abby Cadenhead, Realtor has been an absolute pleasure from start to finish. When we purchased our home, Abby worked tirelessly to represent us as buyers, ensuring we secured a great deal. Just this past week, we had the opportunity to work with her again—this time as sellers—and her professionalism and dedication were just as outstanding.\n\nAbby guided us through every step, from securing our initial loan to successfully closing the sale. Her knowledge, work ethic, and genuine care made the entire process smooth and stress-free. Both Abby and Justin are not only exceptional at what they do, but they're also two of the kindest people you'll ever meet.\n\nThey truly advocate for their clients and pour their hearts into every transaction. I couldn't recommend them more highly.",
    author: "Jacie G",
    role: "Buyer & Seller",
    location: "Early, TX",
    date: "Feb 2022",
    rating: 5,
  },
  {
    id: "3",
    quote:
      "Great communication, professionalism at its finest, and stress free was our experience with Abby which is why we went through her to buy and sell the same house! I truly recommend Abby!",
    author: "Jacqueline G",
    role: "Buyer & Seller",
    location: "Brownwood, TX",
    date: "Mar 2025",
    rating: 5,
  },
  {
    id: "4",
    quote:
      "Led by divine intervention, I'm certain, on a Saturday afternoon, Abby and Justin came to look at our property, which I was to inherit, and needing to sell, since I lived in another state. They encouraged us, came up with a plan, and with confident, professional actions, and plenty of tenacity, the property sold two months later. They made us feel important, kept in contact us, and really felt like family. We highly recommend this awesome couple to assist you with any real estate needs! They are so cool! \u{1F60E}",
    author: "Susan H",
    role: "Seller",
    location: "Brownwood, TX",
    date: "Jul 2025",
    rating: 5,
  },
];
