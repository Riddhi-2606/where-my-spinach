// Centralized Affiliate & Profile Links Configuration
// Edit these two values to update your affiliate codes globally across the entire site.
export const KLOOK_AFFILIATE_LINK = 'ADD_MY_KLOOK_LINK_HERE';
export const GETYOURGUIDE_AFFILIATE_LINK = 'https://www.getyourguide.com/explorer/creators/-cs5088/';

export const affiliateLinks = {
  klook: KLOOK_AFFILIATE_LINK,
  getYourGuide: GETYOURGUIDE_AFFILIATE_LINK,

  // Itinerary-specific booking links
  // Mapping itinerary IDs to their respective custom activity, attraction, transfer, and local tour links
  itineraries: {
    'itinerary-1': { // 7-Day Jain Italy Classic
      activity: {
        site: 'GetYourGuide',
        title: 'Rome Vegan Pasta & Pizza Making Class',
        price: '₹5,200',
        url: GETYOURGUIDE_AFFILIATE_LINK
      },
      attraction: {
        site: 'Klook',
        title: 'Colosseum Skip-the-Line Entry Tickets',
        price: '₹2,400',
        url: KLOOK_AFFILIATE_LINK
      },
      transfer: {
        site: 'Klook',
        title: 'FCO Fiumicino Airport Express Train & Shuttle',
        price: '₹950',
        url: KLOOK_AFFILIATE_LINK
      },
      tour: {
        site: 'GetYourGuide',
        title: 'Venice Canal Sunset Walking Tour',
        price: '₹3,800',
        url: GETYOURGUIDE_AFFILIATE_LINK
      }
    },
    'itinerary-2': { // 5-Day Vegan Paris & Amsterdam Trail
      activity: {
        site: 'GetYourGuide',
        title: 'Paris Secret Vegan Croissant & Pastry Crawl',
        price: '₹4,800',
        url: GETYOURGUIDE_AFFILIATE_LINK
      },
      attraction: {
        site: 'Klook',
        title: 'Eiffel Tower Access & Summit Guided Tour',
        price: '₹3,400',
        url: KLOOK_AFFILIATE_LINK
      },
      transfer: {
        site: 'Klook',
        title: 'CDG Airport to Paris Central Private Taxi Transfer',
        price: '₹4,100',
        url: KLOOK_AFFILIATE_LINK
      },
      tour: {
        site: 'GetYourGuide',
        title: 'Amsterdam Guided Canal Cruise & Snack Tour',
        price: '₹2,600',
        url: GETYOURGUIDE_AFFILIATE_LINK
      }
    },
    'itinerary-3': { // 6-Day Swiss Alps Vegetarian Escape
      activity: {
        site: 'Klook',
        title: 'Jungfraujoch - Top of Europe Mountain Rail Pass',
        price: '₹18,500',
        url: KLOOK_AFFILIATE_LINK
      },
      attraction: {
        site: 'Klook',
        title: 'Swiss Travel Pass (Unlimited Trains, Buses & Ferries)',
        price: '₹24,200',
        url: KLOOK_AFFILIATE_LINK
      },
      transfer: {
        site: 'Klook',
        title: 'Zurich Airport to Interlaken Private Rail Shuttle',
        price: '₹5,800',
        url: KLOOK_AFFILIATE_LINK
      },
      tour: {
        site: 'GetYourGuide',
        title: 'Swiss Chocolate Museum & Workshop in Lucerne',
        price: '₹3,200',
        url: GETYOURGUIDE_AFFILIATE_LINK
      }
    }
  },

  // Fallbacks for dynamically added/custom itineraries
  defaultLinks: {
    activity: {
      site: 'GetYourGuide',
      title: 'Vetted Vegetarian Food Walks',
      price: '₹4,200',
      url: GETYOURGUIDE_AFFILIATE_LINK
    },
    attraction: {
      site: 'Klook',
      title: 'Top Attractions Skip-the-Line Tickets',
      price: '₹2,500',
      url: KLOOK_AFFILIATE_LINK
    },
    transfer: {
      site: 'Klook',
      title: 'Airport Transfer & Private Shuttle Service',
      price: '₹1,900',
      url: KLOOK_AFFILIATE_LINK
    },
    tour: {
      site: 'GetYourGuide',
      title: 'Scenic Day Tours & Guided Excursions',
      price: '₹3,600',
      url: GETYOURGUIDE_AFFILIATE_LINK
    }
  }
};
export default affiliateLinks;
