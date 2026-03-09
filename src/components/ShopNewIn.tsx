import { FC, useState } from "react";
import { Skeleton } from "./ui/skeleton";

const products = [
  { name: "Navy Slim Fit Suit", price: "₦185,000", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=450&h=600&fit=crop", colors: ["#1b2a4a", "#2d2d2d", "#4a4a4a"] },
  { name: "Cream Linen Blazer", price: "₦95,000", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=450&h=600&fit=crop", colors: ["#f5f0e1", "#c9b99a", "#1b2a4a"] },
  { name: "White Dress Shirt", price: "₦35,000", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=450&h=600&fit=crop", colors: ["#ffffff", "#d4e4f7", "#1a1a1a"] },
  { name: "Khaki Chinos", price: "₦45,000", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=450&h=600&fit=crop", colors: ["#c4a96a", "#2d2d2d", "#1b2a4a"] },
  { name: "Brown Oxford Shoes", price: "₦75,000", image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=450&h=600&fit=crop", colors: ["#6b3a2a", "#1a1a1a", "#4a3728"] },
  { name: "Black Agbada Set", price: "₦250,000", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=450&h=600&fit=crop", colors: ["#1a1a1a", "#2d2d2d"] },
  { name: "Gray Waistcoat", price: "₦55,000", image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=450&h=600&fit=crop", colors: ["#808080", "#2d2d2d", "#1b2a4a"] },
  { name: "Silk Pocket Square Set", price: "₦15,000", image: "https://images.unsplash.com/photo-1589756823695-278bc923a76b?w=450&h=600&fit=crop", colors: ["#8b0000", "#1b2a4a", "#c9a962"] },
];

const ProductCard: FC<typeof products[0]> = ({ name, price, image, colors }) => {
  const [loaded, setLoaded] = useState(false);
  const msg = encodeURIComponent(`Hi! I'm interested in the ${name} (${price})`);

  return (
    <a
      href={`https://wa.me/2347039178489?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group"
    >
      <div className="aspect-[3/4] rounded-lg overflow-hidden bg-secondary">
        {!loaded && <Skeleton className="w-full h-full" />}
        <img
          src={image}
          alt={name}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLoaded(true)}
        />
      </div>
      <div className="pt-3">
        <p className="text-sm font-medium text-foreground line-clamp-2">{name}</p>
        <p className="text-sm font-semibold text-foreground mt-1">{price}</p>
        {colors && (
          <div className="flex gap-1.5 mt-2">
            {colors.map((c) => (
              <span
                key={c}
                className="w-4 h-4 rounded-full border border-border"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        )}
      </div>
    </a>
  );
};

export const ShopNewIn = () => {
  return (
    <section className="py-12 bg-background">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground font-display">Shop New In</h2>
          <a
            href="#collections"
            className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors"
          >
            View All
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((p) => (
            <ProductCard key={p.name} {...p} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <a
            href="https://wa.me/2347039178489?text=Hi!%20I'd%20like%20to%20see%20more%20new%20arrivals"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-foreground text-foreground text-sm font-semibold uppercase tracking-widest px-12 py-3 rounded hover:bg-foreground hover:text-background transition-colors"
          >
            Load More
          </a>
        </div>
      </div>
    </section>
  );
};
