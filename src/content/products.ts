import { Product } from '../types';
import { siteImages } from './images';

export const productsData: Product[] = [
  // 1. BonAid-D Tablet (Real product from screenshot)
  {
    id: 'bonaid-d-tablet',
    slug: 'bonaid-d-tablets-calcium-vitamin-d3',
    name: 'BonAid-D Bone Health & Density Tablet',
    genericName: 'Calcium Carbonate + Magnesium + Vitamin D3 + Zinc',
    category: 'Musculoskeletal & Bone Health',
    concern: ['Bone & Joint Health', 'Vitamins & Supplements'],
    dosageForm: 'Tablet',
    strength: 'Ca 600mg, Mg 50mg, D3 400IU, Zn 7.5mg',
    packSize: '30 Film-Coated Tablets',
    price: 850,
    compareAtPrice: 950,
    isOTC: true,
    requiresPrescription: false,
    inStock: true,
    featured: true,
    bestseller: true,
    images: [
      siteImages.bonaidBottle.src,
      siteImages.tabletsBlister.src
    ],
    description: 'BonAid-D is a scientifically balanced mineral and vitamin supplement formulated to support optimal bone mineral density, combat osteoporosis, and prevent age-related bone mass degradation in men and women.',
    indications: 'Prevention and treatment of calcium, magnesium, and vitamin D deficiencies; adjunct therapy for osteopenia and post-menopausal osteoporosis.',
    directions: 'Adults: Take 1 tablet daily with a main meal and plenty of water, or as advised by your healthcare practitioner. Do not exceed the recommended daily dose.',
    warnings: [
      'Consult your physician before use if you have kidney stones or impaired renal function.',
      'Do not take within 2 hours of taking iron supplements or tetracycline antibiotics.',
      'Keep out of reach of children. Store below 30°C in a dry place protected from sunlight.'
    ],
    ingredients: [
      { name: 'Calcium (as Calcium Carbonate BP)', amount: '600 mg' },
      { name: 'Magnesium (as Magnesium Oxide USP)', amount: '50 mg' },
      { name: 'Vitamin D3 (Cholecalciferol BP)', amount: '400 IU' },
      { name: 'Zinc (as Zinc Sulfate USP)', amount: '7.5 mg' }
    ],
    drapRegistrationNumber: '089421-NUT-PK',
    storageConditions: 'Store below 30°C in a dry environment protected from light.'
  },

  // 2. Cekamol 500 mg Tablet (Real product from screenshot)
  {
    id: 'cekamol-500mg-tablet',
    slug: 'cekamol-500mg-paracetamol-tablets',
    name: 'Cekamol 500 mg Tablet',
    genericName: 'Paracetamol BP',
    category: 'Analgesics & Antipyretics',
    concern: ['Pain Relief', 'Cold & Flu'],
    dosageForm: 'Tablet',
    strength: '500 mg',
    packSize: 'Box of 100 Tablets (10 x 10 Blisters)',
    price: 320,
    compareAtPrice: 360,
    isOTC: true,
    requiresPrescription: false,
    inStock: true,
    featured: true,
    bestseller: true,
    images: [
      siteImages.tabletsBlister.src,
      siteImages.wellnessLifestyle.src
    ],
    description: 'Cekamol 500 mg provides rapid, well-tolerated relief from mild to moderate pain including headache, migraine, toothache, muscular ache, and febrile conditions associated with colds and influenza.',
    indications: 'Fever reduction, relief from tension headaches, musculoskeletal pain, sore throat, and post-immunization pyrexia.',
    directions: 'Adults and adolescents (over 12 years): 1 to 2 tablets every 4 to 6 hours as required. Maximum 8 tablets (4000 mg) in 24 hours. Do not chew.',
    warnings: [
      'Contains Paracetamol. Do not take with any other paracetamol-containing products.',
      'Overdose can cause serious liver damage. Immediate medical advice should be sought even if feeling well.',
      'Not recommended for children under 12 years without clinical advice.'
    ],
    ingredients: [
      { name: 'Paracetamol BP', amount: '500 mg' }
    ],
    drapRegistrationNumber: '012948-MED-PK',
    storageConditions: 'Keep in dry room at temperature not exceeding 25°C.'
  },

  // 3. Cekofen P 50mg Tablet (Real product from screenshot - Rx analgesic)
  {
    id: 'cekofen-p-tablet',
    slug: 'cekofen-p-50mg-aceclofenac-paracetamol',
    name: 'Cekofen P 50mg / 325mg Tablet',
    genericName: 'Aceclofenac + Paracetamol',
    category: 'Analgesics & Antipyretics',
    concern: ['Pain Relief', 'Bone & Joint Health'],
    dosageForm: 'Tablet',
    strength: 'Aceclofenac 50mg + Paracetamol 325mg',
    packSize: 'Box of 30 Tablets (3 x 10 Blisters)',
    price: 450,
    isOTC: false, // Prescription Only!
    requiresPrescription: true,
    inStock: true,
    featured: true,
    images: [
      siteImages.tabletsBlister.src
    ],
    description: 'Cekofen P combines the targeted anti-inflammatory action of Aceclofenac with the analgesic efficacy of Paracetamol for symptomatic management of acute painful inflammatory conditions.',
    indications: 'Prescription treatment of osteoarthritis, rheumatoid arthritis, ankylosing spondylitis, acute lumbago, and post-operative orthopedic pain.',
    directions: 'Prescription medicine. Take strictly as directed by your registered medical physician, usually 1 tablet twice daily with or after meals.',
    warnings: [
      'PRESCRIPTION ONLY MEDICINE: Requires a valid doctor prescription. Not available for direct online OTC purchase under DRAP guidelines.',
      'Contraindicated in active peptic ulceration and severe renal impairment.',
      'Avoid consumption of alcohol while on therapy.'
    ],
    ingredients: [
      { name: 'Aceclofenac BP', amount: '50 mg' },
      { name: 'Paracetamol BP', amount: '325 mg' }
    ],
    drapRegistrationNumber: '028419-MED-PK',
    storageConditions: 'Store below 25°C in a dry place. Protect from heat and light.'
  },

  // 4. MIPPI 20 mg Capsule (Real product from screenshot - Rx PPI)
  {
    id: 'mippi-20mg-capsule',
    slug: 'mippi-20mg-omeprazole-capsules',
    name: 'MIPPI 20 mg Capsule',
    genericName: 'Omeprazole Enteric-Coated Pellets BP',
    category: 'Gastrointestinal',
    concern: ['Digestive Health'],
    dosageForm: 'Capsule',
    strength: '20 mg',
    packSize: 'Box of 14 Enteric-Coated Capsules (2 x 7 Alu-Alu)',
    price: 380,
    isOTC: false, // Prescription Only!
    requiresPrescription: true,
    inStock: true,
    featured: true,
    images: [
      siteImages.capsulesBottle.src
    ],
    description: 'MIPPI 20 mg enteric-coated pellets inhibit gastric acid secretion by targeted inhibition of the gastric H+/K+-ATPase proton pump, providing extended mucosal healing in acid-related disorders.',
    indications: 'Duodenal and gastric ulcers, gastro-esophageal reflux disease (GERD), and eradication of Helicobacter pylori in combination with appropriate antibiotics.',
    directions: 'Prescription medicine. Swallow whole with liquid in the morning before breakfast. Do not crush or chew capsules.',
    warnings: [
      'PRESCRIPTION ONLY: Under DRAP regulations, this product cannot be dispensed online without a valid prescription verification.',
      'Prolonged PPI use requires routine serum magnesium and vitamin B12 monitoring.',
      'Notify your physician of any unexplained weight loss or dysphagia.'
    ],
    ingredients: [
      { name: 'Omeprazole BP (as enteric-coated pellets)', amount: '20 mg' }
    ],
    drapRegistrationNumber: '018944-MED-PK',
    storageConditions: 'Store below 25°C in original moisture-barrier alu-alu pack.'
  },

  // 5. GastraCalm Antacid Suspension (OTC Digestive)
  {
    id: 'gastracalm-antacid-suspension',
    slug: 'gastracalm-chewable-antacid-suspension',
    name: 'GastraCalm Liquid Antacid Mint Suspension',
    genericName: 'Magaldrate + Simethicone Oral Suspension',
    category: 'Gastrointestinal',
    concern: ['Digestive Health'],
    dosageForm: 'Suspension',
    strength: 'Magaldrate 480mg + Simethicone 20mg / 5ml',
    packSize: '120 ml Amber Bottle',
    price: 290,
    compareAtPrice: 340,
    isOTC: true,
    requiresPrescription: false,
    inStock: true,
    featured: false,
    bestseller: true,
    images: [
      siteImages.syrupMedicine.src
    ],
    description: 'Fast-acting dual action cooling mint liquid suspension that rapidly neutralizes excess stomach acid while eliminating gas bubbles and gastrointestinal bloat.',
    indications: 'Heartburn, acidity, dyspepsia, acid indigestion, sour stomach, and flatulent discomfort.',
    directions: 'Adults: Take 1 to 2 measuring spoonfuls (5–10 ml) 20 minutes to 1 hour after meals and at bedtime, or when discomfort arises. Shake well before use.',
    warnings: [
      'Do not use continuously for more than 14 days without consulting a doctor.',
      'Patients on kidney dialysis or with hypophosphatemia should consult their physician before use.'
    ],
    ingredients: [
      { name: 'Magaldrate USP', amount: '480 mg' },
      { name: 'Simethicone USP', amount: '20 mg' }
    ],
    drapRegistrationNumber: '074312-OTC-PK',
    storageConditions: 'Do not freeze. Keep tightly closed below 25°C.'
  },

  // 6. VitaCee 1000mg Effervescent (OTC Vitamins)
  {
    id: 'vitacee-1000-effervescent',
    slug: 'vitacee-1000mg-vitamin-c-zinc-effervescent',
    name: 'VitaCee 1000mg Vitamin C + Zinc Effervescent',
    genericName: 'Ascorbic Acid + Zinc Sulfate',
    category: 'Vitamins & Supplements',
    concern: ['Vitamins & Supplements', 'Cold & Flu'],
    dosageForm: 'Tablet',
    strength: 'Vitamin C 1000mg + Zinc 10mg',
    packSize: 'Tube of 20 Orange Flavor Effervescent Tablets',
    price: 680,
    compareAtPrice: 750,
    isOTC: true,
    requiresPrescription: false,
    inStock: true,
    featured: true,
    bestseller: true,
    images: [
      siteImages.wellnessLifestyle.src,
      siteImages.tabletsBlister.src
    ],
    description: 'High-potency effervescent immune defense formulation combining 1,000 mg pure Vitamin C with bioavailable Zinc in a refreshing sugar-free natural orange drink.',
    indications: 'Daily immune defense, recovery during seasonal viral challenges, antioxidant cellular protection, and fatigue reduction.',
    directions: 'Adults and children over 12 years: Dissolve 1 effervescent tablet in a 200ml glass of cold water once daily. Drink immediately after full dissolution.',
    warnings: [
      'Patients with kidney stone history or hyperoxaluria should moderate intake.',
      'Store tube tightly capped with the desiccant plug intact to avoid moisture damage.'
    ],
    ingredients: [
      { name: 'Ascorbic Acid (Vitamin C BP)', amount: '1000 mg' },
      { name: 'Zinc Sulfate Monohydrate USP', amount: '10 mg' }
    ],
    drapRegistrationNumber: '095431-NUT-PK',
    storageConditions: 'Keep tube securely sealed in a cool, dry place below 25°C.'
  },

  // 7. Cekafed Cold & Flu Relief (OTC Cold & Flu)
  {
    id: 'cekafed-cold-flu',
    slug: 'cekafed-day-night-cold-flu-caplets',
    name: 'Cekafed Multi-Action Cold & Flu Caplets',
    genericName: 'Paracetamol + Phenylephrine HCl + Chlorpheniramine',
    category: 'Respiratory & Cold',
    concern: ['Cold & Flu', 'Pain Relief'],
    dosageForm: 'Tablet',
    strength: 'Paracetamol 500mg, Phenylephrine 10mg, Chlorpheniramine 2mg',
    packSize: 'Box of 20 Coated Caplets (2 x 10 Blisters)',
    price: 280,
    compareAtPrice: 320,
    isOTC: true,
    requiresPrescription: false,
    inStock: true,
    featured: false,
    bestseller: true,
    images: [
      siteImages.tabletsBlister.src
    ],
    description: 'Triple-action formula tackling stubborn nasal congestion, runny nose, sinus pressure, fever, and bodily aches caused by common colds and flu.',
    indications: 'Symptomatic relief of congested sinuses, rhinorrhea, sneezing, fever, and headache in respiratory viral infections.',
    directions: 'Adults and children 12 years & older: 1 caplet every 6 hours with a glass of water. Do not exceed 4 caplets in 24 hours.',
    warnings: [
      'May cause mild drowsiness. Avoid operating heavy machinery or driving after ingestion.',
      'Do not combine with other decongestants or MAOI antidepressants.'
    ],
    ingredients: [
      { name: 'Paracetamol BP', amount: '500 mg' },
      { name: 'Phenylephrine Hydrochloride BP', amount: '10 mg' },
      { name: 'Chlorpheniramine Maleate BP', amount: '2 mg' }
    ],
    drapRegistrationNumber: '065319-OTC-PK',
    storageConditions: 'Store below 30°C in dry conditions.'
  },

  // 8. Tussin-DX Herbal & Honey Cough Syrup (OTC Cough)
  {
    id: 'tussin-dx-cough-syrup',
    slug: 'tussin-dx-soothing-cough-syrup',
    name: 'Tussin-DX Soothing Throat & Cough Elixir',
    genericName: 'Hedera Helix (Ivy Leaf Extract) + Pure Honey',
    category: 'Respiratory & Cold',
    concern: ['Cold & Flu'],
    dosageForm: 'Syrup',
    strength: 'Ivy Leaf Extract 35mg / 5ml + Honey Base',
    packSize: '120 ml Glass Bottle with Measuring Cup',
    price: 360,
    compareAtPrice: 400,
    isOTC: true,
    requiresPrescription: false,
    inStock: true,
    featured: false,
    bestseller: false,
    images: [
      siteImages.syrupMedicine.src
    ],
    description: 'Gentle, natural ivy leaf extract blended with pharmaceutical-grade honey to thin stubborn mucus, soothe throat irritation, and ease productive chesty coughs.',
    indications: 'Productive chest cough, bronchial catarrh, dry tickly throat irritation.',
    directions: 'Children 6–12 years: 5 ml twice daily. Adults: 5 to 7.5 ml three times daily after meals. Shake well.',
    warnings: [
      'If cough persists beyond 7 days or is accompanied by high fever, consult your doctor.',
      'Sugar-safe formulation, suitable for whole family over 6 years.'
    ],
    ingredients: [
      { name: 'Dried Ivy Leaf Extract (Hedera Helix 5-7.5:1)', amount: '35 mg' },
      { name: 'Purified Honey Excipient Base', amount: 'q.s.' }
    ],
    drapRegistrationNumber: '041289-NUT-PK',
    storageConditions: 'Store below 25°C. Discard 90 days after first opening.'
  },

  // 9. DermAssist Antiseptic Healing Cream (OTC First Aid & Skin Care)
  {
    id: 'dermassist-antiseptic-cream',
    slug: 'dermassist-soothing-antiseptic-healing-cream',
    name: 'DermAssist Antiseptic Barrier Healing Cream',
    genericName: 'Chlorhexidine Gluconate + Cetrimide + Zinc Oxide',
    category: 'Dermatology',
    concern: ['First Aid', 'Skin Care'],
    dosageForm: 'Cream / Ointment',
    strength: 'Chlorhexidine 0.1% w/w + Cetrimide 0.5% w/w',
    packSize: '50 g Aluminum Tube',
    price: 310,
    compareAtPrice: 350,
    isOTC: true,
    requiresPrescription: false,
    inStock: true,
    featured: false,
    bestseller: false,
    images: [
      siteImages.tabletsBlister.src
    ],
    description: 'A soothing clinical topical cream providing broad-spectrum antiseptic protection against bacterial infection in minor cuts, abrasions, burns, chapped skin, and insect bites.',
    indications: 'Minor wounds, cuts, grazes, superficial burns, diaper rash prevention, and dry cracked skin.',
    directions: 'Cleanse affected area with clean water. Apply thin layer of cream gently 2 to 3 times daily. May be covered with a sterile dressing if needed.',
    warnings: [
      'For external dermal application only. Avoid contact with eyes and inner ears.',
      'Discontinue use if signs of topical skin irritation or sensitization appear.'
    ],
    ingredients: [
      { name: 'Chlorhexidine Gluconate BP', amount: '0.1% w/w' },
      { name: 'Cetrimide BP', amount: '0.5% w/w' },
      { name: 'Zinc Oxide BP', amount: '5.0% w/w' }
    ],
    drapRegistrationNumber: '059812-OTC-PK',
    storageConditions: 'Store below 30°C. Keep tube cap firmly closed.'
  },

  // 10. NeuroMag Active Magnesium Complex (OTC Supplements)
  {
    id: 'neuromag-active-magnesium',
    slug: 'neuromag-magnesium-glycinate-b6',
    name: 'NeuroMag High-Absorption Magnesium Glycinate',
    genericName: 'Magnesium Bisglycinate Chelate + Vitamin B6',
    category: 'Vitamins & Supplements',
    concern: ['Vitamins & Supplements', 'Bone & Joint Health'],
    dosageForm: 'Capsule',
    strength: 'Elemental Magnesium 200mg + Pyridoxine 5mg',
    packSize: '60 Vegetable Capsules',
    price: 1250,
    compareAtPrice: 1450,
    isOTC: true,
    requiresPrescription: false,
    inStock: true,
    featured: true,
    bestseller: false,
    images: [
      siteImages.capsulesBottle.src
    ],
    description: 'Premium chelated magnesium bisglycinate engineered for superior gastrointestinal tolerance and cellular uptake. Supports muscle relaxation, nerve tranquility, and restful sleep.',
    indications: 'Muscle cramps, physical fatigue, stress, tension, nocturnal leg twitches, and magnesium nutritional insufficiency.',
    directions: 'Adults: Take 1 to 2 capsules in the evening with water, approximately 30 minutes before bedtime.',
    warnings: [
      'Patients with severe kidney failure must consult their physician before supplementing magnesium.',
      'Keep bottle tightly sealed in a dry place.'
    ],
    ingredients: [
      { name: 'Magnesium Bisglycinate (yielding elemental Mg)', amount: '200 mg' },
      { name: 'Vitamin B6 (Pyridoxine HCl BP)', amount: '5 mg' }
    ],
    drapRegistrationNumber: '091240-NUT-PK',
    storageConditions: 'Store below 25°C away from humidity and heat.'
  },

  // 11. Electrol-ORS Hydration Sachets (OTC First Aid & Digestive)
  {
    id: 'electrol-ors-sachets',
    slug: 'electrol-oral-rehydration-salts-sachets',
    name: 'Electrol-ORS Low-Osmolarity Rehydration Salts',
    genericName: 'WHO Recommended Low Osmolarity Oral Rehydration Formula',
    category: 'Gastrointestinal',
    concern: ['Digestive Health', 'First Aid'],
    dosageForm: 'Sachet',
    strength: 'WHO Formulation (245 mOsm/L osmolarity)',
    packSize: 'Box of 10 Sachets (Lemon Flavor)',
    price: 180,
    compareAtPrice: 200,
    isOTC: true,
    requiresPrescription: false,
    inStock: true,
    featured: false,
    bestseller: true,
    images: [
      siteImages.tabletsBlister.src
    ],
    description: 'WHO-formula oral rehydration salts formulated to rapidly restore vital electrolytes, sodium, potassium, and fluid balance during acute diarrheal episodes or summer heat dehydration.',
    indications: 'Acute gastrointestinal dehydration, heat exhaustion, physical sports fluid depletion.',
    directions: 'Dissolve entire contents of 1 sachet in exactly 1 Liter of boiled and cooled drinking water. Drink in small sips as needed. Discard prepared solution after 24 hours.',
    warnings: [
      'Do not boil the prepared solution. Use strictly clean potable water.',
      'If signs of severe dehydration, vomiting, or lethargy appear in infants, seek emergency hospital care immediately.'
    ],
    ingredients: [
      { name: 'Sodium Chloride BP', amount: '2.6 g' },
      { name: 'Anhydrous Glucose BP', amount: '13.5 g' },
      { name: 'Potassium Chloride BP', amount: '1.5 g' },
      { name: 'Trisodium Citrate Dihydrate BP', amount: '2.9 g' }
    ],
    drapRegistrationNumber: '034981-OTC-PK',
    storageConditions: 'Keep sachets in dry ambient storage.'
  },

  // 12. ArthriFlex Joint Glucosamine + Chondroitin (OTC Bone & Joint)
  {
    id: 'arthriflex-joint-care',
    slug: 'arthriflex-glucosamine-chondroitin-msm',
    name: 'ArthriFlex Joint Mobility & Cartilage Support',
    genericName: 'Glucosamine Sulfate + Chondroitin + MSM',
    category: 'Musculoskeletal & Bone Health',
    concern: ['Bone & Joint Health', 'Pain Relief'],
    dosageForm: 'Tablet',
    strength: 'Glucosamine 750mg, Chondroitin 600mg, MSM 250mg',
    packSize: '60 Coated Tablets (Amber Bottle)',
    price: 1650,
    compareAtPrice: 1900,
    isOTC: true,
    requiresPrescription: false,
    inStock: true,
    featured: true,
    bestseller: false,
    images: [
      siteImages.bonaidBottle.src
    ],
    description: 'Comprehensive triple-action clinical formula nourishing articular cartilage matrix, lubricating stiff knee and finger joints, and easing chronic mobility discomfort.',
    indications: 'Age-related joint stiffness, knee cracking, cartilage wear, active athletics joint strain.',
    directions: 'Adults: Take 2 tablets daily with meals for at least 6 to 8 weeks for sustained cartilage support.',
    warnings: [
      'Contains ingredients derived from shellfish. Persons with seafood allergies should avoid use.',
      'Check with doctor if taking anticoagulant blood thinners like Warfarin.'
    ],
    ingredients: [
      { name: 'Glucosamine Sulfate 2KCl', amount: '750 mg' },
      { name: 'Chondroitin Sulfate Sodium', amount: '600 mg' },
      { name: 'Methylsulfonylmethane (MSM)', amount: '250 mg' }
    ],
    drapRegistrationNumber: '083421-NUT-PK',
    storageConditions: 'Store below 25°C in a dry cool place.'
  },

  // 13. CekaPovid Antiseptic Solution 10% (OTC First Aid)
  {
    id: 'cekapovid-antiseptic-solution',
    slug: 'cekapovid-povidone-iodine-10-solution',
    name: 'CekaPovid 10% Povidone-Iodine Surgical Solution',
    genericName: 'Povidone-Iodine USP 10% w/v',
    category: 'Dermatology',
    concern: ['First Aid'],
    dosageForm: 'Drops',
    strength: '10% w/v (yielding 1% available Iodine)',
    packSize: '100 ml Squeeze Bottle',
    price: 240,
    compareAtPrice: 280,
    isOTC: true,
    requiresPrescription: false,
    inStock: true,
    featured: false,
    bestseller: false,
    images: [
      siteImages.syrupMedicine.src
    ],
    description: 'Gold-standard microbicidal topical disinfectant for cleansing infected skin, sanitizing superficial wounds, lacerations, burns, and post-procedural dressing care.',
    indications: 'Disinfection of skin, surgical hand scrubs, first-aid cleansing for grazes and cuts.',
    directions: 'Apply full strength undiluted directly to clean wound area using sterile cotton or gauze pad. Allow to dry to form a protective antimicrobial film.',
    warnings: [
      'Do not use in patients with known thyroid gland disorders or iodine hypersensitivity.',
      'For external topical use only. Keep out of reach of children.'
    ],
    ingredients: [
      { name: 'Povidone-Iodine USP', amount: '10% w/v' }
    ],
    drapRegistrationNumber: '061984-OTC-PK',
    storageConditions: 'Store below 25°C. Protect from intense direct sunlight.'
  },

  // 14. DermalHydra Urea 10% Repair Emulsion (OTC Skin Care)
  {
    id: 'dermalhydra-urea-10-cream',
    slug: 'dermalhydra-urea-10-percent-repair-cream',
    name: 'DermalHydra Intensive Urea 10% Repair Cream',
    genericName: 'Medical Grade Urea 10% + Ceramides',
    category: 'Dermatology',
    concern: ['Skin Care'],
    dosageForm: 'Cream / Ointment',
    strength: 'Urea 10% w/w + Ceramide Complex',
    packSize: '100 ml Tube',
    price: 520,
    compareAtPrice: 590,
    isOTC: true,
    requiresPrescription: false,
    inStock: true,
    featured: false,
    bestseller: false,
    images: [
      siteImages.tabletsBlister.src
    ],
    description: 'Clinical moisture-binding therapeutic barrier cream formulated for severely xerotic, flaky, cracked heels, rough elbows, and eczema-prone dry skin.',
    indications: 'Rough cracked feet, dry skin patches, keratosis pilaris, winter skin barrier damage.',
    directions: 'Gently massage into affected dry skin areas twice daily, preferably following a bath or shower while skin retains slight moisture.',
    warnings: [
      'Do not apply on open bleeding fissures or acute weeping eczema lesions.',
      'Wash hands after application. Avoid contact with eyes.'
    ],
    ingredients: [
      { name: 'Urea BP', amount: '10% w/w' },
      { name: 'Ceramide NP / AP complex', amount: '1.2% w/w' },
      { name: 'Glycerin BP', amount: '5% w/w' }
    ],
    drapRegistrationNumber: '071295-OTC-PK',
    storageConditions: 'Store below 25°C. Do not freeze.'
  },

  // 15. LactoFlora Probiotic 10-Strain (OTC Digestive)
  {
    id: 'lactoflora-probiotic-capsules',
    slug: 'lactoflora-10-strain-probiotic-gut-defense',
    name: 'LactoFlora 25 Billion CFU Probiotic Gut Defense',
    genericName: 'Multi-strain Live Probiotic Cultures + Prebiotic Inulin',
    category: 'Gastrointestinal',
    concern: ['Digestive Health', 'Vitamins & Supplements'],
    dosageForm: 'Capsule',
    strength: '25 Billion Live Cultures (10 Researched Strains)',
    packSize: '30 Delayed-Release Vegetarian Capsules',
    price: 1450,
    compareAtPrice: 1650,
    isOTC: true,
    requiresPrescription: false,
    inStock: true,
    featured: false,
    bestseller: true,
    images: [
      siteImages.capsulesBottle.src
    ],
    description: 'Enteric-protected delayed-release capsules delivering 25 billion viable probiotic organisms past stomach acid into the intestinal tract to restore natural microbiome diversity.',
    indications: 'Post-antibiotic gut imbalance, irritable bowel syndrome symptoms, bloating, and irregular bowel motility.',
    directions: 'Adults: Take 1 capsule daily with water, preferably in the morning 15 minutes before food.',
    warnings: [
      'Severely immunocompromised patients should seek medical advice prior to live probiotic supplementation.',
      'No refrigeration needed, but keep bottle in a cool dry room away from moisture.'
    ],
    ingredients: [
      { name: 'Lactobacillus acidophilus LA-14', amount: '5 Billion CFU' },
      { name: 'Bifidobacterium lactis BL-04', amount: '5 Billion CFU' },
      { name: 'Prebiotic Fructooligosaccharides (FOS)', amount: '100 mg' }
    ],
    drapRegistrationNumber: '097812-NUT-PK',
    storageConditions: 'Store below 25°C in original desiccant-lined canister.'
  },

  // 16. CekaSpasm Drotaverine 40mg Tablet (Rx Antispasmodic)
  {
    id: 'cekaspasm-40mg-tablet',
    slug: 'cekaspasm-drotaverine-40mg-tablets',
    name: 'CekaSpasm 40 mg Tablet',
    genericName: 'Drotaverine Hydrochloride BP',
    category: 'Gastrointestinal',
    concern: ['Pain Relief', 'Digestive Health'],
    dosageForm: 'Tablet',
    strength: '40 mg',
    packSize: 'Box of 20 Tablets (2 x 10 Blisters)',
    price: 260,
    isOTC: false, // Prescription Only!
    requiresPrescription: true,
    inStock: true,
    featured: false,
    images: [
      siteImages.tabletsBlister.src
    ],
    description: 'Direct-acting smooth muscle antispasmodic that relaxes visceral spasms in biliary, renal, and gastrointestinal tracts without anticholinergic side effects.',
    indications: 'Prescription treatment of intestinal colic, biliary spasms, irritable bowel syndrome cramps, and dysmenorrhea.',
    directions: 'Prescription only. Take strictly according to your physician advice. Typically 1 tablet two to three times daily.',
    warnings: [
      'PRESCRIPTION ONLY: Under DRAP regulations, this product cannot be ordered online without clinical verification.',
      'Contraindicated in severe hepatic, renal, or cardiac insufficiency.',
      'May rarely cause mild dizziness or hypotension.'
    ],
    ingredients: [
      { name: 'Drotaverine Hydrochloride BP', amount: '40 mg' }
    ],
    drapRegistrationNumber: '025612-MED-PK',
    storageConditions: 'Store protected from light and moisture below 25°C.'
  }
];

export const allCategories: { id: string; name: string }[] = [
  { id: 'all', name: 'All Formulations' },
  { id: 'Gastrointestinal', name: 'Gastrointestinal' },
  { id: 'Analgesics & Antipyretics', name: 'Analgesics & Pain' },
  { id: 'Musculoskeletal & Bone Health', name: 'Bone & Joints' },
  { id: 'Vitamins & Supplements', name: 'Vitamins & Minerals' },
  { id: 'Respiratory & Cold', name: 'Respiratory & Cold' },
  { id: 'Dermatology', name: 'Dermatology & Skin' }
];

export const allConcerns: { id: string; label: string }[] = [
  { id: 'all', label: 'All Concerns' },
  { id: 'Pain Relief', label: 'Pain Relief' },
  { id: 'Cold & Flu', label: 'Cold & Flu' },
  { id: 'Digestive Health', label: 'Digestive Health' },
  { id: 'Bone & Joint Health', label: 'Bone & Joint' },
  { id: 'Vitamins & Supplements', label: 'Vitamins & Supplements' },
  { id: 'Skin Care', label: 'Skin Care' },
  { id: 'First Aid', label: 'First Aid' }
];
