export const configuration: Configuration = {
  common: {
    person1Name: "Christopher Krogh",
    person2Name: "Stachenne Ollivierra",
  },
  hero: {
    images: {
      desktop: [
        "/mobile/IMG_1234.jpg",
        "/desktop/IMG_3001.jpg",
        "/desktop/IMG_6955.jpg",
        "/desktop/IMG_9364.jpg",
        "/desktop/IMG_8727.jpg",
      ],
      mobile: [
        "/mobile/IMG_1234.jpg",
        "/mobile/IMG_2971.jpg",
        "/mobile/0FC01B5F.jpg",
        "/mobile/IMG_6185.jpg",
      ],
    },
  },
  rsvp: {
    // The time on these dates is just to establish the timezone
    weddingDate: new Date("2024-12-28T20:00:00Z"),
    inviteExpirationDate: new Date("2024-10-01T20:00:00Z"),
    ceremony: {
      startTime: "14:45",
      endTime: "16:00",
      location: {
        name: "St. Mary's R.C Church",
        link: "https://maps.app.goo.gl/zETvJYdFEH3bMPuw6",
      },
    },
    reception: {
      startTime: "16:30",
      endTime: "23:30",
      location: {
        name: "Esperanza Alta",
        link: "https://maps.app.goo.gl/taC4irXymSFrFbjN9",
      },
    },
  },
  gift: {
    preamble:
      "Your presence at our wedding is the greatest gift of all! However, if you wish to honor us with a gift, we would appreciate a contribution towards our honeymoon fund (a.k.a. wedding recovery).",
    items: [
      {
        title: "T&T Banking Info",
        details: [
          {
            key: "Name",
            value: "Christopher Krogh",
          },
          {
            key: "Account number",
            value: "160030731501",
            copyable: true,
          },
          {
            key: "Type",
            value: "Chequing",
          },
          {
            key: "Bank",
            value: "Republic Bank",
          },
        ],
      },
      {
        title: "Canadian Banking Info",
        details: [
          {
            key: "e-transfer",
            value: "chris.krogh@outlook.com",
            copyable: true,
          },
        ],
      },
      {
        title: "U.S. Banking Info",
        details: [
          {
            key: "PayPal",
            link: "https://www.paypal.com/paypalme/chriskrogh7",
          },
        ],
      },
    ],
  },
  faqs: [
    {
      question: "When should I arrive?",
      answer:
        "The wedding ceremony starts promptly at 3 p.m. We kindly ask that all guests be seated by 2:45 p.m.",
    },
    {
      question: "What happens after the ceremony?",
      answer:
        "After the ceremony, the wedding party will be taking photos nearby for an hour. Guests can head straight to the reception venue, where we will be serving finger foods and beverages during a cocktail hour.",
    },
    {
      question: "Where can I park?",
      answer:
        "Parking for the cocktail hour and reception is available at the Boy Scouts parking lot. Shuttle buses will run from the parking lot to the venue at Esperanza.",
    },
    {
      question: "What should I wear?",
      answer: "Probably something nice. Don't forget your dancing shoes!",
    },
    {
      question: "Will the reception be indoor or outdoor?",
      answer: "The reception will be held in the outdoor garden at Esperanza.",
    },
    {
      question: "Should I bring a gift?",
      answer:
        "No need to bring a gift! Your presence on our special day is the greatest gift of all :)",
    },
  ],
};

type Venue = {
  startTime: string;
  endTime: string;
  location: {
    name: string;
    link: string;
  };
};

type Configuration = {
  common: {
    person1Name: string;
    person2Name: string;
  };
  hero: {
    images: {
      desktop: string[];
      mobile: string[];
    };
  };
  rsvp: {
    weddingDate: Date;
    inviteExpirationDate: Date;
    ceremony: Venue;
    reception: Venue;
  };
  gift: {
    preamble: string;
    items: {
      title: string;
      details: {
        key: string;
        value?: string;
        copyable?: boolean;
        link?: string;
      }[];
    }[];
  };
  faqs: {
    question: string;
    answer: string;
  }[];
};
