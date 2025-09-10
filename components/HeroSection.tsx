import heroImage from "@/public/hero.png";

const HeroSection = () => {
  return (
    <section className="min-h-screen relative overflow-hidden pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl float-animation"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl float-animation" style={{animationDelay: '-2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/4 rounded-full blur-3xl float-animation" style={{animationDelay: '-4s'}}></div>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-agro-black leading-tight">
              Empowering Farmers with{" "}
              <span className="text-gradient">AI-Driven</span> Crop Solutions
            </h1>
            <p className="text-xl text-agro-gray-dark leading-relaxed max-w-2xl">
              Real-time yield predictions, market insights, and multilingual support 
              for <span className="font-semibold text-primary">120M+ smallholder farmers</span> worldwide.
            </p>
          </div>
          <div className="relative lg:block hidden">
            <div className="relative group mt-8">
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImage.src}
                alt="AI-powered agriculture technology illustration"
                className="relative w-full h-auto rounded-3xl shadow-large scale-hover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
