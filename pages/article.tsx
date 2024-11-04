import Head from "next/head";
import Image from "next/image";

export default function Article() {
  const iframeContent = `
    <!DOCTYPE html>
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    
    .container {
      display: flex;
      width: 910px;
      height: 250px;
      background: white;
      overflow: hidden;
    }
    
    .image-panel {
      width: 250px;
      height: 250px;
      position: relative;
      overflow: hidden;
    }
    
    .image-panel img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: opacity 0.3s ease-in-out;
    }

    .add-to-cart {
      position: absolute;
      bottom: 16px;
      left: 50%;
      transform: translateX(-50%);
      background: #c53746;
      color: white;
      padding: 8px 16px;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      font-weight: 500;
      transition: opacity 0.3s ease;
      opacity: 0;
    }

    .add-to-cart.visible {
      opacity: 1;
    }

    .add-to-cart:hover {
      background: #b32f3d;
    }
    
    .interactive-panel {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 16px;
      padding-top: 0;
      padding-bottom: 0;
      gap: 12px;
      background-color: #f3f4f6;
    }
    
    .chat-container {
      flex-grow: 1;
      background: #f8f9fa;
      border-radius: 8px;
      padding: 12px;
      overflow-y: auto;
      font-size: 16px;
      line-height: 1.4;
      scrollbar-width: thin;
      scrollbar-color: #cbd5e1 transparent;
    }

    /* For Webkit browsers (Chrome, Safari) */
    .chat-container::-webkit-scrollbar {
      width: 6px;
    }

    .chat-container::-webkit-scrollbar-track {
      background: transparent;
    }

    .chat-container::-webkit-scrollbar-thumb {
      background-color: #cbd5e1;
      border-radius: 3px;
    }

    .chat-container::-webkit-scrollbar-thumb:hover {
      background-color: #94a3b8;
    }

    .chat-message {
      margin-bottom: 12px;
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .chat-message.question {
      font-weight: bold;
    }
    
    .chat-message.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .chat-message.headline {
      font-size: 24px;
      font-weight: bold;
    }

    .review-link {
      cursor: pointer;
      color: inherit;
      text-decoration: none;
    }

    .review-link:hover {
      text-decoration: underline;
    }
    
    .suggested-questions {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    
    .question-btn {
      background: #e9ecef;
      border: none;
      padding: 8px 12px;
      border-radius: 6px;
      text-align: left;
      cursor: pointer;
      transition: background-color 0.2s ease;
      font-size: 16px;
      color: #495057;
    }
    
    .question-btn:hover {
      background: #dee2e6;
    }
    
    .typing-animation::after {
      content: '▋';
      animation: blink 1s step-end infinite;
    }
    
    @keyframes blink {
      50% { opacity: 0; }
    }

    .header h1 {
      font-size: 64px;
      margin: 0;
      font-weight: 900;
    }

    .article p {
      font-size: 24px;
      margin: 20px 0;
      color: #444;
    }

    .input-container {
      display: flex;
      align-items: center;
      background: #FFFFFF;
      border-radius: 6px;
      padding: 6px 8px;
      gap: 8px;
    }

    .chat-input {
      flex: 1;
      border: none;
      background: transparent;
      font-size: 16px;
      color: #495057;
      outline: none;
      padding: 4px;
    }

    .chat-input::placeholder {
      color: #6c757d;
    }

    .submit-button {
      background: #c53746;
      border: none;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: background-color 0.2s ease;
    }

    .submit-button:hover {
      background: #0052cc;
    }

    .submit-button svg {
      width: 14px;
      height: 14px;
      fill: white;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="image-panel">
      <img src="https://i.imgur.com/8dRZLUs.png" alt="Ultra Trail Mont Blanc" id="mainImage">
      <button class="add-to-cart" id="addToCartBtn">Add to Cart</button>
    </div>
    
    <div class="interactive-panel">
      <div class="chat-container" id="chatContainer">
        <div class="chat-message visible headline">
          Your Adventure Starts Here
        </div>
        <div class="chat-message visible">
         Ultramarathons and weekend hikes start with Marmot. High-quality hiking gear & apparel – battle-tested for the mountains or your own backyard.
        </div>
      </div>
      
      <div class="suggested-questions">
        <button class="question-btn" data-question="What gear do I need for a 100+ mile ultra?">
          What gear do I need for a 100+ mile ultra?
        </button>
        <button class="question-btn" data-question="How should I carry water during an ultra?">
          How should I carry water during an ultra?
        </button>
        <div class="input-container">
          <input 
            type="text" 
            class="chat-input" 
            placeholder="Ask a question..." 
            id="chatInput"
          >
          <button class="submit-button" id="submitButton">
            <svg viewBox="0 0 24 24">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>

  <script>
    const hydrationBranch = {
      response: "For ultra-distance events, Salomon's ADV SKIN series hydration vests are ideal. They feature:\\n\\n" +
        "• Dual soft flask compatibility\\n" +
        "• Multiple storage pockets\\n" +
        "• Bounce-free design\\n" +
        "• Custom-like fit with SensiFit system",
      followUpQuestions: [
        "What's the difference between 5L and 12L vests?",
        "How do I fit a hydration vest properly?",
        "Customer reviews"
      ],
      imageUrl: "https://www.rei.com/media/03a889d1-ab6c-40a0-8a4c-623a6565aef1?size=2000",
      productUrl: "https://www.rei.com/product/171390/salomon-adv-skin-12-set-hydration-vest?sku=1713900018&store=138&CAWELAID=120217890013963092&CAGPSPN=pla&CAAGID=111217909896&CATCI=pla-906664570264&cm_mmc=PLA_Google%7C21700000001700551_1713900018%7C92700057782320281%7CNB%7C71700000074093058&gad_source=1&gclid=CjwKCAjw-JG5BhBZEiwAt7JR64HWYZtMkSkBH0dIfQVMvgokzL0nmeXBlts6dklg6W0jg57-vZQm5xoC9YcQAvD_BwE&gclsrc=aw.ds"
    };

    const responses = {
      "What shoes are best for technical alpine trails?":
        "For technical alpine trails like UTMB, you'll want shoes with:\\n\\n" +
        "• Aggressive outsole lugs (5-6mm) for grip\\n" +
        "• Rock plate protection\\n" +
        "• Balanced cushioning for long descents\\n" +
        "• Durable upper with toe protection\\n\\n" +
        "Top choices include the Hoka Speedgoat, La Sportiva Bushido II, and Salomon S/Lab Ultra 3.",
      
      "What gear do I need for a 100+ mile ultra?": 
        "Essential gear for a 100+ mile ultra includes:\\n\\n" +
        "• Hydration vest (12-15L capacity)\\n" +
        "• Waterproof jacket & pants\\n" +
        "• Emergency blanket & first aid\\n" +
        "• Headlamp + backup batteries\\n" +
        "• Nutrition (gels, bars, salt tabs)\\n" +
        "• 2 water bottles/soft flasks\\n" +
        "• Trekking poles for climbs",
      
      "What's the difference between 5L and 12L vests?": 
        "The ADV SKIN 5 is perfect for shorter ultras (up to 50 miles) with minimal mandatory gear. The 12L offers extra storage for required equipment at races like UTMB, including emergency gear and extra layers.",
      
      "How do I fit a hydration vest properly?": 
        "Salomon's unique SensiFit system ensures a precise fit:\\n\\n" +
        "• Start with shoulder straps\\n" +
        "• Adjust sternum straps\\n" +
        "• Fine-tune side compression\\n" +
        "• Test with full flasks",
      
      "Customer reviews": 
        "<a href=\\"https://www.reddit.com/r/trailrunning/comments/12t7nhz/comment/jh1abt3/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button\\" class=\\\"review-link\\\" target=\\\"_blank\\\">The ADV Skin is a godsend, I absolutely love mine. I think it's considered a step up from the Active Skin, but I have never owned that one, so I can't compare. I would always go for the 12l version, because it weighs almost the same as the 5l, doesn't flap around even when half empty and offers you a lot more versatility.</a>"
    };

    function updateImage(url) {
      const img = document.getElementById('mainImage');
      const addToCartBtn = document.getElementById('addToCartBtn');
      img.style.opacity = '0';
      setTimeout(() => {
        img.src = url;
        img.style.opacity = '1';
        addToCartBtn.classList.add('visible');
        addToCartBtn.onclick = () => window.open(hydrationBranch.productUrl, '_blank');
      }, 300);
    }

    function clearChat() {
      const chatContainer = document.getElementById('chatContainer');
      chatContainer.innerHTML = '';
    }

    function updateQuestions(questions) {
      const questionsContainer = document.querySelector('.suggested-questions');
      questionsContainer.innerHTML = '';
      
      questions.forEach(question => {
        const button = document.createElement('button');
        button.className = 'question-btn';
        button.setAttribute('data-question', question);
        button.textContent = question;
        button.addEventListener('click', handleQuestionClick);
        questionsContainer.appendChild(button);
      });
    }

    async function typeMessage(element, text) {
      element.classList.add('typing-animation');
      let index = 0;
      const speed = 20;
      
      return new Promise(resolve => {
        function addChar() {
          if (index < text.length) {
            if (text.startsWith('<a')) {
              element.innerHTML = text;
              resolve();
              return;
            }
            element.textContent += text.charAt(index);
            index++;
            setTimeout(addChar, speed);
          } else {
            element.classList.remove('typing-animation');
            resolve();
          }
        }
        element.textContent = '';
        addChar();
      });
    }

    async function handleQuestionClick(event) {
      const question = event.target.getAttribute('data-question');
      clearChat();
      
      if (question === "How should I carry water during an ultra?") {
        updateImage(hydrationBranch.imageUrl);
        
        const questionElement = document.createElement('div');
        questionElement.className = 'chat-message question';
        questionElement.textContent = question;
        chatContainer.appendChild(questionElement);
        
        const responseElement = document.createElement('div');
        responseElement.className = 'chat-message';
        chatContainer.appendChild(responseElement);
        
        setTimeout(() => questionElement.classList.add('visible'), 100);
        setTimeout(() => responseElement.classList.add('visible'), 200);
        
        await typeMessage(responseElement, hydrationBranch.response);
        updateQuestions(hydrationBranch.followUpQuestions);
        
      } else if (question === "Customer reviews") {
        const questionElement = document.createElement('div');
        questionElement.className = 'chat-message question';
        questionElement.textContent = question;
        chatContainer.appendChild(questionElement);
        
        const responseElement = document.createElement('div');
        responseElement.className = 'chat-message';
        chatContainer.appendChild(responseElement);
        
        setTimeout(() => questionElement.classList.add('visible'), 100);
        setTimeout(() => responseElement.classList.add('visible'), 200);
        
        await typeMessage(responseElement, responses[question]);
        
      } else if (responses[question]) {
        const questionElement = document.createElement('div');
        questionElement.className = 'chat-message question';
        questionElement.textContent = question;
        chatContainer.appendChild(questionElement);
        
        const responseElement = document.createElement('div');
        responseElement.className = 'chat-message';
        chatContainer.appendChild(responseElement);
        
        setTimeout(() => questionElement.classList.add('visible'), 100);
        setTimeout(() => responseElement.classList.add('visible'), 200);
        
        await typeMessage(responseElement, responses[question]);
      }
      
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    document.querySelectorAll('.question-btn').forEach(button => {
      button.addEventListener('click', handleQuestionClick);
    });

    document.getElementById('addToCartBtn').addEventListener('click', () => {
      window.open(hydrationBranch.productUrl, '_blank');
    });

    document.getElementById('chatInput').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        handleUserInput();
      }
    });

    document.getElementById('submitButton').addEventListener('click', handleUserInput);

    function handleUserInput() {
      const input = document.getElementById('chatInput');
      const question = input.value.trim();
      
      if (question) {
        clearChat();
        
        const questionElement = document.createElement('div');
        questionElement.className = 'chat-message question';
        questionElement.textContent = question;
        chatContainer.appendChild(questionElement);
        
        const responseElement = document.createElement('div');
        responseElement.className = 'chat-message';
        chatContainer.appendChild(responseElement);
        
        setTimeout(() => questionElement.classList.add('visible'), 100);
        setTimeout(() => responseElement.classList.add('visible'), 200);
        
        // Default response for custom questions
        const response = "Thanks for your question! I'm just a demo for illustrative purposes. Check out the search ad demo for ads with live chat experiences.";
        
        typeMessage(responseElement, response);
        input.value = '';
      }
    }
  </script>
</body>
</html>
  `;

  return (
    <>
      <Head>
        <title>UTMB: The Ultimate Test of Trail Running Endurance</title>
        <meta
          name="description"
          content="Exploring the World's Most Prestigious Mountain Ultra"
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
          className="relative bg-black/70 bg-[url('https://cdn.midjourney.com/316ef505-6565-4b09-a356-c309cd0b4cd5/0_3.png')] bg-cover bg-center bg-blend-overlay text-white py-24 px-5 text-center"
        >
          <h1 className="text-5xl font-bold m-0">UTMB: The Ultimate Test of Trail Running Endurance</h1>
          <p className="text-xl mt-5 opacity-90">Exploring the World&apos;s Most Prestigious Mountain Ultra</p>
        </div>

        <main className="max-w-[970px] mx-auto px-5 py-10">
          <div className="text-sm text-gray-600 mb-8 pb-5 border-b border-gray-200">
            <span>By Steven Liss</span> | 
            <span> November 1, 2024</span> | 
            <span> 12 minute read</span>
          </div>

          <article>
            <p className="text-lg text-gray-700 my-5">
              The Ultra-Trail du Mont-Blanc (UTMB) stands as a towering monument in the world of ultra-trail running, drawing thousands of athletes and spectators to the picturesque Alps each year. This legendary race, which circumnavigates the Mont Blanc massif, passes through three countries and challenges runners with 171 kilometers of mountain terrain and 10,000 meters of elevation gain.
            </p>

            <div className="my-8">
              <Image 
                src="https://i.imgur.com/ss9qtU0.jpeg" 
                alt="Trail runners at UTMB start line" 
                width={800} 
                height={400} 
                className="rounded-lg object-cover w-full h-[400px]"
              />
              <p className="text-sm text-gray-600 text-center mt-2 mb-8">
                Above Chamonix. Photo: Steven Liss
              </p>
            </div>

            <p className="text-lg text-gray-700 my-5">
              What makes UTMB particularly unique is not just its distance or elevation gain, but the combination of technical terrain, unpredictable Alpine weather, and the sheer mental fortitude required to complete the journey. Runners must navigate rocky trails, steep ascents, and treacherous descents while managing their nutrition, hydration, and equipment through day and night.
            </p>

            <p className="text-lg text-gray-700 my-5">
              The race begins and ends in Chamonix, France, but takes participants through Italy&apos;s Courmayeur and Switzerland&apos;s Champex-Lac, offering a truly international mountain running experience. Elite athletes typically complete the course in around 20 hours, while many participants take up to 46 hours – the official time limit – to reach the finish line.
            </p>

            <div className="my-10 bg-gray-100 p-5 rounded-lg">
              <iframe
                srcDoc={iframeContent}
                width="970"
                height="250"
                frameBorder="0"
                scrolling="no"
                sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
              />
            </div>

            <blockquote className="text-2xl italic text-gray-600 border-l-4 border-[#c53746] pl-5 my-8">
              &quot;UTMB is more than a race – it&apos;s a journey that tests every aspect of human endurance and determination.&quot;
            </blockquote>

            <div className="my-8">
              <Image 
                src="https://i.imgur.com/sedBjpP.png" 
                alt="Carb loading in Chamonix" 
                width={800} 
                height={400} 
                className="rounded-lg object-cover w-full h-[400px]"
              />
              <p className="text-sm text-gray-600 text-center mt-2 mb-8">
                The majestic Mont Blanc serves as both backdrop and challenge. Photo: Alps/Example
              </p>
            </div>

            <p className="text-lg text-gray-700 my-5">
              The race has become so prestigious that qualifying for UTMB is an achievement in itself. Runners must collect qualifying points from other ultra-trail races during the preceding year, leading to a complex system of preparation and planning that often spans multiple years.
            </p>

            {/* Add remaining paragraphs and images similarly... */}
          </article>
        </main>
      </div>
    </>
  );
} 