import { FC } from "react";

const trends = [
  {
    title: "Suits",
    image: "/images/trend-suits.png",
    href: "https://wa.me/2347039178489?text=Hi!%20I'm%20interested%20in%20your%20suits%20collection",
  },
  {
    title: "Agbada",
    image: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=600&h=600&fit=crop",
    href: "https://wa.me/2347039178489?text=Hi!%20I'm%20interested%20in%20your%20Agbada%20collection",
  },
  {
    title: "Casual",
    image: "/images/trend-casual.png",
    href: "https://wa.me/2347039178489?text=Hi!%20I'm%20interested%20in%20your%20casual%20collection",
  },
  {
    title: "Accessories",
    image: "/images/trend-accessories.png",
    href: "https://wa.me/2347039178489?text=Hi!%20I'm%20interested%20in%20your%20accessories",
  },
];

export const TrendingSection: FC = () => {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <h2 className="font-display text-2xl font-bold text-foreground text-center mb-8">
          Trending Now
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trends.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-center text-sm font-medium text-foreground mt-3">
                {item.title}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
