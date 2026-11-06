const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Swasti PET/CT Database...');

  // 1. Super Admin User
  const hashedPassword = await bcrypt.hash('adminpassword123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@swastipetct.com' },
    update: {},
    create: {
      email: 'admin@swastipetct.com',
      password: hashedPassword,
      name: 'Swasti Super Admin',
      role: 'SUPER_ADMIN',
    },
  });

  // 2. Default Site Settings
  await prisma.siteSetting.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      siteName: 'Swasti PET/CT Imaging & Nuclear Medicine',
      tagline: 'Precision Imaging, Personalized Care',
      announcementBar: 'Now offering Advanced 177-Lu and 225-Ac Theranostics & Daily Ultrasound/ECHO Services.',
      showAnnouncement: true,
      phone1: '+91 471 244 4455',
      phone2: '+91 9400 00 4455',
      whatsappNumber: '+919400004455',
      email: 'info@swastipetct.com',
      address: 'Sreelekshmi Building, Medical College P.O. Junction, Ulloor, Thiruvananthapuram, Kerala - 695011',
      timingHours: 'Mon - Sat: 8:00 AM - 8:00 PM | Emergency Scans: 24/7 on call',
      heroTitle: 'Precision Imaging & Advanced Theranostics',
      heroSubtitle: 'South Kerala\'s trusted diagnostic flagship by Nucleuz Healthcare. Cutting-edge PET/CT, specialized CT scans, gamma camera imaging, comprehensive clinics, and targeted radionuclide cancer therapies.',
      heroBadge: 'AERB Approved Nuclear Medicine & NABL Compliant Diagnostics',
    },
  });

  // 3. Services (Diagnostic Scans, Clinics, Lab & Theranostics)
  const servicesData = [
    // SCANS
    {
      slug: 'pet-ct-scan',
      title: 'PET / CT Scans',
      category: 'SCANS',
      shortDesc: 'Ultra high-definition molecular oncology imaging for early cancer detection, precise staging, and treatment response evaluation.',
      fullDesc: 'Positron Emission Tomography combined with Computed Tomography (PET/CT) is the benchmark standard in modern oncological diagnostics. Swasti features advanced high-sensitivity crystal detectors that allow reduced radiotracer dosage and shortened scan durations while yielding exceptional lesion clarity.',
      icon: 'Activity',
      badge: 'Gold Standard Oncology',
      machineDetails: 'Dedicated Whole-Body High-Resolution PET/CT System',
      prepTips: 'Strict 6 hours fasting prior to scan. Normal plain water is encouraged. Blood glucose check performed upon arrival.',
      featured: true,
      order: 1,
    },
    {
      slug: 'ct-scans',
      title: '32-Slice CT Scans',
      category: 'SCANS',
      shortDesc: 'Comprehensive full-body, contrast-enhanced diagnostic CT scans, HRCT chest, brain, and musculoskeletal imaging.',
      fullDesc: 'Our 32-slice CT scanner delivers rapid volume acquisition with ultra-thin slices for superior anatomical detailing, vascular contrast studies, abdominal evaluations, and low-dose lung protocols.',
      icon: 'Crosshair',
      badge: 'Low-Dose Radiation Protocol',
      machineDetails: '32-Slice Ultra-Fast Helical CT Scanner',
      prepTips: '4 hours fasting required for contrast-enhanced scans. Recent Serum Creatinine test report required for IV contrast.',
      featured: true,
      order: 2,
    },
    {
      slug: 'gamma-camera-scans',
      title: 'Gamma Camera Scans (Scintigraphy)',
      category: 'SCANS',
      shortDesc: 'Specialized functional radionuclide scintigraphy for renal, bone, thyroid, and cardiac physiological assessments.',
      fullDesc: 'Functional nuclear scans including Bone Scans (metastasis screening), Renal DTPA/EC scans (kidney filtration and drainage dynamics), and Thyroid Scintigraphy (functioning vs. non-functioning nodules).',
      icon: 'Radio',
      badge: 'Functional Nuclear Imaging',
      machineDetails: 'Dual-Head High Resolution Gamma Camera',
      prepTips: 'Hydration advised for bone and renal scans. Discontinue thyroid suppressive medications prior to thyroid scans as advised by doctor.',
      featured: true,
      order: 3,
    },
    {
      slug: 'ultrasound',
      title: 'Ultrasound (USG)',
      category: 'SCANS',
      shortDesc: 'High-definition diagnostic sonography, abdominal, pelvic, obstetric, small-parts, and high-frequency soft tissue imaging.',
      fullDesc: 'Our modern color Doppler ultrasound systems provide radiation-free, safe, and real-time visualization of abdominal organs, thyroid nodules, breast lesions, and musculoskeletal structures.',
      icon: 'Waves',
      badge: 'Color Doppler',
      machineDetails: 'High-End Digital Color Doppler Ultrasound Suite with Multi-Frequency Probes',
      prepTips: 'Full urinary bladder required for lower abdomen and pelvic scans. Overnight fasting for hepatobiliary/gallbladder scans.',
      featured: true,
      order: 4,
    },
    {
      slug: 'echo',
      title: '2D ECHO (Echocardiography)',
      category: 'SCANS',
      shortDesc: 'State-of-the-art 2D and Color Doppler Echocardiogram for comprehensive cardiac muscle, chamber, and valve evaluation.',
      fullDesc: 'Echocardiography evaluates heart wall motion, ejection fraction (EF), valve competence, and pericardial structures. Vital for pre-chemotherapy cardiac baseline safety evaluations and general cardiology checkups.',
      icon: 'HeartPulse',
      badge: 'Cardiology',
      machineDetails: 'Dedicated Cardiology Ultrasound Platform with Tissue Doppler Imaging',
      prepTips: 'No fasting required. Wear comfortable two-piece clothing. Bring prior cardiac reports and ECG tracings.',
      featured: true,
      order: 5,
    },

    // CLINICS
    {
      slug: 'general-medicine-clinic',
      title: 'General Medicine Clinic',
      category: 'CLINICS',
      shortDesc: 'Comprehensive adult outpatient consultations for lifestyle diseases, diabetes, hypertension, infections, and preventative health.',
      fullDesc: 'Senior physicians provide thorough clinical assessments, diagnostic workup coordination, chronic illness monitoring, and preventative health guidance tailored to each patient.',
      icon: 'Stethoscope',
      badge: 'OPD Consult',
      machineDetails: 'Consultation Suites & Vitals Monitoring Stations',
      prepTips: 'Please bring your previous medical prescriptions and routine health records.',
      featured: true,
      order: 6,
    },
    {
      slug: 'gastroenterology-clinic',
      title: 'Gastroenterology Clinic',
      category: 'CLINICS',
      shortDesc: 'Specialized clinic for digestive, liver, biliary, and pancreatic health, heartburn, IBS, and GI oncological screening.',
      fullDesc: 'Expert gastroenterologists diagnose and formulate medical treatment plans for acid peptic disease, fatty liver, viral hepatitis, inflammatory bowel disease, and GI malignancies.',
      icon: 'FileHeart',
      badge: 'GI Specialty',
      machineDetails: 'Diagnostic Ultrasound and Liver Profile Correlation',
      prepTips: 'Bring current endoscopy, ultrasound, and liver enzyme test reports if available.',
      featured: true,
      order: 7,
    },
    {
      slug: 'thyroid-clinic',
      title: 'Specialized Thyroid Clinic',
      category: 'CLINICS',
      shortDesc: 'Integrated multi-disciplinary care for thyroid nodules, goiter, hypo/hyperthyroidism, and thyroid cancer management.',
      fullDesc: 'Combining high-resolution ultrasound, fine-needle aspiration (FNAC) biopsy, thyroid scintigraphy, and blood hormonal assays under one roof for one-stop thyroid evaluations.',
      icon: 'ShieldCheck',
      badge: 'Endocrine Care',
      machineDetails: 'Co-located with Gamma Camera, USG, and Hormone Laboratory',
      prepTips: 'Recent TSH, FT3, FT4 lab values recommended.',
      featured: true,
      order: 8,
    },

    // LAB
    {
      slug: 'blood-tests-pathology',
      title: 'Clinical Pathology & Blood Tests',
      category: 'LAB',
      shortDesc: 'Fully automated biochemistry, hematology, immunology, and specialized cancer tumor marker assays with rapid turnaround.',
      fullDesc: 'Equipped with cutting-edge auto-analyzers for complete blood counts, renal function, liver enzymes, HbA1c, thyroid profiles, PSA, CEA, CA-125, and high-sensitivity ferritin.',
      icon: 'FlaskConical',
      badge: 'NABL Accredited',
      machineDetails: 'Automated 5-Part Hematology and Dry Chemistry Clinical Analyzers',
      prepTips: '10 to 12 hours overnight fasting recommended for lipid profiles and fasting blood glucose.',
      featured: true,
      order: 9,
    },
    {
      slug: 'ecg-diagnostics',
      title: '12-Lead ECG Diagnostics',
      category: 'LAB',
      shortDesc: 'Digital high-fidelity 12-lead Electrocardiography for immediate cardiac rhythm and ischemic change detection.',
      fullDesc: 'Rapid, painless diagnostic heart rhythm analysis conducted by experienced technicians and reviewed by clinical specialists.',
      icon: 'ActivitySquare',
      badge: '12-Lead Diagnostic',
      machineDetails: 'Digital 12-Channel Microprocessor ECG Recorder',
      prepTips: 'No special fasting needed. Avoid heavy physical exercise right before the test.',
      featured: true,
      order: 10,
    },

    // THERAPY
    {
      slug: '131-i-radioiodine-therapy',
      title: '131-I (Radioiodine Therapy)',
      category: 'THERAPY',
      shortDesc: 'Targeted radionuclide ablation for thyrotoxicosis/hyperthyroidism (low dose) and postoperative thyroid cancer (high dose).',
      fullDesc: 'Radioactive Iodine (I-131) emits beta radiation that specifically targets and destroys overactive or cancerous thyroid cells with minimal radiation impact on the rest of the body. Administered in our AERB-licensed theranostics isolation suites.',
      icon: 'Flame',
      badge: 'Radioiodine',
      machineDetails: 'AERB Approved Radionuclide Therapy Isolation Unit with Lead Shielding',
      prepTips: 'Low-iodine diet for 1 to 2 weeks prior. Thyroid hormone replacement medications paused as directed by nuclear medicine physician.',
      featured: true,
      order: 11,
    },
    {
      slug: '177-lu-targeted-therapy',
      title: '177-Lu Based Therapy (PRRT & PSMA)',
      category: 'THERAPY',
      shortDesc: 'Precision Theranostics using Lutetium-177: PRRT for Neuroendocrine Tumors (NETs) and PSMA for metastatic Prostate Cancer.',
      fullDesc: 'Lutetium-177 is linked to specialized carrier molecules that seek out specific receptor sites on cancer cells, delivering localized beta radiation directly into metastatic lesions while sparing healthy tissue.',
      icon: 'Atom',
      badge: 'PRRT / PSMA',
      machineDetails: 'Theranostics Infusion Suite with Real-Time Dosimetry & Gamma Post-Scan',
      prepTips: 'Comprehensive baseline PET/CT scan, renal scintigraphy, and complete blood counts are verified before therapy.',
      featured: true,
      order: 12,
    },
    {
      slug: '225-ac-alpha-therapy',
      title: '225-Ac Based Targeted Alpha Therapy (TAT)',
      category: 'THERAPY',
      shortDesc: 'Next-generation Targeted Alpha Therapy (TAT) delivering high-energy alpha particles to eradicate resistant metastatic tumors.',
      fullDesc: 'Actinium-225 emits short-range, ultra-high linear energy transfer (LET) alpha radiation that produces lethal double-strand DNA breaks in targeted cancer cells, offering breakthrough outcomes even when conventional treatments or beta therapies have failed.',
      icon: 'Zap',
      badge: 'Targeted Alpha',
      machineDetails: 'Ultra-Specialized High-Grade Alpha Radiopharmaceutical Protocols',
      prepTips: 'Requires multi-disciplinary tumor board evaluation and specific theranostic eligibility imaging.',
      featured: true,
      order: 13,
    },
  ];

  for (const s of servicesData) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }

  // 4. Doctors Catalog
  const doctorsData = [
    {
      name: 'Dr. Suresh Kumar, MD, DRM',
      qualification: 'MBBS, MD (Nuclear Medicine), DRM (BARC)',
      department: 'Nuclear Medicine & PET/CT',
      designation: 'Senior Consultant & Clinical Director',
      experience: '18+ Years Experience in Molecular Imaging & Theranostics',
      consultationHours: 'Monday to Saturday: 9:00 AM - 3:00 PM',
      photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&auto=format&fit=crop&q=80',
      bio: 'Pioneer in clinical nuclear medicine in South India. Specialized in high-dose radioiodine therapy, Lu-177 PRRT/PSMA theranostics, and PET/CT oncological interpretation.',
      order: 1,
    },
    {
      name: 'Dr. Ananya Nair, MD, DM',
      qualification: 'MBBS, MD (Radiodiagnosis), FRCR (UK)',
      department: 'Diagnostic Radiology & Ultrasound',
      designation: 'Lead Radiologist & Sonologist',
      experience: '12+ Years Experience in Cross-Sectional Imaging',
      consultationHours: 'Monday to Saturday: 10:00 AM - 5:00 PM',
      photo: 'https://images.unsplash.com/photo-1594824813576-9c43d83383ab?w=600&auto=format&fit=crop&q=80',
      bio: 'Expert in high-resolution CT reporting, advanced abdominal ultrasound, and soft-tissue sonography with extensive academic research in oncologic staging.',
      order: 2,
    },
    {
      name: 'Dr. Rajesh Pillai, MD, DM',
      qualification: 'MBBS, MD (General Medicine), DM (Cardiology)',
      department: 'Cardiology & ECHO Clinic',
      designation: 'Consultant Cardiologist',
      experience: '15+ Years Experience',
      consultationHours: 'Tuesday, Thursday, Saturday: 2:00 PM - 6:00 PM',
      photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&auto=format&fit=crop&q=80',
      bio: 'Specialist in 2D Echocardiography, cardiac hemodynamics, pre-chemo cardiotoxicity screening, and coronary risk assessment.',
      order: 3,
    },
    {
      name: 'Dr. Meera Menon, MD',
      qualification: 'MBBS, MD (General Medicine), DNB',
      department: 'General Medicine & Gastroenterology',
      designation: 'Senior Consultant Physician',
      experience: '14+ Years Clinical Practice',
      consultationHours: 'Monday to Friday: 8:30 AM - 1:30 PM',
      photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&auto=format&fit=crop&q=80',
      bio: 'Dedicated internal medicine practitioner focusing on adult health, gastrointestinal disorders, metabolic syndrome, and routine medical checkups.',
      order: 4,
    },
  ];

  for (const d of doctorsData) {
    const existing = await prisma.doctor.findFirst({ where: { name: d.name } });
    if (existing) {
      await prisma.doctor.update({ where: { id: existing.id }, data: d });
    } else {
      await prisma.doctor.create({ data: d });
    }
  }

  // 5. Lab Tests
  const labTests = [
    { code: 'CBC-01', name: 'Complete Blood Count (CBC) with ESR', category: 'BLOOD_TEST', sampleType: 'Whole Blood (EDTA)', fastingRequired: false, reportTime: '2 Hours', price: 350 },
    { code: 'RFT-02', name: 'Renal Function Test (Creatinine, Urea, Electrolytes)', category: 'BLOOD_TEST', sampleType: 'Serum', fastingRequired: false, reportTime: '3 Hours', price: 650 },
    { code: 'LFT-03', name: 'Liver Function Test (Bilirubin, SGOT, SGPT, Alk Phos)', category: 'BLOOD_TEST', sampleType: 'Serum', fastingRequired: true, reportTime: '3 Hours', price: 750 },
    { code: 'THY-04', name: 'Comprehensive Thyroid Panel (FT3, FT4, TSH, Anti-TPO)', category: 'BLOOD_TEST', sampleType: 'Serum', fastingRequired: true, reportTime: '4 Hours', price: 950 },
    { code: 'ONC-05', name: 'Serum PSA (Prostate Specific Antigen)', category: 'ONCO_MARKER', sampleType: 'Serum', fastingRequired: false, reportTime: '4 Hours', price: 800 },
    { code: 'ECG-01', name: '12-Lead Standard Diagnostic ECG', category: 'ECG', sampleType: 'Non-Invasive Tracing', fastingRequired: false, reportTime: 'Immediate (15 mins)', price: 250 },
  ];

  for (const lt of labTests) {
    await prisma.labTest.upsert({
      where: { code: lt.code },
      update: lt,
      create: lt,
    });
  }

  // 6. Articles & Events
  const articlesData = [
    {
      type: 'EVENT',
      slug: 'annual-nuclear-medicine-symposium-2026',
      title: 'South Kerala Nuclear Medicine & Theranostics Symposium',
      excerpt: 'Swasti PET/CT hosts regional CME on advanced 177-Lu and 225-Ac targeted therapies for oncologists and physicians.',
      content: 'Swasti PET/CT Imaging and Nuclear Medicine, in association with Nucleuz Healthcare, is pleased to invite practicing oncologists, surgeons, and physicians to an interactive clinical CME discussing emerging paradigms in targeted radioligand cancer therapy.',
      coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
      eventDate: new Date('2026-11-28T09:30:00Z'),
      location: 'Auditorium, Medical College Junction, Ulloor, Thiruvananthapuram',
      published: true,
    },
    {
      type: 'EVENT',
      slug: 'free-thyroid-ultrasound-health-camp',
      title: 'Community Thyroid & Ultrasound Screening Camp',
      excerpt: 'Free clinical evaluation of thyroid nodules and discounted blood TSH profile for local residents.',
      content: 'Early detection of thyroid abnormalities leads to prompt cure. As part of Swasti community outreach, our thyroid specialists and sonologists are offering free consultation and subsidized ultrasound scans.',
      coverImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80',
      eventDate: new Date('2026-12-05T08:30:00Z'),
      location: 'Swasti Clinic Wing, Ulloor, Trivandrum',
      published: true,
    },
    {
      type: 'BLOG',
      slug: 'what-to-expect-during-pet-ct-scan',
      title: 'Preparing for Your PET/CT Scan: Complete Patient Guide',
      excerpt: 'Essential fasting guidelines, blood glucose requirements, and scan timeline explained step-by-step.',
      content: 'Getting a PET/CT scan can feel daunting if it is your first time. This article walks you through everything from arriving at the center, the painless radiotracer injection, the resting period, and the 20-minute scan acquisition.',
      coverImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80',
      published: true,
    },
    {
      type: 'BLOG',
      slug: 'understanding-lutetium-177-psma-therapy',
      title: 'Understanding 177-Lu PSMA Therapy in Advanced Prostate Cancer',
      excerpt: 'How targeted beta-radiation treats metastatic prostate cancer cells while protecting healthy surrounding tissue.',
      content: 'Theranostics represents a revolution in oncology: see what you treat and treat what you see. Learn how Lutetium-177 PSMA is bringing new hope to patients whose cancer has progressed beyond standard treatments.',
      coverImage: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&auto=format&fit=crop&q=80',
      published: true,
    },
  ];

  for (const a of articlesData) {
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: a,
      create: a,
    });
  }

  console.log('Database seeded successfully with all categories & services!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
