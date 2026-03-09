import { FC, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

const forHerPackages = [
  {
    title: "THE LUXE EDIT",
    collection: "Women's Collection",
    price: "₦350,000",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20THE%20LUXE%20EDIT%20package%20(₦350,000)",
    items: "Long Dress, Lingerie, Pyjama Set, Chocolate & Card",
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
  },
  {
    title: "THE CLASSIC EDIT",
    collection: "Women's Collection",
    price: "₦250,000",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20THE%20CLASSIC%20EDIT%20package%20(₦250,000)",
    items: "Short Dress, Lingerie, Pyjama Set, Chocolate & Card",
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop",
  },
  {
    title: "THE ESSENTIAL EDIT",
    collection: "Women's Collection",
    price: "₦150,000",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20THE%20ESSENTIAL%20EDIT%20package%20(₦150,000)",
    items: "Lingerie, Pyjama Set, Chocolate & Flowers",
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=600&h=800&fit=crop",
  },
];

const forHimPackages = [
  {
    title: "THE EXECUTIVE EDIT",
    collection: "Men's Collection",
    price: "₦750,000",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20THE%20EXECUTIVE%20EDIT%20package%20(₦750,000)",
    items: "Two-Piece Set, Boxers & Singlet, Shirt/T-Shirt, Shorts",
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop",
  },
  {
    title: "THE KING EDIT",
    collection: "Men's Collection",
    price: "₦550,000",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20THE%20KING%20EDIT%20package%20(₦550,000)",
    items: "Boxers & Singlet, Shirt/T-Shirt, Pants/Jeans, Card",
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop",
  },
  {
    title: "THE CASUAL EDIT",
    collection: "Men's Collection",
    price: "₦350,000",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20THE%20CASUAL%20EDIT%20package%20(₦350,000)",
    items: "Singlet & Boxers, Shirt/Pants, Miniature Spirits, Card",
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=800&fit=crop",
  },
  {
    title: "THE STARTER EDIT",
    collection: "Men's Collection",
    price: "₦200,000",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20THE%20STARTER%20EDIT%20package%20(₦200,000)",
    items: "Boxers & Singlet, Miniature Spirits, Card",
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&h=800&fit=crop",
  },
];

interface PackageCardProps {
  title: string;
  collection: string;
  price: string;
  items: string;
  whatsappMessage: string;
  isBestseller: boolean;
  image: string;
}

const PackageCard: FC<PackageCardProps> = ({ title, collection, price, items, whatsappMessage, isBestseller, image }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const whatsappUrl = `https://wa.me/2347039178489?text=${whatsappMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col h-full overflow-hidden rounded-lg bg-card border border-border transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/10"
    >
      <div className="relative aspect-[3/4] overflow-hidden flex-shrink-0">
        {!imageLoaded && <Skeleton className="absolute inset-0 bg-muted" />}
        <img 
          src={image} 
          alt={title}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        {isBestseller && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold tracking-widest uppercase z-10">
            Bestseller
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow p-5">
        <span className="text-[10px] font-body font-medium tracking-[0.15em] uppercase text-muted-foreground mb-1.5">
          {collection}
        </span>
        <h3 className="font-display text-lg font-semibold text-foreground mb-1.5 leading-snug">{title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed mb-3 flex-grow">{items}</p>
        <p className="text-base font-body font-semibold text-primary mb-4">{price}</p>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:underline underline-offset-4 transition-all">
          Shop Now
          <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-300" />
        </span>
      </div>
    </a>
  );
};

export const PackagesSection: FC = () => {
  return (
    <section id="packages" className="py-20 md:py-28 relative overflow-hidden bg-background">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/30 mb-6">
            <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Signature Collections</span>
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Curated Edits
          </h2>
          
          <p className="text-muted-foreground max-w-lg mx-auto font-body">
            Thoughtfully styled collections for the modern wardrobe
          </p>
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
            <h3 className="font-display text-sm font-semibold tracking-[0.2em] text-primary uppercase">Women's Edit</h3>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {forHerPackages.map((pkg) => (
              <PackageCard key={pkg.title} {...pkg} />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
            <h3 className="font-display text-sm font-semibold tracking-[0.2em] text-primary uppercase">Men's Edit</h3>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {forHimPackages.map((pkg) => (
              <PackageCard key={pkg.title} {...pkg} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
