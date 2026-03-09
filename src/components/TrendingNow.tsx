import trendSuits from "@/assets/trend-suits.jpg";
import trendAgbada from "@/assets/trend-agbada.jpg";
import trendCasual from "@/assets/trend-casual.jpg";
import trendAccessories from "@/assets/trend-accessories.jpg";

const trends = [
  { name: "Suits", image: trendSuits, msg: "Hi!%20I'm%20interested%20in%20your%20suits%20collection" },
  { name: "Agbada", image: trendAgbada, msg: "Hi!%20I'm%20interested%20in%20your%20agbada%20collection" },
  { name: "Casual", image: trendCasual, msg: "Hi!%20I'm%20interested%20in%20your%20casual%20collection" },
  { name: "Accessories", image: trendAccessories, msg: "Hi!%20I'm%20interested%20in%20your%20accessories%20collection" },
];

export const TrendingNow = () => {
  return (
    <section className="py-12 bg-background">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <h2 className="text-2xl font-bold text-foreground text-center mb-8 font-display">
          Trending Now
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trends.map((t) => (
            <a
              key={t.name}
              href={`https://wa.me/2347039178489?text=${t.msg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="text-sm font-medium text-foreground text-center mt-3">{t.name}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
