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
    inviteExpirationDate: new Date("2024-09-01T20:00:00Z"),
    ceremony: {
      startTime: "15:00",
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
      "Your presence at our wedding is the greatest gift of all. If you wish to honor us with a gift, we would appreciate a contribution towards paying down our student loans and saving towards our first house.",
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
          {
            key: "Wise",
            link: "https://wise.com/pay/me/christopherm3167",
          },
        ],
      },
      {
        title: "Crypto",
        details: [
          {
            key: "Bitcoin",
            value: "bc1qq78r6nr3v33w9f7a6sw49c7pfll7rc3gyfn4t0",
            copyable: true,
          },
          {
            key: "Ethereum",
            value: "0xa97630bE289E6546786769B73e86EbA49a71F1D9",
            copyable: true,
          },
        ],
      },
    ],
  },
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
};
