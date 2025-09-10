import { Card, CardContent } from "@/components/ui/card";

const ImpactSection = () => {
  const impacts = [
    {
      emoji: "🌾",
      title: "+15% Yield Growth",
      description: "Average increase in crop productivity using our AI predictions"
    },
    {
      emoji: "⚡",
      title: "10–20% Less Fertilizer",
      description: "Reduction in fertilizer usage through optimized recommendations"
    },
    {
      emoji: "👩‍🌾",
      title: "120M+ Farmers",
      description: "Potential reach to smallholder farmers globally"
    }
  ];

  return (
    <section id="impact" className="py-24 bg-gradient-primary relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-4 h-4 bg-agro-white/20 rounded-full float-animation"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-agro-white/15 rounded-full float-animation" style={{animationDelay: '-1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-agro-white/25 rounded-full float-animation" style={{animationDelay: '-3s'}}></div>
        <div className="absolute top-1/3 right-20 w-5 h-5 bg-agro-white/10 rounded-full float-animation" style={{animationDelay: '-2s'}}></div>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-agro-white/20 rounded-full border border-agro-white/30 mb-6">
            <span className="text-sm font-medium text-agro-white">Impact Metrics</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-agro-white mb-6 text-balance">
            Real Impact, <span className="text-agro-white/90">Real Results</span>
          </h2>
          <p className="text-xl text-agro-white/90 max-w-3xl mx-auto leading-relaxed">
            Transforming agriculture through technology and making a meaningful difference in farmers&apos; lives.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {impacts.map((impact, index) => (
            <Card 
              key={index}
              className="bg-agro-white/95 backdrop-blur-sm border-0 rounded-3xl shadow-large scale-hover group relative overflow-hidden shine-effect"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-agro-white/100 to-agro-white/90"></div>
              <CardContent className="text-center p-10 relative z-10">
                <div className="text-7xl mb-6 group-hover:scale-110 transition-transform duration-500">{impact.emoji}</div>
                <h3 className="text-3xl font-bold text-agro-black mb-4 group-hover:text-primary transition-colors duration-300">
                  {impact.title}
                </h3>
                <p className="text-agro-gray-dark leading-relaxed text-lg">
                  {impact.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
