import { FC } from "react";

const categories = [
  {
    title: "Men's",
    image: "/images/category-mens.png",
    href: "https://wa.me/2347039178489?text=Hi!%20I'm%20interested%20in%20your%20men's%20collection",
  },
  {
    title: "Women's",
    image: "/images/category-womens.png",
    href: "https://wa.me/2347039178489?text=Hi!%20I'm%20interested%20in%20your%20women's%20collection",
  },
  {
    title: "Couples",
    image: "/images/category-couples.png",
    href: "https://wa.me/2347039178489?text=Hi!%20I'm%20interested%20in%20matching%20couple%20outfits",
  },
  {
    title: "New Arrivals",
    image: "/images/category-new.png",
    href: "https://wa.me/2347039178489?text=Hi!%20I'm%20interested%20in%20your%20new%20arrivals",
  },
  {
    title: "Accessories",
    image: "/images/category-accessories.png",
    href: "https://wa.me/2347039178489?text=Hi!%20I'm%20interested%20in%20accessories",
  },
  {
    title: "Sale",
    image: "/images/category-sale.png",
    href: "https://wa.me/2347039178489?text=Hi!%20Do%20you%20have%20any%20items%20on%20sale%3F",
  },
];

export const ShopByCategorySection: FC = () => {
  return (
    <section className="py-8 md:py-12 bg-background border-t border-border">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="text-lg font-semibold text-center mb-6 uppercase tracking-wider text-foreground">
          Shop by Category
        </h2>

        <div
          className="flex gap-4 pb-4 xl:justify-center"
          style={{
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {categories.map((cat) => (
            <a
              key={cat.title}
              href={cat.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 group"
            >
              <div className="w-[160px] md:w-[192px]">
                <div
                  className="rounded-lg overflow-hidden mb-3 bg-secondary"
                  style={{ aspectRatio: "3/4" }}
                >
                  <img
                    src={cat.image}
                    alt={cat.title}
                    loading="eager"
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
