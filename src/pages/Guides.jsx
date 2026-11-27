import React from 'react';
import Card from '../components/Card';
import { BookOpen } from 'lucide-react';

const guides = [
  { title: 'Veg Food Guide in Paris', desc: 'Navigate the city of light without eating meat. Top 10 vegan patisseries and safe French classics.', img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80' },
  { title: 'Jain Travel Tips for Italy', desc: 'How to order pizza and pasta without onion and garlic. Essential Italian translation phrases.', img: 'https://images.unsplash.com/photo-1516483638261-f40af5a52c17?auto=format&fit=crop&w=800&q=80' },
  { title: 'Surviving Swiss Alps (Vegan Edition)', desc: 'From Zurich to Zermatt: Where to find plant-based fondue and Indian restaurants.', img: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80' },
  { title: 'Berlin: The Vegan Capital', desc: 'A complete itinerary for eating your way through Germany\'s most plant-based city.', img: 'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=800&q=80' }
];

const Guides = () => {
  return (
    <div className="section bg-cream" style={{ minHeight: '100vh', paddingTop: '140px' }}>
      <div className="container">
        <div className="text-center mb-xl">
          <BookOpen size={48} className="mx-auto mb-md text-primary" />
          <h1 className="hero-headline text-primary mb-sm">Travel Guides</h1>
          <p className="text-lg text-light max-w-2xl mx-auto">
            Practical advice, restaurant maps, and survival tips for your next European adventure.
          </p>
        </div>

        <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {guides.map((guide, idx) => (
            <Card key={idx} imageFirst hover bgImage={guide.img}>
              <h3 className="text-xl mb-sm">{guide.title}</h3>
              <p className="text-light text-sm mb-md">{guide.desc}</p>
              <button className="text-terracotta font-bold mt-auto self-start">Read Full Guide →</button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Guides;
