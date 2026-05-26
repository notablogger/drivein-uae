import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';

// ─── STORAGE ──────────────────────────────────────────────────────────────────
function useStorage(key, def) {
  const init = typeof def === 'function' ? def : () => def;
  const [v, sv] = useState(() => {
    try {
      const x = localStorage.getItem(key);
      return x !== null ? JSON.parse(x) : init();
    } catch {
      return init();
    }
  });
  const set = useCallback(
    (x) => {
      sv(x);
      try {
        localStorage.setItem(key, JSON.stringify(x));
      } catch {}
    },
    [key]
  );
  return [v, set];
}

// ─── URL HELPERS ──────────────────────────────────────────────────────────────
function getUrlParams() {
  try {
    const p = new URLSearchParams(window.location.search);
    return {
      type: p.get('type'),
      country: p.get('country'),
      emirate: p.get('emirate'),
      lang: p.get('lang'),
    };
  } catch {
    return {};
  }
}
function setUrlParam(k, v) {
  try {
    const u = new URL(window.location.href);
    if (v) u.searchParams.set(k, v);
    else u.searchParams.delete(k);
    window.history.replaceState({}, '', u.toString());
  } catch {}
}

// ─── COUNTRIES ────────────────────────────────────────────────────────────────
const COUNTRIES = [
  {
    code: 'BH',
    name: 'Bahrain',
    flag: '🇧🇭',
    region: 'GCC',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'KW',
    name: 'Kuwait',
    flag: '🇰🇼',
    region: 'GCC',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'OM',
    name: 'Oman',
    flag: '🇴🇲',
    region: 'GCC',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'QA',
    name: 'Qatar',
    flag: '🇶🇦',
    region: 'GCC',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'SA',
    name: 'Saudi Arabia',
    flag: '🇸🇦',
    region: 'GCC',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'AL',
    name: 'Albania',
    flag: '🇦🇱',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'AT',
    name: 'Austria',
    flag: '🇦🇹',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'BE',
    name: 'Belgium',
    flag: '🇧🇪',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'BG',
    name: 'Bulgaria',
    flag: '🇧🇬',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'BY',
    name: 'Belarus',
    flag: '🇧🇾',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'CH',
    name: 'Switzerland',
    flag: '🇨🇭',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'CY',
    name: 'Cyprus',
    flag: '🇨🇾',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'CZ',
    name: 'Czech Republic',
    flag: '🇨🇿',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'DK',
    name: 'Denmark',
    flag: '🇩🇰',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'EE',
    name: 'Estonia',
    flag: '🇪🇪',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'ES',
    name: 'Spain',
    flag: '🇪🇸',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'FI',
    name: 'Finland',
    flag: '🇫🇮',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'GR',
    name: 'Greece',
    flag: '🇬🇷',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'HR',
    name: 'Croatia',
    flag: '🇭🇷',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'HU',
    name: 'Hungary',
    flag: '🇭🇺',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'IE',
    name: 'Ireland',
    flag: '🇮🇪',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'IS',
    name: 'Iceland',
    flag: '🇮🇸',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'IT',
    name: 'Italy',
    flag: '🇮🇹',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'LT',
    name: 'Lithuania',
    flag: '🇱🇹',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'LU',
    name: 'Luxembourg',
    flag: '🇱🇺',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'LV',
    name: 'Latvia',
    flag: '🇱🇻',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'ME',
    name: 'Montenegro',
    flag: '🇲🇪',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'MK',
    name: 'North Macedonia',
    flag: '🇲🇰',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'MT',
    name: 'Malta',
    flag: '🇲🇹',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'NL',
    name: 'Netherlands',
    flag: '🇳🇱',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'NO',
    name: 'Norway',
    flag: '🇳🇴',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'PL',
    name: 'Poland',
    flag: '🇵🇱',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'PT',
    name: 'Portugal',
    flag: '🇵🇹',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'RO',
    name: 'Romania',
    flag: '🇷🇴',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'RS',
    name: 'Serbia',
    flag: '🇷🇸',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'SE',
    name: 'Sweden',
    flag: '🇸🇪',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'SI',
    name: 'Slovenia',
    flag: '🇸🇮',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'SK',
    name: 'Slovakia',
    flag: '🇸🇰',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'TR',
    name: 'Turkey',
    flag: '🇹🇷',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'UA',
    name: 'Ukraine',
    flag: '🇺🇦',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'XK',
    name: 'Kosovo',
    flag: '🇽🇰',
    region: 'Europe',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'RU',
    name: 'Russia',
    flag: '🇷🇺',
    region: 'Europe',
    t: false,
    cat: 'standard',
  },
  {
    code: 'MD',
    name: 'Moldova',
    flag: '🇲🇩',
    region: 'Europe',
    t: false,
    cat: 'standard',
  },
  {
    code: 'BA',
    name: 'Bosnia & Herzegovina',
    flag: '🇧🇦',
    region: 'Europe',
    t: false,
    cat: 'standard',
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    region: 'Asia-Pacific',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'NZ',
    name: 'New Zealand',
    flag: '🇳🇿',
    region: 'Asia-Pacific',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'JP',
    name: 'Japan',
    flag: '🇯🇵',
    region: 'Asia-Pacific',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'KR',
    name: 'South Korea',
    flag: '🇰🇷',
    region: 'Asia-Pacific',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'HK',
    name: 'Hong Kong',
    flag: '🇭🇰',
    region: 'Asia-Pacific',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'CN',
    name: 'China',
    flag: '🇨🇳',
    region: 'Asia-Pacific',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'AZ',
    name: 'Azerbaijan',
    flag: '🇦🇿',
    region: 'Asia-Pacific',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'KG',
    name: 'Kyrgyzstan',
    flag: '🇰🇬',
    region: 'Asia-Pacific',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'UZ',
    name: 'Uzbekistan',
    flag: '🇺🇿',
    region: 'Asia-Pacific',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'ZA',
    name: 'South Africa',
    flag: '🇿🇦',
    region: 'Africa',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    region: 'Americas',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    region: 'Americas',
    t: true,
    cat: 'direct_exchange',
  },
  {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    region: 'Asia-Pacific',
    t: false,
    cat: 'standard',
  },
  {
    code: 'PK',
    name: 'Pakistan',
    flag: '🇵🇰',
    region: 'Asia-Pacific',
    t: false,
    cat: 'standard',
  },
  {
    code: 'BD',
    name: 'Bangladesh',
    flag: '🇧🇩',
    region: 'Asia-Pacific',
    t: false,
    cat: 'standard',
  },
  {
    code: 'NP',
    name: 'Nepal',
    flag: '🇳🇵',
    region: 'Asia-Pacific',
    t: false,
    cat: 'standard',
  },
  {
    code: 'LK',
    name: 'Sri Lanka',
    flag: '🇱🇰',
    region: 'Asia-Pacific',
    t: false,
    cat: 'standard',
  },
  {
    code: 'PH',
    name: 'Philippines',
    flag: '🇵🇭',
    region: 'Asia-Pacific',
    t: false,
    cat: 'standard',
    note: 'Filipino-speaking staff available at most UAE institutes.',
  },
  {
    code: 'ID',
    name: 'Indonesia',
    flag: '🇮🇩',
    region: 'Asia-Pacific',
    t: false,
    cat: 'standard',
  },
  {
    code: 'MY',
    name: 'Malaysia',
    flag: '🇲🇾',
    region: 'Asia-Pacific',
    t: false,
    cat: 'standard',
  },
  {
    code: 'TH',
    name: 'Thailand',
    flag: '🇹🇭',
    region: 'Asia-Pacific',
    t: false,
    cat: 'standard',
  },
  {
    code: 'VN',
    name: 'Vietnam',
    flag: '🇻🇳',
    region: 'Asia-Pacific',
    t: false,
    cat: 'standard',
  },
  {
    code: 'SG',
    name: 'Singapore',
    flag: '🇸🇬',
    region: 'Asia-Pacific',
    t: false,
    cat: 'standard',
  },
  {
    code: 'TW',
    name: 'Taiwan',
    flag: '🇹🇼',
    region: 'Asia-Pacific',
    t: false,
    cat: 'standard',
  },
  {
    code: 'MN',
    name: 'Mongolia',
    flag: '🇲🇳',
    region: 'Asia-Pacific',
    t: false,
    cat: 'standard',
  },
  {
    code: 'KZ',
    name: 'Kazakhstan',
    flag: '🇰🇿',
    region: 'Asia-Pacific',
    t: false,
    cat: 'standard',
  },
  {
    code: 'AF',
    name: 'Afghanistan',
    flag: '🇦🇫',
    region: 'Asia-Pacific',
    t: false,
    cat: 'standard',
  },
  {
    code: 'MM',
    name: 'Myanmar',
    flag: '🇲🇲',
    region: 'Asia-Pacific',
    t: false,
    cat: 'standard',
  },
  {
    code: 'KH',
    name: 'Cambodia',
    flag: '🇰🇭',
    region: 'Asia-Pacific',
    t: false,
    cat: 'standard',
  },
  {
    code: 'MX',
    name: 'Mexico',
    flag: '🇲🇽',
    region: 'Americas',
    t: false,
    cat: 'standard',
  },
  {
    code: 'BR',
    name: 'Brazil',
    flag: '🇧🇷',
    region: 'Americas',
    t: false,
    cat: 'standard',
  },
  {
    code: 'AR',
    name: 'Argentina',
    flag: '🇦🇷',
    region: 'Americas',
    t: false,
    cat: 'standard',
  },
  {
    code: 'CO',
    name: 'Colombia',
    flag: '🇨🇴',
    region: 'Americas',
    t: false,
    cat: 'standard',
  },
  {
    code: 'PE',
    name: 'Peru',
    flag: '🇵🇪',
    region: 'Americas',
    t: false,
    cat: 'standard',
  },
  {
    code: 'CL',
    name: 'Chile',
    flag: '🇨🇱',
    region: 'Americas',
    t: false,
    cat: 'standard',
  },
  {
    code: 'JO',
    name: 'Jordan',
    flag: '🇯🇴',
    region: 'Middle East',
    t: false,
    cat: 'standard',
  },
  {
    code: 'LB',
    name: 'Lebanon',
    flag: '🇱🇧',
    region: 'Middle East',
    t: false,
    cat: 'standard',
  },
  {
    code: 'IQ',
    name: 'Iraq',
    flag: '🇮🇶',
    region: 'Middle East',
    t: false,
    cat: 'standard',
  },
  {
    code: 'IR',
    name: 'Iran',
    flag: '🇮🇷',
    region: 'Middle East',
    t: false,
    cat: 'standard',
  },
  {
    code: 'YE',
    name: 'Yemen',
    flag: '🇾🇪',
    region: 'Middle East',
    t: false,
    cat: 'standard',
  },
  {
    code: 'NG',
    name: 'Nigeria',
    flag: '🇳🇬',
    region: 'Africa',
    t: false,
    cat: 'standard',
  },
  {
    code: 'EG',
    name: 'Egypt',
    flag: '🇪🇬',
    region: 'Africa',
    t: false,
    cat: 'standard',
  },
  {
    code: 'ET',
    name: 'Ethiopia',
    flag: '🇪🇹',
    region: 'Africa',
    t: false,
    cat: 'standard',
  },
  {
    code: 'KE',
    name: 'Kenya',
    flag: '🇰🇪',
    region: 'Africa',
    t: false,
    cat: 'standard',
  },
  {
    code: 'GH',
    name: 'Ghana',
    flag: '🇬🇭',
    region: 'Africa',
    t: false,
    cat: 'standard',
  },
  {
    code: 'MA',
    name: 'Morocco',
    flag: '🇲🇦',
    region: 'Africa',
    t: false,
    cat: 'standard',
  },
  {
    code: 'DZ',
    name: 'Algeria',
    flag: '🇩🇿',
    region: 'Africa',
    t: false,
    cat: 'standard',
  },
  {
    code: 'TN',
    name: 'Tunisia',
    flag: '🇹🇳',
    region: 'Africa',
    t: false,
    cat: 'standard',
  },
  {
    code: 'SD',
    name: 'Sudan',
    flag: '🇸🇩',
    region: 'Africa',
    t: false,
    cat: 'standard',
  },
  {
    code: 'SO',
    name: 'Somalia',
    flag: '🇸🇴',
    region: 'Africa',
    t: false,
    cat: 'standard',
  },
  {
    code: 'CM',
    name: 'Cameroon',
    flag: '🇨🇲',
    region: 'Africa',
    t: false,
    cat: 'standard',
  },
  {
    code: 'SN',
    name: 'Senegal',
    flag: '🇸🇳',
    region: 'Africa',
    t: false,
    cat: 'standard',
  },
  {
    code: 'RW',
    name: 'Rwanda',
    flag: '🇷🇼',
    region: 'Africa',
    t: false,
    cat: 'standard',
  },
];

