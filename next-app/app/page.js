"use client"
import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import { CircleAlert, MapPin, Component } from 'lucide-react'

export default function Home() {
  const Router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const redirect_issuepage = () => Router.push("/issue");

  const projects = [
    {
      title: 'Issues',
      description: 'Report your issue here!',
      icon: <CircleAlert className="w-8 h-8" />
    },
    {
      title: 'Heatmap',
      description: 'Combines cutting-edge technology with medical expertise to deliver personalized healthcare solutions.',
      icon: <MapPin className="w-8 h-8" />
    },
    {
      title: 'Audit Module',
      description: 'Modules are updated',
      icon: <Component className="w-8 h-8" />
    }
  ];

  return (
    <>
      
      <div
        className="w-full h-16"
        style={{
          background: 'linear-gradient(90deg, rgba(55,112,196,1) 0%, rgba(87,199,133,1) 65%, rgba(83,237,196,1) 100%)'
        }}
      ></div>

      
      <section className="pt-12 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(90deg, rgba(55,112,196,1) 0%, rgba(87,199,133,1) 65%, rgba(83,237,196,1) 100%)',
              }}
            >
              SHEvolve-Evolves Her
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Report hygiene issues in women's washrooms across campus. Your voice helps us maintain the highest standards of cleanliness and safety.
            </p>
          </div>
        </div>
      </section>

      
      <div className="relative z-10 w-full max-w-6xl px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((feature, index) => (
            <div
              key={index}
              className="group p-6 border border-white rounded-2xl text-white hover:scale-105 transition-transform duration-300 shadow-lg"
              style={{
                backgroundImage: 'linear-gradient(90deg, rgba(55,112,196,1) 0%, rgba(87,199,133,1) 65%, rgba(83,237,196,1) 100%)'
              }}
            >
              <div className="flex items-center mb-4">
                <button onClick={redirect_issuepage} className="p-3 bg-white text-blue-600 rounded-full text-3xl">
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
