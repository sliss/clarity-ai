import Head from "next/head";
import Image from "next/image";

export default function Article() {
  const iframeContent = `
    <div style="padding: 20px; background: white;">
      <h3 style="margin-bottom: 10px;">Key Food Safety Metrics</h3>
      <ul style="list-style-type: disc; padding-left: 20px;">
        <li>99.9% compliance rate in temperature monitoring</li>
        <li>24/7 real-time tracking across 5000+ locations</li>
        <li>Average response time under 30 minutes</li>
        <li>Zero major safety incidents in 2023</li>
      </ul>
    </div>
  `;

  return (
    <>
      
      <Head>
        <title>Revolutionizing Food Supply Chain Safety: A Digital Transformation</title>
        <meta
          name="description"
          content="How modern technology and strict protocols are ensuring safer food supply chains across the industry"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.png"
        />
      </Head>

      <div className="min-h-screen bg-white">
        <div 
          className="relative bg-black/70 bg-[url('/images/supply-chain-hero.jpg')] bg-cover bg-center bg-blend-overlay text-white py-24 px-5 text-center"
        >
          <h1 className="text-5xl font-bold m-0">Revolutionizing Food Supply Chain Safety</h1>
          <p className="text-xl mt-5 opacity-90">How Digital Innovation is Transforming Food Safety Standards</p>
        </div>

        <main className="max-w-[970px] mx-auto px-5 py-10">
          <div className="text-sm text-gray-600 mb-8 pb-5 border-b border-gray-200">
            <span>By Maria Rodriguez</span> | 
            <span> March 15, 2024</span> | 
            <span> 8 minute read</span>
          </div>

          <article>
            <p className="text-lg text-gray-700 my-5">
              The food service industry is witnessing a revolutionary transformation in supply chain safety, driven by advanced monitoring systems and stringent quality control measures. These innovations are reshaping how restaurants and suppliers ensure food safety from farm to table, particularly in large-scale operations serving millions of customers daily.
            </p>

            <div className="my-8">
              <Image 
                src="/images/food-storage.png"
                alt="Modern food storage facility with temperature monitoring systems" 
                width={800} 
                height={400} 
                className="rounded-lg object-cover w-full h-[400px]"
              />
              <p className="text-sm text-gray-600 text-center mt-2 mb-8">
                State-of-the-art monitoring systems in a modern food storage facility. Photo: FoodTech Solutions
              </p>
            </div>

            <p className="text-lg text-gray-700 my-5">
              What sets modern food safety systems apart is their ability to monitor and respond to potential issues in real-time. From temperature-controlled transport to automated quality checks at distribution centers, every step of the supply chain is now equipped with sophisticated monitoring technology that ensures food safety and quality standards are consistently met.
            </p>
            {/* <iframe
              srcDoc={iframeContent}
              width="970"
              height="250"
              frameBorder="0"
              scrolling="no"
            /> */}
           
            <p className="text-lg text-gray-700 my-5">
              Leading food service companies are implementing systems that can track thousands of shipments simultaneously, monitoring everything from temperature variations to delivery times. These digital solutions enable immediate responses to any deviations from safety protocols, ensuring that food quality is maintained throughout the entire supply chain.
            </p>

            <div className="my-10 bg-gray-100 p-5 rounded-lg">
              <iframe
                srcDoc={`
                  <script async src="https://js.stratos.blue/stratos.js?publisherId=6660be5c4e70d17b07751c91"></script>
                  <div id="stratos-content"></div>
                `}
                width="970"
                height="250"
                frameBorder="0"
                scrolling="no"
              />
            </div>

            <blockquote className="text-2xl italic text-gray-600 border-l-4 border-[#c53746] pl-5 my-8">
              &ldquo;Food safety isn't just about following regulations – it's about building trust with every meal we serve. Technology helps us deliver on that promise.&rdquo; - James Chen, Global Food Safety Director
            </blockquote>

            <div className="my-8">
              <Image 
                src="/images/food-prep.png"
                alt="Quality control inspection in a food processing facility" 
                width={800} 
                height={400} 
                className="rounded-lg object-cover w-full h-[400px]"
              />
              <p className="text-sm text-gray-600 text-center mt-2 mb-8">
                Advanced quality control processes in action. Photo: FoodTech Solutions
              </p>
            </div>

            <p className="text-lg text-gray-700 my-5">
              The impact of these innovations extends throughout the entire food service ecosystem. From small local suppliers to global restaurant chains, the implementation of advanced safety protocols and monitoring systems is setting new standards for food safety and quality assurance. The industry is now moving towards a future where food safety incidents are increasingly rare and quickly contained.
            </p>

            {/* Add remaining paragraphs and images similarly... */}
          </article>
        </main>
      </div>
    </>
  );
} 