// ─── LANGUAGES ────────────────────────────────────────────────────────────────
const LANGS = [
  { code: 'en', label: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'ar', label: 'العربية', flag: '🇦🇪', dir: 'rtl' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺', dir: 'ltr' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
  { code: 'fr', label: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'ml', label: 'മലയാളം', flag: '🇮🇳', dir: 'ltr' },
  { code: 'tl', label: 'Filipino', flag: '🇵🇭', dir: 'ltr' },
  { code: 'es', label: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'pt', label: 'Português', flag: '🇵🇹', dir: 'ltr' },
];

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const T = {
  en: {
    tagline: 'Your driving guide for the UAE',
    tagSub: 'Real government info. 9 languages. No login needed.',
    startCta: 'Start My Guide →',
    statC: '195 Countries',
    statE: '7 Emirates',
    statL: '9 Languages',
    tourist: 'Tourist / Visitor',
    touristSub: 'On a tourist or visit visa',
    touristDesc:
      'You are in the UAE on a tourist visa. You do NOT have an Emirates ID.',
    touristCta: 'Find out if you can drive →',
    resident: 'Resident / Expat',
    residentSub: 'Living in UAE with Emirates ID',
    residentDesc: 'You live in the UAE with a residency visa and Emirates ID.',
    residentCta: 'Get your UAE driving license →',
    howTitle: 'How It Works',
    s1: 'Select country',
    s2: 'Tourist or Resident?',
    s3: 'Get your guide',
    emiratesTitle: 'Emirates Coverage',
    trustTitle: 'All information sourced from official UAE government portals',
    selectCountry: 'Select your country',
    searchPlaceholder: 'Search country…',
    yourLicense: 'Your license-issuing country',
    canDriveTitle: '✅ You can drive in the UAE',
    canDriveSub:
      'Your home license is recognised under the UAE Markhoos Initiative 2025',
    cannotDriveTitle: '❌ Your license is not recognised',
    cannotDriveSub:
      'An International Driving Permit (IDP) does not help in this case.',
    altTitle: 'What you CAN do',
    alt1T: 'Taxis & Rideshare',
    alt1B: 'Careem and Uber widely available. Dubai Taxi is metered.',
    alt2T: 'Public Transport',
    alt2B:
      'Dubai Metro is fast and air-conditioned. Buses across all emirates.',
    alt3T: 'Private Driver',
    alt3B: 'Affordable chauffeur services available for day hire.',
    residentCallout:
      'Planning to live in the UAE? Once you have your Emirates ID, you can get a full UAE driving license.',
    selectEmirate: 'Select your Emirate',
    live: 'Live',
    comingSoon: 'Coming Soon',
    guideFor: 'Guide for',
    catABadge: 'Direct Exchange',
    catBBadge: 'Full Training',
    catADesc: 'No tests — exchange your license directly.',
    catBDesc: 'Theory, yard test, and road test required.',
    markedDone: 'Done ✓',
    markDone: 'Mark as Done',
    officialLink: 'Official Source →',
    cost: 'Cost',
    time: 'Time',
    docs: 'Required Documents',
    sourceNote: 'Verified against official government portals.',
    filNote:
      'Many UAE driving institutes have Filipino-speaking staff who can guide you through registration.',
    back: '← Back',
    share: 'Share',
    copied: 'Copied!',
    disclaimer:
      'This guide presents publicly available UAE government information. Always verify with the official authority before taking action.',
    rule1: 'Carry original passport + home license at all times while driving',
    rule2: 'License must be valid (not expired)',
    rule3: 'License must match vehicle category',
    rule4: 'Fine ~AED 3,000 for documentation non-compliance',
    rentTitle: 'Renting a Car?',
    rentBody:
      'Most rental companies accept your home license. Some may ask for an IDP — check in advance. Min rental age: 21.',
    becomingResident: 'Becoming a Resident?',
    becomingBody:
      'Once you get your Emirates ID, tourist rules no longer apply.',
    seeResidentGuide: 'See Resident Exchange Guide →',
    reportCta: 'Something changed? Report it',
    reportPrompt: "What's outdated or incorrect?",
    reportPlaceholder: 'e.g. Fee is now AED 800',
    reportSubmit: 'Send Report →',
    reportThanks: "Thanks! We'll review this soon.",
    waitlistPlaceholder: 'Your email',
    waitlistBtn: 'Notify Me',
    waitlistThanks: "You're on the list!",
    adminTitle: 'Admin Panel',
    adminPass: 'Enter admin password',
    adminLogin: 'Login',
    adminWrong: 'Incorrect password',
    tab1: 'Reports',
    tab2: 'Steps',
    tab3: 'Countries',
    tab4: 'Waitlist',
    tab5: 'Analytics',
    tab6: 'Schedule',
    open: 'Open',
    reviewed: 'Reviewed',
    resolved: 'Resolved',
    dismissed: 'Dismissed',
    markResolved: 'Resolve',
    dismiss: 'Dismiss',
    saveChanges: 'Save',
    csvExport: 'Export CSV',
    sendNow: 'Send Now',
    nextReminder: 'Next reminder',
    lastSent: 'Last sent',
    printGuide: 'Print Guide',
    offlineBanner: "You're offline — showing cached content",
    password: 'nik25071990',
  },
  ar: {
    tagline: 'دليلك للقيادة في الإمارات',
    tagSub: 'معلومات حكومية حقيقية. ٩ لغات. بدون تسجيل دخول.',
    startCta: 'ابدأ دليلي →',
    statC: '١٩٥ دولة',
    statE: '٧ إمارات',
    statL: '٩ لغات',
    tourist: 'سائح / زائر',
    touristSub: 'بتأشيرة سياحية',
    touristDesc: 'أنت في الإمارات بتأشيرة سياحية. ليس لديك هوية إماراتية.',
    touristCta: 'اعرف هل يمكنك القيادة →',
    resident: 'مقيم / وافد',
    residentSub: 'تعيش في الإمارات بهوية إماراتية',
    residentDesc: 'تعيش في الإمارات ولديك تأشيرة إقامة وهوية إماراتية.',
    residentCta: 'احصل على رخصة قيادة إماراتية →',
    howTitle: 'كيف يعمل',
    s1: 'اختر دولة',
    s2: 'سائح أم مقيم؟',
    s3: 'احصل على دليلك',
    emiratesTitle: 'تغطية الإمارات',
    trustTitle: 'جميع المعلومات مصدرها البوابات الحكومية الرسمية',
    selectCountry: 'اختر دولتك',
    searchPlaceholder: 'ابحث عن دولة…',
    yourLicense: 'دولة رخصتك',
    canDriveTitle: '✅ يمكنك القيادة في الإمارات',
    canDriveSub: 'رخصتك معترف بها بموجب مبادرة مرخوص 2025',
    cannotDriveTitle: '❌ رخصتك غير معترف بها',
    cannotDriveSub: 'لا تفيد رخصة القيادة الدولية هنا.',
    altTitle: 'ما يمكنك فعله',
    alt1T: 'سيارات الأجرة',
    alt1B: 'كريم وأوبر متاحان. تاكسي دبي موثوق.',
    alt2T: 'النقل العام',
    alt2B: 'مترو دبي سريع ومكيف.',
    alt3T: 'سائق خاص',
    alt3B: 'خدمات شوفير بأسعار معقولة.',
    residentCallout:
      'تخطط للإقامة؟ بمجرد الحصول على هويتك الإماراتية يمكنك استخراج رخصة قيادة.',
    selectEmirate: 'اختر إمارتك',
    live: 'متاح',
    comingSoon: 'قريباً',
    guideFor: 'دليل لـ',
    catABadge: 'استبدال مباشر',
    catBBadge: 'تدريب كامل',
    catADesc: 'لا اختبارات.',
    catBDesc: 'نظري وساحة وطريق.',
    markedDone: 'تم ✓',
    markDone: 'ضع علامة منجز',
    officialLink: 'المصدر الرسمي →',
    cost: 'التكلفة',
    time: 'الوقت',
    docs: 'المستندات',
    sourceNote: 'تم التحقق من البوابات الرسمية.',
    filNote: 'العديد من مدارس القيادة لديها موظفون يتحدثون التاغالوغية.',
    back: '→ رجوع',
    share: 'مشاركة',
    copied: 'تم النسخ!',
    disclaimer: 'تحقق دائماً من الجهة الرسمية قبل اتخاذ أي إجراء.',
    rule1: 'احمل جواز سفرك ورخصتك دائماً',
    rule2: 'يجب أن تكون الرخصة سارية',
    rule3: 'يجب أن تتطابق الرخصة مع فئة المركبة',
    rule4: 'غرامة ~٣٠٠٠ درهم',
    rentTitle: 'استئجار سيارة؟',
    rentBody: 'معظم شركات التأجير تقبل رخصتك. الحد الأدنى للسن: ٢١.',
    becomingResident: 'هل ستصبح مقيماً؟',
    becomingBody: 'بعد الحصول على هويتك الإماراتية لا تنطبق قواعد السياح.',
    seeResidentGuide: 'اطلع على دليل المقيمين →',
    reportCta: 'هناك تغيير؟ أبلغ عنه',
    reportPrompt: 'ما الذي تغير؟',
    reportPlaceholder: 'مثال: الرسوم الآن ٨٠٠ درهم',
    reportSubmit: 'إرسال →',
    reportThanks: 'شكراً! سنراجع هذا قريباً.',
    waitlistPlaceholder: 'بريدك الإلكتروني',
    waitlistBtn: 'أخطرني',
    waitlistThanks: 'أنت في القائمة!',
    adminTitle: 'لوحة التحكم',
    adminPass: 'أدخل كلمة المرور',
    adminLogin: 'دخول',
    adminWrong: 'كلمة مرور خاطئة',
    tab1: 'التقارير',
    tab2: 'الخطوات',
    tab3: 'الدول',
    tab4: 'قائمة الانتظار',
    tab5: 'الإحصاء',
    tab6: 'الجدول',
    open: 'مفتوح',
    reviewed: 'مراجعة',
    resolved: 'محلول',
    dismissed: 'مرفوض',
    markResolved: 'حل',
    dismiss: 'رفض',
    saveChanges: 'حفظ',
    csvExport: 'تصدير CSV',
    sendNow: 'إرسال الآن',
    nextReminder: 'التذكير التالي',
    lastSent: 'آخر إرسال',
    printGuide: 'طباعة الدليل',
    offlineBanner: 'أنت غير متصل — يتم عرض المحتوى المخزن مؤقتاً',
    password: 'nik25071990',
  },
  ru: {
    tagline: 'Ваш гид по вождению в ОАЭ',
    tagSub: 'Реальная государственная информация. 9 языков.',
    startCta: 'Начать →',
    statC: '195 стран',
    statE: '7 эмиратов',
    statL: '9 языков',
    tourist: 'Турист',
    touristSub: 'По туристической визе',
    touristDesc: 'Вы в ОАЭ по туристической визе. Emirates ID нет.',
    touristCta: 'Узнать, можно ли водить →',
    resident: 'Резидент',
    residentSub: 'С Emirates ID',
    residentDesc: 'Вы живёте в ОАЭ с Emirates ID.',
    residentCta: 'Получить права ОАЭ →',
    howTitle: 'Как это работает',
    s1: 'Страна',
    s2: 'Турист или резидент?',
    s3: 'Гид',
    emiratesTitle: 'Охват эмиратов',
    trustTitle: 'Все данные с официальных порталов ОАЭ',
    selectCountry: 'Выберите страну',
    searchPlaceholder: 'Поиск страны…',
    yourLicense: 'Страна выдачи прав',
    canDriveTitle: '✅ Вы можете водить в ОАЭ',
    canDriveSub: 'Ваши права признаны по инициативе Markhoos 2025',
    cannotDriveTitle: '❌ Ваши права не признаны',
    cannotDriveSub: 'МВУ не поможет.',
    altTitle: 'Что вы МОЖЕТЕ',
    alt1T: 'Такси',
    alt1B: 'Careem и Uber доступны повсюду.',
    alt2T: 'Метро',
    alt2B: 'Метро Дубая быстрое и кондиционированное.',
    alt3T: 'Частный водитель',
    alt3B: 'Доступные услуги шофёра.',
    residentCallout: 'Планируете жить в ОАЭ? С Emirates ID вы получите права.',
    selectEmirate: 'Выберите эмират',
    live: 'Доступно',
    comingSoon: 'Скоро',
    guideFor: 'Гид для',
    catABadge: 'Прямой обмен',
    catBBadge: 'Полное обучение',
    catADesc: 'Без экзаменов.',
    catBDesc: 'Теория + площадка + дорога.',
    markedDone: 'Готово ✓',
    markDone: 'Отметить',
    officialLink: 'Официальный источник →',
    cost: 'Стоимость',
    time: 'Время',
    docs: 'Документы',
    sourceNote: 'Проверено по официальным порталам.',
    filNote: 'Многие автошколы имеют сотрудников, говорящих на тагальском.',
    back: '← Назад',
    share: 'Поделиться',
    copied: 'Скопировано!',
    disclaimer: 'Проверяйте у официального органа.',
    rule1: 'Паспорт + права всегда при себе',
    rule2: 'Права должны быть действительны',
    rule3: 'Категория прав = категория ТС',
    rule4: 'Штраф ~3000 дирхам',
    rentTitle: 'Аренда автомобиля?',
    rentBody: 'Большинство компаний принимают ваши права. Мин. возраст: 21.',
    becomingResident: 'Становитесь резидентом?',
    becomingBody: 'С Emirates ID правила для туристов не действуют.',
    seeResidentGuide: 'Гид для резидентов →',
    reportCta: 'Что-то изменилось?',
    reportPrompt: 'Что устарело?',
    reportPlaceholder: 'Например: сбор теперь 800 дирхам',
    reportSubmit: 'Отправить →',
    reportThanks: 'Спасибо!',
    waitlistPlaceholder: 'Email',
    waitlistBtn: 'Уведомить',
    waitlistThanks: 'Вы в списке!',
    adminTitle: 'Панель администратора',
    adminPass: 'Пароль',
    adminLogin: 'Войти',
    adminWrong: 'Неверный пароль',
    tab1: 'Отчёты',
    tab2: 'Шаги',
    tab3: 'Страны',
    tab4: 'Ожидание',
    tab5: 'Аналитика',
    tab6: 'Расписание',
    open: 'Открыт',
    reviewed: 'Проверен',
    resolved: 'Решён',
    dismissed: 'Отклонён',
    markResolved: 'Решить',
    dismiss: 'Отклонить',
    saveChanges: 'Сохранить',
    csvExport: 'Экспорт CSV',
    sendNow: 'Отправить',
    nextReminder: 'Следующее',
    lastSent: 'Последнее',
    printGuide: 'Распечатать',
    offlineBanner: 'Нет сети — кэшированный контент',
    password: 'nik25071990',
  },
  hi: {
    tagline: 'UAE में आपकी ड्राइविंग गाइड',
    tagSub: 'असली सरकारी जानकारी। 9 भाषाएं।',
    startCta: 'गाइड शुरू करें →',
    statC: '195 देश',
    statE: '7 अमीरात',
    statL: '9 भाषाएं',
    tourist: 'पर्यटक',
    touristSub: 'पर्यटक वीज़ा पर',
    touristDesc: 'आप UAE में पर्यटक वीज़ा पर हैं। Emirates ID नहीं है।',
    touristCta: 'जानें क्या गाड़ी चला सकते हैं →',
    resident: 'निवासी',
    residentSub: 'Emirates ID के साथ',
    residentDesc: 'आप UAE में Emirates ID के साथ रहते हैं।',
    residentCta: 'UAE लाइसेंस पाएं →',
    howTitle: 'कैसे काम करता है',
    s1: 'देश',
    s2: 'पर्यटक या निवासी?',
    s3: 'गाइड',
    emiratesTitle: 'अमीरात',
    trustTitle: 'सभी जानकारी UAE सरकारी पोर्टल से',
    selectCountry: 'देश चुनें',
    searchPlaceholder: 'देश खोजें…',
    yourLicense: 'लाइसेंस का देश',
    canDriveTitle: '✅ UAE में गाड़ी चला सकते हैं',
    canDriveSub: 'Markhoos 2025 के तहत लाइसेंस मान्य है',
    cannotDriveTitle: '❌ लाइसेंस मान्यता प्राप्त नहीं',
    cannotDriveSub: 'IDP मदद नहीं करेगा।',
    altTitle: 'आप क्या कर सकते हैं',
    alt1T: 'टैक्सी',
    alt1B: 'Careem और Uber उपलब्ध हैं।',
    alt2T: 'मेट्रो',
    alt2B: 'दुबई मेट्रो।',
    alt3T: 'निजी चालक',
    alt3B: 'किफायती सेवाएं।',
    residentCallout: 'Emirates ID से लाइसेंस मिल सकता है।',
    selectEmirate: 'अमीरात चुनें',
    live: 'उपलब्ध',
    comingSoon: 'जल्द',
    guideFor: 'गाइड',
    catABadge: 'सीधा एक्सचेंज',
    catBBadge: 'पूरा प्रशिक्षण',
    catADesc: 'कोई टेस्ट नहीं।',
    catBDesc: 'थ्योरी + यार्ड + रोड।',
    markedDone: 'हो गया ✓',
    markDone: 'पूर्ण चिह्नित करें',
    officialLink: 'आधिकारिक →',
    cost: 'लागत',
    time: 'समय',
    docs: 'दस्तावेज़',
    sourceNote: 'आधिकारिक पोर्टल से सत्यापित।',
    filNote: 'कई UAE संस्थानों में फिलिपिनो स्टाफ है।',
    back: '← वापस',
    share: 'साझा करें',
    copied: 'कॉपी!',
    disclaimer: 'कार्रवाई से पहले आधिकारिक स्रोत देखें।',
    rule1: 'पासपोर्ट + लाइसेंस साथ रखें',
    rule2: 'लाइसेंस वैध हो',
    rule3: 'वाहन श्रेणी मेल खाए',
    rule4: '~AED 3,000 जुर्माना',
    rentTitle: 'कार किराए पर?',
    rentBody: 'लाइसेंस स्वीकार होता है। न्यूनतम आयु 21।',
    becomingResident: 'निवासी बन रहे हैं?',
    becomingBody: 'Emirates ID के बाद नियम बदलते हैं।',
    seeResidentGuide: 'निवासी गाइड →',
    reportCta: 'कुछ बदल गया?',
    reportPrompt: 'क्या पुराना है?',
    reportPlaceholder: 'जैसे: शुल्क AED 800',
    reportSubmit: 'भेजें →',
    reportThanks: 'धन्यवाद!',
    waitlistPlaceholder: 'ईमेल',
    waitlistBtn: 'सूचित करें',
    waitlistThanks: 'सूची में हैं!',
    adminTitle: 'एडमिन',
    adminPass: 'पासवर्ड',
    adminLogin: 'लॉगिन',
    adminWrong: 'गलत',
    tab1: 'रिपोर्ट',
    tab2: 'चरण',
    tab3: 'देश',
    tab4: 'प्रतीक्षा',
    tab5: 'विश्लेषण',
    tab6: 'शेड्यूल',
    open: 'खुला',
    reviewed: 'समीक्षित',
    resolved: 'हल',
    dismissed: 'खारिज',
    markResolved: 'हल करें',
    dismiss: 'खारिज',
    saveChanges: 'सहेजें',
    csvExport: 'CSV',
    sendNow: 'भेजें',
    nextReminder: 'अगला',
    lastSent: 'अंतिम',
    printGuide: 'प्रिंट',
    offlineBanner: 'ऑफलाइन — कैश्ड सामग्री',
    password: 'nik25071990',
  },
  fr: {
    tagline: 'Votre guide de conduite aux Émirats',
    tagSub: 'Infos gouvernementales. 9 langues. Sans inscription.',
    startCta: 'Démarrer →',
    statC: '195 pays',
    statE: '7 émirats',
    statL: '9 langues',
    tourist: 'Touriste',
    touristSub: 'Avec visa touristique',
    touristDesc:
      "Vous êtes aux EAU avec un visa touristique. Pas d'Emirates ID.",
    touristCta: 'Savoir si vous pouvez conduire →',
    resident: 'Résident',
    residentSub: 'Avec Emirates ID',
    residentDesc: 'Vous vivez aux EAU avec Emirates ID.',
    residentCta: 'Obtenir un permis EAU →',
    howTitle: 'Comment ça marche',
    s1: 'Pays',
    s2: 'Touriste ou résident?',
    s3: 'Votre guide',
    emiratesTitle: 'Émirats',
    trustTitle: 'Infos des portails officiels des EAU',
    selectCountry: 'Choisissez votre pays',
    searchPlaceholder: 'Rechercher…',
    yourLicense: "Pays d'émission du permis",
    canDriveTitle: '✅ Vous pouvez conduire',
    canDriveSub: 'Permis reconnu sous Markhoos 2025',
    cannotDriveTitle: '❌ Permis non reconnu',
    cannotDriveSub: 'Le PCI ne change rien.',
    altTitle: 'Ce que vous POUVEZ faire',
    alt1T: 'Taxis',
    alt1B: 'Careem et Uber disponibles.',
    alt2T: 'Transports',
    alt2B: 'Métro de Dubaï rapide.',
    alt3T: 'Chauffeur',
    alt3B: 'Services abordables.',
    residentCallout: 'Avec Emirates ID vous pourrez obtenir un permis.',
    selectEmirate: "Choisissez l'émirat",
    live: 'Disponible',
    comingSoon: 'Bientôt',
    guideFor: 'Guide pour',
    catABadge: 'Échange direct',
    catBBadge: 'Formation',
    catADesc: 'Sans examen.',
    catBDesc: 'Théorie + maniabilité + route.',
    markedDone: 'Fait ✓',
    markDone: 'Marquer fait',
    officialLink: 'Source officielle →',
    cost: 'Coût',
    time: 'Durée',
    docs: 'Documents',
    sourceNote: 'Vérifié sur portails officiels.',
    filNote: 'Personnel tagalog disponible dans les auto-écoles.',
    back: '← Retour',
    share: 'Partager',
    copied: 'Copié!',
    disclaimer: "Vérifiez auprès de l'autorité officielle.",
    rule1: 'Passeport + permis toujours sur soi',
    rule2: 'Permis valide',
    rule3: 'Catégorie correspondante',
    rule4: 'Amende ~3000 AED',
    rentTitle: 'Location?',
    rentBody: 'La plupart acceptent votre permis. Âge min: 21.',
    becomingResident: 'Vous devenez résident?',
    becomingBody: 'Avec Emirates ID, règles touristiques caduques.',
    seeResidentGuide: 'Guide résident →',
    reportCta: 'Quelque chose a changé?',
    reportPrompt: "Qu'est-ce qui est obsolète?",
    reportPlaceholder: 'Ex: frais 800 AED',
    reportSubmit: 'Envoyer →',
    reportThanks: 'Merci!',
    waitlistPlaceholder: 'Email',
    waitlistBtn: 'Notifier',
    waitlistThanks: 'Vous êtes inscrit!',
    adminTitle: 'Admin',
    adminPass: 'Mot de passe',
    adminLogin: 'Connexion',
    adminWrong: 'Incorrect',
    tab1: 'Rapports',
    tab2: 'Étapes',
    tab3: 'Pays',
    tab4: 'Attente',
    tab5: 'Analytique',
    tab6: 'Planning',
    open: 'Ouvert',
    reviewed: 'Examiné',
    resolved: 'Résolu',
    dismissed: 'Rejeté',
    markResolved: 'Résoudre',
    dismiss: 'Rejeter',
    saveChanges: 'Enregistrer',
    csvExport: 'CSV',
    sendNow: 'Envoyer',
    nextReminder: 'Prochain',
    lastSent: 'Dernier',
    printGuide: 'Imprimer',
    offlineBanner: 'Hors ligne — contenu en cache',
    password: 'nik25071990',
  },
  ml: {
    tagline: 'UAE-ലെ ഡ്രൈവിംഗ് ഗൈഡ്',
    tagSub: 'ഔദ്യോഗിക വിവരങ്ങൾ. 9 ഭാഷകൾ.',
    startCta: 'ഗൈഡ് ആരംഭിക്കുക →',
    statC: '195 രാജ്യങ്ങൾ',
    statE: '7 എമിറേറ്റുകൾ',
    statL: '9 ഭാഷകൾ',
    tourist: 'ടൂറിസ്റ്റ്',
    touristSub: 'ടൂറിസ്റ്റ് വിസ',
    touristDesc: 'UAE-ൽ ടൂറിസ്റ്റ് വിസയിൽ. Emirates ID ഇല്ല.',
    touristCta: 'ഡ്രൈവ് ചെയ്യാമോ? →',
    resident: 'താമസക്കാരൻ',
    residentSub: 'Emirates ID-യോടൊപ്പം',
    residentDesc: 'UAE-ൽ Emirates ID-യോടൊപ്പം.',
    residentCta: 'UAE ലൈസൻസ് →',
    howTitle: 'എങ്ങനെ',
    s1: 'രാജ്യം',
    s2: 'ടൂറിസ്റ്റ് / താമസക്കാരൻ?',
    s3: 'ഗൈഡ്',
    emiratesTitle: 'എമിറേറ്റുകൾ',
    trustTitle: 'ഔദ്യോഗിക UAE പോർട്ടലുകളിൽ നിന്ന്',
    selectCountry: 'രാജ്യം തിരഞ്ഞെടുക്കുക',
    searchPlaceholder: 'തിരയുക…',
    yourLicense: 'ലൈസൻസ് രാജ്യം',
    canDriveTitle: '✅ ഡ്രൈവ് ചെയ്യാം',
    canDriveSub: 'Markhoos 2025 അംഗീകൃതം',
    cannotDriveTitle: '❌ അംഗീകൃതമല്ല',
    cannotDriveSub: 'IDP സഹായിക്കില്ല.',
    altTitle: 'ചെയ്യാൻ കഴിയുന്നത്',
    alt1T: 'ടാക്സി',
    alt1B: 'Careem, Uber.',
    alt2T: 'മെട്രോ',
    alt2B: 'ദുബായ് മെട്രോ.',
    alt3T: 'ഡ്രൈവർ',
    alt3B: 'ദിവസ വാടക.',
    residentCallout: 'Emirates ID ലഭിച്ചാൽ ലൈസൻസ് നേടാം.',
    selectEmirate: 'എമിറേറ്റ്',
    live: 'ലഭ്യം',
    comingSoon: 'ഉടൻ',
    guideFor: 'ഗൈഡ്',
    catABadge: 'കൈമാറ്റം',
    catBBadge: 'പരിശീലനം',
    catADesc: 'ടെസ്റ്റില്ല.',
    catBDesc: 'തിയറി + ടെസ്റ്റ്.',
    markedDone: 'ചെയ്തു ✓',
    markDone: 'പൂർത്തി',
    officialLink: 'ഔദ്യോഗിക →',
    cost: 'ചെലവ്',
    time: 'സമയം',
    docs: 'രേഖകൾ',
    sourceNote: 'ഔദ്യോഗിക പോർട്ടൽ.',
    filNote: 'ഫിലിപ്പിനോ ജീവനക്കാരുണ്ട്.',
    back: '← തിരിച്ച്',
    share: 'പങ്കിടുക',
    copied: 'പകർത്തി!',
    disclaimer: 'ഔദ്യോഗിക ഉറവിടം പരിശോധിക്കുക.',
    rule1: 'പാസ്പോർട്ടും ലൈസൻസും',
    rule2: 'ലൈസൻസ് സാധു',
    rule3: 'വിഭാഗം പൊരുത്തം',
    rule4: '~3000 AED',
    rentTitle: 'വാടക?',
    rentBody: 'ഭൂരിഭാഗം കമ്പനികളും. 21 വയസ്.',
    becomingResident: 'താമസക്കാരൻ?',
    becomingBody: 'Emirates ID ശേഷം.',
    seeResidentGuide: 'ഗൈഡ് →',
    reportCta: 'മാറ്റം?',
    reportPrompt: 'എന്ത് തെറ്റ്?',
    reportPlaceholder: '800 AED',
    reportSubmit: 'അയക്കുക →',
    reportThanks: 'നന്ദി!',
    waitlistPlaceholder: 'ഇമെയിൽ',
    waitlistBtn: 'അറിയിക്കുക',
    waitlistThanks: 'പട്ടികയിൽ!',
    adminTitle: 'അഡ്മിൻ',
    adminPass: 'പാസ്വേഡ്',
    adminLogin: 'ലോഗിൻ',
    adminWrong: 'തെറ്റ്',
    tab1: 'റിപ്പോർട്ട്',
    tab2: 'ഘട്ടങ്ങൾ',
    tab3: 'രാജ്യങ്ങൾ',
    tab4: 'പട്ടിക',
    tab5: 'വിശകലനം',
    tab6: 'ഷെഡ്യൂൾ',
    open: 'തുറന്നത്',
    reviewed: 'പരിശോധ',
    resolved: 'പരിഹരിച്ചത്',
    dismissed: 'തള്ളി',
    markResolved: 'പരിഹരിക്കുക',
    dismiss: 'തള്ളുക',
    saveChanges: 'സേവ്',
    csvExport: 'CSV',
    sendNow: 'ഇപ്പോൾ',
    nextReminder: 'അടുത്ത',
    lastSent: 'അവസാനം',
    printGuide: 'പ്രിന്റ്',
    offlineBanner: 'ഓഫ്‌ലൈൻ — കാഷ്ഡ്',
    password: 'nik25071990',
  },
  tl: {
    tagline: 'Gabay sa pagmamaneho sa UAE',
    tagSub: 'Tunay na impormasyon. 9 na wika.',
    startCta: 'Simulan →',
    statC: '195 Bansa',
    statE: '7 Emirate',
    statL: '9 Wika',
    tourist: 'Turista',
    touristSub: 'May tourist visa',
    touristDesc: 'Nasa UAE ka sa tourist visa. Walang Emirates ID.',
    touristCta: 'Alamin kung pwede →',
    resident: 'Residente',
    residentSub: 'May Emirates ID',
    residentDesc: 'Nakatira sa UAE na may Emirates ID.',
    residentCta: 'Kumuha ng lisensya →',
    howTitle: 'Paano',
    s1: 'Bansa',
    s2: 'Turista o Residente?',
    s3: 'Gabay',
    emiratesTitle: 'Emirate',
    trustTitle: 'Opisyal na portal ng UAE',
    selectCountry: 'Piliin ang bansa',
    searchPlaceholder: 'Maghanap…',
    yourLicense: 'Bansang nagbigay ng lisensya',
    canDriveTitle: '✅ Pwede kang magmaneho',
    canDriveSub: 'Kinikilala sa Markhoos 2025',
    cannotDriveTitle: '❌ Hindi kinikilala',
    cannotDriveSub: 'IDP hindi makakatulong.',
    altTitle: 'Pwede mong GAWIN',
    alt1T: 'Taxi',
    alt1B: 'Careem at Uber.',
    alt2T: 'Metro',
    alt2B: 'Dubai Metro.',
    alt3T: 'Driver',
    alt3B: 'Abot-kayang chauffeur.',
    residentCallout: 'Sa Emirates ID, makakakuha ng lisensya.',
    selectEmirate: 'Piliin ang Emirate',
    live: 'Available',
    comingSoon: 'Malapit',
    guideFor: 'Gabay',
    catABadge: 'Direktang Palitan',
    catBBadge: 'Pagsasanay',
    catADesc: 'Walang pagsusulit.',
    catBDesc: 'Teorya + yard + road.',
    markedDone: 'Tapos ✓',
    markDone: 'Markahan',
    officialLink: 'Opisyal →',
    cost: 'Gastos',
    time: 'Oras',
    docs: 'Dokumento',
    sourceNote: 'Napatunayan.',
    filNote: 'May Filipino na staff sa mga institute.',
    back: '← Bumalik',
    share: 'Ibahagi',
    copied: 'Nakopya!',
    disclaimer: 'I-verify sa opisyal na awtoridad.',
    rule1: 'Magdala ng pasaporte + lisensya',
    rule2: 'Valid ang lisensya',
    rule3: 'Tamang kategorya',
    rule4: 'Multa ~AED 3,000',
    rentTitle: 'Mag-rent?',
    rentBody: 'Tinatanggap ang lisensya. Min edad: 21.',
    becomingResident: 'Magiging Residente?',
    becomingBody: 'Sa Emirates ID, magbabago ang patakaran.',
    seeResidentGuide: 'Gabay para sa Residente →',
    reportCta: 'May nagbago?',
    reportPrompt: 'Ano ang mali?',
    reportPlaceholder: 'AED 800 na ngayon',
    reportSubmit: 'Ipadala →',
    reportThanks: 'Salamat!',
    waitlistPlaceholder: 'Email',
    waitlistBtn: 'Abisuhan',
    waitlistThanks: 'Nasa listahan ka!',
    adminTitle: 'Admin',
    adminPass: 'Password',
    adminLogin: 'Login',
    adminWrong: 'Mali',
    tab1: 'Ulat',
    tab2: 'Hakbang',
    tab3: 'Bansa',
    tab4: 'Listahan',
    tab5: 'Analytics',
    tab6: 'Iskedyul',
    open: 'Bukas',
    reviewed: 'Nasuri',
    resolved: 'Nalutas',
    dismissed: 'Tinanggihan',
    markResolved: 'Lutasin',
    dismiss: 'Tanggihan',
    saveChanges: 'I-save',
    csvExport: 'CSV',
    sendNow: 'Ipadala',
    nextReminder: 'Susunod',
    lastSent: 'Huling',
    printGuide: 'I-print',
    offlineBanner: 'Offline — naka-cache na nilalaman',
    password: 'nik25071990',
  },
  es: {
    tagline: 'Tu guía de conducción en los EAU',
    tagSub: 'Info gubernamental. 9 idiomas.',
    startCta: 'Iniciar →',
    statC: '195 países',
    statE: '7 emiratos',
    statL: '9 idiomas',
    tourist: 'Turista',
    touristSub: 'Con visa turística',
    touristDesc: 'Estás en los EAU con visa turística. Sin Emirates ID.',
    touristCta: 'Descubre si puedes conducir →',
    resident: 'Residente',
    residentSub: 'Con Emirates ID',
    residentDesc: 'Vives en los EAU con Emirates ID.',
    residentCta: 'Obtener licencia EAU →',
    howTitle: 'Cómo funciona',
    s1: 'País',
    s2: '¿Turista o Residente?',
    s3: 'Tu guía',
    emiratesTitle: 'Emiratos',
    trustTitle: 'Portales oficiales de los EAU',
    selectCountry: 'Selecciona tu país',
    searchPlaceholder: 'Buscar país…',
    yourLicense: 'País emisor',
    canDriveTitle: '✅ Puedes conducir',
    canDriveSub: 'Reconocido en Markhoos 2025',
    cannotDriveTitle: '❌ No reconocido',
    cannotDriveSub: 'El PCI no ayuda.',
    altTitle: 'Lo que SÍ puedes',
    alt1T: 'Taxi',
    alt1B: 'Careem y Uber.',
    alt2T: 'Metro',
    alt2B: 'Metro de Dubái.',
    alt3T: 'Conductor privado',
    alt3B: 'Servicios asequibles.',
    residentCallout: 'Con Emirates ID podrás obtener licencia.',
    selectEmirate: 'Selecciona emirato',
    live: 'Disponible',
    comingSoon: 'Próximamente',
    guideFor: 'Guía para',
    catABadge: 'Intercambio directo',
    catBBadge: 'Formación',
    catADesc: 'Sin exámenes.',
    catBDesc: 'Teoría + maniobras + carretera.',
    markedDone: 'Hecho ✓',
    markDone: 'Marcar hecho',
    officialLink: 'Fuente oficial →',
    cost: 'Coste',
    time: 'Tiempo',
    docs: 'Documentos',
    sourceNote: 'Verificado en portales oficiales.',
    filNote: 'Personal tagalog en autoescuelas.',
    back: '← Atrás',
    share: 'Compartir',
    copied: '¡Copiado!',
    disclaimer: 'Verifica con la autoridad oficial.',
    rule1: 'Llevar pasaporte + licencia',
    rule2: 'Licencia vigente',
    rule3: 'Categoría correcta',
    rule4: 'Multa ~3000 AED',
    rentTitle: '¿Alquilar?',
    rentBody: 'La mayoría acepta tu licencia. Edad min: 21.',
    becomingResident: '¿Residente?',
    becomingBody: 'Con Emirates ID cambian las reglas.',
    seeResidentGuide: 'Guía residente →',
    reportCta: '¿Algo cambió?',
    reportPrompt: '¿Qué está mal?',
    reportPlaceholder: 'Tarifa 800 AED',
    reportSubmit: 'Enviar →',
    reportThanks: '¡Gracias!',
    waitlistPlaceholder: 'Email',
    waitlistBtn: 'Notificarme',
    waitlistThanks: '¡Estás en la lista!',
    adminTitle: 'Admin',
    adminPass: 'Contraseña',
    adminLogin: 'Entrar',
    adminWrong: 'Incorrecta',
    tab1: 'Reportes',
    tab2: 'Pasos',
    tab3: 'Países',
    tab4: 'Espera',
    tab5: 'Analítica',
    tab6: 'Programación',
    open: 'Abierto',
    reviewed: 'Revisado',
    resolved: 'Resuelto',
    dismissed: 'Descartado',
    markResolved: 'Resolver',
    dismiss: 'Descartar',
    saveChanges: 'Guardar',
    csvExport: 'CSV',
    sendNow: 'Enviar',
    nextReminder: 'Próximo',
    lastSent: 'Último',
    printGuide: 'Imprimir',
    offlineBanner: 'Sin conexión — contenido en caché',
    password: 'nik25071990',
  },
  pt: {
    tagline: 'O seu guia de condução nos EAU',
    tagSub: 'Informações governamentais. 9 idiomas.',
    startCta: 'Iniciar →',
    statC: '195 países',
    statE: '7 emirados',
    statL: '9 idiomas',
    tourist: 'Turista',
    touristSub: 'Com visto turístico',
    touristDesc: 'Está nos EAU com visto turístico. Sem Emirates ID.',
    touristCta: 'Descubra se pode conduzir →',
    resident: 'Residente',
    residentSub: 'Com Emirates ID',
    residentDesc: 'Vive nos EAU com Emirates ID.',
    residentCta: 'Obter carta EAU →',
    howTitle: 'Como funciona',
    s1: 'País',
    s2: 'Turista ou Residente?',
    s3: 'O seu guia',
    emiratesTitle: 'Emirados',
    trustTitle: 'Portais oficiais dos EAU',
    selectCountry: 'Selecione o seu país',
    searchPlaceholder: 'Pesquisar…',
    yourLicense: 'País emissor',
    canDriveTitle: '✅ Pode conduzir',
    canDriveSub: 'Reconhecido em Markhoos 2025',
    cannotDriveTitle: '❌ Não reconhecido',
    cannotDriveSub: 'A LIC não ajuda.',
    altTitle: 'O que PODE fazer',
    alt1T: 'Táxis',
    alt1B: 'Careem e Uber.',
    alt2T: 'Metro',
    alt2B: 'Metro do Dubai.',
    alt3T: 'Motorista',
    alt3B: 'Serviços acessíveis.',
    residentCallout: 'Com Emirates ID poderá obter carta.',
    selectEmirate: 'Selecione emirado',
    live: 'Disponível',
    comingSoon: 'Brevemente',
    guideFor: 'Guia para',
    catABadge: 'Troca direta',
    catBBadge: 'Formação',
    catADesc: 'Sem exames.',
    catBDesc: 'Teoria + manobras + estrada.',
    markedDone: 'Feito ✓',
    markDone: 'Marcar feito',
    officialLink: 'Fonte oficial →',
    cost: 'Custo',
    time: 'Tempo',
    docs: 'Documentos',
    sourceNote: 'Verificado nos portais oficiais.',
    filNote: 'Pessoal filipino nas autoescolas.',
    back: '← Voltar',
    share: 'Partilhar',
    copied: 'Copiado!',
    disclaimer: 'Verifique sempre com a autoridade oficial.',
    rule1: 'Passaporte + carta sempre consigo',
    rule2: 'Carta válida',
    rule3: 'Categoria correta',
    rule4: 'Multa ~3000 AED',
    rentTitle: 'Alugar?',
    rentBody: 'A maioria aceita a sua carta. Idade min: 21.',
    becomingResident: 'A tornar-se residente?',
    becomingBody: 'Com Emirates ID as regras mudam.',
    seeResidentGuide: 'Guia residente →',
    reportCta: 'Algo mudou?',
    reportPrompt: 'O que está errado?',
    reportPlaceholder: 'Taxa 800 AED',
    reportSubmit: 'Enviar →',
    reportThanks: 'Obrigado!',
    waitlistPlaceholder: 'Email',
    waitlistBtn: 'Notificar',
    waitlistThanks: 'Está na lista!',
    adminTitle: 'Admin',
    adminPass: 'Palavra-passe',
    adminLogin: 'Entrar',
    adminWrong: 'Incorreta',
    tab1: 'Relatórios',
    tab2: 'Passos',
    tab3: 'Países',
    tab4: 'Espera',
    tab5: 'Análises',
    tab6: 'Agendamento',
    open: 'Aberto',
    reviewed: 'Revisto',
    resolved: 'Resolvido',
    dismissed: 'Descartado',
    markResolved: 'Resolver',
    dismiss: 'Descartar',
    saveChanges: 'Guardar',
    csvExport: 'CSV',
    sendNow: 'Enviar',
    nextReminder: 'Próximo',
    lastSent: 'Último',
    printGuide: 'Imprimir',
    offlineBanner: 'Sem ligação — conteúdo em cache',
    password: 'nik25071990',
  },
};

// ─── GUIDE DATA ───────────────────────────────────────────────────────────────
function mkCat(steps, url, auth) {
  return steps.map((s, i) => ({ ...s, num: i + 1, link: url, src: auth }));
}

const STEP_MAP = {
  dubai: {
    direct_exchange: mkCat(
      [
        {
          title: 'Confirm Eligibility',
          body: 'Active UAE residency visa AND Emirates ID required. License-issuing country must match your nationality. License must be valid. Min age: 17.',
          docs: [
            'Emirates ID',
            'Valid foreign driving license',
            'UAE Residency Visa',
          ],
          cost: 'Free',
          time: '5 min',
        },
        {
          title: 'Book RTA Appointment',
          body: 'Book online via rta.ae or the RTA Smart Drive app. Walk-in at Emirates Driving Institute, Dubai Driving Center, or Galadari.',
          docs: [],
          cost: 'Free',
          time: 'Same day – 3 days',
        },
        {
          title: 'Eye Test',
          body: 'Any RTA-approved optician (most major malls). Bring Emirates ID. Results valid 3 months.',
          docs: ['Emirates ID'],
          cost: 'AED 50–100',
          time: '30 min',
        },
        {
          title: 'Submit Documents at RTA',
          body: 'Visit an RTA-approved institute with all documents. Processing is typically same-day. Note: RTA retains your original foreign license.',
          docs: [
            'Original foreign license',
            'Passport (original)',
            'Emirates ID (original)',
            'Residency visa copy',
            'Eye test certificate',
            'Passport-size photo',
            'Translation if not Arabic/English',
          ],
          cost: 'AED 950–1,100',
          time: 'Same day',
        },
        {
          title: 'Collect UAE Driving License',
          body: 'License issued same day or within 24 hours. Valid for 5 years.',
          docs: [],
          cost: 'Included',
          time: 'Same day – 24 hrs',
        },
      ],
      'https://www.rta.ae',
      'RTA'
    ),
    standard: mkCat(
      [
        {
          title: 'Confirm Residency Status',
          body: 'Must be a UAE resident with valid Emirates ID. Tourists cannot obtain a UAE driving license through driving school.',
          docs: ['Emirates ID', 'UAE Residency Visa', 'Passport'],
          cost: 'Free',
          time: '5 min',
        },
        {
          title: 'Register at RTA-Approved Institute',
          body: 'Choose from Emirates Driving Institute, Dubai Driving Center, or Galadari Motor Driving Centre.',
          docs: [
            'Emirates ID',
            'Passport copy',
            'Eye test',
            'Passport-size photo',
          ],
          cost: 'AED 200–500',
          time: '1–2 days',
        },
        {
          title: 'Eye Test',
          body: 'At institute or approved optician. Must be from a registered practitioner.',
          docs: ['Emirates ID'],
          cost: 'AED 50–100',
          time: '30 min',
        },
        {
          title: 'Theory Classes & Theory Test',
          body: 'Mandatory 8–12 hours theory classes. Computerised test: 35 questions, 60% pass mark.',
          docs: [],
          cost: 'AED 100–200/attempt',
          time: '1–4 weeks',
        },
        {
          title: 'Yard / Internal Test',
          body: 'Basic vehicle control in closed course. Must pass before road test.',
          docs: [],
          cost: 'AED 100–200/attempt',
          time: '1 day',
        },
        {
          title: 'Road Test (RTA Examiner)',
          body: '15–20 min on-road test. Common fails: lane discipline, mirror checks, signalling.',
          docs: [],
          cost: 'AED 200–300/attempt',
          time: '1 day',
        },
        {
          title: 'Collect UAE Driving License',
          body: 'Pay final fee and collect. Valid 5 years. Total cost: AED 2,000–4,500.',
          docs: [],
          cost: 'Included',
          time: 'Same day',
        },
      ],
      'https://www.rta.ae',
      'RTA'
    ),
  },
  abu_dhabi: {
    direct_exchange: mkCat(
      [
        {
          title: 'Apply Online via TAMM',
          body: 'Entire exchange handled online at tamm.abudhabi. Login with UAE Pass or Emirates ID.',
          docs: ['Emirates ID'],
          cost: 'Free',
          time: '15 min',
        },
        {
          title: 'Upload Documents',
          body: 'Upload on TAMM portal. Ensure scans are clear and legible.',
          docs: [
            'Foreign license scan',
            'Emirates ID',
            'Passport + visa copy',
            'Passport-size photo',
          ],
          cost: 'Free',
          time: '30 min',
        },
        {
          title: 'Eye Test at ADDC',
          body: 'Abu Dhabi Driving Center (ADDC) or approved optician. Bring Emirates ID.',
          docs: ['Emirates ID'],
          cost: 'AED 50–100',
          time: '30 min',
        },
        {
          title: 'Pay Fees & Receive License',
          body: 'Pay AED 600 via TAMM app or at reception. Total process including eye test and translation is typically around AED 860. License valid for 5 years.',
          docs: [],
          cost: 'AED 600 (total ~AED 860)',
          time: 'Same day',
        },
      ],
      'https://www.tamm.abudhabi',
      'TAMM'
    ),
    standard: mkCat(
      [
        {
          title: 'Confirm Residency & Register',
          body: 'Register at Abu Dhabi Driving Center (ADDC) or Bawabat Al Sharq Driving Center.',
          docs: ['Emirates ID', 'Passport copy', 'Residency visa'],
          cost: 'AED 200–400',
          time: '1–2 days',
        },
        {
          title: 'Eye Test',
          body: 'At ADDC or approved optician. Valid 3 months.',
          docs: ['Emirates ID'],
          cost: 'AED 50–100',
          time: '30 min',
        },
        {
          title: 'Theory Classes & Theory Test',
          body: 'Mandatory theory classes. 35-question computerised test, 60% pass mark.',
          docs: [],
          cost: 'AED 100–200/attempt',
          time: '1–4 weeks',
        },
        {
          title: 'Yard / Internal Test',
          body: 'Closed-course vehicle control at ADDC.',
          docs: [],
          cost: 'AED 100–200/attempt',
          time: '1 day',
        },
        {
          title: 'Road Test',
          body: '15–20 min on-road test with official ADDC examiner.',
          docs: [],
          cost: 'AED 200–300/attempt',
          time: '1 day',
        },
        {
          title: 'Pay & Collect via TAMM',
          body: 'Final payment and issuance via TAMM portal. Total: AED 1,800–4,000.',
          docs: [],
          cost: 'Included',
          time: '3–5 working days',
        },
      ],
      'https://www.tamm.abudhabi',
      'TAMM'
    ),
  },
  sharjah: {
    direct_exchange: mkCat(
      [
        {
          title: 'Confirm Eligibility',
          body: 'Active UAE residency visa and Emirates ID required. Min age: 17.',
          docs: [
            'Emirates ID',
            'Valid foreign driving license',
            'UAE Residency Visa',
          ],
          cost: 'Free',
          time: '5 min',
        },
        {
          title: 'Visit Sharjah Traffic & Licensing Dept',
          body: "Al Rahmaniya or Al Saja'a centres. Walk-in or book via the MOI Smart Services app.",
          docs: [],
          cost: 'Free',
          time: 'Same day – 2 days',
        },
        {
          title: 'Eye Test',
          body: 'MOI-approved optician or at the licensing centre. Bring Emirates ID.',
          docs: ['Emirates ID'],
          cost: 'AED 50–100',
          time: '30 min',
        },
        {
          title: 'Submit Documents',
          body: 'Submit at Sharjah Traffic Department. Processing typically same-day.',
          docs: [
            'Original foreign license',
            'Passport (original)',
            'Emirates ID (original)',
            'Residency visa copy',
            'Eye test certificate',
            'Passport-size photo',
            'Translation if not Arabic/English',
          ],
          cost: 'AED 500–1,200',
          time: 'Same day',
        },
        {
          title: 'Collect UAE Driving License',
          body: 'License issued same day or within 24–48 hours. Valid 5 years.',
          docs: [],
          cost: 'Included',
          time: 'Same day – 48 hrs',
        },
      ],
      'https://www.moi.gov.ae',
      'MOI / Sharjah Police'
    ),
    standard: mkCat(
      [
        {
          title: 'Confirm Residency Status',
          body: 'Must be UAE resident with valid Emirates ID and residency visa.',
          docs: ['Emirates ID', 'UAE Residency Visa', 'Passport'],
          cost: 'Free',
          time: '5 min',
        },
        {
          title: 'Register at MOI-Approved Institute',
          body: 'Sharjah Driving Institute (SDI), National Driving Institute, or Emirates Driving Institute (Sharjah branch).',
          docs: [
            'Emirates ID',
            'Passport copy',
            'Eye test',
            'Passport-size photo',
          ],
          cost: 'AED 200–500',
          time: '1–2 days',
        },
        {
          title: 'Eye Test',
          body: 'At institute or MOI-approved optician.',
          docs: ['Emirates ID'],
          cost: 'AED 50–100',
          time: '30 min',
        },
        {
          title: 'Theory Classes & Theory Test',
          body: 'MOI computerised test: 35 questions, 60% pass mark.',
          docs: [],
          cost: 'AED 100–200/attempt',
          time: '1–4 weeks',
        },
        {
          title: 'Yard / Internal Test',
          body: 'Closed-course vehicle control. Must pass before road test.',
          docs: [],
          cost: 'AED 100–200/attempt',
          time: '1 day',
        },
        {
          title: 'Road Test (MOI Examiner)',
          body: '15–20 min on-road test with MOI/Sharjah Police examiner.',
          docs: [],
          cost: 'AED 200–300/attempt',
          time: '1 day',
        },
        {
          title: 'Collect UAE Driving License',
          body: 'Pay final fee. Valid 5 years. Total: AED 2,000–4,500.',
          docs: [],
          cost: 'Included',
          time: 'Same day',
        },
      ],
      'https://www.moi.gov.ae',
      'MOI / Sharjah Police'
    ),
  },
  ajman: {
    direct_exchange: mkCat(
      [
        {
          title: 'Confirm Eligibility',
          body: 'Active UAE residency visa and Emirates ID required. Min age: 17.',
          docs: [
            'Emirates ID',
            'Valid foreign driving license',
            'UAE Residency Visa',
          ],
          cost: 'Free',
          time: '5 min',
        },
        {
          title: 'Visit Ajman Police Traffic Dept',
          body: 'Ajman Police HQ Traffic Department. Walk-in or via Ajman Police app.',
          docs: [],
          cost: 'Free',
          time: 'Same day – 2 days',
        },
        {
          title: 'Eye Test',
          body: 'Approved optician or at the Traffic Department. Bring Emirates ID.',
          docs: ['Emirates ID'],
          cost: 'AED 50–100',
          time: '30 min',
        },
        {
          title: 'Submit Documents',
          body: 'Submit at Ajman Police Traffic Department counter.',
          docs: [
            'Original foreign license',
            'Passport (original)',
            'Emirates ID',
            'Residency visa copy',
            'Eye test certificate',
            'Passport-size photo',
          ],
          cost: 'AED 400–1,000',
          time: 'Same day',
        },
        {
          title: 'Collect UAE Driving License',
          body: 'License issued within 24–48 hours. Valid 5 years.',
          docs: [],
          cost: 'Included',
          time: '24–48 hrs',
        },
      ],
      'https://www.ajmanpolice.gov.ae',
      'Ajman Police'
    ),
    standard: mkCat(
      [
        {
          title: 'Confirm Residency Status',
          body: 'Valid Emirates ID and residency visa required.',
          docs: ['Emirates ID', 'Residency Visa', 'Passport'],
          cost: 'Free',
          time: '5 min',
        },
        {
          title: 'Register at Ajman Driving Institute',
          body: 'Ajman Driving School or Emirates Driving Institute (Ajman branch).',
          docs: [
            'Emirates ID',
            'Passport copy',
            'Eye test',
            'Passport-size photo',
          ],
          cost: 'AED 200–400',
          time: '1–2 days',
        },
        {
          title: 'Eye Test',
          body: 'At institute or approved optician.',
          docs: ['Emirates ID'],
          cost: 'AED 50–100',
          time: '30 min',
        },
        {
          title: 'Theory Classes & Theory Test',
          body: 'Theory classes + computerised test: 35 questions, 60% pass mark.',
          docs: [],
          cost: 'AED 100–200/attempt',
          time: '1–4 weeks',
        },
        {
          title: 'Yard / Internal Test',
          body: 'Closed-course vehicle control.',
          docs: [],
          cost: 'AED 100–200/attempt',
          time: '1 day',
        },
        {
          title: 'Road Test',
          body: 'On-road test with Ajman Police examiner.',
          docs: [],
          cost: 'AED 200–300/attempt',
          time: '1 day',
        },
        {
          title: 'Collect UAE Driving License',
          body: 'Pay final fee. Valid 5 years. Total: AED 1,800–4,000.',
          docs: [],
          cost: 'Included',
          time: 'Same day',
        },
      ],
      'https://www.ajmanpolice.gov.ae',
      'Ajman Police'
    ),
  },
  rak: {
    direct_exchange: mkCat(
      [
        {
          title: 'Confirm Eligibility',
          body: 'Active UAE residency visa and Emirates ID required. Min age: 17.',
          docs: [
            'Emirates ID',
            'Valid foreign driving license',
            'UAE Residency Visa',
          ],
          cost: 'Free',
          time: '5 min',
        },
        {
          title: 'Visit RAK Police Traffic Dept',
          body: 'RAK Police HQ Traffic Department or via RAK Smart app.',
          docs: [],
          cost: 'Free',
          time: 'Same day – 2 days',
        },
        {
          title: 'Eye Test',
          body: 'RAK Police approved optician. Bring Emirates ID.',
          docs: ['Emirates ID'],
          cost: 'AED 50–100',
          time: '30 min',
        },
        {
          title: 'Submit Documents',
          body: 'Submit at RAK Traffic Department.',
          docs: [
            'Original foreign license',
            'Passport (original)',
            'Emirates ID',
            'Residency visa copy',
            'Eye test certificate',
            'Passport-size photo',
          ],
          cost: 'AED 400–1,000',
          time: 'Same day',
        },
        {
          title: 'Collect UAE Driving License',
          body: 'Issued within 24–48 hours. Valid 5 years.',
          docs: [],
          cost: 'Included',
          time: '24–48 hrs',
        },
      ],
      'https://www.rakpolice.gov.ae',
      'RAK Police'
    ),
    standard: mkCat(
      [
        {
          title: 'Confirm Residency Status',
          body: 'Valid Emirates ID and residency visa required.',
          docs: ['Emirates ID', 'Residency Visa', 'Passport'],
          cost: 'Free',
          time: '5 min',
        },
        {
          title: 'Register at RAK Driving Institute',
          body: 'RAK Driving Center or Emirates Driving Institute (RAK branch).',
          docs: [
            'Emirates ID',
            'Passport copy',
            'Eye test',
            'Passport-size photo',
          ],
          cost: 'AED 200–400',
          time: '1–2 days',
        },
        {
          title: 'Eye Test',
          body: 'At institute or approved optician.',
          docs: ['Emirates ID'],
          cost: 'AED 50–100',
          time: '30 min',
        },
        {
          title: 'Theory Classes & Theory Test',
          body: 'Theory classes + computerised test.',
          docs: [],
          cost: 'AED 100–200/attempt',
          time: '1–4 weeks',
        },
        {
          title: 'Yard / Internal Test',
          body: 'Closed-course vehicle control.',
          docs: [],
          cost: 'AED 100–200/attempt',
          time: '1 day',
        },
        {
          title: 'Road Test',
          body: 'On-road test with RAK Police examiner.',
          docs: [],
          cost: 'AED 200–300/attempt',
          time: '1 day',
        },
        {
          title: 'Collect UAE Driving License',
          body: 'Pay final fee. Valid 5 years. Total: AED 1,800–4,000.',
          docs: [],
          cost: 'Included',
          time: 'Same day',
        },
      ],
      'https://www.rakpolice.gov.ae',
      'RAK Police'
    ),
  },
  fujairah: {
    direct_exchange: mkCat(
      [
        {
          title: 'Confirm Eligibility',
          body: 'Active UAE residency visa and Emirates ID required. Min age: 17.',
          docs: [
            'Emirates ID',
            'Valid foreign driving license',
            'UAE Residency Visa',
          ],
          cost: 'Free',
          time: '5 min',
        },
        {
          title: 'Visit Fujairah Police Traffic Dept',
          body: 'Fujairah Police HQ Traffic Department.',
          docs: [],
          cost: 'Free',
          time: 'Same day – 2 days',
        },
        {
          title: 'Eye Test',
          body: 'Approved optician or at the Traffic Department.',
          docs: ['Emirates ID'],
          cost: 'AED 50–100',
          time: '30 min',
        },
        {
          title: 'Submit Documents',
          body: 'Submit at Fujairah Traffic Department.',
          docs: [
            'Original foreign license',
            'Passport (original)',
            'Emirates ID',
            'Residency visa copy',
            'Eye test certificate',
            'Passport-size photo',
          ],
          cost: 'AED 400–1,000',
          time: 'Same day',
        },
        {
          title: 'Collect UAE Driving License',
          body: 'Issued within 24–48 hours. Valid 5 years.',
          docs: [],
          cost: 'Included',
          time: '24–48 hrs',
        },
      ],
      'https://www.fujairahpolice.gov.ae',
      'Fujairah Police'
    ),
    standard: mkCat(
      [
        {
          title: 'Confirm Residency Status',
          body: 'Valid Emirates ID and residency visa required.',
          docs: ['Emirates ID', 'Residency Visa', 'Passport'],
          cost: 'Free',
          time: '5 min',
        },
        {
          title: 'Register at Fujairah Driving Institute',
          body: 'Fujairah Driving Institute or National Driving Institute (Fujairah).',
          docs: [
            'Emirates ID',
            'Passport copy',
            'Eye test',
            'Passport-size photo',
          ],
          cost: 'AED 200–400',
          time: '1–2 days',
        },
        {
          title: 'Eye Test',
          body: 'At institute or approved optician.',
          docs: ['Emirates ID'],
          cost: 'AED 50–100',
          time: '30 min',
        },
        {
          title: 'Theory Classes & Theory Test',
          body: 'Theory classes + computerised test.',
          docs: [],
          cost: 'AED 100–200/attempt',
          time: '1–4 weeks',
        },
        {
          title: 'Yard / Internal Test',
          body: 'Closed-course vehicle control.',
          docs: [],
          cost: 'AED 100–200/attempt',
          time: '1 day',
        },
        {
          title: 'Road Test',
          body: 'On-road test with Fujairah Police examiner.',
          docs: [],
          cost: 'AED 200–300/attempt',
          time: '1 day',
        },
        {
          title: 'Collect UAE Driving License',
          body: 'Pay final fee. Valid 5 years. Total: AED 1,800–4,000.',
          docs: [],
          cost: 'Included',
          time: 'Same day',
        },
      ],
      'https://www.fujairahpolice.gov.ae',
      'Fujairah Police'
    ),
  },
  uaq: {
    direct_exchange: mkCat(
      [
        {
          title: 'Confirm Eligibility',
          body: 'Active UAE residency visa and Emirates ID required. Min age: 17.',
          docs: [
            'Emirates ID',
            'Valid foreign driving license',
            'UAE Residency Visa',
          ],
          cost: 'Free',
          time: '5 min',
        },
        {
          title: 'Visit UAQ Police Traffic Dept',
          body: 'UAQ Police HQ Traffic Department.',
          docs: [],
          cost: 'Free',
          time: 'Same day – 2 days',
        },
        {
          title: 'Eye Test',
          body: 'Approved optician or Traffic Department.',
          docs: ['Emirates ID'],
          cost: 'AED 50–100',
          time: '30 min',
        },
        {
          title: 'Submit Documents',
          body: 'Submit at UAQ Traffic Department.',
          docs: [
            'Original foreign license',
            'Passport (original)',
            'Emirates ID',
            'Residency visa copy',
            'Eye test certificate',
            'Passport-size photo',
          ],
          cost: 'AED 400–1,000',
          time: 'Same day',
        },
        {
          title: 'Collect UAE Driving License',
          body: 'Issued within 24–48 hours. Valid 5 years.',
          docs: [],
          cost: 'Included',
          time: '24–48 hrs',
        },
      ],
      'https://www.uaqpolice.gov.ae',
      'UAQ Police'
    ),
    standard: mkCat(
      [
        {
          title: 'Confirm Residency Status',
          body: 'Valid Emirates ID and residency visa required.',
          docs: ['Emirates ID', 'Residency Visa', 'Passport'],
          cost: 'Free',
          time: '5 min',
        },
        {
          title: 'Register at UAQ Driving Institute',
          body: 'UAQ Driving Institute or nearest approved institute.',
          docs: [
            'Emirates ID',
            'Passport copy',
            'Eye test',
            'Passport-size photo',
          ],
          cost: 'AED 200–400',
          time: '1–2 days',
        },
        {
          title: 'Eye Test',
          body: 'At institute or approved optician.',
          docs: ['Emirates ID'],
          cost: 'AED 50–100',
          time: '30 min',
        },
        {
          title: 'Theory Classes & Theory Test',
          body: 'Theory classes + computerised test.',
          docs: [],
          cost: 'AED 100–200/attempt',
          time: '1–4 weeks',
        },
        {
          title: 'Yard / Internal Test',
          body: 'Closed-course vehicle control.',
          docs: [],
          cost: 'AED 100–200/attempt',
          time: '1 day',
        },
        {
          title: 'Road Test',
          body: 'On-road test with UAQ Police examiner.',
          docs: [],
          cost: 'AED 200–300/attempt',
          time: '1 day',
        },
        {
          title: 'Collect UAE Driving License',
          body: 'Pay final fee. Valid 5 years. Total: AED 1,800–4,000.',
          docs: [],
          cost: 'Included',
          time: 'Same day',
        },
      ],
      'https://www.uaqpolice.gov.ae',
      'UAQ Police'
    ),
  },
};

const EMIRATES = [
  {
    code: 'dubai',
    name: 'Dubai',
    nameAr: 'دبي',
    authority: 'RTA',
    status: 'live',
  },
  {
    code: 'abu_dhabi',
    name: 'Abu Dhabi',
    nameAr: 'أبوظبي',
    authority: 'TAMM / ADDC',
    status: 'live',
  },
  {
    code: 'sharjah',
    name: 'Sharjah',
    nameAr: 'الشارقة',
    authority: 'MOI / Sharjah Police',
    status: 'live',
  },
  {
    code: 'ajman',
    name: 'Ajman',
    nameAr: 'عجمان',
    authority: 'Ajman Police',
    status: 'live',
  },
  {
    code: 'rak',
    name: 'Ras Al Khaimah',
    nameAr: 'رأس الخيمة',
    authority: 'RAK Police',
    status: 'live',
  },
  {
    code: 'fujairah',
    name: 'Fujairah',
    nameAr: 'الفجيرة',
    authority: 'Fujairah Police',
    status: 'live',
  },
  {
    code: 'uaq',
    name: 'Umm Al Quwain',
    nameAr: 'أم القيوين',
    authority: 'UAQ Police',
    status: 'live',
  },
];

// ─── ADMIN SEED ───────────────────────────────────────────────────────────────
const INIT_REPORTS = [
  {
    id: 1,
    date: '2025-05-20',
    emirate: 'Dubai',
    step: 'Step 4',
    note: 'RTA fee is now AED 800 flat',
    status: 'open',
  },
  {
    id: 2,
    date: '2025-05-18',
    emirate: 'Abu Dhabi',
    step: 'Step 4',
    note: 'TAMM delivery takes 5–7 days now',
    status: 'open',
  },
  {
    id: 3,
    date: '2025-05-15',
    emirate: 'Sharjah',
    step: 'Step 2',
    note: 'Walk-in unavailable Mon–Wed',
    status: 'open',
  },
  {
    id: 4,
    date: '2025-05-10',
    emirate: 'Dubai',
    step: 'Step 2',
    note: 'Galadari requires online booking now',
    status: 'resolved',
  },
];
const ANALYTICS = {
  topCountries: [
    { name: 'India', n: 312 },
    { name: 'Philippines', n: 287 },
    { name: 'UK', n: 241 },
    { name: 'Pakistan', n: 198 },
    { name: 'Egypt', n: 145 },
    { name: 'USA', n: 132 },
    { name: 'Nigeria', n: 89 },
    { name: 'Germany', n: 67 },
  ],
  split: { tourist: 58, resident: 42 },
  langs: [
    { l: 'EN', n: 380 },
    { l: 'HI', n: 210 },
    { l: 'AR', n: 185 },
    { l: 'TL', n: 160 },
    { l: 'ML', n: 140 },
    { l: 'RU', n: 95 },
    { l: 'FR', n: 52 },
    { l: 'ES', n: 41 },
    { l: 'PT', n: 38 },
  ],
  daily: [
    120, 145, 132, 178, 195, 210, 188, 225, 242, 198, 215, 230, 245, 260, 235,
    280, 295, 310, 275, 290, 320, 305, 340, 315, 330, 355, 340, 375, 360, 390,
  ],
};

// ─── ERROR BOUNDARY ───────────────────────────────────────────────────────────
class ErrorBoundary extends React.Component {
  constructor(p) {
    super(p);
    this.state = { err: null };
  }
  static getDerivedStateFromError(e) {
    return { err: e };
  }
  render() {
    if (this.state.err)
      return (
        <div style={{ padding: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
          <h2 style={{ color: '#C8102E', marginBottom: 8 }}>
            Something went wrong
          </h2>
          <p style={{ color: '#6B7280', marginBottom: 20 }}>
            Please refresh the page to continue.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#00843D',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              padding: '10px 24px',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Refresh
          </button>
        </div>
      );
    return this.props.children;
  }
}

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Wheel = () => (
  <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="2" />
    <circle cx="14" cy="14" r="3" fill="currentColor" />
    <line
      x1="14"
      y1="2"
      x2="14"
      y2="11"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="14"
      y1="17"
      x2="14"
      y2="26"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="2"
      y1="14"
      x2="11"
      y2="14"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="17"
      y1="14"
      x2="26"
      y2="14"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

// ─── LANGUAGE DROPDOWN ────────────────────────────────────────────────────────
function LangDropdown({ lang, setLang }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const cur = LANGS.find((l) => l.code === lang) || LANGS[0];
  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  return (
    <div ref={ref} style={{ position: 'relative', userSelect: 'none' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 12px',
          borderRadius: 20,
          border: '1.5px solid #00843D',
          background: '#fff',
          color: '#00843D',
          fontWeight: 700,
          fontSize: 13,
          cursor: 'pointer',
          minWidth: 120,
        }}
      >
        <span>{cur.flag}</span>
        <span style={{ flex: 1 }}>{cur.label}</span>
        <span style={{ fontSize: 10 }}>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            right: 0,
            background: '#fff',
            border: '1.5px solid #e5e7eb',
            borderRadius: 12,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            zIndex: 200,
            minWidth: 160,
            overflow: 'hidden',
          }}
        >
          {LANGS.map((l) => (
            <div
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
                setUrlParam('lang', l.code);
              }}
              style={{
                padding: '9px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                cursor: 'pointer',
                background: l.code === lang ? '#f0fdf4' : 'transparent',
                fontWeight: l.code === lang ? 700 : 400,
                fontSize: 14,
                color: l.code === lang ? '#00843D' : '#374151',
              }}
              onMouseOver={(e) => {
                if (l.code !== lang)
                  e.currentTarget.style.background = '#f4f6f8';
              }}
              onMouseOut={(e) => {
                if (l.code !== lang)
                  e.currentTarget.style.background = 'transparent';
              }}
            >
              <span style={{ fontSize: 18 }}>{l.flag}</span>
              <span>{l.label}</span>
              {l.code === lang && (
                <span style={{ marginLeft: 'auto', color: '#00843D' }}>✓</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
function ProgressBar({ cur, t }) {
  const labels = [t.s2, t.s1, t.s3];
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: 22,
        direction: 'ltr',
      }}
    >
      {labels.map((l, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: '50%',
                background: i <= cur ? '#00843D' : '#e5e7eb',
                color: i <= cur ? '#fff' : '#9ca3af',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: 11,
              }}
            >
              {i < cur ? '✓' : i + 1}
            </div>
            <div
              style={{
                fontSize: 9,
                color: i <= cur ? '#00843D' : '#9ca3af',
                marginTop: 3,
                textAlign: 'center',
                fontWeight: i === cur ? 700 : 400,
                maxWidth: 72,
                lineHeight: 1.3,
              }}
            >
              {l}
            </div>
          </div>
          {i < 2 && (
            <div
              style={{
                height: 2,
                flex: 1,
                background: i < cur ? '#00843D' : '#e5e7eb',
                marginBottom: 14,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── STEP CARD ────────────────────────────────────────────────────────────────
function StepCard({ step, done, onToggle, t, country, isRtl }) {
  const [open, setOpen] = useState(step.num === 1);
  const [rOpen, setROpen] = useState(false);
  const [rNote, setRNote] = useState('');
  const [rDone, setRDone] = useState(false);
  return (
    <div
      style={{
        background: done ? '#f0fdf4' : '#fff',
        border: `1.5px solid ${done ? '#86efac' : '#e5e7eb'}`,
        borderRadius: 16,
        marginBottom: 10,
        overflow: 'hidden',
      }}
    >
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          padding: '13px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          cursor: 'pointer',
          flexDirection: isRtl ? 'row-reverse' : 'row',
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: done ? '#00843D' : '#f4f6f8',
            color: done ? '#fff' : '#00843D',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: 13,
            flexShrink: 0,
          }}
        >
          {done ? '✓' : step.num}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#0D1B2A' }}>
            {step.title}
          </div>
          <div
            style={{
              fontSize: 11,
              color: '#6B7280',
              display: 'flex',
              gap: 10,
              marginTop: 2,
              flexDirection: isRtl ? 'row-reverse' : 'row',
            }}
          >
            <span>💰 {step.cost}</span>
            <span>⏱ {step.time}</span>
          </div>
        </div>
        <span style={{ color: '#9ca3af', fontSize: 11 }}>
          {open ? '▲' : '▼'}
        </span>
      </div>
      {open && (
        <div style={{ padding: '0 16px 14px', borderTop: '1px solid #f3f4f6' }}>
          <p
            style={{
              color: '#374151',
              lineHeight: 1.7,
              marginTop: 10,
              fontSize: 13,
            }}
          >
            {step.body}
          </p>
          {step.docs && step.docs.length > 0 && (
            <div style={{ marginTop: 8 }}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 11,
                  color: '#6B7280',
                  marginBottom: 4,
                }}
              >
                📄 {t.docs}
              </div>
              <ul style={{ margin: 0, paddingInlineStart: 16 }}>
                {step.docs.map((d, i) => (
                  <li
                    key={i}
                    style={{ fontSize: 12, color: '#374151', marginBottom: 2 }}
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {country && country.code === 'PH' && step.num === 2 && (
            <div
              style={{
                background: '#fef3c7',
                border: '1px solid #fcd34d',
                borderRadius: 8,
                padding: '7px 11px',
                marginTop: 8,
                fontSize: 12,
                color: '#92400e',
              }}
            >
              🇵🇭 {t.filNote}
            </div>
          )}
          <div
            style={{
              display: 'flex',
              gap: 8,
              marginTop: 12,
              flexWrap: 'wrap',
              flexDirection: isRtl ? 'row-reverse' : 'row',
            }}
          >
            <button
              onClick={() => onToggle(step.num)}
              style={{
                padding: '6px 13px',
                borderRadius: 8,
                border: 'none',
                background: done ? '#86efac' : '#00843D',
                color: done ? '#166534' : '#fff',
                fontWeight: 700,
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              {done ? t.markedDone : t.markDone}
            </button>
            <a
              href={step.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '6px 13px',
                borderRadius: 8,
                border: '1.5px solid #00843D',
                color: '#00843D',
                fontWeight: 700,
                fontSize: 12,
                textDecoration: 'none',
              }}
            >
              {t.officialLink}
            </a>
          </div>
          <div style={{ marginTop: 10 }}>
            {rDone ? (
              <p style={{ fontSize: 11, color: '#16a34a', margin: 0 }}>
                ✅ {t.reportThanks}
              </p>
            ) : !rOpen ? (
              <button
                onClick={() => setROpen(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9ca3af',
                  fontSize: 11,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                ⚠️ {t.reportCta}
              </button>
            ) : (
              <div
                style={{
                  border: '1px solid #fcd34d',
                  borderRadius: 8,
                  padding: 9,
                  background: '#fffbeb',
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 11,
                    color: '#92400e',
                    marginBottom: 4,
                  }}
                >
                  {t.reportPrompt}
                </div>
                <textarea
                  value={rNote}
                  onChange={(e) => setRNote(e.target.value)}
                  rows={2}
                  placeholder={t.reportPlaceholder}
                  style={{
                    width: '100%',
                    border: '1px solid #fcd34d',
                    borderRadius: 6,
                    padding: 6,
                    fontSize: 12,
                    resize: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    gap: 6,
                    marginTop: 5,
                    justifyContent: 'flex-end',
                  }}
                >
                  <button
                    onClick={() => setROpen(false)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#6B7280',
                      fontSize: 11,
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (rNote.trim()) setRDone(true);
                    }}
                    style={{
                      background: '#f59e0b',
                      border: 'none',
                      borderRadius: 6,
                      padding: '4px 11px',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: 11,
                      cursor: 'pointer',
                    }}
                  >
                    {t.reportSubmit}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── COUNTRY SELECTOR ─────────────────────────────────────────────────────────
function CountrySel({ t, isRtl, onSelect }) {
  const [s, setS] = useState('');
  const filtered = useMemo(
    () =>
      COUNTRIES.filter((c) => c.name.toLowerCase().includes(s.toLowerCase())),
    [s]
  );
  const regions = useMemo(
    () => [...new Set(filtered.map((c) => c.region))],
    [filtered]
  );
  return (
    <div>
      <div
        style={{
          marginBottom: 8,
          fontSize: 14,
          color: '#374151',
          fontWeight: 600,
        }}
      >
        {t.yourLicense}
      </div>
      <input
        value={s}
        onChange={(e) => setS(e.target.value)}
        placeholder={t.searchPlaceholder}
        style={{
          width: '100%',
          border: '1.5px solid #d1d5db',
          borderRadius: 10,
          padding: '10px 14px',
          fontSize: 14,
          boxSizing: 'border-box',
          marginBottom: 6,
        }}
      />
      <div
        style={{
          maxHeight: 370,
          overflowY: 'auto',
          borderRadius: 10,
          border: '1px solid #e5e7eb',
        }}
      >
        {filtered.length === 0 ? (
          <div
            style={{
              padding: 20,
              textAlign: 'center',
              color: '#9ca3af',
              fontSize: 14,
            }}
          >
            No countries found
          </div>
        ) : (
          regions.map((r) => (
            <div key={r}>
              <div
                style={{
                  background: '#f4f6f8',
                  padding: '4px 12px',
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#6B7280',
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                }}
              >
                {r}
              </div>
              {filtered
                .filter((c) => c.region === r)
                .map((c) => (
                  <div
                    key={c.code}
                    onClick={() => onSelect(c)}
                    style={{
                      padding: '9px 13px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      cursor: 'pointer',
                      borderBottom: '1px solid #f3f4f6',
                      flexDirection: isRtl ? 'row-reverse' : 'row',
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.background = '#f0fdf4')
                    }
                    onMouseOut={(e) => (e.currentTarget.style.background = '')}
                  >
                    <span style={{ fontSize: 19 }}>{c.flag}</span>
                    <span style={{ flex: 1, fontWeight: 500, fontSize: 14 }}>
                      {c.name}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        padding: '2px 7px',
                        borderRadius: 8,
                        background: c.t ? '#dcfce7' : '#fee2e2',
                        color: c.t ? '#166534' : '#991b1b',
                        fontWeight: 700,
                      }}
                    >
                      {c.cat === 'direct_exchange' ? t.catABadge : t.catBBadge}
                    </span>
                  </div>
                ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ─── MINI CHARTS ─────────────────────────────────────────────────────────────
function BarChart({ data, color = '#00843D', lk = 'name', vk = 'n' }) {
  const max = Math.max(...data.map((d) => d[vk]), 1);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      {data.map((d, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 68,
              fontSize: 11,
              color: '#374151',
              textAlign: 'right',
              flexShrink: 0,
            }}
          >
            {d[lk]}
          </div>
          <div
            style={{
              flex: 1,
              background: '#f4f6f8',
              borderRadius: 3,
              height: 15,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${Math.round((d[vk] / max) * 100)}%`,
                background: color,
                height: '100%',
                borderRadius: 3,
              }}
            />
          </div>
          <div style={{ width: 28, fontSize: 11, color: '#6B7280' }}>
            {d[vk]}
          </div>
        </div>
      ))}
    </div>
  );
}

function LineChart({ data }) {
  const max = Math.max(...data, 1);
  const min = Math.min(...data);
  const pts = data
    .map(
      (v, i) =>
        `${Math.round((i / (data.length - 1)) * 280)},${Math.round(
          50 - ((v - min) / Math.max(max - min, 1)) * 44
        )}`
    )
    .join(' ');
  return (
    <svg
      width="100%"
      viewBox="0 0 280 58"
      preserveAspectRatio="none"
      style={{ height: 58 }}
    >
      <polyline points={pts} fill="none" stroke="#00843D" strokeWidth="2" />
      <polyline
        points={`0,50 ${pts} 280,50`}
        fill="#00843D"
        fillOpacity="0.08"
      />
    </svg>
  );
}

// ─── ADMIN PANEL ──────────────────────────────────────────────────────────────
function AdminPanel({ t, onClose }) {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [wrong, setWrong] = useState(false);
  const [tab, setTab] = useState(0);
  const [reports, setReports] = useState(INIT_REPORTS);
  const [filter, setFilter] = useState('all');
  const [editRow, setEditRow] = useState(null);
  const [cSearch, setCSearch] = useState('');
  const [reminderLog, setReminderLog] = useState([
    { date: '2025-05-01', status: 'sent' },
    { date: '2025-04-01', status: 'sent' },
    { date: '2025-03-01', status: 'sent' },
  ]);

  const login = () => {
    if (pw === t.password) {
      setAuthed(true);
      setWrong(false);
    } else {
      setWrong(true);
      setPw('');
    }
  };

  const openCount = reports.filter((r) => r.status === 'open').length;
  const vis =
    filter === 'all' ? reports : reports.filter((r) => r.status === filter);
  const setStatus = (id, s) =>
    setReports((p) => p.map((r) => (r.id === id ? { ...r, status: s } : r)));
  const sc = (s) =>
    ({
      open: '#dc2626',
      reviewed: '#d97706',
      resolved: '#16a34a',
      dismissed: '#9ca3af',
    }[s] || '#9ca3af');

  const allSteps = useMemo(
    () =>
      Object.entries(STEP_MAP).flatMap(([em, cats]) =>
        Object.entries(cats).flatMap(([cat, ss]) =>
          ss.map((s) => ({ ...s, emirate: em, cat }))
        )
      ),
    []
  );

  const filteredC = useMemo(
    () =>
      COUNTRIES.filter((c) =>
        c.name.toLowerCase().includes(cSearch.toLowerCase())
      ).slice(0, 50),
    [cSearch]
  );

  if (!authed)
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: 20,
            padding: 32,
            width: 300,
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 8 }}>🔐</div>
          <h2 style={{ margin: '0 0 18px', color: '#0D1B2A' }}>
            {t.adminTitle}
          </h2>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && login()}
            placeholder={t.adminPass}
            autoFocus
            style={{
              width: '100%',
              border: `1.5px solid ${wrong ? '#dc2626' : '#d1d5db'}`,
              borderRadius: 8,
              padding: '10px 12px',
              fontSize: 15,
              boxSizing: 'border-box',
              marginBottom: 6,
            }}
          />
          {wrong && (
            <div style={{ color: '#dc2626', fontSize: 13, marginBottom: 6 }}>
              {t.adminWrong}
            </div>
          )}
          <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 12 }}>
            Hint: year + month + day of birth
          </div>
          <button
            onClick={login}
            style={{
              width: '100%',
              background: '#00843D',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: 10,
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
            }}
          >
            {t.adminLogin}
          </button>
          <button
            onClick={onClose}
            style={{
              marginTop: 8,
              background: 'none',
              border: 'none',
              color: '#9ca3af',
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );

  const TABS = [t.tab1, t.tab2, t.tab3, t.tab4, t.tab5, t.tab6];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#f4f6f8',
        zIndex: 100,
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderBottom: '2px solid #00843D',
          padding: '11px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ fontWeight: 800, fontSize: 17 }}>🛠 {t.adminTitle}</div>
        <button
          onClick={onClose}
          style={{
            background: '#f4f6f8',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            padding: '5px 13px',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          ✕ Close
        </button>
      </div>
      <div
        style={{
          background: '#fff',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          overflowX: 'auto',
          padding: '0 14px',
        }}
      >
        {TABS.map((label, i) => (
          <button
            key={i}
            onClick={() => setTab(i)}
            style={{
              padding: '10px 14px',
              border: 'none',
              borderBottom: `3px solid ${
                tab === i ? '#00843D' : 'transparent'
              }`,
              background: 'none',
              fontWeight: tab === i ? 700 : 400,
              color: tab === i ? '#00843D' : '#6B7280',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontSize: 13,
            }}
          >
            {label}
            {i === 0 && openCount > 0 && (
              <span
                style={{
                  marginLeft: 4,
                  background: '#dc2626',
                  color: '#fff',
                  borderRadius: 10,
                  fontSize: 10,
                  padding: '1px 5px',
                }}
              >
                {openCount}
              </span>
            )}
          </button>
        ))}
      </div>
      <div style={{ maxWidth: 900, margin: '18px auto', padding: '0 14px' }}>
        {tab === 0 && (
          <div>
            <div
              style={{
                display: 'flex',
                gap: 6,
                marginBottom: 12,
                flexWrap: 'wrap',
              }}
            >
              {['all', 'open', 'reviewed', 'resolved', 'dismissed'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: '4px 11px',
                    borderRadius: 16,
                    border: '1.5px solid',
                    borderColor: filter === f ? '#00843D' : '#e5e7eb',
                    background: filter === f ? '#00843D' : '#fff',
                    color: filter === f ? '#fff' : '#374151',
                    fontWeight: 600,
                    fontSize: 12,
                    cursor: 'pointer',
                  }}
                >
                  {f === 'all' ? 'All' : t[f]}
                </button>
              ))}
            </div>
            <div
              style={{
                background: '#fff',
                borderRadius: 12,
                border: '1px solid #e5e7eb',
                overflowX: 'auto',
              }}
            >
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: 13,
                }}
              >
                <thead>
                  <tr style={{ background: '#f4f6f8' }}>
                    {[
                      'Date',
                      'Emirate',
                      'Step',
                      'Report',
                      'Status',
                      'Actions',
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: '8px 12px',
                          textAlign: 'left',
                          fontWeight: 700,
                          color: '#374151',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {vis.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        style={{
                          padding: 18,
                          textAlign: 'center',
                          color: '#9ca3af',
                        }}
                      >
                        No reports
                      </td>
                    </tr>
                  ) : (
                    vis.map((r) => (
                      <tr key={r.id} style={{ borderTop: '1px solid #f3f4f6' }}>
                        <td
                          style={{
                            padding: '8px 12px',
                            color: '#6B7280',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {r.date}
                        </td>
                        <td style={{ padding: '8px 12px', fontWeight: 600 }}>
                          {r.emirate}
                        </td>
                        <td style={{ padding: '8px 12px', color: '#6B7280' }}>
                          {r.step}
                        </td>
                        <td
                          style={{
                            padding: '8px 12px',
                            maxWidth: 180,
                            fontSize: 12,
                          }}
                        >
                          {r.note}
                        </td>
                        <td style={{ padding: '8px 12px' }}>
                          <span
                            style={{
                              background: sc(r.status) + '18',
                              color: sc(r.status),
                              borderRadius: 8,
                              padding: '2px 7px',
                              fontWeight: 700,
                              fontSize: 11,
                            }}
                          >
                            {t[r.status] || r.status}
                          </span>
                        </td>
                        <td style={{ padding: '8px 12px' }}>
                          <div style={{ display: 'flex', gap: 4 }}>
                            {r.status !== 'resolved' && (
                              <button
                                onClick={() => setStatus(r.id, 'resolved')}
                                style={{
                                  background: '#dcfce7',
                                  border: 'none',
                                  borderRadius: 6,
                                  padding: '3px 8px',
                                  color: '#166534',
                                  fontWeight: 700,
                                  fontSize: 11,
                                  cursor: 'pointer',
                                }}
                              >
                                {t.markResolved}
                              </button>
                            )}
                            {r.status !== 'dismissed' && (
                              <button
                                onClick={() => setStatus(r.id, 'dismissed')}
                                style={{
                                  background: '#f4f6f8',
                                  border: 'none',
                                  borderRadius: 6,
                                  padding: '3px 8px',
                                  color: '#6B7280',
                                  fontWeight: 700,
                                  fontSize: 11,
                                  cursor: 'pointer',
                                }}
                              >
                                {t.dismiss}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {tab === 1 && (
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              border: '1px solid #e5e7eb',
              overflowX: 'auto',
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: 12,
              }}
            >
              <thead>
                <tr style={{ background: '#f4f6f8' }}>
                  {['Emirate', 'Category', '#', 'Title', 'Cost', 'Action'].map(
                    (h) => (
                      <th
                        key={h}
                        style={{
                          padding: '8px 11px',
                          textAlign: 'left',
                          fontWeight: 700,
                          color: '#374151',
                        }}
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {allSteps.map((s, i) => (
                  <tr
                    key={i}
                    style={{
                      borderTop: '1px solid #f3f4f6',
                      background: editRow === i ? '#f0fdf4' : '',
                    }}
                  >
                    <td
                      style={{
                        padding: '7px 11px',
                        fontWeight: 600,
                        textTransform: 'capitalize',
                      }}
                    >
                      {s.emirate.replace('_', ' ')}
                    </td>
                    <td style={{ padding: '7px 11px' }}>
                      <span
                        style={{
                          fontSize: 10,
                          padding: '2px 7px',
                          borderRadius: 8,
                          background:
                            s.cat === 'direct_exchange' ? '#dcfce7' : '#dbeafe',
                          color:
                            s.cat === 'direct_exchange' ? '#166534' : '#1d4ed8',
                          fontWeight: 700,
                        }}
                      >
                        {s.cat === 'direct_exchange' ? 'Direct' : 'Standard'}
                      </span>
                    </td>
                    <td style={{ padding: '7px 11px', color: '#6B7280' }}>
                      #{s.num}
                    </td>
                    <td style={{ padding: '7px 11px' }}>
                      {editRow === i ? (
                        <input
                          defaultValue={s.title}
                          style={{
                            border: '1px solid #00843D',
                            borderRadius: 6,
                            padding: '3px 7px',
                            width: '100%',
                            fontSize: 12,
                          }}
                        />
                      ) : (
                        s.title
                      )}
                    </td>
                    <td
                      style={{
                        padding: '7px 11px',
                        color: '#6B7280',
                        whiteSpace: 'nowrap',
                        fontSize: 11,
                      }}
                    >
                      {s.cost}
                    </td>
                    <td style={{ padding: '7px 11px' }}>
                      {editRow === i ? (
                        <button
                          onClick={() => setEditRow(null)}
                          style={{
                            background: '#00843D',
                            border: 'none',
                            borderRadius: 6,
                            padding: '3px 9px',
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: 11,
                            cursor: 'pointer',
                          }}
                        >
                          {t.saveChanges}
                        </button>
                      ) : (
                        <button
                          onClick={() => setEditRow(i)}
                          style={{
                            background: '#f4f6f8',
                            border: 'none',
                            borderRadius: 6,
                            padding: '3px 9px',
                            color: '#374151',
                            fontWeight: 700,
                            fontSize: 11,
                            cursor: 'pointer',
                          }}
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {tab === 2 && (
          <div>
            <input
              value={cSearch}
              onChange={(e) => setCSearch(e.target.value)}
              placeholder="Search countries…"
              style={{
                width: '100%',
                border: '1.5px solid #d1d5db',
                borderRadius: 10,
                padding: '9px 13px',
                fontSize: 13,
                boxSizing: 'border-box',
                marginBottom: 10,
              }}
            />
            <div
              style={{
                background: '#fff',
                borderRadius: 12,
                border: '1px solid #e5e7eb',
                overflowX: 'auto',
              }}
            >
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: 12,
                }}
              >
                <thead>
                  <tr style={{ background: '#f4f6f8' }}>
                    {['Country', 'Region', 'Tourist Drive', 'Category'].map(
                      (h) => (
                        <th
                          key={h}
                          style={{
                            padding: '8px 11px',
                            textAlign: 'left',
                            fontWeight: 700,
                            color: '#374151',
                          }}
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredC.map((c, i) => (
                    <tr key={i} style={{ borderTop: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '7px 11px' }}>
                        {c.flag} {c.name}
                      </td>
                      <td style={{ padding: '7px 11px', color: '#6B7280' }}>
                        {c.region}
                      </td>
                      <td style={{ padding: '7px 11px' }}>
                        <span
                          style={{
                            padding: '2px 7px',
                            borderRadius: 8,
                            background: c.t ? '#dcfce7' : '#fee2e2',
                            color: c.t ? '#166534' : '#991b1b',
                            fontWeight: 700,
                            fontSize: 10,
                          }}
                        >
                          {c.t ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td style={{ padding: '7px 11px' }}>
                        <span
                          style={{
                            padding: '2px 7px',
                            borderRadius: 8,
                            background:
                              c.cat === 'direct_exchange'
                                ? '#dcfce7'
                                : '#dbeafe',
                            color:
                              c.cat === 'direct_exchange'
                                ? '#166534'
                                : '#1d4ed8',
                            fontWeight: 700,
                            fontSize: 10,
                          }}
                        >
                          {c.cat === 'direct_exchange' ? 'Direct' : 'Standard'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {COUNTRIES.length > 50 && cSearch.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        style={{
                          padding: '8px 11px',
                          color: '#9ca3af',
                          fontSize: 11,
                        }}
                      >
                        Showing 50 of {COUNTRIES.length}. Search to filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {tab === 3 && (
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              border: '1px solid #e5e7eb',
              padding: 20,
              textAlign: 'center',
              color: '#9ca3af',
            }}
          >
            No waitlist signups yet. Connect Supabase to enable persistent
            storage.
          </div>
        )}
        {tab === 4 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))',
              gap: 14,
            }}
          >
            <div
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: 16,
                border: '1px solid #e5e7eb',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>
                📊 Top countries
              </div>
              <BarChart data={ANALYTICS.topCountries} />
            </div>
            <div
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: 16,
                border: '1px solid #e5e7eb',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>
                🌐 Languages
              </div>
              <BarChart data={ANALYTICS.langs} color="#0891B2" lk="l" />
            </div>
            <div
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: 16,
                border: '1px solid #e5e7eb',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>
                👤 Tourist / Resident
              </div>
              <div
                style={{
                  height: 18,
                  borderRadius: 10,
                  overflow: 'hidden',
                  display: 'flex',
                  marginBottom: 7,
                }}
              >
                <div
                  style={{
                    width: `${ANALYTICS.split.tourist}%`,
                    background: '#0891B2',
                  }}
                />
                <div
                  style={{
                    width: `${ANALYTICS.split.resident}%`,
                    background: '#00843D',
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: 14, fontSize: 12 }}>
                <span style={{ color: '#0891B2' }}>
                  🧳 Tourist {ANALYTICS.split.tourist}%
                </span>
                <span style={{ color: '#00843D' }}>
                  🏠 Resident {ANALYTICS.split.resident}%
                </span>
              </div>
            </div>
            <div
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: 16,
                border: '1px solid #e5e7eb',
                gridColumn: '1/-1',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 6 }}>
                📈 Daily visits (30d)
              </div>
              <LineChart data={ANALYTICS.daily} />
              <div style={{ fontSize: 11, color: '#6B7280', marginTop: 3 }}>
                Total:{' '}
                {ANALYTICS.daily.reduce((a, b) => a + b, 0).toLocaleString()}{' '}
                visits
              </div>
            </div>
          </div>
        )}
        {tab === 5 && (
          <div style={{ maxWidth: 460 }}>
            <div
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: 20,
                border: '1px solid #e5e7eb',
                marginBottom: 14,
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>
                ⏰ Monthly Review Reminder
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  marginBottom: 14,
                  flexWrap: 'wrap',
                }}
              >
                <div
                  style={{
                    flex: 1,
                    background: '#f4f6f8',
                    borderRadius: 9,
                    padding: '9px 13px',
                    minWidth: 150,
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: '#6B7280',
                      fontWeight: 600,
                      marginBottom: 2,
                    }}
                  >
                    {t.nextReminder}
                  </div>
                  <div
                    style={{ fontWeight: 700, color: '#00843D', fontSize: 13 }}
                  >
                    June 1, 2025 — 12:00 PM UAE
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    background: '#f4f6f8',
                    borderRadius: 9,
                    padding: '9px 13px',
                    minWidth: 120,
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: '#6B7280',
                      fontWeight: 600,
                      marginBottom: 2,
                    }}
                  >
                    {t.lastSent}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>
                    May 1, 2025
                  </div>
                </div>
              </div>
              <button
                onClick={() =>
                  setReminderLog((l) => [
                    {
                      date: new Date().toISOString().slice(0, 10),
                      status: 'sent',
                    },
                    ...l,
                  ])
                }
                style={{
                  background: '#00843D',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 16px',
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                📧 {t.sendNow}
              </button>
            </div>
            <div
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: 16,
                border: '1px solid #e5e7eb',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 9 }}>
                Send history
              </div>
              {reminderLog.slice(0, 12).map((r, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '6px 0',
                    borderBottom: '1px solid #f3f4f6',
                    fontSize: 12,
                  }}
                >
                  <span>{r.date}</span>
                  <span style={{ color: '#16a34a', fontWeight: 700 }}>
                    ✅ {r.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const params = useMemo(() => getUrlParams(), []);

  const [lang, setLang] = useStorage('drivin_lang', () => {
    if (params.lang && LANGS.some((l) => l.code === params.lang))
      return params.lang;
    const nav = (navigator.language || 'en').slice(0, 2);
    return LANGS.some((l) => l.code === nav) ? nav : 'en';
  });
  const [page, setPage] = useState('home');
  const [userType, setUserType] = useState(null);
  const [country, setCountry] = useState(null);
  const [emirate, setEmirate] = useState(null);
  const [doneSteps, setDoneSteps] = useStorage('drivin_done', {});
  const [waitlistData, setWaitlistData] = useState({});
  const [waitlistEmails, setWaitlistEmails] = useState({});
  const [copied, setCopied] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  const t = T[lang] || T.en;
  const isRtl = lang === 'ar';
  const dir = isRtl ? 'rtl' : 'ltr';

  // Offline detection
  useEffect(() => {
    const on = () => setIsOffline(false);
    const off = () => setIsOffline(true);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);

  // Deep link restore — runs once on mount
  useEffect(() => {
    const { type, country: cc, emirate: ec } = params;
    if (!type || !cc) return;
    const c = COUNTRIES.find((x) => x.code === cc);
    if (!c) return;
    setUserType(type);
    setCountry(c);
    if (type === 'tourist') {
      setPage('tourist-result');
    } else if (type === 'resident') {
      if (ec) {
        const e = EMIRATES.find((x) => x.code === ec);
        if (e) {
          setEmirate(e);
          setPage('resident-guide');
          return;
        }
      }
      setPage('resident-emirate');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const goHome = useCallback(() => {
    setPage('home');
    setCountry(null);
    setEmirate(null);
    setUserType(null);
    try {
      const u = new URL(window.location.href);
      u.search = '';
      window.history.replaceState({}, '', u.toString());
    } catch {}
  }, []);

  const steps = useMemo(() => {
    if (!emirate || !country) return [];
    const m = STEP_MAP[emirate.code];
    if (!m) return [];
    return m[country.cat] || [];
  }, [emirate, country]);

  const toggleDone = useCallback(
    (n) => {
      if (!emirate || !country) return;
      const k = `${emirate.code}_${country.code}_${n}`;
      setDoneSteps((prev) => ({ ...prev, [k]: !prev[k] }));
    },
    [emirate, country, setDoneSteps]
  );

  const isDone = useCallback(
    (n) => {
      if (!emirate || !country) return false;
      return !!doneSteps[`${emirate.code}_${country.code}_${n}`];
    },
    [emirate, country, doneSteps]
  );

  const share = useCallback(() => {
    const p = new URLSearchParams({
      type: userType || '',
      country: country?.code || '',
      lang,
    });
    if (emirate) p.set('emirate', emirate.code);
    navigator.clipboard
      .writeText(`${window.location.origin}?${p}`)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {});
  }, [userType, country, emirate, lang]);

  const nav = useCallback((dest, opts = {}) => {
    setPage(dest);
    if (opts.type !== undefined) {
      setUserType(opts.type);
      setUrlParam('type', opts.type);
    }
    if (opts.country !== undefined) {
      setCountry(opts.country);
      setUrlParam('country', opts.country.code);
    }
    if (opts.emirate !== undefined) {
      setEmirate(opts.emirate);
      setUrlParam('emirate', opts.emirate.code);
    }
  }, []);

  const PAGE_BACK = {
    start: 'home',
    'tourist-country': 'start',
    'tourist-result': 'tourist-country',
    'resident-country': 'start',
    'resident-emirate': 'resident-country',
    'resident-guide': 'resident-emirate',
  };

  const BackBtn = () => (
    <button
      onClick={() => setPage(PAGE_BACK[page] || 'home')}
      style={{
        background: 'none',
        border: 'none',
        color: '#00843D',
        fontWeight: 700,
        fontSize: 13,
        cursor: 'pointer',
        marginBottom: 16,
        padding: 0,
        display: 'block',
      }}
    >
      {t.back}
    </button>
  );

  const wrap = (content) => (
    <div
      style={{
        maxWidth: 700,
        margin: '0 auto',
        padding: '24px 20px',
        direction: dir,
      }}
    >
      <BackBtn />
      {content}
    </div>
  );

  // Guard: guide page needs both country and emirate with valid steps
  if (
    page === 'resident-guide' &&
    (!country || !emirate || steps.length === 0)
  ) {
    setTimeout(() => setPage('resident-emirate'), 0);
    return null;
  }

  const renderPage = () => {
    // ── HOME ──
    if (page === 'home')
      return (
        <div style={{ direction: dir }}>
          <div
            style={{
              background: 'linear-gradient(135deg,#f0fdf4,#f4f6f8)',
              padding: '44px 20px 32px',
              textAlign: 'center',
            }}
          >
            <h1
              style={{
                fontSize: 'clamp(22px,5vw,40px)',
                fontWeight: 800,
                color: '#0D1B2A',
                margin: '0 0 8px',
              }}
            >
              {t.tagline}
            </h1>
            <p style={{ color: '#6B7280', fontSize: 15, margin: '0 0 20px' }}>
              {t.tagSub}
            </p>
            <button
              onClick={() => setPage('start')}
              style={{
                background: '#00843D',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '12px 28px',
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0,132,61,0.3)',
              }}
            >
              {t.startCta}
            </button>
            <div
              style={{
                display: 'flex',
                gap: 10,
                justifyContent: 'center',
                marginTop: 16,
                flexWrap: 'wrap',
              }}
            >
              {[t.statC, t.statE, t.statL].map((s, i) => (
                <div
                  key={i}
                  style={{
                    background: '#fff',
                    borderRadius: 20,
                    padding: '5px 13px',
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#00843D',
                    border: '1px solid #86efac',
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
          <div
            style={{ maxWidth: 900, margin: '0 auto', padding: '30px 20px' }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
                gap: 14,
                marginBottom: 36,
              }}
            >
              {[
                {
                  icon: '🧳',
                  title: t.tourist,
                  sub: t.touristSub,
                  desc: t.touristDesc,
                  cta: t.touristCta,
                  color: '#0891B2',
                  bg: '#f0f9ff',
                  dest: 'tourist-country',
                  ty: 'tourist',
                },
                {
                  icon: '🏠',
                  title: t.resident,
                  sub: t.residentSub,
                  desc: t.residentDesc,
                  cta: t.residentCta,
                  color: '#00843D',
                  bg: '#f0fdf4',
                  dest: 'resident-country',
                  ty: 'resident',
                },
              ].map((c) => (
                <div
                  key={c.ty}
                  onClick={() => nav(c.dest, { type: c.ty })}
                  style={{
                    background: c.bg,
                    border: `2px solid ${c.color}`,
                    borderRadius: 18,
                    padding: '20px 16px',
                    cursor: 'pointer',
                    transition: 'transform 0.15s',
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = 'translateY(-4px)')
                  }
                  onMouseOut={(e) => (e.currentTarget.style.transform = '')}
                >
                  <div style={{ fontSize: 30, marginBottom: 7 }}>{c.icon}</div>
                  <h2
                    style={{
                      fontWeight: 800,
                      fontSize: 18,
                      color: c.color,
                      margin: '0 0 3px',
                    }}
                  >
                    {c.title}
                  </h2>
                  <div
                    style={{ color: '#6B7280', fontSize: 11, marginBottom: 7 }}
                  >
                    {c.sub}
                  </div>
                  <p
                    style={{
                      color: '#374151',
                      fontSize: 13,
                      margin: '0 0 10px',
                      lineHeight: 1.6,
                    }}
                  >
                    {c.desc}
                  </p>
                  <span
                    style={{ color: c.color, fontWeight: 700, fontSize: 13 }}
                  >
                    {c.cta}
                  </span>
                </div>
              ))}
            </div>
            <h2
              style={{
                textAlign: 'center',
                fontWeight: 700,
                fontSize: 19,
                color: '#0D1B2A',
                marginBottom: 14,
              }}
            >
              {t.howTitle}
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))',
                gap: 10,
                marginBottom: 36,
              }}
            >
              {[
                ['🌍', t.s1],
                ['👤', t.s2],
                ['📋', t.s3],
              ].map(([ico, label], i) => (
                <div
                  key={i}
                  style={{
                    background: '#f4f6f8',
                    borderRadius: 12,
                    padding: 14,
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: 24, marginBottom: 6 }}>{ico}</div>
                  <div
                    style={{ fontWeight: 600, color: '#374151', fontSize: 13 }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
            <h2
              style={{
                textAlign: 'center',
                fontWeight: 700,
                fontSize: 19,
                color: '#0D1B2A',
                marginBottom: 12,
              }}
            >
              {t.emiratesTitle}
            </h2>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 7,
                justifyContent: 'center',
                marginBottom: 28,
              }}
            >
              {EMIRATES.map((e) => (
                <div
                  key={e.code}
                  style={{
                    background: '#f0fdf4',
                    border: '1.5px solid #86efac',
                    borderRadius: 10,
                    padding: '6px 13px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                  }}
                >
                  <span style={{ fontWeight: 600, fontSize: 12 }}>
                    {isRtl ? e.nameAr : e.name}
                  </span>
                  <span
                    style={{
                      fontSize: 9,
                      padding: '2px 6px',
                      borderRadius: 8,
                      background: '#00843D',
                      color: '#fff',
                      fontWeight: 700,
                    }}
                  >
                    {t.live}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                textAlign: 'center',
                color: '#6B7280',
                fontSize: 11,
                borderTop: '1px solid #e5e7eb',
                paddingTop: 16,
              }}
            >
              <div
                style={{ fontWeight: 600, color: '#374151', marginBottom: 3 }}
              >
                RTA • TAMM • MOI • Dubai Gov • Abu Dhabi Gov • Sharjah Police •
                Ajman Police • RAK Police • Fujairah Police • UAQ Police
              </div>
              <div>{t.trustTitle}</div>
            </div>
          </div>
        </div>
      );

    // ── START ──
    if (page === 'start')
      return wrap(
        <>
          <ProgressBar cur={0} t={t} />
          <h1
            style={{
              fontWeight: 800,
              fontSize: 21,
              color: '#0D1B2A',
              marginBottom: 18,
              textAlign: 'center',
            }}
          >
            {t.s2}
          </h1>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
              gap: 14,
            }}
          >
            {[
              {
                icon: '🧳',
                title: t.tourist,
                desc: t.touristDesc,
                color: '#0891B2',
                bg: '#f0f9ff',
                dest: 'tourist-country',
                ty: 'tourist',
              },
              {
                icon: '🏠',
                title: t.resident,
                desc: t.residentDesc,
                color: '#00843D',
                bg: '#f0fdf4',
                dest: 'resident-country',
                ty: 'resident',
              },
            ].map((c) => (
              <div
                key={c.ty}
                onClick={() => nav(c.dest, { type: c.ty })}
                style={{
                  background: c.bg,
                  border: `2px solid ${c.color}`,
                  borderRadius: 16,
                  padding: 18,
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = 'translateY(-3px)')
                }
                onMouseOut={(e) => (e.currentTarget.style.transform = '')}
              >
                <div style={{ fontSize: 34, marginBottom: 9 }}>{c.icon}</div>
                <h2
                  style={{
                    fontWeight: 800,
                    fontSize: 17,
                    color: c.color,
                    margin: '0 0 7px',
                  }}
                >
                  {c.title}
                </h2>
                <p
                  style={{
                    color: '#374151',
                    fontSize: 13,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </>
      );

    // ── TOURIST COUNTRY ──
    if (page === 'tourist-country')
      return wrap(
        <>
          <ProgressBar cur={1} t={t} />
          <h1
            style={{
              fontWeight: 800,
              fontSize: 20,
              color: '#0D1B2A',
              marginBottom: 14,
            }}
          >
            🧳 {t.selectCountry}
          </h1>
          <CountrySel
            t={t}
            isRtl={isRtl}
            onSelect={(c) =>
              nav('tourist-result', { type: 'tourist', country: c })
            }
          />
        </>
      );

    // ── TOURIST RESULT ──
    if (page === 'tourist-result') {
      if (!country) {
        setPage('tourist-country');
        return null;
      }
      return wrap(
        <>
          <ProgressBar cur={2} t={t} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 14,
              flexDirection: isRtl ? 'row-reverse' : 'row',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <span style={{ fontSize: 24 }}>{country.flag}</span>
              <h1
                style={{
                  fontWeight: 800,
                  fontSize: 18,
                  color: '#0D1B2A',
                  margin: 0,
                }}
              >
                {country.name}
              </h1>
            </div>
            <button
              onClick={share}
              style={{
                background: '#f4f6f8',
                border: '1px solid #e5e7eb',
                borderRadius: 8,
                padding: '5px 11px',
                fontSize: 12,
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              {copied ? t.copied : t.share}
            </button>
          </div>
          {country.t ? (
            <>
              <div
                style={{
                  background: '#f0fdf4',
                  border: '2px solid #86efac',
                  borderRadius: 14,
                  padding: 18,
                  marginBottom: 14,
                }}
              >
                <h2
                  style={{
                    color: '#166534',
                    fontWeight: 800,
                    fontSize: 17,
                    margin: '0 0 5px',
                  }}
                >
                  {t.canDriveTitle}
                </h2>
                <p
                  style={{ color: '#166534', margin: '0 0 10px', fontSize: 13 }}
                >
                  {t.canDriveSub}
                </p>
                <ul
                  style={{
                    margin: 0,
                    paddingInlineStart: 15,
                    color: '#166534',
                  }}
                >
                  {[t.rule1, t.rule2, t.rule3, t.rule4].map((r, i) => (
                    <li key={i} style={{ marginBottom: 3, fontSize: 12 }}>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <details
                style={{
                  background: '#fff',
                  border: '1.5px solid #e5e7eb',
                  borderRadius: 10,
                  padding: '10px 13px',
                  marginBottom: 9,
                }}
              >
                <summary
                  style={{ fontWeight: 700, cursor: 'pointer', fontSize: 13 }}
                >
                  🚗 {t.rentTitle}
                </summary>
                <p
                  style={{
                    color: '#374151',
                    margin: '7px 0 0',
                    fontSize: 12,
                    lineHeight: 1.7,
                  }}
                >
                  {t.rentBody}
                </p>
              </details>
              <div
                style={{
                  background: '#f0fdf4',
                  border: '1px solid #86efac',
                  borderRadius: 10,
                  padding: '11px 13px',
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    color: '#166534',
                    marginBottom: 3,
                    fontSize: 13,
                  }}
                >
                  💡 {t.becomingResident}
                </div>
                <p
                  style={{
                    color: '#374151',
                    fontSize: 12,
                    margin: '0 0 7px',
                    lineHeight: 1.6,
                  }}
                >
                  {t.becomingBody}
                </p>
                <button
                  onClick={() => nav('resident-country', { type: 'resident' })}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#00843D',
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  {t.seeResidentGuide}
                </button>
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  background: '#fffbeb',
                  border: '2px solid #fcd34d',
                  borderRadius: 14,
                  padding: 18,
                  marginBottom: 14,
                }}
              >
                <h2
                  style={{
                    color: '#92400e',
                    fontWeight: 800,
                    fontSize: 17,
                    margin: '0 0 5px',
                  }}
                >
                  {t.cannotDriveTitle}
                </h2>
                <p style={{ color: '#92400e', margin: 0, fontSize: 13 }}>
                  {t.cannotDriveSub}
                </p>
              </div>
              <h3
                style={{
                  fontWeight: 700,
                  color: '#0D1B2A',
                  marginBottom: 10,
                  fontSize: 14,
                }}
              >
                {t.altTitle}
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))',
                  gap: 9,
                  marginBottom: 14,
                }}
              >
                {[
                  [t.alt1T, t.alt1B, '🚕'],
                  [t.alt2T, t.alt2B, '🚇'],
                  [t.alt3T, t.alt3B, '🚗'],
                ].map(([ti, bo, ic], i) => (
                  <div
                    key={i}
                    style={{
                      background: '#fff',
                      border: '1.5px solid #e5e7eb',
                      borderRadius: 10,
                      padding: 11,
                    }}
                  >
                    <div style={{ fontSize: 18, marginBottom: 4 }}>{ic}</div>
                    <div
                      style={{ fontWeight: 700, fontSize: 12, marginBottom: 2 }}
                    >
                      {ti}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: '#6B7280',
                        lineHeight: 1.5,
                      }}
                    >
                      {bo}
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  background: '#f0fdf4',
                  border: '1px solid #86efac',
                  borderRadius: 10,
                  padding: '11px 13px',
                }}
              >
                <p
                  style={{
                    color: '#374151',
                    fontSize: 12,
                    margin: '0 0 7px',
                    lineHeight: 1.7,
                  }}
                >
                  {t.residentCallout}
                </p>
                <button
                  onClick={() => nav('resident-country', { type: 'resident' })}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#00843D',
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  {t.residentCta}
                </button>
              </div>
            </>
          )}
          <div
            style={{
              marginTop: 12,
              fontSize: 10,
              color: '#9ca3af',
              borderTop: '1px solid #f3f4f6',
              paddingTop: 7,
            }}
          >
            ⚠️ {t.disclaimer}
          </div>
        </>
      );
    }

    // ── RESIDENT COUNTRY ──
    if (page === 'resident-country')
      return wrap(
        <>
          <ProgressBar cur={1} t={t} />
          <h1
            style={{
              fontWeight: 800,
              fontSize: 20,
              color: '#0D1B2A',
              marginBottom: 14,
            }}
          >
            🏠 {t.selectCountry}
          </h1>
          <CountrySel
            t={t}
            isRtl={isRtl}
            onSelect={(c) =>
              nav('resident-emirate', { type: 'resident', country: c })
            }
          />
        </>
      );

    // ── EMIRATE SELECT ──
    if (page === 'resident-emirate') {
      if (!country) {
        setPage('resident-country');
        return null;
      }
      return wrap(
        <>
          <ProgressBar cur={1} t={t} />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              marginBottom: 14,
            }}
          >
            <span style={{ fontSize: 20 }}>{country.flag}</span>
            <div>
              <div style={{ fontSize: 11, color: '#6B7280' }}>
                {country.name}
              </div>
              <span
                style={{
                  fontSize: 11,
                  padding: '2px 9px',
                  borderRadius: 8,
                  background:
                    country.cat === 'direct_exchange' ? '#dcfce7' : '#dbeafe',
                  color:
                    country.cat === 'direct_exchange' ? '#166534' : '#1d4ed8',
                  fontWeight: 700,
                }}
              >
                {country.cat === 'direct_exchange' ? t.catABadge : t.catBBadge}
              </span>
            </div>
          </div>
          <h1
            style={{
              fontWeight: 800,
              fontSize: 20,
              color: '#0D1B2A',
              marginBottom: 14,
            }}
          >
            {t.selectEmirate}
          </h1>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill,minmax(155px,1fr))',
              gap: 9,
            }}
          >
            {EMIRATES.map((e) => (
              <div
                key={e.code}
                onClick={() => nav('resident-guide', { emirate: e })}
                style={{
                  background: '#f0fdf4',
                  border: '1.5px solid #86efac',
                  borderRadius: 11,
                  padding: 11,
                  cursor: 'pointer',
                }}
                onMouseOver={(e2) =>
                  (e2.currentTarget.style.transform = 'translateY(-2px)')
                }
                onMouseOut={(e2) => (e2.currentTarget.style.transform = '')}
              >
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 13,
                    color: '#0D1B2A',
                    marginBottom: 2,
                  }}
                >
                  {isRtl ? e.nameAr : e.name}
                </div>
                <div
                  style={{ fontSize: 10, color: '#6B7280', marginBottom: 5 }}
                >
                  {e.authority}
                </div>
                <span
                  style={{
                    fontSize: 10,
                    padding: '2px 7px',
                    borderRadius: 8,
                    background: '#00843D',
                    color: '#fff',
                    fontWeight: 700,
                  }}
                >
                  {t.live}
                </span>
              </div>
            ))}
          </div>
        </>
      );
    }

    // ── GUIDE ──
    if (page === 'resident-guide') {
      const doneCount = steps.filter((_, i) => isDone(i + 1)).length;
      return (
        <div
          style={{
            maxWidth: 900,
            margin: '0 auto',
            padding: '24px 20px',
            direction: dir,
          }}
        >
          <BackBtn />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 16,
              flexWrap: 'wrap',
              gap: 9,
              flexDirection: isRtl ? 'row-reverse' : 'row',
            }}
          >
            <div>
              <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 2 }}>
                {isRtl ? emirate.nameAr : emirate.name} • {country.flag}{' '}
                {country.name}
              </div>
              <h1
                style={{
                  fontWeight: 800,
                  fontSize: 21,
                  color: '#0D1B2A',
                  margin: '0 0 7px',
                }}
              >
                {t.guideFor} {isRtl ? emirate.nameAr : emirate.name}
              </h1>
              <div
                style={{
                  display: 'inline-flex',
                  padding: '4px 11px',
                  borderRadius: 9,
                  background:
                    country.cat === 'direct_exchange' ? '#dcfce7' : '#dbeafe',
                  color:
                    country.cat === 'direct_exchange' ? '#166534' : '#1d4ed8',
                  fontWeight: 700,
                  fontSize: 12,
                }}
              >
                {country.cat === 'direct_exchange'
                  ? `✅ ${t.catABadge} — ${t.catADesc}`
                  : `📚 ${t.catBBadge} — ${t.catBDesc}`}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 7 }}>
              <button
                onClick={share}
                style={{
                  background: '#f4f6f8',
                  border: '1px solid #e5e7eb',
                  borderRadius: 8,
                  padding: '5px 11px',
                  fontSize: 12,
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                {copied ? t.copied : t.share}
              </button>
              <button
                onClick={() => window.print()}
                style={{
                  background: '#f4f6f8',
                  border: '1px solid #e5e7eb',
                  borderRadius: 8,
                  padding: '5px 11px',
                  fontSize: 12,
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                🖨 {t.printGuide}
              </button>
            </div>
          </div>
          <div
            style={{
              background: '#fffbeb',
              border: '1px solid #fcd34d',
              borderRadius: 9,
              padding: '7px 13px',
              marginBottom: 14,
              fontSize: 11,
              color: '#92400e',
            }}
          >
            ⚠️ {t.disclaimer}
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 4 }}>
              {doneCount} / {steps.length} steps completed
            </div>
            <div style={{ height: 5, background: '#e5e7eb', borderRadius: 3 }}>
              <div
                style={{
                  height: '100%',
                  background: '#00843D',
                  borderRadius: 3,
                  width: `${Math.round(
                    (doneCount / Math.max(steps.length, 1)) * 100
                  )}%`,
                  transition: 'width 0.3s',
                }}
              />
            </div>
          </div>
          {steps.map((s) => (
            <StepCard
              key={`${emirate.code}-${country.code}-${s.num}`}
              step={s}
              done={isDone(s.num)}
              onToggle={toggleDone}
              t={t}
              country={country}
              isRtl={isRtl}
            />
          ))}
          <div
            style={{
              marginTop: 14,
              fontSize: 10,
              color: '#9ca3af',
              textAlign: 'center',
            }}
          >
            📌 {t.sourceNote}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <ErrorBoundary>
      <div
        style={{
          fontFamily: isRtl ? "'Cairo',sans-serif" : "'Inter',sans-serif",
          background: '#fff',
          minHeight: '100vh',
          color: '#0D1B2A',
        }}
      >
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Cairo:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />

        {isOffline && (
          <div
            style={{
              background: '#fef3c7',
              borderBottom: '1px solid #fcd34d',
              padding: '8px 20px',
              textAlign: 'center',
              fontSize: 13,
              color: '#92400e',
              fontWeight: 600,
            }}
          >
            📡 {t.offlineBanner}
          </div>
        )}

        <header
          style={{
            background: '#fff',
            borderBottom: '2px solid #00843D',
            position: 'sticky',
            top: 0,
            zIndex: 50,
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: '0 auto',
              padding: '9px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: isRtl ? 'row-reverse' : 'row',
            }}
          >
            <div
              onClick={goHome}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer',
                flexDirection: isRtl ? 'row-reverse' : 'row',
              }}
            >
              <span style={{ color: '#00843D' }}>
                <Wheel />
              </span>
              <div>
                <div style={{ fontWeight: 800, fontSize: 17, lineHeight: 1 }}>
                  <span style={{ color: '#00843D' }}>DrivIn</span>{' '}
                  <span style={{ color: '#C8102E' }}>UAE</span>
                </div>
                <div
                  style={{ fontSize: 9, color: '#6B7280', direction: 'rtl' }}
                >
                  دليل رخصة القيادة في الإمارات
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <LangDropdown lang={lang} setLang={setLang} />
              <button
                onClick={() => setShowAdmin(true)}
                style={{
                  padding: '6px 10px',
                  borderRadius: 20,
                  border: '1.5px solid #e5e7eb',
                  background: '#f4f6f8',
                  color: '#374151',
                  fontWeight: 700,
                  fontSize: 11,
                  cursor: 'pointer',
                }}
              >
                🛠
              </button>
            </div>
          </div>
        </header>

        <main>{renderPage()}</main>

        <footer
          style={{
            background: '#f4f6f8',
            borderTop: '1px solid #e5e7eb',
            padding: '14px 20px',
            textAlign: 'center',
            fontSize: 11,
            color: '#9ca3af',
            marginTop: 36,
            direction: dir,
          }}
        >
          <span style={{ color: '#00843D', fontWeight: 700 }}>DrivIn</span>{' '}
          <span style={{ color: '#C8102E', fontWeight: 700 }}>UAE</span> — Built
          by{' '}
          <a
            href="https://www.linkedin.com/in/nikhilgoyal"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#00843D',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            Nikhil Goyal
          </a>{' '}
          — Not affiliated with UAE government. Source: RTA, TAMM, MOI, and all
          7 emirate police authorities.
        </footer>

        {showAdmin && <AdminPanel t={t} onClose={() => setShowAdmin(false)} />}
      </div>
    </ErrorBoundary>
  );
}
