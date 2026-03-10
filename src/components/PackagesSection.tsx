import { FC, useState } from "react";
import { Skeleton } from "./ui/skeleton";

const collections = [
  {
    title: "The Executive",
    category: "Men's Edit",
    price: "From ₦550,000",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20The%20Executive%20collection%20(From%20₦550,000)",
  },
  {
    title: "The King",
    category: "Men's Edit",
    price: "From ₦350,000",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=800&fit=crop",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20The%20King%20collection%20(From%20₦350,000)",
  },
  {
    title: "The Luxe",
    category: "Women's Edit",
    price: "From ₦250,000",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20The%20Luxe%20collection%20(From%20₦250,000)",
  },
  {
    title: "The Couple's Edit",
    category: "His & Hers",
    price: "From ₦400,000",
    image: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=600&h=800&fit=crop",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20The%20Couple's%20Edit%20(From%20₦400,000)",
  },
];

const CollectionCard: FC<{ item: typeof collections[0] }> = ({ item }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <a
      href={`https://wa.me/2347039178489?text=${item.whatsappMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative aspect-[3/4] rounded-lg overflow-hidden block"
    >
      {!imageLoaded && <Skeleton className="absolute inset-0 bg-muted" />}
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setImageLoaded(true)}
      />

      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="bg-background text-foreground px-6 py-3 text-xs font-semibold uppercase tracking-wider">
          Shop Now
        </span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-[10px] uppercase tracking-widest text-white/80 mb-1">
          {item.category}
        </p>
        <h3 className="text-lg font-bold text-white mb-0.5">{item.title}</h3>
        <p className="text-sm text-white/90">{item.price}</p>
      </div>
    </a>
  );
};

export const PackagesSection: FC = () => {
  return (
    <section id="packages" className="py-16 md:py-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            Curated Edits
          </h2>
          <p className="text-muted-foreground text-sm">
            Styled collections ready to wear
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {collections.map((item) => (
            <CollectionCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
