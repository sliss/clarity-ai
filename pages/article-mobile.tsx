import React from 'react';

const MobileArticleWithAd = () => {
  return (
    <div className="max-w-md mx-auto p-4 font-sans">
      {/* Article Content */}
      <article className="prose mb-8">
        <h1 className="text-2xl font-bold mb-4">Ultimate Guide to Trail Running</h1>
        
        <p className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras porta dui sit amet est porttitor volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.
        </p>
        
        <p className="mb-8">
          The race begins and ends in Chamonix, France, but takes participants through Italy's Courmayeur and Switzerland's Champex-Lac, offering a truly international mountain running experience. Elite athletes typically complete the course in around 20 hours, while many participants take up to 46 hours – the official time limit – to reach the finish line.


        </p>
      </article>

      {/* Advertisement */}
      <div className="rounded-lg overflow-hidden shadow-lg bg-gray-50 mb-8">
        {/* Image */}
        <div className="relative h-64 bg-gray-200">
          
          <img 
            src="/images/marmot.png"
            alt="Trail runner silhouetted against dramatic mountain landscape at sunset" 
            className="w-full h-full object-cover"
          />
          {/* <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded font-bold">
            PEAK PERFORMANCE
          </div> */}
          
        </div>

        {/* Content */}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">Your Adventure Starts Here</h2>
          <p className="text-sm text-gray-700 mb-4">
            Ultramarathons and weekend hikes start with Marmot. High-quality hiking gear & apparel – battle-tested for the mountains or your own backyard.
          </p>

          {/* FAQ Section */}
          <div className="space-y-2">
            <button className="w-full text-left p-2 bg-gray-100 rounded text-sm hover:bg-gray-200 transition-colors">
              What gear do I need for a 100+ mile ultra?
            </button>
            <button className="w-full text-left p-2 bg-gray-100 rounded text-sm hover:bg-gray-200 transition-colors">
              How should I carry water during an ultra?
            </button>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ask a question..." 
                className="w-full p-2 pr-8 bg-gray-100 rounded text-sm"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500">
                →
              </button>
            </div>
          </div>
        </div>
      </div>
      <p className="mb-8">
The race has become so prestigious that qualifying for UTMB is an achievement in itself. Runners must collect qualifying points from other ultra-trail races during the preceding year, leading to a complex system of preparation and planning that often spans multiple years.



        </p>
    </div>
  );
};

export default MobileArticleWithAd;
