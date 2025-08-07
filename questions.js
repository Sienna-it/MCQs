const questions = [
  {
    question: "Which of the following best defines a 'resource' in geography?",
    options: [
      "Any gift of nature available free of cost",
      "Anything available in the environment that can be technologically, economically, and culturally converted to benefit",
      "Only minerals and fossil fuels",
      "Land and water only"
    ],
    answer: 1
  },
  {
    question: "On the basis of origin, resources are classified into:",
    options: [
      "Renewable and non-renewable",
      "Biotic and abiotic",
      "Individual and community",
      "Potential and reserve"
    ],
    answer: 1
  },
  {
    question: "Which classification groups resources as renewable vs. non-renewable?",
    options: [
      "By origin",
      "By exhaustibility",
      "By ownership",
      "By status of development"
    ],
    answer: 1
  },
  {
    question: "Which of these is NOT a category in ownership classification of resources?",
    options: [
      "Individual",
      "Community",
      "Corporate",
      "International"
    ],
    answer: 2
  },
  {
    question: "‘Potential’ and ‘reserve’ are terms used in which resource classification?",
    options: [
      "By origin",
      "By exhaustibility",
      "By ownership",
      "By status of development"
    ],
    answer: 3
  },
  {
    question: "The Rio Earth Summit of 1992 endorsed which of the following?",
    options: [
      "Declaration on Global Climatic Change and Biological Diversity",
      "Paris Agreement",
      "Montreal Protocol",
      "Stockholm Conference"
    ],
    answer: 0
  },
  {
    question: "‘Agenda 21’ is a global action plan focused on:",
    options: [
      "Nuclear disarmament",
      "Sustainable development",
      "International trade liberalization",
      "Space exploration"
    ],
    answer: 1
  },
  {
    question: "Which year did world leaders sign Agenda 21 at the UNCED?",
    options: [
      "1987",
      "1992",
      "2002",
      "1972"
    ],
    answer: 1
  },
  {
    question: "Sustainable development is defined as:",
    options: [
      "Development without any economic growth",
      "Meeting present needs without compromising future generations’ ability to meet their own needs",
      "Maximizing industrial output at any cost",
      "Conserving resources by halting development"
    ],
    answer: 1
  },
  {
    question: "Which of the following is the first step in resource planning?",
    options: [
      "Matching plans with national development",
      "Evolving institutional structure",
      "Identification and inventory of resources",
      "Implementing development projects"
    ],
    answer: 2
  },
  {
    question: "Resource planning in India began with:",
    options: [
      "Second Five Year Plan",
      "First Five Year Plan",
      "Green Revolution",
      "Nehru Report"
    ],
    answer: 1
  },
  {
    question: "Which state is rich in minerals but economically backward due to lack of infrastructure?",
    options: [
      "Jharkhand",
      "Punjab",
      "Kerala",
      "Goa"
    ],
    answer: 0
  },
  {
    question: "Who famously said, “There is enough land for everybody’s need and not for anybody’s greed”?",
    options: [
      "Mahatma Gandhi",
      "Dr. B.R. Ambedkar",
      "Jawaharlal Nehru",
      "Vikram Sarabhai"
    ],
    answer: 0
  },
  {
    question: "The Club of Rome’s landmark report ‘Limits to Growth’ was published in:",
    options: [
      "1968",
      "1972",
      "1987",
      "1992"
    ],
    answer: 1
  },
  {
    question: "Which of the following is NOT a major cause of land degradation?",
    options: [
      "Deforestation",
      "Overgrazing",
      "Afforestation",
      "Mining"
    ],
    answer: 2
  },
  {
    question: "Over-irrigation in Punjab and Haryana has primarily led to:",
    options: [
      "Deforestation",
      "Waterlogging and salinity",
      "Desertification",
      "Increased biodiversity"
    ],
    answer: 1
  },
  {
    question: "Which measure helps control sand dune movement in arid regions?",
    options: [
      "Overgrazing",
      "Planting shelter belts of vegetation",
      "Waterlogging",
      "Mining"
    ],
    answer: 1
  },
  {
    question: "Permanent pastures and grazing lands fall under which land-use category?",
    options: [
      "Net sown area",
      "Other uncultivated land",
      "Land not available for cultivation",
      "Fallow lands"
    ],
    answer: 1
  },
  {
    question: "Land left uncultivated for more than five years but less than cultivation potential is called:",
    options: [
      "Current fallow",
      "Other than current fallow",
      "Permanent pasture",
      "Waste land"
    ],
    answer: 1
  },
  {
    question: "Gross cropped area is defined as:",
    options: [
      "Area sown only once",
      "Net sown area plus area sown more than once",
      "Total geographical area",
      "Area under forests"
    ],
    answer: 1
  },
  {
    question: "As per the National Forest Policy (1952), desired forest cover is:",
    options: [
      "33% of geographical area",
      "20% of net sown area",
      "50% of reporting area",
      "10% of total land"
    ],
    answer: 0
  },
  {
    question: "Which Indian state has over 80% of its reporting area as net sown?",
    options: [
      "Punjab",
      "Arunachal Pradesh",
      "Mizoram",
      "Andaman & Nicobar"
    ],
    answer: 0
  },
  {
    question: "Mining-induced deforestation is especially severe in:",
    options: [
      "Kerala and Tamil Nadu",
      "Jharkhand and Chhattisgarh",
      "Punjab and Haryana",
      "Rajasthan and Gujarat"
    ],
    answer: 1
  },
  {
    question: "Industrial effluents most directly cause:",
    options: [
      "Air pollution only",
      "Land and water pollution",
      "Increase in forest area",
      "Salinity control"
    ],
    answer: 1
  },
  {
    question: "Which of the following is a conservation measure against over-grazing?",
    options: [
      "Encouraging more livestock",
      "Rotational grazing management",
      "Removing all vegetation",
      "Increasing mining leases"
    ],
    answer: 1
  },
  {
    question: "Afforestation helps check land degradation by:",
    options: [
      "Reducing soil infiltration",
      "Binding soil particles and improving water retention",
      "Increasing mining activity",
      "Enhancing salinity"
    ],
    answer: 1
  },
  {
    question: "Planting thorny bushes in sand dunes is done to:",
    options: [
      "Increase soil salinity",
      "Stabilize shifting sands",
      "Promote waterlogging",
      "Enhance mineral extraction"
    ],
    answer: 1
  },
  {
    question: "Which is NOT a waste land management strategy?",
    options: [
      "Reclaiming and restoring vegetation",
      "Leaving land barren indefinitely",
      "Controlled grazing",
      "Soil erosion control structures"
    ],
    answer: 1
  },
  {
    question: "Land degradation affects human life because:",
    options: [
      "It increases the land area",
      "It reduces productivity and damages ecosystems",
      "It promotes sustainable development",
      "It only occurs in deserts"
    ],
    answer: 1
  },
  {
    question: "Which of the following correctly matches cause and effect of land degradation?",
    options: [
      "Over-irrigation → desertification",
      "Deforestation → enhanced soil fertility",
      "Mining → deep scars and overburden",
      "Afforestation → waterlogging"
    ],
    answer: 2
  }
];
