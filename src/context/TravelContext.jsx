import React, { createContext, useContext, useState, useEffect } from 'react';

const TravelContext = createContext();

export const useTravel = () => useContext(TravelContext);

const defaultDestinations = [
  {
    id: 'dest-france',
    name: 'France 🇫🇷',
    score: 3.8,
    vegScore: 4.0,
    jainScore: 2.5,
    veganScore: 4.5,
    bestFor: 'Vegan',
    tags: ['Vegan friendly'],
    img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    description: 'Classic French cuisine is butter and meat-heavy, but Paris has a booming vegan scene.',
    weather: '15°C - 24°C (Best: May - Oct)',
    budget: 'Luxury',
    mapUrl: 'https://maps.google.com/?q=Paris,France',
    overview: 'France is transitioning. While rural bistros remain traditional, urban centers (especially Paris) host some of the world\'s most creative plant-based fine dining, bio bakeries with eggless selections, and dedicated vegan cafes.',
    safeFoods: ['Ratatouille (Stewed vegetables)', 'Baguettes (Usually yeast/flour only)', 'Sorbet (Fruit-based, eggless)', 'Vegan Croissants (Specialty bakeries)'],
    warningFoods: ['Standard Croissants (Egg wash & butter)', 'French Onion Soup (Beef broth base)', 'Crêpes (Contain eggs in batter)', 'Salade Niçoise (Contains tuna/eggs)'],
    restaurants: [
      { name: 'Le Potager de Charlotte', address: '12 Rue de la Tour d\'Auvergne, Paris', desc: 'Creative, upscale plant-based French dining.', type: 'Vegan' },
      { name: 'Saravanaa Bhavan', address: '170 Rue du Faubourg Saint-Denis, Paris', desc: '100% vegetarian South Indian food, Jain preparations available.', type: 'Jain' },
      { name: 'Wild & The Moon', address: '55 Rue Charlot, Paris', desc: 'Organic, gluten-free, cold-pressed juices and vegan breakfast bowls.', type: 'Vegan' }
    ],
    attractions: ['Eiffel Tower', 'Louvre Museum', 'Montmartre & Sacré-Cœur', 'Seine River Cruise'],
    experiences: [
      { id: 'exp-f-1', title: 'Paris Secret Vegan Croissant Walk', price: '₹4,800', partnerId: 'gyg' },
      { id: 'exp-f-2', title: 'Louvre Fast-Track Entry Ticket', price: '₹2,400', partnerId: 'klook' }
    ],
    hotels: [
      { name: 'HOY Paris', rating: '4.8★', desc: 'A yoga-focused, fully vegan hotel in Pigalle with a plant-based restaurant.', url: 'booking' },
      { name: 'Hotel Regina Louvre', rating: '4.7★', desc: 'Historic luxury hotel offering Jain meals upon 24-hour advance request.', url: 'booking' }
    ],
    tips: [
      'Always ask "Est-ce que c\'est végétalien?" (Is it vegan?) or "Sans œuf?" (Without egg?)',
      'Look for bio (organic) supermarkets like Naturalia for quick vegan cheese and snacks.',
      'French bread (Baguette) is legally protected and free of dairy/eggs. Classic pastries are NOT.'
    ]
  },
  {
    id: 'dest-italy',
    name: 'Italy 🇮🇹',
    score: 4.8,
    vegScore: 4.9,
    jainScore: 4.2,
    veganScore: 4.3,
    bestFor: 'Jain & Veg',
    tags: ['Jain friendly', 'Budget friendly'],
    img: 'https://images.unsplash.com/photo-1516483638261-f40af5a52c17?auto=format&fit=crop&w=800&q=80',
    description: 'Extremely vegetarian-friendly with pasta, pizza, and fresh produce. Jain options require slight customization.',
    weather: '18°C - 30°C (Best: Apr - Oct)',
    budget: 'Medium',
    mapUrl: 'https://maps.google.com/?q=Rome,Italy',
    overview: 'Italy is a natural paradise for vegetarians. Olive oil is the primary cooking fat, and staple dishes rely on tomatoes, basil, mozzarella, and durum wheat. With a simple warning, chefs are highly accommodating to onion/garlic-free Jain needs.',
    safeFoods: ['Pizza Marinara (No cheese, garlic/oil/tomato base)', 'Penne all\'Arrabbiata (Spicy tomato)', 'Bruschetta al Pomodoro (Tomato toast)', 'Egg-free Gnocchi'],
    warningFoods: ['Pesto (Contains animal rennet/cheese)', 'Traditional Tiramisu (Contains raw eggs & gelatin)', 'Brodo di Carne (Meat broth in risottos)', 'Cacio e Pepe (Cheese contains animal rennet)'],
    restaurants: [
      { name: 'Saravanaa Bhavan Rome', address: 'Via Carlo Alberto 7, Rome', desc: 'Pure South Indian, Jain options available.', type: 'Jain' },
      { name: 'Il Margutta', address: 'Via Margutta 118, Rome', desc: 'Upscale vegetarian restaurant. Ask for onion-garlic-free choices.', type: 'Vegetarian' },
      { name: 'Govinda Florence', address: 'Via de Giraldi 25r, Florence', desc: 'Hare Krishna kitchen serving pure vegetarian, onion-garlic-free meals.', type: 'Jain' }
    ],
    attractions: ['Colosseum & Roman Forum', 'Florence Cathedral', 'Venice Grand Canal Gondola', 'Vatican Museums'],
    experiences: [
      { id: 'exp-i-1', title: 'Rome Vegan Pasta & Pizza Making Class', price: '₹5,200', partnerId: 'gyg' },
      { id: 'exp-i-2', title: 'Colosseum Skip-the-Line Entry Tickets', price: '₹2,400', partnerId: 'klook' }
    ],
    hotels: [
      { name: 'Hotel Artemide Rome', rating: '4.7★', desc: 'Highly accommodating rooftop hotel offering dedicated vegetarian breakfast menus.', url: 'booking' },
      { name: 'Grand Hotel Baglioni Florence', rating: '4.5★', desc: 'Panoramic views and high-quality customized breakfast baskets.', url: 'booking' }
    ],
    tips: [
      'Ask "Senza strutto?" to ensure no pig fat is used in the bread or pizza dough.',
      'Check if cheese uses "caglio vegetale" (microbial/vegetable rennet). Parmigiano-Reggiano always uses animal rennet.',
      'Gelaterias usually label their fruit flavors as "Frutta" which are water-based and vegan.'
    ]
  },
  {
    id: 'dest-switzerland',
    name: 'Switzerland 🇨🇭',
    score: 4.5,
    vegScore: 4.6,
    jainScore: 4.4,
    veganScore: 4.0,
    bestFor: 'Vegetarian',
    tags: ['Jain friendly'],
    img: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    description: 'Very accommodating, large Indian diaspora means Indian restaurants are easy to find.',
    weather: '8°C - 22°C (Best: Jun - Sep / Dec - Mar)',
    budget: 'Luxury',
    mapUrl: 'https://maps.google.com/?q=Zurich,Switzerland',
    overview: 'Switzerland blends natural beauty with premium vegetarian culture. It is home to the world\'s oldest vegetarian restaurant (Hiltl). The massive influx of South Asian tourists has made Interlaken and Lucerne hubs for authentic Jain and vegetarian cuisines.',
    safeFoods: ['Rösti (Grated potato pancake, check for bacon)', 'Cheese Fondue (Without alcohol/kirsch if preferred)', 'Swiss Milk & Dark Chocolates', 'Vegetable Raclette'],
    warningFoods: ['Fondue with Kirsch (Alcohol warning)', 'Soups/Bouillons (Often use beef bouillon stock)', 'Alpine Macaroni (Contains bacon bits by default)', 'Traditional Gravies'],
    restaurants: [
      { name: 'Hiltl Zurich', address: 'Sihlstrasse 28, Zurich', desc: 'Oldest continuously open vegetarian restaurant (Guinness Book). Over 100 buffet items.', type: 'Vegetarian' },
      { name: 'Spice India Interlaken', address: 'Postgasse 6, Interlaken', desc: 'North/South Indian food with clear veg & Jain choices.', type: 'Jain' },
      { name: 'Tibits Lucerne', address: 'Zentralstrasse 1, Lucerne', desc: 'Stylish buffet style vegetarian and vegan food next to the station.', type: 'Vegetarian' }
    ],
    attractions: ['Mount Titlis Snow Resort', 'Jungfraujoch - Top of Europe', 'Lake Lucerne Cruise', 'Zurich Old Town'],
    experiences: [
      { id: 'exp-s-1', title: 'Mount Titlis Snow Day Tour from Zurich', price: '₹14,500', partnerId: 'klook' },
      { id: 'exp-s-2', title: 'Swiss Chocolate Museum Ticket Lucerne', price: '₹3,200', partnerId: 'gyg' }
    ],
    hotels: [
      { name: 'Hotel Schweizerhof Zurich', rating: '4.8★', desc: 'Luxurious station-front hotel with chef-curated vegan and Jain selections.', url: 'booking' },
      { name: 'Victoria-Jungfrau Grand Hotel Interlaken', rating: '4.9★', desc: 'Five-star historic hotel in the Alps with bespoke Indian catering.', url: 'booking' }
    ],
    tips: [
      'Check supermarket chains Coop and Migros. They have extensive vegan/veggie sections (Karma brand).',
      'Specify "Kein fleisch, kein speck" (no meat, no bacon) when ordering Rösti.',
      'Swiss tap water is pristine and free. Carry a reusable bottle to save money.'
    ]
  }
];

