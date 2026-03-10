import { FC } from "react";

const categories = [
  {
    title: "Men's",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=530&fit=crop&crop=faces",
    href: "https://wa.me/2347039178489?text=Hi!%20I'm%20interested%20in%20your%20men's%20collection",
  },
  {
    title: "Women's",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=530&fit=crop",
    href: "https://wa.me/2347039178489?text=Hi!%20I'm%20interested%20in%20your%20women's%20collection",
  },
  {
    title: "Couples",
    image: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=400&h=530&fit=crop",
    href: "https://wa.me/2347039178489?text=Hi!%20I'm%20interested%20in%20matching%20couple%20outfits",
  },
  {
    title: "New Arrivals",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=530&fit=crop",
    href: "#collections",
  },
  {
    title: "Accessories",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=530&fit=crop",
    href: "https://wa.me/2347039178489?text=Hi!%20I'm%20interested%20in%20accessories",
  },
  {
    title: "Sale",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=530&fit=crop",
    href: "https://wa.me/2347039178489?text=Hi!%20Do%20you%20have%20any%20items%20on%20sale%3F",
  },
];

export const ShopByCategorySection: FC = () => {
  return (
    <section className="py-8 md:py-12 bg-background">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="text-lg font-semibold text-center mb-6 uppercase tracking-wider text-foreground">
          Shop by Category
        </h2>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide xl:justify-center">
          {categories.map((cat) => (
            <a
              key={cat.title}
              href={cat.href}
              target={cat.href.startsWith("http") ? "_blank" : undefined}
              rel={cat.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex-shrink-0 group"
            >
              <div className="w-40 md:w-48">
                <div className="aspect-[3/4] rounded-lg overflow-hidden mb-3">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-center text-sm font-medium text-foreground">
                  {cat.title}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
