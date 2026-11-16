export interface CeremonyDetail {
  id: 'mehndi' | 'baraat' | 'walima';
  title: string;
  urduSubtitle: string;
  tagline: string;
  date: string;
  time: string;
  venueName: string;
  venueAddress: string;
  dressCode: string;
  description: string;
  mapQuery: string;
  highlights: string[];
}

export interface WeddingInvitationData {
  groomName: string;
  groomFullTitle: string;
  groomParents: string;
  brideName: string;
  brideFullTitle: string;
  brideParents: string;
  bismillahArabic: string;
  bismillahTranslation: string;
  quranicVerseArabic: string;
  quranicVerseTranslation: string;
  quranicVerseReference: string;
  invitationHeadline: string;
  invitationMessage: string;
  familyInvitationMessage: string;
  rsvpNames: string;
  rsvpPhone: string;
  weddingHashtag: string;
  weddingYear: string;
  /** Shared celebration venue — Burewala, Stadium Road */
  venueTitle: string;
  venueUrdu: string;
  venueCity: string;
  venueAddress: string;
  venueLandmark: string;
  mapQuery: string;
  mapDirectionsUrl: string;
  mapEmbedUrl: string;
  countdownISO: string;
  events: {
    mehndi: CeremonyDetail;
    baraat: CeremonyDetail;
    walima: CeremonyDetail;
  };
}

const BUREWALA_QUERY = 'Stadium Road, Burewala, Punjab, Pakistan';

