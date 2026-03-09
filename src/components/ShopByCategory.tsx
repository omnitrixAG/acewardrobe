import catMens from "@/assets/cat-mens.jpg";
import catWomens from "@/assets/cat-womens.jpg";
import catCouples from "@/assets/cat-couples.jpg";
import catNewArrivals from "@/assets/cat-new-arrivals.jpg";
import catAccessories from "@/assets/cat-accessories.jpg";
import catSale from "@/assets/cat-sale.jpg";

const categories = [
  { name: "Men's", image: catMens },
  { name: "Women's", image: catWomens },
  { name: "Couples", image: catCouples },
  { name: "New Arrivals", image: catNewArrivals },
  { name: "Accessories", image: catAccessories },
  { name: "Sale", image: catSale },
];

export const ShopByCategory = () => {
  const scrollToCollections = () => {
    document.getElementById("collections")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-8 bg-background">
      <h2 className="text-center uppercase tracking-widest text-lg font-semibold text-foreground mb-6">
        Shop by Category
      </h2>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 px-6 w-max">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={scrollToCollections}
              className="flex flex-col items-center gap-2 shrink-0 group"
            >
              <div className="w-40 md:w-48 aspect-[3/4] rounded-lg overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="text-sm font-medium text-foreground">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
