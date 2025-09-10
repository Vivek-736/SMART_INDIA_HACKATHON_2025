import { BarChart3, CloudRain, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FeaturesSection = () => {
  const features = [
    {
      icon: BarChart3,
      title: "AI Predictions",
      description: "Advanced yield forecasting using Machine Learning with Random Forest Regression models.",
      color: "text-green-600"
    },
    {
      icon: CloudRain,
      title: "Live Data",
      description: "Real-time weather, soil conditions, and market insights through integrated APIs.",
      color: "text-green-600"
    },
    {
      icon: MessageSquare,
      title: "Multilingual Support",
      description: "AI chatbot with text and voice support in local languages for global accessibility.",
      color: "text-green-600"
    }
  ];

  return (
    <section id="features" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full mb-4">
            <span className="text-sm font-medium text-gray-600">Core Features</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Farming
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cutting-edge technology designed to enhance agricultural productivity and sustainability.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg bg-white"
            >
              <CardHeader className="text-center pb-4 pt-6">
                <div className="mx-auto mb-4 p-3 rounded-lg bg-gray-100 w-fit hover:bg-gray-200 transition-colors duration-300">
                  <feature.icon className={`w-8 h-8 ${feature.color} hover:scale-110 transition-transform duration-300`} />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 hover:text-green-600 transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-6 px-4">
                <CardDescription className="text-gray-600 text-center text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
