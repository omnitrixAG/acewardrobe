import { FC } from "react";

const trends = [
  {
    title: "Suits",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop",
    href: "https://wa.me/2347039178489?text=Hi!%20I'm%20interested%20in%20your%20suits%20collection",
  },
  {
    title: "Agbada",
    image: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=600&h=600&fit=crop",
    href: "https://wa.me/2347039178489?text=Hi!%20I'm%20interested%20in%20your%20Agbada%20collection",
  },
  {
    title: "Casual",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=600&fit=crop",
    href: "https://wa.me/2347039178489?text=Hi!%20I'm%20interested%20in%20your%20casual%20collection",
  },
  {
    title: "Accessories",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=600&fit=crop",
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
