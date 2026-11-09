import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "sw";

const en = {
  admin: { login: "Admin login", dashboard: "News desk", signIn: "Sign in", signUp: "Create account", password: "Password", displayName: "Display name", avatar: "Avatar URL", profile: "My profile", saveProfile: "Save profile", signOut: "Sign out", google: "Continue with Google", lovable: "Continue with Lovable", confirm: "Check your email to confirm your account before signing in.", emailNotConfirmed: "This account's email is not confirmed yet. Resend the confirmation email, then sign in again.", resendConfirmation: "Resend confirmation email", confirmResent: "If the account can be confirmed, a confirmation email has been sent.", denied: "Your account is awaiting administrator approval.", forgot: "Forgot password?", reset: "Reset password", resetSent: "If an account exists, a password reset link has been sent.", newPassword: "New password", resetInvalid: "Open a valid password recovery link from your email.", title: "Title", body: "Article", image: "Image", video: "Video", publish: "Publish", draft: "Save draft", published: "Published", drafts: "Draft", edit: "Edit", remove: "Delete", confirmDelete: "Delete this article?", newPost: "New article", saved: "Saved successfully", error: "Something went wrong. Please try again.", uploading: "Uploading…", busy: "Please wait…", empty: "No articles yet.", latest: "Latest news", mediaLimit: "Choose a JPG, PNG, WebP image or MP4/WebM video up to 50 MB.", light: "Switch to light mode", dark: "Switch to dark mode", english: "English", swahili: "Kiswahili", cancel: "Cancel", removeImage: "Remove image", removeVideo: "Remove video", loading: "Loading…" },

  brand: { name: "MineBridge Africa", logo: "MineBridge Africa company logo" },
  media: { title: "From the Mining Site", eyebrow: "MINEBRIDGE AFRICA • FIELD GALLERY", photos: ["Washing ore by hand in basins", "Rinsing the carpet sluice", "Weighing recovered gold bars", "A wooden sluice box in the stream", "A hand-dug shaft with windlass and bucket"], video: "Mining site video", previous: "Previous media", next: "Next media", pause: "Pause rotation", play: "Resume rotation", select: "View media" },
  process: {
    eyebrow: "MINING PROCESS",
    title: "From the Ground to the Gold Room",
    sub: "Illustrative photos of the exploration, extraction and processing stages common in African goldfields.",
    note: "These field photographs illustrate the activities described. They are not evidence of a specific project, licence, production level or verified recovery.",
    fieldEyebrow: "ARTISANAL & SMALL-SCALE MINING",
    fieldTitle: "At the Workings",
    fieldSub: "Pitting, hauling, bagging and washing — the daily activity behind a small-scale gold operation.",
    goldEyebrow: "VALUE & RECOVERY",
    goldTitle: "The Gold Room",
    goldSub: "What recovered gold looks like after concentration, smelting and refining.",
    items: {
      geology: ["Reading the ground", "Gold is hosted in quartz veins within schist and gneiss bedrock. Weathering releases gold into the eluvial and saprolite layers above, which is why shallow surface workings can still be productive."],
      openpit: ["Small-scale open pit", "Teams work pits and benches by hand and with light equipment, following the gold-bearing gravel where it outcrops."],
      extraction: ["Excavation and dewatering", "Excavators remove overburden while pumps keep the pit workable. Water control and safe benching decide how much ore can be recovered."],
      bagging: ["Ore handling and bagging", "Gravel and ore are sorted, bagged and weighed before transport, keeping each batch traceable from pit to plant."],
      washing: ["Washing and screening", "A trommel or wash plant breaks up clay and screens material into sizes, releasing gold from the host gravel before gravity concentration."],
      sluicing: ["Sluice and gravity concentration", "Riffled sluice boxes and carpet mats catch dense gold particles while water carries lighter sand and gravel away."],
      panning: ["Hand panning and clean-up", "Concentrate is panned by hand to reveal coarse gold. This simple step confirms recovery and produces the concentrate sent for refining."],
      handwashing: ["Washing ore by hand", "At small-scale sites, ore is washed and concentrated in basins and bowls beside the pit, using water carried by hand or pumped from a nearby stream."],
      shaft: ["Shaft sinking and hoisting", "Hand-dug shafts follow the reef underground. A windlass and bucket lift ore and water to the surface while the team works the face below."],
      smallsluice: ["Stream sluice", "A wooden sluice box uses the current to wash gravel while riffles and mesh trap the gold that settles out of the flow."],
      smelting: ["Smelting and refining", "Concentrate is smelted with flux and refined to remove base metals, producing doré bars or gold grain for sale."],
      bullion: ["Refined bullion", "Gold bars are the end of a documented chain that starts at the pit and passes through recorded processing and refining."],
      weighing: ["Weighing and valuation", "Recovered gold is weighed on a calibrated scale before sale. Documented weights and assays are what turn colour into a price."],
      nuggets: ["Coarse gold and nuggets", "Coarse gold is the most visible form of recovery, and the hardest to value without independent assay and weight checks."],
      collage: ["From site to concentrate", "Site workings, gravity concentrate and washed gold — the three views a buyer or investor should be able to reconcile."],
    },
  },
  market: {
    title: "Gold Market", eyebrow: "TANZANIA & THE WORLD", global: "World gold spot", local: "Tanzania reference", gram: "per gram", ounce: "per troy ounce", purity: "Gold purity", refresh: "Refresh prices", updated: "Gold quote", fxUpdated: "Exchange rate", loading: "Fetching market prices…", unavailable: "Prices are temporarily unavailable. Please try again.", stale: "Last available quote — may be delayed", current: "Latest available", note: "Tanzania values are global spot prices converted to TZS, not official local buying prices. Purity, fees, taxes and dealer margins affect actual prices. Gold refreshes every 60 seconds; exchange rates update daily.", sources: "Sources", fx: "USD / TZS", retry: "Try again",
  },
  nav: {
    home: "Home", about: "About Us", services: "Our Services", opportunities: "Mining Opportunities",
    investors: "For Investors", miners: "For Miners", news: "News & Insights",
    directory: "Professionals", contact: "Contact Us", cta: "Explore Opportunities",
  },
  slogan: "Empowering Miners. Connecting Investors. Building Africa.",
  common: {
    exampleContent: "Illustrative examples only — not verified projects, providers or published reporting.",
    learnMore: "Learn more", viewAll: "View All Opportunities", interest: "Express Interest",
    search: "Search…", all: "All", sampleNote: "Sample listing — information must be verified before publication.",
    region: "Region", mineral: "Mineral", stage: "Stage", type: "Opportunity type", status: "Verification",
    docs: "Available documents", location: "Location", contactVia: "Contact via",
    sendWhatsapp: "Send via WhatsApp", sendEmail: "Send via Email", noResults: "No results match your filters.",
    readMore: "Read article",
  },
  status: { verified: "Verified Information", review: "Documents Under Review", submitted: "Submitted Information" },
  home: {
    badge: "Based in Chunya, Mbeya — Tanzania",
    title: "Connecting Africa's Mineral Wealth to Global Opportunities.",
    sub: "MineBridge Africa connects miners, mineral opportunity owners, investors, professionals and industry stakeholders to create stronger, more transparent and sustainable mining opportunities across Africa.",
    btn1: "Explore Mining Opportunities", btn2: "Connect With Investors", btn3: "Submit Your Mining Project",
    stats: [["Tanzania", "Starting point"], ["54", "African nations in our vision"], ["6", "Stakeholder groups served"], ["100%", "Due-diligence first"]],
    introTitle: "Building Bridges Across Africa's Mining Industry",
    introText: "MineBridge Africa is a mining-sector connection and support platform designed to bring together opportunities, capital, expertise and people — starting from the gold fields of Chunya, Mbeya.",
    pillars: ["Mining Opportunities", "Investment Connections", "Professional Services", "Mining Information", "Responsible Development"],
    howTitle: "How MineBridge Africa Works",
    steps: [
      ["Discover Opportunities", "Mining stakeholders submit or explore relevant opportunities."],
      ["Connect", "We facilitate connections between relevant stakeholders."],
      ["Review and Engage", "Interested parties conduct their own independent due diligence."],
      ["Build Partnerships", "Stakeholders work together toward responsible, sustainable development."],
    ],
    featuredTitle: "Featured Mining Opportunities",
    serveTitle: "Who We Serve",
    serve: [
      ["Miners", "Small-scale and artisanal miners seeking partners and visibility."],
      ["Project Owners", "Mineral-right holders ready to present their projects professionally."],
      ["Investors", "Local and international capital looking for credible opportunities."],
      ["Professionals", "Geologists, engineers and consultants offering expertise."],
      ["Suppliers", "Equipment, lab and logistics providers serving the sector."],
      ["Communities", "Local stakeholders who deserve a voice in responsible growth."],
    ],
    trustTitle: "Built on Trust, Transparency and Responsible Growth",
    trust: ["Transparency", "Professionalism", "Responsible mining", "Independent due diligence", "Data privacy", "Sustainable development"],
    finalTitle: "Be Part of Africa's Mining Future",
    finalBtn1: "Join Our Network", finalBtn2: "Contact MineBridge Africa",
  },
  about: {
    title: "About MineBridge Africa",
    sub: "An emerging mining-sector business rooted in Chunya, Mbeya — focused on strategic connections, stakeholder support and responsible investment across Africa.",
    storyTitle: "Our Story",
    story: "Chunya is one of Tanzania's historic gold districts. We saw miners with real potential struggling to reach credible partners, and investors struggling to find trustworthy information. MineBridge Africa exists to close that gap — honestly, professionally and responsibly.",
    vision: "Our Vision", visionText: "To become a trusted bridge connecting Africa's mineral resources with responsible investment and sustainable development.",
    mission: "Our Mission", missionText: "To empower mining stakeholders, facilitate strategic investment connections and promote responsible growth across Africa's mining sector.",
    valuesTitle: "Our Core Values",
    values: [
      ["Transparency & Integrity", "Honest information, clearly labelled."],
      ["Innovation & Technology", "Digital tools that make mining opportunities accessible."],
      ["Professionalism", "International standards in every interaction."],
      ["Responsible Mining", "Safety, environment and legality come first."],
      ["Partnership & Collaboration", "Long-term relationships over quick deals."],
      ["Community Development", "Growth that benefits local communities."],
    ],
  },
  services: {
    listTitle: "Mining Connection & Support",
    title: "Our Services",
    sub: "Practical support that connects opportunity, capital and expertise.",
    list: [
      ["Mining Opportunities", "Showcasing and connecting legitimate mining and mineral opportunities with relevant stakeholders."],
      ["Investor Connections", "Facilitating strategic introductions between investors and mining businesses."],
      ["Project Profiling", "Supporting the preparation of professional project profiles and presentations."],
      ["Mining Information & Education", "Useful information, industry insights and educational content."],
      ["Mining Services Directory", "Connecting users with relevant mining professionals and service providers."],
      ["Mining Business Support", "Helping stakeholders identify technical, professional and business support."],
    ],
  },
  opps: {
    title: "Mining Opportunities", sub: "Explore sample listings. Every opportunity is clearly labelled by verification status.",
  },
  investors: {
    title: "Discover Africa's Mining Opportunities",
    sub: "Explore opportunities, submit your investment interests, request project information and connect with relevant mining stakeholders.",
    processTitle: "Your Investor Journey",
    process: ["Register Interest", "Explore Relevant Opportunities", "Request Further Information", "Conduct Independent Due Diligence", "Engage Directly with Relevant Parties"],
    formTitle: "Investor Enquiry Form",
  },
  miners: {
    benefitsTitle: "Support for Mining Project Owners",
    title: "Showcase Your Mining Opportunity",
    sub: "For small-scale miners, mining companies, mineral-right holders, cooperatives and project owners.",
    benefits: ["Submit Your Project", "Find Potential Partners", "Access Industry Information", "Connect With Professionals", "Join the Mining Network"],
    formTitle: "Mining Project Submission",
    docNote: "Have documents (licences, maps, assay reports)? Send them to us after submitting via WhatsApp or email.",
  },
  news: {
    title: "News & Insights", sub: "Mining news, market insights and education for Tanzania and Africa.",
    featured: "Featured", newsletter: "Subscribe to our newsletter", newsletterSub: "Monthly insights on Tanzanian and African mining.",
    subscribe: "Subscribe",
  },
  directory: { title: "Professionals & Suppliers Directory", sub: "Find geologists, engineers, labs, suppliers and consultants. Verification badges are only given after review.", verified: "Verified", pending: "Profile under review", join: "List your services" },
  contact: {
    title: "Contact MineBridge Africa", sub: "Reach us by WhatsApp, phone, email or the form below. We reply in English or Kiswahili.",
    office: "Office Address", phone: "Phone & WhatsApp", email: "Email", hours: "Mon – Sat, 8:00 – 18:00 EAT",
    formTitle: "Send an Enquiry", tapHint: "Tap the phone number to chat on WhatsApp, or the email to write to us.",
    enquiryTypes: ["General Enquiry", "Investor Enquiry", "Mining Project Enquiry", "Partnership Enquiry", "Media Enquiry"],
  },
  form: {
    name: "Full name", company: "Company / Organization", phone: "Phone number", email: "Email address",
    country: "Country", region: "Region", mineral: "Mineral type", message: "Message", description: "Project description",
    partnership: "Type of partnership needed", budget: "Investment range (USD)", interest: "Minerals of interest",
    enquiry: "Enquiry type", consent: "I agree that MineBridge Africa may contact me about this enquiry and I understand the disclaimer.",
    required: "Please fill in your name, a message and accept the consent.",
    hint: "Choose how to send: WhatsApp opens a chat with our number; Email opens your mail app or Gmail with your details already filled in.",
    gmail: "Send with Gmail",
    emailNote: "Email options open your mail app or Gmail with the subject, your details and your message addressed to clintonmsety@gmail.com. Press Send there to deliver it.",
  },
  legal: {
    title: "Legal & Trust", privacy: "Privacy Policy", terms: "Terms & Conditions", disclaimer: "Disclaimer",
    verification: "Verification Policy", risk: "Investor Risk Disclosure", data: "Data Protection Notice",
    texts: {
      privacy: "We collect only the information you choose to send us (name, contact details, project information) and use it solely to respond to your enquiry and facilitate relevant introductions. We never sell your data.",
      terms: "By using this website you agree to use it lawfully and to provide accurate information. Listings are informational and do not form an offer or contract.",
      verification: "Labels mean: Verified Information — key documents were reviewed by our team; Documents Under Review — review in progress; Submitted Information — provided by the owner and not yet reviewed. Verification is not a guarantee.",
      risk: "Mining investments carry significant geological, legal, financial, environmental and political risks. You may lose all capital invested. Always seek independent professional advice.",
      data: "Personal data is handled in line with Tanzania's Personal Data Protection Act, 2022. To access or delete your data, email us.",
    },
  },
  disclaimer: "MineBridge Africa facilitates information sharing and business introductions between mining stakeholders. Information published on the platform does not constitute financial, legal, geological, or investment advice. All parties are encouraged to conduct independent due diligence before entering into any transaction or investment agreement. MineBridge Africa does not guarantee investment returns, project performance, or commercial outcomes.",
  footer: { company: "Company", opportunities: "Opportunities", resources: "Resources", legal: "Legal", rights: "All rights reserved." },
};

