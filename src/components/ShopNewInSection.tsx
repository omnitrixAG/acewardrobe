import { FC } from "react";

const products = [
  { name: "Navy Slim Fit Suit", price: "₦185,000", image: "/images/product-1.png" },
  { name: "Cream Linen Blazer", price: "₦95,000", image: "/images/product-2.png" },
  { name: "White Dress Shirt", price: "₦35,000", image: "/images/product-3.png" },
  { name: "Khaki Chinos", price: "₦45,000", image: "/images/product-4.png" },
  { name: "Brown Oxford Shoes", price: "₦75,000", image: "/images/product-5.png" },
  { name: "Black Agbada Set", price: "₦250,000", image: "/images/product-6.png" },
  { name: "Gray Waistcoat", price: "₦55,000", image: "/images/product-7.png" },
  { name: "Silk Pocket Square Set", price: "₦15,000", image: "/images/product-8.png" },
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
