import { CheckCircle, Rocket, Smartphone } from "lucide-react";

const RoadmapSection = () => {
  const milestones = [
    {
      icon: CheckCircle,
      title: "Dashboard & Predictions",
      description: "Core platform with AI-powered yield forecasting",
      status: "completed",
      label: "Current"
    },
    {
      icon: Rocket,
      title: "Language Expansion",
      description: "Regional language support and capabilities",
      status: "inProgress",
      label: "Next"
    },
    {
      icon: Smartphone,
      title: "Mobile App (React Native)",
      description: "Native mobile application for iOS and Android",
      status: "planned",
      label: "Future"
    }
  ];

  return (
    <section id="roadmap" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full mb-4">
            <span className="text-sm font-medium text-gray-600">Development Timeline</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Development Roadmap
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Continuous innovation and feature development to serve farmers better.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-200"></div>
            
            {milestones.map((milestone, index) => (
              <div key={index} className="relative flex items-start mb-12 last:mb-0" style={{animationDelay: `${index * 0.2}s`}}>
                <div className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                  milestone.status === 'completed' 
                    ? 'bg-green-500 border-green-500' 
                    : milestone.status === 'inProgress'
                    ? 'bg-green-100 border-green-300'
                    : 'bg-gray-100 border-gray-300'
                }`}>
                  <milestone.icon className={`w-6 h-6 ${
                    milestone.status === 'completed'
                      ? 'text-white'
                      : 'text-green-600'
                  }`} />
                </div>

                <div className="ml-6">
                  <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                        milestone.status === 'completed'
                          ? 'bg-green-100 text-green-600'
                          : milestone.status === 'inProgress'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {milestone.label}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 hover:text-green-600 transition-colors duration-300">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 text-base">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
