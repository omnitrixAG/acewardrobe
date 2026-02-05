import { FC } from "react";

const collections = [
  { title: "New Arrivals", status: "Coming Soon" },
  { title: "Men's Edit", status: "Coming Soon" },
  { title: "Women's Edit", status: "Coming Soon" },
];

export const CollectionsSection: FC = () => {
  return (
    <section id="collections" className="py-20 md:py-32 bg-card">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Collections
          </h2>
          <p className="font-body text-muted-foreground">
            Curated pieces for the modern royal
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {collections.map((collection, index) => (
            <div
              key={collection.title}
              className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-secondary cursor-pointer"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] font-display font-bold text-chrome/5">
                  ♠
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-500" />

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:-translate-y-2 transition-transform">
                  {collection.title}
                </h3>
                <span className="px-4 py-2 rounded-full glass-dark text-sm font-body tracking-wider text-chrome-light uppercase">
                  {collection.status}
                </span>
              </div>

              {/* Border Glow */}
              <div className="absolute inset-0 border border-border/30 group-hover:border-primary/50 rounded-xl transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