const defaultItineraries = [
  {
    id: 'itinerary-1',
    title: '7-Day Jain Italy Classic Tour',
    destinationId: 'dest-italy',
    country: 'Italy',
    cities: ['Rome', 'Florence', 'Venice'],
    duration: '7 Days',
    budget: 'Medium',
    bestTimeToVisit: 'April - October',
    difficulty: 'Easy',
    vegScore: 9.8,
    jainScore: 9.0,
    veganScore: 8.2,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
    restaurants: [
      { name: 'Saravanaa Bhavan (Rome)', address: 'Via Carlo Alberto 7, Rome', desc: '100% vegetarian South Indian food, Jain preparations available.' },
      { name: 'Il Margutta (Rome)', address: 'Via Margutta 118, Rome', desc: 'Upscale vegetarian restaurant. Ask for no onion/garlic options.' },
      { name: 'Govinda (Florence)', address: 'Via de Giraldi 25r, Florence', desc: 'Hare Krishna restaurant serving pure vegetarian, onion-garlic-free meals.' }
    ],
    hotels: [
      { name: 'Hotel Artemide (Rome)', rating: '4.7★', desc: 'Highly accommodating to dietary needs with a gorgeous rooftop bar.' },
      { name: 'Grand Hotel Baglioni (Florence)', rating: '4.5★', desc: 'Historic hotel near the station with spectacular views.' }
    ],
    mapUrl: 'https://maps.google.com/?q=Rome,Florence,Venice,Italy',
    pdfs: [
      { name: 'Italy Jain Dining Translation Card (PDF)', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { name: 'Rome Colosseum Entry Guide (PDF)', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }
    ],
    tips: [
      'In Rome, tell servers "Sono giainista: niente cipolla, niente aglio, niente patate" (I am Jain: no onion, no garlic, no potatoes).',
      'Use fast-speed trains (Frecciarossa) to travel between Rome, Florence, and Venice to save time.',
      'Purchase public transit passes in Venice ahead of time on Klook to avoid long ticket lines.'
    ],
    packingList: ['Comfortable walking shoes', 'Modest clothes for Vatican entry (covered shoulders & knees)', 'Reusable water bottle', 'Jain ready-to-eat travel mixes', 'Universal plug adapter'],
    faqs: [
      { question: 'Is it hard to get onion-garlic free food in Italy?', answer: 'Not at all! Standard tomato pizzas (Marinara) and penne arrabbiata are easily made without garlic if requested. Dedicated Indian restaurants in Rome/Florence cater fully to Jain requirements.' },
      { question: 'Are train stations vegetarian-friendly?', answer: 'Yes, grab-and-go shops in Rome Termini and Florence SMN have fresh cheese focaccias, caprese sandwiches, and vegan fruit cups.' }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival in the Eternal City',
        description: 'Arrive in Rome, check into Hotel Artemide. In the evening, enjoy a sunset walking tour of Piazza Navona and Trevi Fountain, followed by a pure veg dinner at Il Margutta.',
        breakfast: 'Not included (flight arrival)',
        attractions: 'Piazza Navona, Pantheon, Trevi Fountain',
        lunch: 'Quick caprese pizza slice near Termini',
        activities: 'Rome walking orientation tour',
        dinner: 'Custom Jain multi-course dinner at Il Margutta',
        hotel: 'Hotel Artemide Rome'
      },
      {
        day: 2,
        title: 'Vatican & Colosseum Wonders',
        description: 'Explore the Vatican Museums & Sistine Chapel in the morning. In the afternoon, use your GetYourGuide skip-the-line pass for the Colosseum. Dine at Saravanaa Bhavan.',
        breakfast: 'Vetted Vegetarian buffet at Hotel Artemide',
        attractions: 'Colosseum, St. Peter\'s Basilica, Vatican Museums',
        lunch: 'Salad and juice bar near the Vatican',
        activities: 'Colosseum Guided Tour (Affiliate Booking)',
        dinner: 'Pure South Indian Jain Thali at Saravanaa Bhavan',
        hotel: 'Hotel Artemide Rome'
      },
      {
        day: 3,
        title: 'Train to Florence & Renaissance Art',
        description: 'Take a high-speed Frecciarossa train to Florence. Check in, then head to the Uffizi Gallery. Enjoy a peaceful dinner at Govinda.',
        breakfast: 'Hotel breakfast (ask for eggless cakes)',
        attractions: 'Piazza del Duomo, Uffizi Gallery',
        lunch: 'Bruschetta and salad at Florence Market',
        activities: 'Renaissance walking tour',
        dinner: 'Hare Krishna pure veg meal at Govinda',
        hotel: 'Grand Hotel Baglioni Florence'
      },
      {
        day: 4,
        title: 'Pisa Excursion & Cooking Class',
        description: 'Take a morning train to Pisa to see the Leaning Tower. Return to Florence for a private vegetarian pizza & pasta making workshop booked via Viator.',
        breakfast: 'Grand Hotel Baglioni Buffet',
        attractions: 'Leaning Tower of Pisa, Arno River',
        lunch: 'Vegetarian Panini in Pisa',
        activities: 'Private egg-free pasta workshop in Florence',
        dinner: 'Feast on your own hand-made pasta',
        hotel: 'Grand Hotel Baglioni Florence'
      },
      {
        day: 5,
        title: 'Venice Canal Romance',
        description: 'Train to Venice Santa Lucia. Board a water taxi to your hotel. Experience a private sunset gondola ride and explore St. Mark\'s Square.',
        breakfast: 'Grand Hotel Baglioni (Florence)',
        attractions: 'St. Mark\'s Square, Rialto Bridge',
        lunch: 'Vegan pasta-in-a-box from Dal Moro\'s',
        activities: 'Private sunset gondola ride (Klook Pass)',
        dinner: 'Vegan-friendly woodfired pizza in Venice',
        hotel: 'Hotel L\'Orologio Venice'
      },
      {
        day: 6,
        title: 'Murano & Burano Island Hopping',
        description: 'Take a boat trip to Murano for glass-blowing demonstrations, and Burano to see the colorful lace-making houses.',
        breakfast: 'Hotel L\'Orologio Breakfast',
        attractions: 'Murano Glass Foundries, Colorful Houses of Burano',
        lunch: 'Vegetable risotto at a Burano Osteria',
        activities: 'Islands tour by vaporetto boat',
        dinner: 'Indian vegetarian curry feast in Venice Mestre',
        hotel: 'Hotel L\'Orologio Venice'
      },
      {
        day: 7,
        title: 'Goodbye Bella Italia',
        description: 'Enjoy breakfast overlooking the canals, pack some eggless biscotti, and transfer to Venice Marco Polo Airport for departure.',
        breakfast: 'Canal-side breakfast at Hotel L\'Orologio',
        attractions: 'Venice Lagoon views',
        lunch: 'Pre-packed snacks on the way to airport',
        activities: 'Water taxi transfer to Venice Marco Polo Airport',
        dinner: 'In-flight Jain meal',
        hotel: 'None (Flight Home)'
      }
    ]
  },
  {
    id: 'itinerary-2',
    title: '5-Day Vegan Paris & Amsterdam Trail',
    destinationId: 'dest-france',
    country: 'France & Netherlands',
    cities: ['Paris', 'Amsterdam'],
    duration: '5 Days',
    budget: 'Luxury',
    bestTimeToVisit: 'May - September',
    difficulty: 'Moderate',
    vegScore: 9.5,
    jainScore: 6.8,
    veganScore: 9.9,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    restaurants: [
      { name: 'Le Potager de Charlotte (Paris)', address: '12 Rue de la Tour d\'Auvergne, Paris', desc: 'Creative, upscale plant-based French dining.' },
      { name: 'Wild & The Moon (Paris)', address: '55 Rue Charlot, Paris', desc: '100% organic, gluten-free, vegan breakfast and cold press juices.' },
      { name: 'Mr. & Mrs. Watson (Amsterdam)', address: 'Linnaeuskade 3h, Amsterdam', desc: 'Famous for award-winning housemade vegan cheeses and fondue.' },
      { name: 'Vegan Junk Food Bar (Amsterdam)', address: 'Marie Heinekenplein 9, Amsterdam', desc: 'Vibrant, colorful comfort food: burgers, loaded fries, and vegan fish.' }
    ],
    hotels: [
      { name: 'HOY Paris', rating: '4.8★', desc: 'A yoga-focused, fully vegan hotel in Pigalle with a plant-based restaurant.' },
      { name: 'Conscious Hotel Museum Square (Amsterdam)', rating: '4.6★', desc: 'Eco-friendly hotel serving 100% organic vegetarian breakfasts.' }
    ],
    mapUrl: 'https://maps.google.com/?q=Paris,Amsterdam',
    pdfs: [
      { name: 'Paris Vegan Bakery Checklist (PDF)', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { name: 'Amsterdam Vegan Cheese Map (PDF)', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }
    ],
    tips: [
      'In Paris, download the HappyCow app to locate hidden plant-based bakeries.',
      'Take the high-speed Thalys/Eurostar train from Paris Gare du Nord to Amsterdam Centraal (3.5 hours).',
      'Rent a bike in Amsterdam to traverse the canals like a local.'
    ],
    packingList: ['Light layers for changing weather', 'Reusable shopping bag', 'Rainwear / compact umbrella', 'HappyCow App download', 'Active credit card for cashless Amsterdam transit'],
    faqs: [
      { question: 'Do Parisian cafes have plant milks?', answer: 'Yes! Almost all trendy cafes in Montmartre, Pigalle, and Le Marais offer oat and soy milk options.' },
      { question: 'Is Amsterdam fully cashless?', answer: '90% of Amsterdam shops and tramcars accept card/contactless payments only. Keep cards ready.' }
    ],
    days: [
      {
        day: 1,
        title: 'Bonjour Paris & Plant-Based Bistro',
        description: 'Arrive in Paris and check into HOY. Spend the afternoon wandering through Montmartre. Indulge in an incredible vegan dinner at Le Potager de Charlotte.',
        breakfast: 'Not included (arrival day)',
        attractions: 'Montmartre, Sacré-Cœur, Pigalle district',
        lunch: 'Avocado toast and matcha latte at HOY cafe',
        activities: 'Montmartre walking exploration',
        dinner: 'Fine vegan dining at Le Potager de Charlotte',
        hotel: 'HOY Paris'
      },
      {
        day: 2,
        title: 'Eiffel Views & Vegan Croissants',
        description: 'Visit the Eiffel Tower and Louvre Museum. Grab lunch at Wild & The Moon. In the evening, do a Seine cruise with Klook.',
        breakfast: 'Organic vegan breakfast basket at HOY',
        attractions: 'Eiffel Tower, Louvre Museum, Seine River banks',
        lunch: 'Cold press juice and raw bowls at Wild & The Moon',
        activities: 'Seine River Sunset Cruise (Affiliate Booking)',
        dinner: 'Vegan burgers and fries at Hank Vegan Burger',
        hotel: 'HOY Paris'
      },
      {
        day: 3,
        title: 'Thalys Train to Amsterdam & Cheese Tasting',
        description: 'Board the high-speed train to Amsterdam. Rent a bike and cycle past canal houses. Book a table at Mr. & Mrs. Watson for their famous vegan cheese wheel fondue.',
        breakfast: 'Vegan croissants from Land & Singes bakery',
        attractions: 'Gare du Nord, Amsterdam Canals, Vondelpark',
        lunch: 'Pre-packed wraps on the high-speed train',
        activities: 'Canal bike cycling tour',
        dinner: 'Award-winning vegan cheese fondue at Mr. & Mrs. Watson',
        hotel: 'Conscious Hotel Museum Square Amsterdam'
      },
      {
        day: 4,
        title: 'Van Gogh & Vegan Junk Food',
        description: 'Visit the Van Gogh Museum. Afternoon cycle through Vondelpark. Feast on bright purple buns and loaded vegan fries at Vegan Junk Food Bar.',
        breakfast: 'Conscious Hotel organic vegetarian breakfast buffet',
        attractions: 'Van Gogh Museum, Rijksmuseum, Vondelpark',
        lunch: 'Sourdough toast at a local plant-based bakery',
        activities: 'Van Gogh Museum ticket skip-the-line (Affiliate Booking)',
        dinner: 'Vibrant burgers and loaded fries at Vegan Junk Food Bar',
        hotel: 'Conscious Hotel Museum Square Amsterdam'
      },
      {
        day: 5,
        title: 'Canal Cruise & Farewell',
        description: 'Enjoy an eco-friendly canal boat cruise with GetYourGuide. Pick up vegan stroopwafels at the station and depart.',
        breakfast: 'Hotel organic buffet',
        attractions: 'Jordaan district, Amsterdam Centraal',
        lunch: 'Vegan stroopwafels and hot coffee',
        activities: 'Amsterdam Canal Cruise with GYG (Affiliate Booking)',
        dinner: 'Departure flight meals',
        hotel: 'None (Flight Home)'
      }
    ]
  },
  {
    id: 'itinerary-3',
    title: '6-Day Swiss Alps Vegetarian Escape',
    destinationId: 'dest-switzerland',
    country: 'Switzerland',
    cities: ['Zurich', 'Interlaken', 'Lucerne'],
    duration: '6 Days',
    budget: 'Luxury',
    bestTimeToVisit: 'June - September',
    difficulty: 'Moderate',
    vegScore: 9.9,
    jainScore: 9.2,
    veganScore: 7.5,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    restaurants: [
      { name: 'Hiltl (Zurich)', address: 'Sihlstrasse 28, Zurich', desc: 'Guinness World Record holder for the oldest continuously open vegetarian restaurant.' },
      { name: 'Spice India (Interlaken)', address: 'Postgasse 6, Interlaken', desc: 'Delicious North/South Indian food with clear veg & Jain choices.' },
      { name: 'Tibits (Lucerne)', address: 'Zentralstrasse 1, Lucerne', desc: 'Stylish buffet style vegetarian and vegan food right next to the station.' }
    ],
    hotels: [
      { name: 'Hotel Schweizerhof (Zurich)', rating: '4.8★', desc: 'Luxurious hotel located opposite the main station with top-tier service.' },
      { name: 'Victoria-Jungfrau Grand Hotel (Interlaken)', rating: '4.9★', desc: 'Five-star historic hotel in the heart of the Alps.' }
    ],
    mapUrl: 'https://maps.google.com/?q=Zurich,Interlaken,Lucerne,Switzerland',
    pdfs: [
      { name: 'Swiss Alps Hiking & Train Guide (PDF)', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { name: 'Hiltl Vegetarian Recipe Sampler (PDF)', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }
    ],
    tips: [
      'Buy a Swiss Travel Pass on Klook. It covers all trains, boats, buses, and offers free entry to 500+ museums.',
      'Hot water is charged at Swiss restaurants. Bring a thermal flask and fill it up at your hotel.',
      'Indian buffet spreads in Interlaken get crowded in the evening. Book tables in advance.'
    ],
    packingList: ['Sturdy hiking/mountain shoes', 'Warm thermal fleece jacket', 'Sunglasses and sunscreen (high snow glare)', 'Refillable thermal flask', 'Swiss Travel Pass printout'],
    faqs: [
      { question: 'Can I get Jain food at mountain tops?', answer: 'Yes! Jungfraujoch and Mount Titlis summit restaurants have dedicated Indian buffet rooms with onion-garlic-free dal, rice, and mixed vegetable curries.' },
      { question: 'Is the Swiss Travel Pass worth it?', answer: 'Absolutely. Individual tickets in Switzerland are expensive. The Travel Pass offers massive savings and total flexibility.' }
    ],
    days: [
      {
        day: 1,
        title: 'Welcome to Zurich & Historic Hiltl Buffet',
        description: 'Arrive in Zurich. Head straight to the famous Hiltl, browsing over 100 vegetarian specialties. Walk around Lake Zurich.',
        breakfast: 'None (arrival)',
        attractions: 'Zurich Bahnhofstrasse, Lake Zurich, Limmat River',
        lunch: 'Gourmet vegetarian buffet lunch at Hiltl',
        activities: 'Zurich Old Town walking tour',
        dinner: 'Light vegetarian soups and bread at Tibits Zurich',
        hotel: 'Hotel Schweizerhof Zurich'
      },
      {
        day: 2,
        title: 'Lucerne & Mount Pilatus Adventure',
        description: 'Take a scenic train to Lucerne. Ascend Mount Pilatus via the steepest cogwheel railway. Have dinner at Tibits.',
        breakfast: 'Luxury breakfast at Hotel Schweizerhof',
        attractions: 'Chapel Bridge, Lion Monument, Mount Pilatus Summit',
        lunch: 'Picnic at Mount Pilatus panoramic deck (Swiss cheese, rolls)',
        activities: 'Pilatus Golden Round Trip (Affiliate Booking)',
        dinner: 'Freshly assembled veg salad and hot plates at Tibits Lucerne',
        hotel: 'Hotel Schweizerhof Zurich'
      },
      {
        day: 3,
        title: 'Scenic GoldenPass to Interlaken',
        description: 'Travel on the panoramic train to Interlaken. Stroll through the Höhematte park. Enjoy dinner at Spice India.',
        breakfast: 'Hotel Schweizerhof hot buffet',
        attractions: 'Brunig Pass, Höhematte Meadow Interlaken, Lake Brienz',
        lunch: 'Swiss bakery pastries (eggless fruit tarts)',
        activities: 'GoldenPass Express Train journey (Swiss Pass)',
        dinner: 'Indian vegetarian curry and roti at Spice India Interlaken',
        hotel: 'Victoria-Jungfrau Grand Hotel Interlaken'
      },
      {
        day: 4,
        title: 'Jungfraujoch - Top of Europe',
        description: 'Embark on an epic train ride to Jungfraujoch. Enjoy snow activities and visit the Ice Palace. Warm up with hot veggie curries in the mountain-top restaurant.',
        breakfast: 'Victoria-Jungfrau Grand Buffet',
        attractions: 'Jungfraujoch Summit, Sphinx Observatory, Ice Palace',
        lunch: 'Indian Vegetarian Buffet at Jungfraujoch peak restaurant',
        activities: 'Top of Europe Alpine Train experience (Affiliate Booking)',
        dinner: 'Tasca veggie Italian pizza in Interlaken',
        hotel: 'Victoria-Jungfrau Grand Hotel Interlaken'
      },
      {
        day: 5,
        title: 'Swiss Chocolate Making & Lake Cruise',
        description: 'Participate in a hands-on Swiss chocolate making workshop with Viator. In the afternoon, take a relaxing cruise on Lake Thun.',
        breakfast: 'Victoria-Jungfrau buffet',
        attractions: 'Lake Thun, Spiez Castle',
        lunch: 'Sourdough sandwiches and hot chocolate at local bakery',
        activities: 'Chocolate Academy workshop in Lucerne/Interlaken (Affiliate Booking)',
        dinner: 'Organic local veggie platters at Victoria-Jungfrau bistro',
        hotel: 'Victoria-Jungfrau Grand Hotel Interlaken'
      },
      {
        day: 6,
        title: 'Return to Zurich & Departure',
        description: 'Take the train back to Zurich, shop for premium Swiss chocolates, and catch your flight home.',
        breakfast: 'Victoria-Jungfrau breakfast',
        attractions: 'Zurich Bahnhofstrasse shopping',
        lunch: 'Pre-flight quick snack at Zurich Flughafen',
        activities: 'Airport rail shuttle transfer',
        dinner: 'In-flight meal',
        hotel: 'None (Flight Home)'
      }
    ]
  }
];

const defaultAffiliatePartners = [
  {
    id: 'gyg',
    name: 'GetYourGuide',
    logo: '🍊',
    url: 'https://www.getyourguide.com/explorer/creators/-cs5088/',
    code: 'SPINACH10',
    discount: '10% OFF',
    description: 'Save 10% on Europe guided walking tours, fast-track museum entries, and vetted vegan cooking classes.',
    buttonText: 'Book on GetYourGuide',
    expiryDate: '2026-12-31'
  },
  {
    id: 'klook',
    name: 'Klook',
    logo: '🧡',
    url: 'https://www.klook.com/',
    code: 'SPINACH5',
    discount: '5% OFF',
    description: 'Get an extra 5% off on Swiss Travel Passes, airport train transfers, theme parks, and pocket Wi-Fi cards.',
    buttonText: 'Book on Klook',
    expiryDate: ''
  },
  {
    id: 'booking',
    name: 'Booking.com',
    logo: '🏨',
    url: 'https://www.booking.com/',
    code: 'SPINACHHOTEL',
    discount: '8% CASHBACK',
    description: 'Earn 8% direct cash-back and unlock Genius perks on verified vegetarian-friendly and vegan hotels.',
    buttonText: 'Book Hotels',
    expiryDate: ''
  },
  {
    id: 'viator',
    name: 'Viator',
    logo: '🌟',
    url: 'https://www.viator.com/',
    code: 'SPINACHVIATOR',
    discount: '7% OFF',
    description: 'Claim 7% off on private street food crawls, skip-the-line attraction passes, and day trips in Europe.',
    buttonText: 'Book Tours',
    expiryDate: ''
  },
  {
    id: 'skyscanner',
    name: 'Skyscanner',
    logo: '✈️',
    url: 'https://www.skyscanner.net/',
    code: 'SPINACHFLIGHT',
    discount: 'Special Rates',
    description: 'Compare cheapest flight deals with built-in filters to request Vegetarian, Vegan, or Jain hot meal plans.',
    buttonText: 'Compare Flights',
    expiryDate: ''
  }
];

export const TravelProvider = ({ children }) => {
  const [destinations, setDestinations] = useState(() => {
    const saved = localStorage.getItem('spinach_destinations');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error('Failed to parse destinations', e); }
    }
    return defaultDestinations;
  });

  const [itineraries, setItineraries] = useState(() => {
    const saved = localStorage.getItem('spinach_itineraries');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error('Failed to parse itineraries', e); }
    }
    return defaultItineraries;
  });

  const [savedItineraryIds, setSavedItineraryIds] = useState(() => {
    const saved = localStorage.getItem('spinach_saved_itinerary_ids');
    return saved ? JSON.parse(saved) : ['itinerary-1'];
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('spinach_bookings');
    return saved ? JSON.parse(saved) : [
      {
        id: 'b-1',
        type: 'flight',
        provider: 'Skyscanner',
        title: 'Air India: Delhi (DEL) to Paris (CDG)',
        price: '₹54,200',
        date: '2026-07-15',
        details: 'Veg Meal Requested. Departs 13:20, Non-stop.'
      },
      {
        id: 'b-2',
        type: 'hotel',
        provider: 'Booking.com',
        title: 'HOY Paris (Vegan Hotel)',
        price: '₹48,000 (3 Nights)',
        date: '2026-07-15 to 2026-07-18',
        details: '100% Plant-Based Breakfast Included.'
      }
    ];
  });

  const [affiliatePartners, setAffiliatePartners] = useState(() => {
    const saved = localStorage.getItem('spinach_affiliate_partners');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error('Failed to parse affiliate partners', e); }
    }
    return defaultAffiliatePartners;
  });

  useEffect(() => {
    localStorage.setItem('spinach_destinations', JSON.stringify(destinations));
  }, [destinations]);

  useEffect(() => {
    localStorage.setItem('spinach_itineraries', JSON.stringify(itineraries));
  }, [itineraries]);

  useEffect(() => {
    localStorage.setItem('spinach_saved_itinerary_ids', JSON.stringify(savedItineraryIds));
  }, [savedItineraryIds]);

  useEffect(() => {
    localStorage.setItem('spinach_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('spinach_affiliate_partners', JSON.stringify(affiliatePartners));
  }, [affiliatePartners]);

  // Itinerary CRUD
  const addItinerary = (newItinerary) => {
    const itineraryWithId = {
      ...newItinerary,
      id: `itinerary-${Math.random().toString(36).substr(2, 9)}`
    };
    setItineraries((prev) => [itineraryWithId, ...prev]);
    return itineraryWithId;
  };

  const updateItinerary = (id, updatedItinerary) => {
    setItineraries((prev) => prev.map(item => item.id === id ? { ...updatedItinerary, id } : item));
  };

  const deleteItinerary = (id) => {
    setItineraries((prev) => prev.filter(item => item.id !== id));
  };

  const toggleSaveItinerary = (id) => {
    setSavedItineraryIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter(x => x !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Destination CRUD
  const addDestination = (newDest) => {
    const destWithId = {
      ...newDest,
      id: `dest-${Math.random().toString(36).substr(2, 9)}`
    };
    setDestinations((prev) => [...prev, destWithId]);
    return destWithId;
  };

  const updateDestination = (id, updatedDest) => {
    setDestinations((prev) => prev.map(item => item.id === id ? { ...updatedDest, id } : item));
  };

  const deleteDestination = (id) => {
    setDestinations((prev) => prev.filter(item => item.id !== id));
  };

  // Affiliate Partner management
  const updateAffiliatePartner = (id, updatedPartner) => {
    setAffiliatePartners((prev) => prev.map(p => p.id === id ? { ...p, ...updatedPartner } : p));
  };

  const addAffiliatePartner = (partner) => {
    const partnerWithId = {
      ...partner,
      id: partner.id || `partner-${Math.random().toString(36).substr(2, 9)}`
    };
    setAffiliatePartners((prev) => [...prev, partnerWithId]);
  };

  const deleteAffiliatePartner = (id) => {
    setAffiliatePartners((prev) => prev.filter(p => p.id !== id));
  };

  // Bookings
  const addBooking = (booking) => {
    const newB = {
      ...booking,
      id: `b-${Math.random().toString(36).substr(2, 9)}`
    };
    setBookings((prev) => [newB, ...prev]);
    return newB;
  };

  const cancelBooking = (id) => {
    setBookings((prev) => prev.filter(b => b.id !== id));
  };

  return (
    <TravelContext.Provider value={{
      destinations,
      itineraries,
      savedItineraryIds,
      bookings,
      affiliatePartners,
      addItinerary,
      updateItinerary,
      deleteItinerary,
      toggleSaveItinerary,
      addDestination,
      updateDestination,
      deleteDestination,
      updateAffiliatePartner,
      addAffiliatePartner,
      deleteAffiliatePartner,
      addBooking,
      cancelBooking
    }}>
      {children}
    </TravelContext.Provider>
  );
};