export const defaultWeddingData: WeddingInvitationData = {
  groomName: 'Faizan',
  groomFullTitle: 'Muhammad Faizan Ahmed',
  groomParents: 'S/O Mr. & Mrs. Ahmed Raza',
  brideName: 'Maryam',
  brideFullTitle: 'Maryam Noor',
  brideParents: 'D/O Mr. & Mrs. Imran Siddiqui',
  bismillahArabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
  bismillahTranslation: 'In the Name of Allah, the Most Gracious, the Most Merciful',
  quranicVerseArabic: 'وَخَلَقْنَاكُمْ أَزْوَاجًا',
  quranicVerseTranslation: '"And We created you in pairs" — Bound together in love, faith, and eternal companionship.',
  quranicVerseReference: 'Surah An-Naba (78:8)',
  invitationHeadline: "You're Invited to the Wedding Celebration",
  invitationMessage:
    'With joyful hearts and the infinite blessings of Almighty Allah, we cordially invite you and your esteemed family to grace the auspicious wedding festivities of our beloved children, Faizan & Maryam, as they embark upon their sacred journey of Nikah and eternal togetherness.',
  familyInvitationMessage:
    'Your prayers, love, and gracious presence are the greatest gifts we could ask for. Join both families in celebrating three unforgettable evenings of tradition, royal hospitality, and heartfelt joy.',
  rsvpNames: 'The Ahmed & Siddiqui Families',
  rsvpPhone: '+92 300 1234567',
  weddingHashtag: '#FaizanWedsMaryam',
  weddingYear: 'December 2026',
  venueTitle: 'The Royal Marquees, Stadium Road',
  venueUrdu: 'بویروالہ، اسٹیڈیم روڈ',
  venueCity: 'Burewala, Punjab, Pakistan',
  venueAddress: 'Stadium Road, Burewala, Punjab 61010, Pakistan',
  venueLandmark: 'Opposite Municipal Stadium — ample guarded parking available',
  mapQuery: BUREWALA_QUERY,
  mapDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    BUREWALA_QUERY
  )}`,
  mapEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(BUREWALA_QUERY)}&z=14&output=embed`,
  countdownISO: '2026-12-18T19:30:00+05:00',
  events: {
    mehndi: {
      id: 'mehndi',
      title: 'Mehndi Ceremony',
      urduSubtitle: 'رسمِ مہندی',
      tagline: 'An Evening of Marigolds, Henna, Dholak & Golden Lights',
      date: 'Friday, December 18, 2026',
      time: '7:30 PM Onwards',
      venueName: 'Royal Emerald Courtyard, Stadium Road',
      venueAddress: 'Stadium Road, Burewala, Punjab (opposite Municipal Stadium)',
      dressCode: 'Traditional Festive — Saffron Yellow, Emerald Green & Gold',
      description:
        'A vibrant celebration filled with fragrant marigold garlands, glowing diyas, intricate henna artistry, traditional dholak beats, and joyous family dances under a canopy of fairy lights.',
      mapQuery: BUREWALA_QUERY,
      highlights: [
        'Traditional Rasm-e-Henna & Floral Entrance',
        'Live Dholak & Folk Sangeet Night',
        'Royal Mughlai & Street Chaat Dastarkhwan',
      ],
    },
    baraat: {
      id: 'baraat',
      title: 'Baraat Ceremony',
      urduSubtitle: 'رسمِ بارات و نکاح',
      tagline: 'The Royal Procession, Sacred Nikah & Grand Union',
      date: 'Saturday, December 19, 2026',
      time: '8:00 PM (Baraat Arrival: 8:30 PM)',
      venueName: 'Grand Imperial Ballroom, Stadium Road',
      venueAddress: 'Stadium Road, Burewala, Punjab (opposite Municipal Stadium)',
      dressCode: 'Royal Formal — Crimson Red, Ivory & Antique Gold',
      description:
        'Witness the regal arrival of the Baraat amidst rose-petal showers and golden lights, followed by the sacred Nikah ceremony uniting Faizan & Maryam in eternal matrimony.',
      mapQuery: BUREWALA_QUERY,
      highlights: [
        'Royal Groom Procession & Rose Petal Welcome',
        'Sacred Nikah Khwani & Dua-e-Khair',
        'Shahi Banquet Dinner & Rukhsati Ceremony',
      ],
    },
    walima: {
      id: 'walima',
      title: 'Walima Reception',
      urduSubtitle: 'دعوتِ ولیمہ',
      tagline: 'An Enchanted Evening of Champagne Elegance & Gratitude',
      date: 'Sunday, December 20, 2026',
      time: '8:00 PM — 11:30 PM',
      venueName: 'The Crystal Pavilion, Stadium Road',
      venueAddress: 'Stadium Road, Burewala, Punjab (opposite Municipal Stadium)',
      dressCode: 'Black Tie / Pastel Couture — Pearl White, Champagne & Gold',
      description:
        'Join the newlyweds under shimmering crystal chandeliers and white orchid arches for an intimate evening of gratitude, heartfelt toasts, and a sumptuous reception feast.',
      mapQuery: BUREWALA_QUERY,
      highlights: [
        'Grand Couple Reception Under Crystal Chandeliers',
        'Cake Cutting & Family Blessings',
        'Gourmet Continental & Traditional Feast',
      ],
    },
  },
};

export interface GuestBlessing {
  id: string;
  name: string;
  relation: string;
  message: string;
  timestamp: string;
}

export const initialBlessings: GuestBlessing[] = [
  {
    id: '1',
    name: 'Uncle Salman & Family',
    relation: 'Groom’s Family (London)',
    message: 'MashAllah! May Allah (SWT) shower Faizan and Maryam with endless barakah, love, and tranquility in their marriage. Counting down the days!',
    timestamp: 'Just now',
  },
  {
    id: '2',
    name: 'Dr. Hina & Zeeshan',
    relation: 'Bride’s Family Friends',
    message: 'Heartiest congratulations to both families! Wishing Faizan & Maryam a lifetime of laughter, companionship, and blessed moments together. See you at Stadium Road, Burewala!',
    timestamp: '2 hours ago',
  },
  {
    id: '3',
    name: 'Amina & Bilal',
    relation: 'Cousins',
    message: 'So excited for the Mehndi dances and Royal Baraat! May your union shine brighter than gold forever. Ameen!',
    timestamp: 'Yesterday',
  },
];
