import { FC } from "react";

const products = [
  { name: "Navy Slim Fit Suit", price: "₦185,000", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=667&fit=crop" },
  { name: "Cream Linen Blazer", price: "₦95,000", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=667&fit=crop" },
  { name: "White Dress Shirt", price: "₦35,000", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=667&fit=crop" },
  { name: "Khaki Chinos", price: "₦45,000", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=667&fit=crop" },
  { name: "Brown Oxford Shoes", price: "₦75,000", image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=500&h=667&fit=crop" },
  { name: "Black Agbada Set", price: "₦250,000", image: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=500&h=667&fit=crop" },
  { name: "Gray Waistcoat", price: "₦55,000", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&h=667&fit=crop" },
  { name: "Silk Pocket Square Set", price: "₦15,000", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&h=667&fit=crop" },
];

export const ShopNewInSection: FC = () => {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl font-bold text-foreground">Shop New In</h2>
          <a
            href="https://wa.me/2347039178489?text=Hi!%20I'd%20like%20to%20see%20all%20your%20new%20arrivals"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors"
          >
            View All
          </a>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <a
              key={product.name}
              href={`https://wa.me/2347039178489?text=Hi!%20I'm%20interested%20in%20the%20${encodeURIComponent(product.name)}%20(${encodeURIComponent(product.price)})`}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="aspect-[3/4] rounded-lg overflow-hidden bg-secondary">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="pt-3">
                <p className="text-sm font-medium text-foreground line-clamp-2">{product.name}</p>
                <p className="text-sm font-semibold text-foreground mt-1">{product.price}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-10">
          <a
            href="https://wa.me/2347039178489?text=Hi!%20I'd%20like%20to%20see%20more%20products"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-foreground text-foreground px-12 py-3 text-xs font-semibold uppercase tracking-wider hover:bg-foreground hover:text-background transition-all duration-300"
          >
            Load More
          </a>
        </div>
      </div>
    </section>
  );
};
