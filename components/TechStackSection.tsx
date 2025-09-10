import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TechStackSection = () => {
  const technologies = [
    { name: "Next.js", description: "React Framework" },
    { name: "Supabase", description: "Backend & Database" },
    { name: "Clerk", description: "Authentication" },
    { name: "AWS SageMaker", description: "ML Platform" },
    { name: "Gemini", description: "AI Language Model" },
    { name: "Firebase", description: "Real-time Data" },
    { name: "Vercel", description: "Deployment Platform" },
  ];

  return (
    <section id="tech-stack" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-full mb-4">
            <span className="text-sm font-medium text-gray-300">Technology Stack</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Built with Modern Technology
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Scalable, modern, and production-ready tech stack powering AgroGen.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {technologies.map((tech, index) => (
            <Card
              key={index}
              className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg bg-gray-800/50 backdrop-blur-sm"
            >
              <CardHeader className="text-center pb-4 pt-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors duration-300">
                  <span className="text-xl font-bold text-green-400 hover:scale-110 transition-transform duration-300">
                    {tech.name.charAt(0)}
                  </span>
                </div>
                <CardTitle className="font-semibold text-white mb-1 hover:text-green-400 transition-colors duration-300">{tech.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400 text-center hover:text-gray-300 transition-colors duration-300">{tech.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
