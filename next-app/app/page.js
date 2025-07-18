"use client"
import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import { CircleAlert, MapPin, Component } from 'lucide-react'

export default function Home() {
  const Router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const redirect_issuepage = () => Router.push("/issue");

  const projects = [
    {
      title: 'Staff Portal',
      description: 'Report your issue here!',
      icon: <CircleAlert className="w-8 h-8" />,
      link: '/admin'
    },
    {
      title: 'Heatmap',
      description: 'Combines cutting-edge technology with medical expertise to deliver personalized healthcare solutions.',
      icon: <MapPin className="w-8 h-8" />,
      link: '/map'
    },
    {
      title: 'Audit Module',
      description: 'Modules are updated',
      icon: <Component className="w-8 h-8" />,
      link: '/audit'
    }
  ];

  // 🎨 Updated Gradient Style
  const gradientStyle = {
    background: 'linear-gradient(90deg, rgba(119, 63, 171, 1) 22%, rgba(182, 87, 199, 1) 50%, rgba(217, 113, 177, 1) 100%)'
  };

  return (
    <>
      {/* ✅ Top Gradient Bar */}
      <div className="w-full h-16" style={gradientStyle}></div>

      {/* ✅ Main Section */}
      <section className="pt-16 pb-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

            {/* ✅ Gradient Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-500 to-pink-300">
              SHEvolve-Evolves Her
            </h1>

            {/* ✅ Description */}
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Report hygiene issues in women's washrooms across campus. Your voice helps us maintain the highest standards of cleanliness and safety.
            </p>

            {/* ✅ Report Button */}
            <div className="text-center mt-8 mb-12">
              <button
                onClick={redirect_issuepage}
                className="px-8 py-4 text-white text-lg font-semibold rounded-lg shadow-lg transition-transform hover:scale-105"
                style={gradientStyle}
              >
                Report Your Issue
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Cards Section */}
      <div className="relative z-10 w-full max-w-6xl px-6 mx-auto mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((feature, index) => (
            <div
              key={index}
              className="group p-6 border border-white rounded-2xl text-white hover:scale-105 transition-transform duration-300 shadow-lg"
              style={gradientStyle}
            >
              <div className="flex items-center mb-4">
                <button onClick={() => Router.push(`${feature.link}`)} className="p-3 bg-white text-purple-700 rounded-full text-3xl">
                  {feature.icon}
                </button>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm opacity-90">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
