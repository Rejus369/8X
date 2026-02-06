
import { Section } from './types';

export const FORM_SECTIONS: Section[] = [
  {
    title: "Pradžia",
    questions: [
      { id: "q0_name", label: "VARDAS:", type: "text", placeholder: "Jūsų vardas" },
      { id: "q0_email", label: "EMAIL:", type: "text", placeholder: "pavyzdys@pastas.lt" }
    ]
  },
  {
    title: "1. Tapatybė ir vidinis Aš",
    questions: [
      { id: "q1", label: "Kaip apibūdintumėte save 3–5 esminiais žodžiais?", type: "text" },
      { id: "q2", label: "Kokia jūsų dabartinė gyvenimo tapatybė ar pagrindinis vaidmuo šiuo etapu?", type: "long-text" },
      { id: "q3", label: "Jūsų šios dienos vidinis resursas / energijos lygis (0–100 %)", type: "number", min: 0, max: 100 },
      { id: "q4", label: "Kas šiuo gyvenimo momentu jums yra absoliutus prioritetas?", type: "text" },
      { id: "q5", label: "Užbaikite mintį: „Nuo pat vaikystės mane labiausiai domino...“", type: "text" },
      { id: "q6", label: "Sritis, kurioje jaučiatės natūraliai stipriai ir talentingai be didelių pastangų", type: "text" },
      { id: "q7", label: "Koks yra jūsų „miegantis supergebėjimas“, apie kurį žino tik retas?", type: "long-text" }
    ]
  },
  {
    title: "2. Kryptis, veikla ir potencialas",
    questions: [
      { id: "q8", label: "Kokia veikla šiuo metu generuoja jūsų pagrindines pajamas?", type: "text" },
      { id: "q9", label: "Jei ne dabartinis darbas, kuo užsiimtumėte vedami gryno smalsumo?", type: "text" },
      { id: "q10", label: "Ką darytumėte net ir tada, jei už tai niekas niekada nemokėtų?", type: "long-text" },
      { id: "q11", label: "Pagal kokius kriterijus renkatės, kur investuoti savo laiką ir dėmesį?", type: "long-text" },
      { id: "q12", label: "Kokia tema ar sritis jus labiausiai įtraukė per pastaruosius 12 mėnesių?", type: "text" },
      { id: "q13", label: "Svarbiausia pamoka apie save, kurią įsisavinote per šiuos metus", type: "long-text" }
    ]
  },
  {
    title: "3. Pasaulėžiūra ir įsitikinimai",
    questions: [
      { id: "q14", label: "Kas, jūsų manymu, šiuo metu yra realiai pasiekiama jūsų gyvenime?", type: "long-text" },
      { id: "q15", label: "O kas vis dar atrodo „neįmanoma“, nors slapta to labai trokštate?", type: "long-text" },
      { id: "q16", label: "Jei žinotumėte, kad liko tik vieneri metai – kaip pasikeistų jūsų kasdienybė?", type: "long-text" },
      { id: "q17", label: "Kokios mintys apie vertę ir pinigus dažniausiai iškyla jūsų sąmonėje?", type: "long-text" },
      { id: "q18", label: "Ko sąmoningai atsisakote šiuo metu (senų taisyklių, vaidmenų ar nuostatų)?", type: "text" },
      { id: "q19", label: "Ar esate anksčiau kryptingai dirbę su savo pasąmone ar įsitikinimais?", type: "choice", options: ["Taip, giliai ir sistemingai", "Taip, šiek tiek", "Ne, bet jaučiu tam poreikį", "Ne"] }
    ]
  },
  {
    title: "4. Finansinė ekosistema",
    questions: [
      { id: "q20", label: "Jūsų dabartinės vidutinės mėnesio pajamos", type: "text" },
      { id: "q21", label: "Kokia suma jums atrodo ambicinga, bet šiuo metu pasiekiama?", type: "text" },
      { id: "q22", label: "Koks banko sąskaitos likutis leidžia jums jaustis visiškai saugiai ir ramiai?", type: "text" },
      { id: "q23", label: "Kas, jūsų nuomone, yra didžiausias stabdis jūsų finansiniam augimui?", type: "long-text" }
    ]
  },
  {
    title: "5. Nervų sistema ir kūno reakcijos",
    questions: [
      { id: "q24", label: "Kaip jūsų kūnas reaguoja į nežinomybę ar didelę riziką?", type: "text" },
      { id: "q25", label: "Kokia pirmoji emocija aplanko gavus netikėtą, didelę pinigų sumą?", type: "text" },
      { id: "q26", label: "Ką jaučiate leisdami didesnes sumas ar susidūrę su finansiniu praradimu?", type: "text" },
      { id: "q27", label: "KAIP VERTINATE SAVO VIDINĮ PAJĖGUMĄ IŠLAIKYTI DĖMESIO KONCENTRACIJĄ?", type: "scale", min: 1, max: 5 }
    ]
  },
  {
    title: "6. Šaknys ir vaikystė",
    questions: [
      { id: "q28", label: "Kokia finansinė ir darbo etika vyravo aplinkoje, kurioje užaugote?", type: "text" },
      { id: "q29", label: "Kokiomis frazėmis jūsų tėvai ar globėjai dažniausiai apibūdindavo pinigus?", type: "text" },
      { id: "q30", label: "Kaip vaikystėje siekdavote to, ko labai norėjote?", type: "text" },
      { id: "q31", label: "Užbaikite: „Jei turėčiau gerokai daugiau nei mano šeima, aš jausčiausi...“", type: "text" }
    ]
  },
  {
    title: "7. Socialinis laukas ir kultūra",
    questions: [
      { id: "q32", label: "Ar turite gyvenimo užsienyje patirties? Jei taip, kur?", type: "text" },
      { id: "q33", label: "Kokiomis užsienio kalbomis bendraujate laisvai?", type: "text" },
      { id: "q34", label: "Kaip apibūdintumėte savo dabartinį socialinį ratą?", type: "text" },
      { id: "q35", label: "Kas jungia jus su artimiausiais draugais ir kokia energija telkia jūsų ryšį?", type: "text" },
      { id: "q36", label: "Paskutinė kelionė su draugais: kokią tiesą apie save joje pamatėte?", type: "long-text" }
    ]
  },
  {
    title: "8. Kūnas ir įpročiai",
    questions: [
      { id: "q37", label: "Koks jūsų santykis su mityba ir savo kūno poreikiais?", type: "text" },
      { id: "q38", label: "Kokia judėjimo ar sporto forma jums teikia daugiausiai gyvybingumo?", type: "text" },
      { id: "q39", label: "Kaip dažnai jaučiatės visiškai saugiai, ramiai ir „namuose“ savo kūne?", type: "scale", min: 1, max: 5 }
    ]
  },
  {
    title: "9. RUTINA, PROTAS, PRAKTIKOS, ENERGETINĖ HIGIENA",
    questions: [
      { 
        id: "q_day_routine", 
        label: "KAIP ATRODO TAVO TIPINĖ DIENA?", 
        description: "Parašyk nuo pabudimo iki vakaro: darbas, poilsis, telefonas, maistas, judesys, žmonės, kas „suvalgo“ laiką.",
        type: "long-text" 
      },
      { 
        id: "q_mind_control", 
        label: "KAIP SĄMONINGAI VALDAI PROTĄ, KAI UŽSUKA STRESAS / ABEJONĖ / PROKRASTINACIJA?", 
        description: "Įvardink konkrečius veiksmus: ką darai per pirmas 5–10 min, kaip grąžini fokusą, kaip priimi sprendimus.",
        type: "long-text" 
      },
      { 
        id: "q_energy_practices", 
        label: "KOKIAS KASDIENINES PRAKTIKAS DARAI, KAD IŠLAIKYTUM ENERGIJĄ IR AIŠKUMĄ?", 
        description: "Pvz. meditacija, kvėpavimas, sportas, rašymas, malda, šaltas dušas, disciplina su telefonu, vakaro rutina.",
        type: "long-text" 
      },
      { 
        id: "q_routine_confidence", 
        label: "KIEK UŽTIKRINTAI JAUTIESI SAVO RUTINOJE?", 
        description: "0 – chaosas, 10 – stabilu ir valdau.",
        type: "scale", 
        min: 0, 
        max: 10
      },
      { 
        id: "q_routine_future", 
        label: "JEI NIEKO RUTINOJE NEKEISTUM: KUR BŪTUM PO 6 MĖN. / PO 12 MĖN. / PO 3 METŲ?", 
        description: "Parašyk realistiškai: sveikata, energija, pajamos, santykiai, savijauta, progresas.",
        type: "long-text" 
      },
      { 
        id: "q_energy_hygiene", 
        label: "KAIP TU SUPRANTI ENERGETINĘ HIGIENĄ SAVO KASDIENYBĖJE?", 
        description: "Kas tau yra „švari“ energija, kas ją teršia, kaip valai / uždarai įtaką, žmones, informacijos srautą, ribas.",
        type: "long-text" 
      },
      { 
        id: "q_biggest_challenge", 
        label: "KAS, TAVO AKIMIS, DABAR YRA DIDŽIAUSIAS IŠŠŪKIS, KURIS LAIKO TAVE TOJE PAČIOJE VIETOJE?", 
        description: "1 problema, be istorijų (1–3 sakiniai).",
        type: "long-text" 
      },
      { 
        id: "q_movie_shout", 
        label: "JEI TAVO GYVENIMAS DABAR BŪTŲ FILMAS, O TU – PAGRINDINIS HEROJUS: KĄ ŠIUO MOMENTU ŽIŪROVAI ŠAUKTŲ TAU NUO SOFOS?", 
        description: "Kaip varžybose: vienas tikslus sakinys, ką reikia padaryti / pripažinti / nustoti daryti.",
        type: "text" 
      }
    ]
  },
  {
    title: "10. Integracija ir ketinimas",
    questions: [
      { id: "q40", label: "Koks yra jūsų esminis ketinimas šiam mūsų bendram darbui? Ką norite perrašyti?", type: "long-text" },
      { id: "q41", label: "Ką norėtumėte, kad apie jus sakytų praėjus 50 metų po jūsų išėjimo? (Legacy)", type: "long-text" }
    ]
  }
];