type Dict = typeof en;

export type MiningStageId = keyof Dict["process"]["items"];

const sw: Dict = {
  admin: { login: "Ingia kama msimamizi", dashboard: "Usimamizi wa habari", signIn: "Ingia", signUp: "Fungua akaunti", password: "Nenosiri", displayName: "Jina la kuonyesha", avatar: "Anwani ya picha ya wasifu", profile: "Wasifu wangu", saveProfile: "Hifadhi wasifu", signOut: "Ondoka", google: "Endelea na Google", lovable: "Endelea na Lovable", confirm: "Angalia barua pepe yako kuthibitisha akaunti kabla ya kuingia.", emailNotConfirmed: "Barua pepe ya akaunti hii bado haijathibitishwa. Tuma tena barua pepe ya uthibitisho, kisha ujaribu kuingia.", resendConfirmation: "Tuma tena barua pepe ya uthibitisho", confirmResent: "Ikiwa akaunti inaweza kuthibitishwa, barua pepe ya uthibitisho imetumwa.", denied: "Akaunti yako inasubiri idhini ya msimamizi.", forgot: "Umesahau nenosiri?", reset: "Weka upya nenosiri", resetSent: "Ikiwa akaunti ipo, kiungo cha kuweka upya nenosiri kimetumwa.", newPassword: "Nenosiri jipya", resetInvalid: "Fungua kiungo halali cha kurejesha nenosiri kutoka kwenye barua pepe yako.", title: "Kichwa", body: "Makala", image: "Picha", video: "Video", publish: "Chapisha", draft: "Hifadhi rasimu", published: "Imechapishwa", drafts: "Rasimu", edit: "Hariri", remove: "Futa", confirmDelete: "Futa makala hii?", newPost: "Makala mpya", saved: "Imehifadhiwa", error: "Tatizo limetokea. Tafadhali jaribu tena.", uploading: "Inapakia…", busy: "Tafadhali subiri…", empty: "Hakuna makala bado.", latest: "Habari mpya", mediaLimit: "Chagua picha ya JPG, PNG, WebP au video ya MP4/WebM isiyozidi MB 50.", light: "Washa mwonekano mweupe", dark: "Washa mwonekano wa giza", english: "Kiingereza", swahili: "Kiswahili", cancel: "Ghairi", removeImage: "Ondoa picha", removeVideo: "Ondoa video", loading: "Inapakia…" },

  brand: { name: "MineBridge Africa", logo: "Nembo ya kampuni ya MineBridge Africa" },
  media: { title: "Kutoka Eneo la Uchimbaji", eyebrow: "MINEBRIDGE AFRICA • PICHA ZA ENEO", photos: ["Kuosha madini kwa mikono kwenye mabeseni", "Kusafisha zulia la mfereji", "Kupima baa za dhahabu zilizopatikana", "Sanduku la mfereji wa mbao mtoni", "Shimo lililochimbwa kwa mkono lenye koki na ndoo"], video: "Video ya eneo la uchimbaji", previous: "Picha au video iliyotangulia", next: "Picha au video inayofuata", pause: "Sitisha mzunguko", play: "Endeleza mzunguko", select: "Tazama picha au video" },
  process: {
    eyebrow: "MCHAKATO WA UCHIMBAJI",
    title: "Kutoka Ardhi hadi Chumba cha Dhahabu",
    sub: "Picha za kielelezo za hatua za utafutaji, uchimbaji na uchakataji zinazojitokeza katika maeneo ya dhahabu Afrika.",
    note: "Picha hizi za eneo zinaonyesha shughuli zinazoelezwa. Si ushahidi wa mradi maalum, leseni, kiwango cha uzalishaji au upatikanaji uliohakikiwa.",
    fieldEyebrow: "UCHIMBAJI WA KIJADI NA WADOGO",
    fieldTitle: "Eneo la Kazi",
    fieldSub: "Kuchimba, kusafirisha, kufungashia na kuosha — shughuli za kila siku za uchimbaji mdogo wa dhahabu.",
    goldEyebrow: "THAMANI NA UPATIKANAJI",
    goldTitle: "Chumba cha Dhahabu",
    goldSub: "Jinsi dhahabu iliyopatikana inavyoonekana baada ya ukolezaji, kuyeyusha na kusafisha.",
    items: {
      geology: ["Kusoma ardhi", "Dhahabu hupatikana katika mizunguko ya quartz ndani ya miamba ya schist na gneiss. Hali ya hewa huvunja miamba na kuachilia dhahabu kwenye tabaka za juu za udongo, ndiyo sababu uchimbaji wa juu sana unaweza kuwa na tija."],
      openpit: ["Shimo la wazi la uchimbaji mdogo", "Timu hufanya kazi kwenye mashimo na matuta kwa mikono na vifaa vidogo, wakifuata changarawe yenye dhahabu inapojitokeza."],
      extraction: ["Kuchimba na kuondoa maji", "Mitambo ya kuchimba huondoa udongo wa juu huku pampu zikifanya shimo liweze kufanyika kazi. Udhibiti wa maji na matuta salama huamua kiasi cha madini kinachopatikana."],
      bagging: ["Kushughulikia na kufungashia madini", "Changarawe na madini hupangwa, kufungwa kwenye magunia na kupimwa kabla ya kusafirishwa, hivyo kurahisisha ufuatiliaji wa kila kundi."],
      washing: ["Kuosha na kuchuja", "Kifaa cha kuosha huvunja udongo na kuchuja madini kwa ukubwa, kikitoa dhahabu kutoka kwenye changarawe kabla ya ukolezaji kwa mvuto."],
      sluicing: ["Mifereji na ukolezaji kwa mvuto", "Mifereji yenye matuta na zulia hukamata chembe nzito za dhahabu huku maji yakichukua mchanga na changarawe nyepesi."],
      panning: ["Kuosha kwa mkono na usafishaji", "Mkusanyiko huoshwa kwa mkono ili kuibua dhahabu iliyokoza. Hatua hii rahisi huthibitisha upatikanaji na kutoa mkusanyiko unaopelekwa kwa usafishaji."],
      handwashing: ["Kuosha madini kwa mikono", "Katika maeneo ya uchimbaji mdogo, madini huoshwa na kukolezwa kwenye mabeseni kando ya shimo, kwa maji yanayobebwa kwa mikono au kupompedwa kutoka kijito kilicho karibu."],
      shaft: ["Kuchimba shimo na kuvuta juu", "Mashimo yaliyochimbwa kwa mikono hufuata mzigo wa dhahabu chini ya ardhi. Koki na ndoo huvuta madini na maji juu huku timu ikifanya kazi chini."],
      smallsluice: ["Mfereji wa mtoni", "Sanduku la mfereji wa mbao hutumia mkondo wa maji kuosha changarawe huku matuta na utando vikikamata dhahabu inayotulia."],
      smelting: ["Kuyeyusha na kusafisha", "Mkusanyiko huyeyushwa pamoja na viungio na kusafishwa ili kuondoa metali nyingine, kikitoa baa za dhahabu au chembe kwa mauzo."],
      bullion: ["Baa za dhahabu zilizosafishwa", "Baa za dhahabu ni mwisho wa mnyororo ulioandikwa kuanzia shimoni hadi uchakataji na usafishaji uliorekodiwa."],
      weighing: ["Kupima na kuthamini", "Dhahabu iliyopatikana hupimwa kwa mizani iliyorekebishwa kabla ya mauzo. Uzito na upimaji ulioandikwa ndio hubadilisha rangi kuwa bei."],
      nuggets: ["Dhahabu iliyokoza na vipande", "Dhahabu iliyokoza ni namna inayoonekana zaidi ya upatikanaji, na ndiyo ngumu zaidi kuthaminiwa bila upimaji huru na ukaguzi wa uzito."],
      collage: ["Kutoka eneo hadi mkusanyiko", "Maeneo ya uchimbaji, mkusanyiko wa mvuto na dhahabu iliyooshwa — mitazamo mitatu ambayo mnunuzi au mwekezaji anapaswa kuoanisha."],
    },
  },
  market: {
    title: "Soko la Dhahabu", eyebrow: "TANZANIA NA DUNIA", global: "Bei ya dhahabu duniani", local: "Makadirio ya Tanzania", gram: "kwa gramu", ounce: "kwa wakia ya troy", purity: "Usafi wa dhahabu", refresh: "Sasisha bei", updated: "Bei ya dhahabu", fxUpdated: "Kiwango cha ubadilishaji", loading: "Tunapata bei za soko…", unavailable: "Bei hazipatikani kwa sasa. Tafadhali jaribu tena.", stale: "Bei ya mwisho iliyopatikana — inaweza kuchelewa", current: "Bei ya karibuni iliyopatikana", note: "Bei za Tanzania ni bei za soko la dunia zilizobadilishwa kuwa TZS, si bei rasmi za ununuzi wa ndani. Usafi, ada, kodi na faida ya muuzaji huathiri bei halisi. Bei ya dhahabu husasishwa kila sekunde 60; viwango vya ubadilishaji kila siku.", sources: "Vyanzo", fx: "USD / TZS", retry: "Jaribu tena",
  },
  nav: {
    home: "Mwanzo", about: "Kuhusu Sisi", services: "Huduma Zetu", opportunities: "Fursa za Madini",
    investors: "Kwa Wawekezaji", miners: "Kwa Wachimbaji", news: "Habari na Maarifa",
    directory: "Wataalamu", contact: "Wasiliana Nasi", cta: "Gundua Fursa",
  },
  slogan: "Tunawawezesha Wachimbaji. Tunaunganisha Wawekezaji. Tunajenga Afrika.",
  common: {
    exampleContent: "Mifano ya maelezo tu — si miradi au watoa huduma waliohakikiwa, wala habari zilizothibitishwa.",
    learnMore: "Soma zaidi", viewAll: "Tazama Fursa Zote", interest: "Onyesha Nia",
    search: "Tafuta…", all: "Zote", sampleNote: "Mfano wa tangazo — taarifa lazima zihakikiwe kabla ya kuchapishwa.",
    region: "Mkoa", mineral: "Madini", stage: "Hatua", type: "Aina ya fursa", status: "Uhakiki",
    docs: "Nyaraka zilizopo", location: "Mahali", contactVia: "Wasiliana kupitia",
    sendWhatsapp: "Tuma kwa WhatsApp", sendEmail: "Tuma kwa Barua pepe", noResults: "Hakuna matokeo yanayolingana.",
    readMore: "Soma makala",
  },
  status: { verified: "Taarifa Zimehakikiwa", review: "Nyaraka Zinakaguliwa", submitted: "Taarifa Zilizowasilishwa" },
  home: {
    badge: "Makao yetu Chunya, Mbeya — Tanzania",
    title: "Kuunganisha Utajiri wa Madini wa Afrika na Fursa za Kimataifa.",
    sub: "MineBridge Africa inaunganisha wachimbaji, wamiliki wa fursa za madini, wawekezaji, wataalamu na wadau wa sekta ili kujenga fursa za uchimbaji zilizo imara, wazi na endelevu barani Afrika.",
    btn1: "Gundua Fursa za Madini", btn2: "Ungana na Wawekezaji", btn3: "Wasilisha Mradi Wako",
    stats: [["Tanzania", "Mahali tunapoanzia"], ["54", "Nchi za Afrika katika maono yetu"], ["6", "Makundi ya wadau tunaowahudumia"], ["100%", "Uhakiki huru kwanza"]],
    introTitle: "Kujenga Madaraja Katika Sekta ya Madini Afrika",
    introText: "MineBridge Africa ni jukwaa la kuunganisha na kusaidia sekta ya madini, linaloleta pamoja fursa, mitaji, utaalamu na watu — kuanzia mashamba ya dhahabu ya Chunya, Mbeya.",
    pillars: ["Fursa za Madini", "Uhusiano wa Uwekezaji", "Huduma za Kitaalamu", "Taarifa za Madini", "Maendeleo Yenye Uwajibikaji"],
    howTitle: "Jinsi MineBridge Africa Inavyofanya Kazi",
    steps: [
      ["Gundua Fursa", "Wadau wa madini huwasilisha au kutafuta fursa husika."],
      ["Ungana", "Tunarahisisha mawasiliano kati ya wadau husika."],
      ["Kagua na Shiriki", "Wahusika hufanya uhakiki wao huru wa kitaalamu."],
      ["Jenga Ushirikiano", "Wadau hufanya kazi pamoja kwa maendeleo endelevu."],
    ],
    featuredTitle: "Fursa Teule za Madini",
    serveTitle: "Tunaowahudumia",
    serve: [
      ["Wachimbaji", "Wachimbaji wadogo wanaotafuta washirika na kutambulika."],
      ["Wamiliki wa Miradi", "Wenye leseni za madini walio tayari kuwasilisha miradi kitaalamu."],
      ["Wawekezaji", "Mitaji ya ndani na nje inayotafuta fursa za kuaminika."],
      ["Wataalamu", "Wanajiolojia, wahandisi na washauri wenye utaalamu."],
      ["Wasambazaji", "Watoa vifaa, maabara na usafirishaji katika sekta."],
      ["Jamii", "Wadau wa ndani wanaostahili sauti katika ukuaji wenye uwajibikaji."],
    ],
    trustTitle: "Tumejengwa juu ya Uaminifu, Uwazi na Ukuaji Wenye Uwajibikaji",
    trust: ["Uwazi", "Weledi", "Uchimbaji wenye uwajibikaji", "Uhakiki huru", "Faragha ya taarifa", "Maendeleo endelevu"],
    finalTitle: "Kuwa Sehemu ya Mustakabali wa Madini Afrika",
    finalBtn1: "Jiunge na Mtandao Wetu", finalBtn2: "Wasiliana na MineBridge Africa",
  },
  about: {
    title: "Kuhusu MineBridge Africa",
    sub: "Biashara chipukizi ya sekta ya madini yenye mizizi Chunya, Mbeya — ikilenga kuunganisha wadau, kuwasaidia na kuhamasisha uwekezaji wenye uwajibikaji barani Afrika.",
    storyTitle: "Historia Yetu",
    story: "Chunya ni moja ya wilaya kongwe za dhahabu Tanzania. Tuliona wachimbaji wenye uwezo mkubwa wakishindwa kufikia washirika wa kuaminika, na wawekezaji wakikosa taarifa za uhakika. MineBridge Africa ipo kuziba pengo hilo — kwa uaminifu, weledi na uwajibikaji.",
    vision: "Dira Yetu", visionText: "Kuwa daraja linaloaminika linalounganisha rasilimali za madini za Afrika na uwekezaji wenye uwajibikaji pamoja na maendeleo endelevu.",
    mission: "Dhamira Yetu", missionText: "Kuwawezesha wadau wa sekta ya madini, kurahisisha uhusiano wa kimkakati kati ya wawekezaji na wamiliki wa fursa za uwekezaji, pamoja na kuhamasisha ukuaji wenye uwajibikaji katika sekta ya madini barani Afrika.",
    valuesTitle: "Maadili Yetu ya Msingi",
    values: [
      ["Uwazi na Uadilifu", "Taarifa za kweli, zilizoainishwa wazi."],
      ["Ubunifu na Teknolojia", "Zana za kidijitali zinazorahisisha upatikanaji wa fursa."],
      ["Weledi", "Viwango vya kimataifa katika kila hatua."],
      ["Uchimbaji Wenye Uwajibikaji", "Usalama, mazingira na sheria kwanza."],
      ["Ushirikiano", "Mahusiano ya muda mrefu kuliko mikataba ya haraka."],
      ["Maendeleo ya Jamii", "Ukuaji unaonufaisha jamii za ndani."],
    ],
  },
  services: {
    listTitle: "Uhusiano na Msaada wa Sekta ya Madini",
    title: "Huduma Zetu",
    sub: "Msaada wa vitendo unaounganisha fursa, mitaji na utaalamu.",
    list: [
      ["Fursa za Madini", "Kuonyesha na kuunganisha fursa halali za madini na wadau husika."],
      ["Uhusiano na Wawekezaji", "Kurahisisha utambulisho wa kimkakati kati ya wawekezaji na biashara za madini."],
      ["Uandaaji wa Wasifu wa Mradi", "Kusaidia kuandaa wasifu na mawasilisho ya kitaalamu ya miradi."],
      ["Taarifa na Elimu ya Madini", "Taarifa muhimu, maarifa ya sekta na maudhui ya kielimu."],
      ["Orodha ya Huduma za Madini", "Kuwaunganisha watumiaji na wataalamu na watoa huduma."],
      ["Msaada wa Biashara ya Madini", "Kusaidia wadau kupata msaada wa kiufundi, kitaalamu na kibiashara."],
    ],
  },
  opps: {
    title: "Fursa za Madini", sub: "Tazama mifano ya matangazo. Kila fursa imewekwa alama ya hali ya uhakiki.",
  },
  investors: {
    title: "Gundua Fursa za Madini Afrika",
    sub: "Tafuta fursa, wasilisha nia yako ya uwekezaji, omba taarifa za mradi na ungana na wadau husika wa madini.",
    processTitle: "Safari ya Mwekezaji",
    process: ["Sajili Nia Yako", "Tafuta Fursa Husika", "Omba Taarifa Zaidi", "Fanya Uhakiki Huru", "Shirikiana Moja kwa Moja na Wahusika"],
    formTitle: "Fomu ya Maombi ya Mwekezaji",
  },
  miners: {
    benefitsTitle: "Msaada kwa Wamiliki wa Miradi ya Madini",
    title: "Onyesha Fursa Yako ya Madini",
    sub: "Kwa wachimbaji wadogo, kampuni za madini, wenye leseni, vyama vya ushirika na wamiliki wa miradi.",
    benefits: ["Wasilisha Mradi Wako", "Pata Washirika", "Pata Taarifa za Sekta", "Ungana na Wataalamu", "Jiunge na Mtandao wa Madini"],
    formTitle: "Fomu ya Kuwasilisha Mradi",
    docNote: "Una nyaraka (leseni, ramani, ripoti za maabara)? Zitume kwetu kupitia WhatsApp au barua pepe baada ya kuwasilisha.",
  },
  news: {
    title: "Habari na Maarifa", sub: "Habari za madini, maarifa ya soko na elimu kwa Tanzania na Afrika.",
    featured: "Teule", newsletter: "Jiandikishe kupokea jarida letu", newsletterSub: "Maarifa ya kila mwezi kuhusu madini Tanzania na Afrika.",
    subscribe: "Jiandikishe",
  },
  directory: { title: "Orodha ya Wataalamu na Wasambazaji", sub: "Pata wanajiolojia, wahandisi, maabara, wasambazaji na washauri. Alama ya uhakiki hutolewa baada ya ukaguzi tu.", verified: "Imehakikiwa", pending: "Wasifu unakaguliwa", join: "Orodhesha huduma zako" },
  contact: {
    title: "Wasiliana na MineBridge Africa", sub: "Tufikie kwa WhatsApp, simu, barua pepe au fomu hapa chini. Tunajibu kwa Kiingereza au Kiswahili.",
    office: "Anwani ya Ofisi", phone: "Simu na WhatsApp", email: "Barua pepe", hours: "Jumatatu – Jumamosi, 2:00 asubuhi – 12:00 jioni",
    formTitle: "Tuma Ujumbe", tapHint: "Gusa namba ya simu kuzungumza nasi WhatsApp, au barua pepe kutuandikia.",
    enquiryTypes: ["Swali la Jumla", "Swali la Mwekezaji", "Swali la Mradi wa Madini", "Swali la Ushirikiano", "Swali la Vyombo vya Habari"],
  },
  form: {
    name: "Jina kamili", company: "Kampuni / Taasisi", phone: "Namba ya simu", email: "Barua pepe",
    country: "Nchi", region: "Mkoa", mineral: "Aina ya madini", message: "Ujumbe", description: "Maelezo ya mradi",
    partnership: "Aina ya ushirikiano unaohitajika", budget: "Kiwango cha uwekezaji (USD)", interest: "Madini unayoyapenda",
    enquiry: "Aina ya swali", consent: "Nakubali MineBridge Africa iwasiliane nami kuhusu ombi hili na ninaelewa tahadhari.",
    required: "Tafadhali jaza jina, ujumbe na ukubali masharti.",
    hint: "Chagua njia ya kutuma: WhatsApp hufungua mazungumzo na namba yetu; Barua pepe hufungua programu yako ya barua au Gmail ukiwa umejazwa taarifa zako.",
    gmail: "Tuma kwa Gmail",
    emailNote: "Njia za barua pepe hufungua programu yako ya barua au Gmail ukiwa na kichwa, taarifa zako na ujumbe wako kwa clintonmsety@gmail.com. Bonyeza Tuma hapo ili ujumbe ufike.",
  },
  legal: {
    title: "Sheria na Uaminifu", privacy: "Sera ya Faragha", terms: "Vigezo na Masharti", disclaimer: "Tahadhari",
    verification: "Sera ya Uhakiki", risk: "Tahadhari ya Hatari kwa Wawekezaji", data: "Taarifa ya Ulinzi wa Data",
    texts: {
      privacy: "Tunakusanya taarifa unazochagua kututumia tu (jina, mawasiliano, taarifa za mradi) na kuzitumia kujibu ombi lako na kurahisisha utambulisho husika. Hatuuzi taarifa zako.",
      terms: "Kwa kutumia tovuti hii unakubali kuitumia kihalali na kutoa taarifa sahihi. Matangazo ni ya kutoa taarifa na si ofa wala mkataba.",
      verification: "Maana ya alama: Taarifa Zimehakikiwa — nyaraka muhimu zimekaguliwa; Nyaraka Zinakaguliwa — ukaguzi unaendelea; Taarifa Zilizowasilishwa — zimetolewa na mmiliki na bado hazijakaguliwa. Uhakiki si dhamana.",
      risk: "Uwekezaji katika madini una hatari kubwa za kijiolojia, kisheria, kifedha, kimazingira na kisiasa. Unaweza kupoteza mtaji wote. Daima tafuta ushauri huru wa kitaalamu.",
      data: "Taarifa binafsi zinashughulikiwa kwa mujibu wa Sheria ya Ulinzi wa Taarifa Binafsi ya Tanzania, 2022. Kuona au kufuta taarifa zako, tutumie barua pepe.",
    },
  },
  disclaimer: "MineBridge Africa inarahisisha upashanaji wa taarifa na utambulisho wa kibiashara kati ya wadau wa madini. Taarifa zilizochapishwa kwenye jukwaa hili si ushauri wa kifedha, kisheria, kijiolojia wala wa uwekezaji. Wahusika wote wanashauriwa kufanya uhakiki huru kabla ya kuingia katika muamala au mkataba wowote wa uwekezaji. MineBridge Africa haitoi dhamana ya faida, utendaji wa mradi, wala matokeo ya kibiashara.",
  footer: { company: "Kampuni", opportunities: "Fursa", resources: "Rasilimali", legal: "Sheria", rights: "Haki zote zimehifadhiwa." },
};

const dicts: Record<Lang, Dict> = { en, sw };

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({ lang: "en", setLang: () => {}, t: en });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const saved = localStorage.getItem("mb-lang");
    if (saved === "sw" || saved === "en") setLangState(saved);
  }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const setLang = (l: Lang) => { setLangState(l); localStorage.setItem("mb-lang", l); };
  return <Ctx.Provider value={{ lang, setLang, t: dicts[lang] }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
