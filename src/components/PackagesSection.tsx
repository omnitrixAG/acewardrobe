import { FC, useState } from "react";
import { Skeleton } from "./ui/skeleton";

const collections = [
  {
    title: "The Executive",
    category: "Men's Edit",
    price: "From ₦550,000",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20The%20Executive%20collection%20(Men's%20Edit%20-%20From%20₦550,000)",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop",
  },
  {
    title: "The King",
    category: "Men's Edit",
    price: "From ₦350,000",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20The%20King%20collection%20(Men's%20Edit%20-%20From%20₦350,000)",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=800&fit=crop",
  },
  {
    title: "The Luxe",
    category: "Women's Edit",
    price: "From ₦250,000",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20The%20Luxe%20collection%20(Women's%20Edit%20-%20From%20₦250,000)",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
  },
  {
    title: "The Couple's Edit",
    category: "Couple's Collection",
    price: "From ₦400,000",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20The%20Couple's%20Edit%20collection%20(From%20₦400,000)",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop",
  },
];

const CollectionCard: FC<typeof collections[0]> = ({ title, category, price, whatsappMessage, image }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const whatsappUrl = `https://wa.me/2347039178489?text=${whatsappMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative aspect-[3/4] rounded-lg overflow-hidden block"
    >
      {!imageLoaded && <Skeleton className="absolute inset-0 bg-muted" />}
      <img
        src={image}
        alt={title}
        loading="lazy"
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setImageLoaded(true)}
      />

      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 p-4 z-10">
        <span className="text-[10px] uppercase tracking-widest text-white/80 font-medium">
          {category}
        </span>
        <h3 className="text-lg font-bold text-white font-display">{title}</h3>
        <p className="text-sm text-white/90">{price}</p>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="bg-white text-foreground text-sm font-semibold px-6 py-2.5 rounded translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          Shop Now
        </span>
      </div>
    </a>
  );
};

export const PackagesSection: FC = () => {
  return (
    <section id="packages" className="py-12 md:py-20 bg-background">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            Curated Edits
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Styled collections ready to wear
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {collections.map((col) => (
            <CollectionCard key={col.title} {...col} />
          ))}
        </div>
      </div>
    </section>
  );
};
