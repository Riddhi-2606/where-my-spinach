import React from 'react';
import { Camera, Heart } from 'lucide-react';
import './NRILife.css';

const stories = [
  { 
    title: 'Navigating French Supermarkets as an NRI', 
    excerpt: 'Decoding labels can be a nightmare. Here is how I learned to spot hidden egg and meat in common European snacks.', 
    img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    category: 'Food Struggles',
    author: 'Priya Patel',
    date: 'Oct 12, 2023'
  },
  { 
    title: 'The Reality of "Vegetarian" in Spain', 
    excerpt: 'Why "sin carne" doesn\'t always mean what you think it means. A deep dive into Spanish tapas culture.', 
    img: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80',
    category: 'Cultural Differences',
    author: 'Rahul Sharma',
    date: 'Sep 28, 2023'
  },
  { 
    title: '5 European Airports with the Best Indian Food', 
    excerpt: 'Stuck on a layover? Don\'t settle for a dry croissant. Here are the airports that actually cater to our palate.', 
    img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
    category: 'Travel Hacks',
    author: 'Anjali Desai',
    date: 'Sep 15, 2023'
  }
];

const NRILife = () => {
  return (
    <div className="nrilife-page section bg-white" style={{ minHeight: '100vh', paddingTop: '140px' }}>
      <div className="container">
        <div className="text-center mb-xl">
          <Camera size={48} className="mx-auto mb-md text-terracotta" />
          <h1 className="hero-headline text-text-color mb-sm">NRI Life & Stories</h1>
          <p className="text-lg text-light max-w-2xl mx-auto">
            Real experiences, cultural adjustments, and travel hacks from the global Indian community exploring Europe.
          </p>
        </div>

        <div className="stories-list">
          {stories.map((story, idx) => (
            <div key={idx} className="story-blog-card mb-lg">
              <div className="story-img-wrap">
                <img src={story.img} alt={story.title} className="img-cover" />
              </div>
              <div className="story-content p-md">
                <span className="text-terracotta font-bold text-xs uppercase tracking-wide mb-xs inline-block">{story.category}</span>
                <h2 className="text-3xl mb-sm">{story.title}</h2>
                <p className="text-light mb-md text-lg">{story.excerpt}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-sm">
                    <div className="author-avatar bg-primary text-white flex items-center justify-center font-bold">
                      {story.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{story.author}</p>
                      <p className="text-light text-xs">{story.date}</p>
                    </div>
                  </div>
                  <button className="text-light hover:text-terracotta transition">
                    <Heart size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NRILife;
