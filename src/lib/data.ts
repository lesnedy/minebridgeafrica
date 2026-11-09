import gold from "@/assets/gold-ore.jpg";
import hero from "@/assets/hero-mine.jpg";
import pros from "@/assets/professionals.jpg";
import inv from "@/assets/investors.jpg";

type L = { en: string; sw: string };
export type Status = "verified" | "review" | "submitted";

export const opportunities: {
  id: string; name: string; country: string; region: string; mineral: string;
  stage: L; type: L; status: Status; image: string; desc: L; docs: L;
}[] = [
  { id: "1", name: "Chunya Gold Reef Block A", country: "Tanzania", region: "Mbeya", mineral: "Gold", image: gold,
    stage: { en: "Exploration", sw: "Utafiti" }, type: { en: "Joint Venture", sw: "Ubia" }, status: "review",
    desc: { en: "Primary-licence gold reef area near Chunya town with artisanal workings and early sampling.", sw: "Eneo la dhahabu lenye leseni karibu na mji wa Chunya, lenye uchimbaji mdogo na sampuli za awali." },
    docs: { en: "Licence copy, sample results", sw: "Nakala ya leseni, matokeo ya sampuli" } },
  { id: "2", name: "Lupa Goldfield Alluvial", country: "Tanzania", region: "Mbeya", mineral: "Gold", image: hero,
    stage: { en: "Small-scale production", sw: "Uzalishaji mdogo" }, type: { en: "Equipment Financing", sw: "Ufadhili wa Vifaa" }, status: "verified",
    desc: { en: "Cooperative-run alluvial operation seeking processing equipment partnership.", sw: "Uchimbaji wa mchanga unaoendeshwa na chama cha ushirika, unatafuta ubia wa vifaa vya uchenjuaji." },
    docs: { en: "PML, production records", sw: "Leseni ya PML, kumbukumbu za uzalishaji" } },
  { id: "3", name: "Songwe Coal Prospect", country: "Tanzania", region: "Songwe", mineral: "Coal", image: pros,
    stage: { en: "Prospecting", sw: "Utafutaji" }, type: { en: "Equity Investment", sw: "Uwekezaji wa Hisa" }, status: "submitted",
    desc: { en: "Owner-submitted coal prospect awaiting geological review.", sw: "Eneo la makaa ya mawe lililowasilishwa na mmiliki, linasubiri ukaguzi wa kijiolojia." },
    docs: { en: "Location map", sw: "Ramani ya eneo" } },
  { id: "4", name: "Geita Quartz Vein Project", country: "Tanzania", region: "Geita", mineral: "Gold", image: inv,
    stage: { en: "Exploration", sw: "Utafiti" }, type: { en: "Offtake Partner", sw: "Mnunuzi wa Mazao" }, status: "review",
    desc: { en: "Quartz vein system with trenching completed; partner sought for drilling.", sw: "Mfumo wa mishipa ya quartz uliochimbwa mitaro; mshirika anatafutwa kwa uchorongaji." },
    docs: { en: "Trench report", sw: "Ripoti ya mitaro" } },
  { id: "5", name: "Mererani Gemstone Plot", country: "Tanzania", region: "Manyara", mineral: "Tanzanite", image: gold,
    stage: { en: "Small-scale production", sw: "Uzalishaji mdogo" }, type: { en: "Joint Venture", sw: "Ubia" }, status: "submitted",
    desc: { en: "Gemstone plot owner seeking technical and capital partner.", sw: "Mmiliki wa kitalu cha vito anatafuta mshirika wa kiufundi na mtaji." },
    docs: { en: "Owner statement", sw: "Maelezo ya mmiliki" } },
  { id: "6", name: "Kahama Copper Showing", country: "Tanzania", region: "Shinyanga", mineral: "Copper", image: hero,
    stage: { en: "Prospecting", sw: "Utafutaji" }, type: { en: "Equity Investment", sw: "Uwekezaji wa Hisa" }, status: "verified",
    desc: { en: "Surface copper showing with mapped outcrops and lab assays.", sw: "Dalili za shaba juu ya ardhi zenye ramani na majibu ya maabara." },
    docs: { en: "Assay certificates, maps", sw: "Vyeti vya maabara, ramani" } },
];

export const news: { id: string; cat: L; title: L; excerpt: L; date: string; image: string }[] = [
  { id: "1", image: hero, date: "2026-10-28", cat: { en: "Tanzania Mining News", sw: "Habari za Madini Tanzania" },
    title: { en: "Chunya's small-scale gold sector: opportunities for responsible partnership", sw: "Sekta ya dhahabu ya wachimbaji wadogo Chunya: fursa za ushirikiano wenye uwajibikaji" },
    excerpt: { en: "How cooperatives in the Lupa goldfield are formalising and attracting new partners.", sw: "Jinsi vyama vya ushirika katika eneo la Lupa vinavyojirasimisha na kuvutia washirika wapya." } },
  { id: "2", image: gold, date: "2026-10-15", cat: { en: "Gold Market Insights", sw: "Maarifa ya Soko la Dhahabu" },
    title: { en: "What the gold price means for Tanzanian miners", sw: "Bei ya dhahabu ina maana gani kwa wachimbaji wa Tanzania" },
    excerpt: { en: "A plain-language look at prices, buying centres and fair trading.", sw: "Mtazamo rahisi wa bei, masoko ya madini na biashara ya haki." } },
  { id: "3", image: pros, date: "2026-09-30", cat: { en: "Responsible Mining", sw: "Uchimbaji Wenye Uwajibikaji" },
    title: { en: "Mercury-free processing: practical steps for artisanal miners", sw: "Uchenjuaji bila zebaki: hatua za vitendo kwa wachimbaji wadogo" },
    excerpt: { en: "Safer methods that protect health and improve recovery.", sw: "Njia salama zinazolinda afya na kuongeza upatikanaji." } },
  { id: "4", image: inv, date: "2026-09-12", cat: { en: "Investment Education", sw: "Elimu ya Uwekezaji" },
    title: { en: "Due diligence checklist for mining investors in Africa", sw: "Orodha ya uhakiki kwa wawekezaji wa madini Afrika" },
    excerpt: { en: "Licences, geology, community and legal questions to ask first.", sw: "Maswali ya leseni, jiolojia, jamii na sheria ya kuuliza kwanza." } },
];

export const professionals: { name: string; cat: L; location: string; desc: L; verified: boolean }[] = [
  { name: "Mbeya GeoServices", cat: { en: "Geologists", sw: "Wanajiolojia" }, location: "Mbeya", verified: true,
    desc: { en: "Geological mapping, sampling and reporting.", sw: "Ramani za kijiolojia, sampuli na ripoti." } },
  { name: "Chunya Survey Partners", cat: { en: "Surveyors", sw: "Wapima Ardhi" }, location: "Chunya", verified: false,
    desc: { en: "Licence boundary surveys and GPS mapping.", sw: "Upimaji wa mipaka ya leseni na ramani za GPS." } },
  { name: "Lake Zone Assay Lab", cat: { en: "Laboratory Services", sw: "Huduma za Maabara" }, location: "Mwanza", verified: true,
    desc: { en: "Fire assay and multi-element analysis.", sw: "Uchambuzi wa fire assay na madini mbalimbali." } },
  { name: "SafeMine Tanzania", cat: { en: "Safety Professionals", sw: "Wataalamu wa Usalama" }, location: "Dodoma", verified: false,
    desc: { en: "Mine safety training and audits.", sw: "Mafunzo na ukaguzi wa usalama migodini." } },
  { name: "Southern Highlands Equipment", cat: { en: "Mining Equipment Suppliers", sw: "Wasambazaji wa Vifaa" }, location: "Mbeya", verified: true,
    desc: { en: "Crushers, pumps, ball mills and spares.", sw: "Mashine za kusaga, pampu, ball mills na vipuri." } },
  { name: "GreenEarth Consult", cat: { en: "Environmental Consultants", sw: "Washauri wa Mazingira" }, location: "Dar es Salaam", verified: false,
    desc: { en: "EIA studies and environmental compliance.", sw: "Tathmini ya athari kwa mazingira na uzingatiaji." } },
  { name: "Madini Law Chambers", cat: { en: "Legal & Regulatory", sw: "Sheria na Udhibiti" }, location: "Dar es Salaam", verified: true,
    desc: { en: "Mining licences, contracts and compliance.", sw: "Leseni za madini, mikataba na uzingatiaji." } },
  { name: "Highland Mining Engineers", cat: { en: "Mining Engineers", sw: "Wahandisi wa Migodi" }, location: "Chunya", verified: false,
    desc: { en: "Mine planning and small-scale plant design.", sw: "Mipango ya mgodi na usanifu wa mitambo midogo." } },
];
