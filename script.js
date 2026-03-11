/* ================================================================
   ঈদ ফ্যামিলি ইন্টারঅ্যাকশন গেম — script.js
   ================================================================
   HOW TO ADD A NEW MEMBER:
   নতুন সদস্য যোগ করতে FAMILY_DATA array-এ একটি নতুন object add করুন।
   প্রতিটি field-এর বিবরণ নিচে দেওয়া আছে।

   HOW TO CHANGE AVATAR IMAGE:
   avatar.img ফিল্ডে image path দিন, যেমন: 'images/mostak.jpg'
   যদি img না থাকে, initials দিয়ে avatar তৈরি হবে।

   WHERE TO EDIT MAHRAM RULES:
   MAHRAM_RULES object দেখুন — সেখানে relation-type-based rules রয়েছে।

   WHERE TO EDIT AGE RANK:
   প্রতিটি member-এর ageRank ফিল্ড দেখুন। কম মানে বয়সে বড়।

   RELATION ENGINE:
   getRelation(id1, id2) ফাংশন দেখুন — এটি dynamically relation বের করে।
   ================================================================ */

'use strict';

/* ================================================================
   ১. FAMILY DATA MODEL
   পরিবারের সকল সদস্যের তথ্য
   ================================================================ */
const FAMILY_DATA = [
  // ─── Generation 0 (grandparent level) ───────────────────────
  {
    id: 'rouf',
    name: 'Rouf',
    nameBn: 'রওফ',
    gender: 'male',
    spouseIds: ['anjuman'],
    parentIds: [],
    childrenIds: ['mostak', 'feroza', 'sharmin', 'jannat'],
    generation: 0,
    ageRank: 1,         // ১ = সবচেয়ে বড়
    avatar: { img: '', initials: 'র', color: '#c77dff' }
  },
  {
    id: 'anjuman',
    name: 'Anjuman',
    nameBn: 'আঞ্জুমান',
    gender: 'female',
    spouseIds: ['rouf'],
    parentIds: [],
    childrenIds: ['mostak', 'feroza', 'sharmin', 'jannat'],
    generation: 0,
    ageRank: 2,
    avatar: { img: '', initials: 'আ', color: '#ff6eb4' }
  },

  // ─── Generation 1 (Mostak + sisters + in-laws) ──────────────
  {
    id: 'mostak',
    name: 'Mostak',
    nameBn: 'মোস্তাক',
    gender: 'male',
    spouseIds: ['shetu'],
    parentIds: ['rouf', 'anjuman'],
    childrenIds: [],
    generation: 1,
    ageRank: 3,
    avatar: { img: '', initials: 'ম', color: '#4dc9f6' }
  },
  {
    id: 'shetu',
    name: 'Shetu',
    nameBn: 'শেতু',
    gender: 'female',
    spouseIds: ['mostak'],
    parentIds: [],
    childrenIds: [],
    generation: 1,
    ageRank: 4,
    avatar: { img: '', initials: 'শে', color: '#ff6eb4' }
  },
  {
    id: 'feroza',
    name: 'Feroza',
    nameBn: 'ফেরোজা',
    gender: 'female',
    spouseIds: ['anis'],
    parentIds: ['rouf', 'anjuman'],
    childrenIds: ['sumaiya', 'tasfia', 'suaiba', 'mohammad'],
    generation: 1,
    ageRank: 5,
    avatar: { img: '', initials: 'ফে', color: '#f5c842' }
  },
  {
    id: 'anis',
    name: 'Anis',
    nameBn: 'আনিস',
    gender: 'male',
    spouseIds: ['feroza'],
    parentIds: [],
    childrenIds: ['sumaiya', 'tasfia', 'suaiba', 'mohammad'],
    generation: 1,
    ageRank: 6,
    avatar: { img: '', initials: 'আন', color: '#00c896' }
  },
  {
    id: 'sharmin',
    name: 'Sharmin',
    nameBn: 'শারমিন',
    gender: 'female',
    spouseIds: ['aziz'],
    parentIds: ['rouf', 'anjuman'],
    childrenIds: ['abdullah'],
    generation: 1,
    ageRank: 7,
    avatar: { img: '', initials: 'শা', color: '#ff7c43' }
  },
  {
    id: 'aziz',
    name: 'Aziz',
    nameBn: 'আজিজ',
    gender: 'male',
    spouseIds: ['sharmin'],
    parentIds: [],
    childrenIds: ['abdullah'],
    generation: 1,
    ageRank: 8,
    avatar: { img: '', initials: 'আজ', color: '#43b8ff' }
  },
  {
    id: 'jannat',
    name: 'Jannat',
    nameBn: 'জান্নাত',
    gender: 'female',
    spouseIds: ['iftekhar'],
    parentIds: ['rouf', 'anjuman'],
    childrenIds: [],
    generation: 1,
    ageRank: 9,
    avatar: { img: '', initials: 'জা', color: '#ef476f' }
  },
  {
    id: 'iftekhar',
    name: 'Iftekhar',
    nameBn: 'ইফতেখার',
    gender: 'male',
    spouseIds: ['jannat'],
    parentIds: [],
    childrenIds: [],
    generation: 1,
    ageRank: 10,
    avatar: { img: '', initials: 'ই', color: '#06d6a0' }
  },

  // ─── Generation 2 (Children) ─────────────────────────────────
  {
    id: 'sumaiya',
    name: 'Sumaiya',
    nameBn: 'সুমাইয়া',
    gender: 'female',
    spouseIds: [],
    parentIds: ['anis', 'feroza'],
    childrenIds: [],
    generation: 2,
    ageRank: 11,
    avatar: { img: '', initials: 'সু', color: '#ffd166' }
  },
  {
    id: 'tasfia',
    name: 'Tasfia',
    nameBn: 'তাসফিয়া',
    gender: 'female',
    spouseIds: [],
    parentIds: ['anis', 'feroza'],
    childrenIds: [],
    generation: 2,
    ageRank: 12,
    avatar: { img: '', initials: 'তা', color: '#f48c06' }
  },
  {
    id: 'suaiba',
    name: 'Suaiba',
    nameBn: 'সুআইবা',
    gender: 'female',
    spouseIds: [],
    parentIds: ['anis', 'feroza'],
    childrenIds: [],
    generation: 2,
    ageRank: 13,
    avatar: { img: '', initials: 'সুআ', color: '#cc5de8' }
  },
  {
    id: 'mohammad',
    name: 'Mohammad',
    nameBn: 'মোহাম্মদ',
    gender: 'male',
    spouseIds: [],
    parentIds: ['anis', 'feroza'],
    childrenIds: [],
    generation: 2,
    ageRank: 14,
    avatar: { img: '', initials: 'মো', color: '#1971c2' }
  },
  {
    id: 'abdullah',
    name: 'Abdullah',
    nameBn: 'আব্দুল্লাহ',
    gender: 'male',
    spouseIds: [],
    parentIds: ['aziz', 'sharmin'],
    childrenIds: [],
    generation: 2,
    ageRank: 15,
    avatar: { img: '', initials: 'আব', color: '#2f9e44' }
  },
];

/* Build ID→member lookup map */
const memberMap = {};
FAMILY_DATA.forEach(m => { memberMap[m.id] = m; });

/* ================================================================
   ২. MAHRAM RULES (CONFIGURABLE)
   ইসলামিক মাহরাম নিয়ম — এখানে edit করুন
   ================================================================
   relationType:  the computed relation TYPE key
   mahram: true/false
   note: optional explanation
   ================================================================ */
const MAHRAM_RULES = {
  // Spouse
  'spouse':               { mahram: true,  note: 'স্বামী/স্ত্রী — মাহরাম' },
  // Parents
  'father':               { mahram: true,  note: 'বাবা — মাহরাম' },
  'mother':               { mahram: true,  note: 'মা — মাহরাম' },
  // Children
  'son':                  { mahram: true,  note: 'ছেলে — মাহরাম' },
  'daughter':             { mahram: true,  note: 'মেয়ে — মাহরাম' },
  // Siblings
  'brother':              { mahram: true,  note: 'ভাই — মাহরাম' },
  'sister':               { mahram: true,  note: 'বোন — মাহরাম' },
  // Siblings' children (niece/nephew)
  'nephew':               { mahram: true,  note: 'ভাতিজা/ভাগ্নে — মাহরাম' },
  'niece':                { mahram: true,  note: 'ভাতিজি/ভাগ্নি — মাহরাম' },
  // In-laws (first degree)
  'father-in-law':        { mahram: true,  note: 'শ্বশুর — মাহরাম' },
  'mother-in-law':        { mahram: true,  note: 'শাশুড়ি — মাহরাম' },
  'son-in-law':           { mahram: true,  note: 'জামাই — মাহরাম' },
  'daughter-in-law':      { mahram: true,  note: 'বউমা — মাহরাম' },
  // Sibling's spouse — ghair mahram
  'brother-in-law-dever': { mahram: false, note: 'দেবর — গায়রে মাহরাম (বিপদজনক সম্পর্ক)' },
  'sister-in-law-nanod':  { mahram: false, note: 'ননদ — গায়রে মাহরাম' },
  'brother-in-law-dulabhai': { mahram: false, note: 'দুলাভাই/ভগ্নিপতি — গায়রে মাহরাম' },
  'sister-in-law-bhabi':  { mahram: false, note: 'ভাবি — গায়রে মাহরাম' },
  // Uncles / Aunts
  'paternal-uncle':       { mahram: true,  note: 'চাচা — মাহরাম' },
  'paternal-aunt':        { mahram: false, note: 'চাচি — গায়রে মাহরাম' },
  'maternal-uncle':       { mahram: true,  note: 'মামা — মাহরাম' },
  'maternal-aunt':        { mahram: false, note: 'খালু — গায়রে মাহরাম' },
  'uncle':                { mahram: true,  note: 'চাচা/মামা — মাহরাম' },
  'aunt':                 { mahram: false, note: 'খালা/চাচি — গায়রে মাহরাম' },
  // Grandparents
  'grandfather':          { mahram: true,  note: 'দাদা/নানা — মাহরাম' },
  'grandmother':          { mahram: true,  note: 'দাদি/নানি — মাহরাম' },
  'grandson':             { mahram: true,  note: 'নাতি — মাহরাম' },
  'granddaughter':        { mahram: true,  note: 'নাতনি — মাহরাম' },
  // Same person fallback
  'self':                 { mahram: null,  note: 'নিজে নিজে!' },
  // Unknown
  'unknown':              { mahram: false, note: 'অজানা সম্পর্ক — সতর্ক থাকুন' },
};

/* ================================================================
   ৩. RELATION ENGINE
   যেকোনো দুইজনের মধ্যে সম্পর্ক বের করে
   ================================================================ */

/**
 * getRelation(id1, id2)
 * Returns: { type, labelBn, mahram, mahramNote }
 * type = internal key for MAHRAM_RULES lookup
 */
function getRelation(id1, id2) {
  if (id1 === id2) return resolveResult('self', 'নিজে');

  const p1 = memberMap[id1];
  const p2 = memberMap[id2];
  if (!p1 || !p2) return resolveResult('unknown', 'অজানা');

  // ── Spouse ──────────────────────────────────────────────────
  if (p1.spouseIds.includes(id2)) {
    return resolveResult('spouse', p1.gender === 'male' ? 'স্ত্রী' : 'স্বামী');
  }

  // ── Parent ──────────────────────────────────────────────────
  if (p1.parentIds.includes(id2)) {
    if (p2.gender === 'male') return resolveResult('father', 'বাবা');
    return resolveResult('mother', 'মা');
  }

  // ── Child ───────────────────────────────────────────────────
  if (p1.childrenIds.includes(id2)) {
    if (p2.gender === 'male') return resolveResult('son', 'ছেলে');
    return resolveResult('daughter', 'মেয়ে');
  }

  // ── Sibling (same parents) ───────────────────────────────────
  const sharedParents = p1.parentIds.filter(pid => p2.parentIds.includes(pid));
  if (sharedParents.length > 0) {
    if (p2.gender === 'male') return resolveResult('brother', 'ভাই');
    return resolveResult('sister', 'বোন');
  }

  // ── Sibling's child = Nephew / Niece ─────────────────────────
  // p2 is child of p1's sibling
  const p1Siblings = getSiblings(id1);
  for (const sibId of p1Siblings) {
    const sib = memberMap[sibId];
    if (sib && sib.childrenIds.includes(id2)) {
      // is the sibling paternal (same parents as p1) or maternal?
      if (p2.gender === 'male')  return resolveResult('nephew', p1Siblings.map(s=>memberMap[s]).some(s=>s.parentIds.some(p=>p1.parentIds.includes(p))) ? 'ভাতিজা/ভাগ্নে' : 'ভাতিজা/ভাগ্নে');
      return resolveResult('niece', 'ভাতিজি/ভাগ্নি');
    }
  }

  // ── p1 is child of p2's sibling → Uncle/Aunt ────────────────
  const p2Siblings = getSiblings(id2);
  for (const sibId of p2Siblings) {
    const sib = memberMap[sibId];
    if (sib && sib.childrenIds.includes(id1)) {
      if (p2.gender === 'male')   return resolveResult('uncle', 'চাচা/মামা');
      return resolveResult('aunt', 'খালা/চাচি');
    }
  }

  // ── Grandparent (p2 is parent of p1's parent) ────────────────
  for (const parentId of p1.parentIds) {
    const parent = memberMap[parentId];
    if (parent && parent.parentIds.includes(id2)) {
      if (p2.gender === 'male') return resolveResult('grandfather', 'নানা/দাদা');
      return resolveResult('grandmother', 'নানি/দাদি');
    }
  }

  // ── Grandchild (p1 is parent of p2's parent) ─────────────────
  for (const parentId of p2.parentIds) {
    const parent = memberMap[parentId];
    if (parent && parent.parentIds.includes(id1)) {
      if (p2.gender === 'male') return resolveResult('grandson',    'নাতি');
      return resolveResult('granddaughter', 'নাতনি');
    }
  }

  // ── Spouse of sibling (Dever / Nanod / Dulabhai / Bhabi) ─────
  for (const sibId of p1Siblings) {
    const sib = memberMap[sibId];
    if (sib && sib.spouseIds.includes(id2)) {
      // p2 = sibling's spouse
      if (sib.gender === 'male') {
        // p1's brother's wife = ভাবি
        return resolveResult('sister-in-law-bhabi', 'ভাবি');
      } else {
        // p1's sister's husband = দুলাভাই
        return resolveResult('brother-in-law-dulabhai', 'দুলাভাই');
      }
    }
  }

  // ── Sibling of spouse (Dever / Nanod) ────────────────────────
  for (const spouseId of p1.spouseIds) {
    const spouse = memberMap[spouseId];
    if (spouse) {
      const spouseSiblings = getSiblings(spouseId);
      if (spouseSiblings.includes(id2)) {
        // p2 is sibling of p1's spouse
        if (p1.gender === 'female') {
          // p1=wife, p2=husband's brother → দেবর
          if (p2.gender === 'male') return resolveResult('brother-in-law-dever', 'দেবর');
          return resolveResult('sister-in-law-nanod', 'ননদ');
        } else {
          // p1=husband, p2=wife's sibling → শ্যালক/শ্যালিকা
          if (p2.gender === 'male') return resolveResult('brother-in-law-dulabhai', 'শ্যালক');
          return resolveResult('sister-in-law-nanod', 'শ্যালিকা');
        }
      }
      // spouse's parent = in-law
      if (spouse.parentIds.includes(id2)) {
        if (p2.gender === 'male') return resolveResult('father-in-law', 'শ্বশুর');
        return resolveResult('mother-in-law', 'শাশুড়ি');
      }
    }
  }

  // ── Child's spouse = Son-in-law / Daughter-in-law ─────────────
  for (const childId of p1.childrenIds) {
    const child = memberMap[childId];
    if (child && child.spouseIds.includes(id2)) {
      if (p2.gender === 'male') return resolveResult('son-in-law', 'জামাই');
      return resolveResult('daughter-in-law', 'বউমা');
    }
  }

  // ── Spouse's parent's child of same spouse = shala/shali ──────
  // (Covered above sufficiently)

  return resolveResult('unknown', 'আত্মীয়');
}

/** Helper: get all siblings of a member */
function getSiblings(id) {
  const m = memberMap[id];
  if (!m || m.parentIds.length === 0) return [];
  const siblings = new Set();
  m.parentIds.forEach(pid => {
    const p = memberMap[pid];
    if (p) p.childrenIds.forEach(cid => { if (cid !== id) siblings.add(cid); });
  });
  return [...siblings];
}

/** Build result object */
function resolveResult(type, labelBn) {
  const rule = MAHRAM_RULES[type] || MAHRAM_RULES['unknown'];
  return {
    type,
    labelBn,
    mahram: rule.mahram,
    mahramNote: rule.note
  };
}

/* ================================================================
   ৪. AGE / ELDER CHECK
   বয়স তুলনা — ageRank ছোট মানে বয়সে বড়
   ================================================================ */
function isElderThan(id1, id2) {
  const r1 = memberMap[id1]?.ageRank ?? 99;
  const r2 = memberMap[id2]?.ageRank ?? 99;
  return r1 < r2;   // true: id1 বয়সে বড়
}

function ageDiff(id1, id2) {
  const r1 = memberMap[id1]?.ageRank ?? 99;
  const r2 = memberMap[id2]?.ageRank ?? 99;
  if (r1 < r2)  return 'smaller';   // id1 < id2 → id1 বড়
  if (r1 > r2)  return 'larger';    // id1 > id2 → id1 ছোট
  return 'equal';
}

/* ================================================================
   ৫. ACTION VALIDATOR
   প্রতিটি action-এর নিয়ম এখানে
   ================================================================ */
const ActionConfig = {
  greet: {
    labelBn: 'শুভেচ্ছা',
    icon: '🤲',
    points: { success: 5, fail: -3 },
    successEmoji: '🌙✨🌟',
    successMsg: (p1, p2, rel) => `ঈদ মোবারক! ${p1.nameBn} ও ${p2.nameBn} (${rel.labelBn}) পরস্পরকে শুভেচ্ছা জানালেন! 🎉`,
    failMsg: (p1, p2, rel) => `হুহ্! ${p2.nameBn} (${rel.labelBn}) গায়রে মাহরাম। এভাবে মেলামেশা অনুমোদিত নয়! ⚠️`,
    validate(rel) { return { allowed: rel.mahram === true, reason: rel.mahramNote }; }
  },
  salami: {
    labelBn: 'সালামি নেওয়া',
    icon: '💰',
    points: { success: 10, fail: -3 },
    successEmoji: '💰🎁🙏',
    successMsg: (p1, p2, rel) => `সালামি সফল! ${p1.nameBn} তার ${rel.labelBn} ${p2.nameBn}-এর কাছ থেকে সালামি পেলেন! 🎊`,
    failMsg: (p1, p2, rel, reason) => reason,
    validate(rel, id1, id2) {
      if (rel.mahram === false) return { allowed: false, reason: `${memberMap[id2]?.nameBn} গায়রে মাহরাম। সালামি নেওয়া যাবে না!` };
      const diff = ageDiff(id1, id2);
      if (diff === 'smaller' || diff === 'equal') return { allowed: false, reason: `সালামি শুধু বড়দের কাছ থেকে নেওয়া যায়। ${memberMap[id1]?.nameBn} বয়সে বড় বা সমান।` };
      return { allowed: true, reason: '' };
    }
  },
  hug: {
    labelBn: 'কোলাকুলি',
    icon: '🤗',
    points: { success: 8, fail: -3 },
    successEmoji: '🤗❤️💛',
    successMsg: (p1, p2, rel) => `উষ্ণ আলিঙ্গন! ${p1.nameBn} ও ${p2.nameBn} (${rel.labelBn}) কোলাকুলি করলেন! ❤️`,
    failMsg: (p1, p2, rel) => `না! ${p2.nameBn} (${rel.labelBn}) গায়রে মাহরাম। কোলাকুলি অনুমোদিত নয়! 🚫`,
    validate(rel) { return { allowed: rel.mahram === true, reason: rel.mahramNote }; }
  }
};

/* ================================================================
   ৬. GAME STATE
   সকল state এখানে কেন্দ্রীভূত
   ================================================================ */
const GameState = {
  score: 0,
  successCount: 0,
  failCount: 0,
  history: [],
  currentAction: null,
  selectedIds: [],
  bubbles: {},          // id → { x, y, vx, vy, el }
  animRunning: false,
};

/* ================================================================
   ৭. AVATAR BUBBLE FACTORY
   অ্যাভাটার বাবল তৈরি করে canvas-এ রাখে
   ================================================================ */
function createAvatarBubble(member) {
  const wrap = document.createElement('div');
  wrap.classList.add('avatar-bubble');
  wrap.id = `bubble-${member.id}`;
  wrap.setAttribute('data-id', member.id);
  wrap.setAttribute('tabindex', '0');
  wrap.setAttribute('role', 'button');
  wrap.setAttribute('aria-label', member.nameBn);
  wrap.title = member.nameBn;

  // Circle
  const circle = document.createElement('div');
  circle.classList.add('avatar-circle');
  circle.style.background = `linear-gradient(135deg, ${member.avatar.color}cc, ${member.avatar.color}88)`;

  if (member.avatar.img) {
    const img = document.createElement('img');
    img.src = member.avatar.img;
    img.alt = member.nameBn;
    img.onerror = () => { img.remove(); circle.textContent = member.avatar.initials || '?'; };
    circle.appendChild(img);
  } else {
    circle.textContent = member.avatar.initials || member.name[0];
  }

  // Name label
  const nameEl = document.createElement('div');
  nameEl.classList.add('avatar-name');
  nameEl.textContent = member.nameBn;

  wrap.appendChild(circle);
  wrap.appendChild(nameEl);
  return wrap;
}

/* ================================================================
   ৮. ANIMATION CONTROLLER
   avatar bubble-গুলো ভাসানো — requestAnimationFrame ব্যবহার
   Mobile-first: dynamic sizing from CSS variables
   ================================================================ */

/** Read the actual rendered avatar size from CSS variables */
function getAvatarSize() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--avatar-size').trim();
  return parseInt(raw) || 56;  // fallback 56px (mobile default)
}

/** Get canvas safe boundaries based on real DOM measurements */
function getCanvasBounds() {
  const W        = window.innerWidth;
  const H        = window.innerHeight;
  const av       = getAvatarSize();
  const pad      = 18;  // name label extra height + gap
  const bubbleH  = av + pad + 14;  // circle + name label + margin
  const bubbleW  = Math.max(av, 80); // allow for wide name labels

  // topPanel: fixed header
  const topEl  = document.querySelector('.game-header');
  const botEl  = document.querySelector('.action-panel');
  const topH   = topEl  ? topEl.getBoundingClientRect().bottom  : (av + 40);
  const botH   = botEl  ? H - botEl.getBoundingClientRect().top : 110;

  return {
    minX: 6,
    maxX: W - bubbleW - 6,
    minY: topH + 4,
    maxY: H - botH - bubbleH - 4,
    cx  : av / 2,   // horizontal center of circle
    cy  : av / 2,   // vertical center of circle
  };
}

function initBubbles() {
  const canvas = document.getElementById('gameCanvas');
  canvas.innerHTML = '';

  // SVG layer for connection line (inserted first so it's behind bubbles)
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.id = 'connectionSvg';
  svg.setAttribute('aria-hidden', 'true');
  canvas.appendChild(svg);

  const bounds = getCanvasBounds();
  const cols   = Math.max(3, Math.floor(window.innerWidth / 100));

  FAMILY_DATA.forEach((member, i) => {
    const el = createAvatarBubble(member);
    canvas.appendChild(el);

    // Spread bubbles in a loose grid, clamped to bounds
    const col    = i % cols;
    const row    = Math.floor(i / cols);
    const cellW  = (bounds.maxX - bounds.minX) / cols;
    const cellH  = Math.max(80, (bounds.maxY - bounds.minY) / Math.ceil(FAMILY_DATA.length / cols));
    const startX = bounds.minX + col * cellW + Math.random() * (cellW * 0.5);
    const startY = bounds.minY + row * cellH + Math.random() * (cellH * 0.4);
    const clampedX = Math.min(Math.max(startX, bounds.minX), bounds.maxX);
    const clampedY = Math.min(Math.max(startY, bounds.minY), bounds.maxY);

    // Vary speed slightly by device (slower on smaller screens = less chaotic)
    const speedScale = window.innerWidth < 480 ? 0.35 : 0.5;
    const speed = (0.3 + Math.random() * 0.45) * speedScale;
    const angle = Math.random() * 2 * Math.PI;

    el.style.left = `${clampedX}px`;
    el.style.top  = `${clampedY}px`;

    GameState.bubbles[member.id] = {
      x: clampedX, y: clampedY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      el
    };

    // Click (desktop) + Touch (mobile)
    el.addEventListener('click',      () => onBubbleClick(member.id));
    el.addEventListener('touchend', e => {
      e.preventDefault(); // don't fire a ghost click
      onBubbleClick(member.id);
    }, { passive: false });
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') onBubbleClick(member.id);
    });
  });

  if (!GameState.animRunning) {
    GameState.animRunning = true;
    animateLoop();
  }
}

function animateLoop() {
  const bounds = getCanvasBounds();

  Object.values(GameState.bubbles).forEach(b => {
    b.x += b.vx;
    b.y += b.vy;

    if (b.x <= bounds.minX) { b.x = bounds.minX; b.vx =  Math.abs(b.vx); }
    if (b.x >= bounds.maxX) { b.x = bounds.maxX; b.vx = -Math.abs(b.vx); }
    if (b.y <= bounds.minY) { b.y = bounds.minY; b.vy =  Math.abs(b.vy); }
    if (b.y >= bounds.maxY) { b.y = bounds.maxY; b.vy = -Math.abs(b.vy); }

    b.el.style.left = `${b.x}px`;
    b.el.style.top  = `${b.y}px`;
  });

  updateConnectionLine();
  requestAnimationFrame(animateLoop);
}

/** Clamp all bubbles into current bounds (call after resize) */
function clampAllBubbles() {
  const bounds = getCanvasBounds();
  Object.values(GameState.bubbles).forEach(b => {
    b.x = Math.min(Math.max(b.x, bounds.minX), bounds.maxX);
    b.y = Math.min(Math.max(b.y, bounds.minY), bounds.maxY);
    b.el.style.left = `${b.x}px`;
    b.el.style.top  = `${b.y}px`;
  });
}

/** Draw animated dashed line between two selected bubbles */
function updateConnectionLine() {
  const svg = document.getElementById('connectionSvg');
  if (!svg) return;

  const [id1, id2] = GameState.selectedIds;
  if (!id1 || !id2 || !GameState.bubbles[id1] || !GameState.bubbles[id2]) {
    svg.innerHTML = '';
    return;
  }

  const b1 = GameState.bubbles[id1];
  const b2 = GameState.bubbles[id2];
  const half = getAvatarSize() / 2;
  const cx1 = b1.x + half; const cy1 = b1.y + half;
  const cx2 = b2.x + half; const cy2 = b2.y + half;

  svg.innerHTML = `
    <line class="connection-line" x1="${cx1}" y1="${cy1}" x2="${cx2}" y2="${cy2}"
      stroke="#f5c842" stroke-width="2" opacity="0.65"/>
  `;
}

/* ================================================================
   ৯. SELECTION MODAL MANAGER
   ব্যক্তি নির্বাচন প্রবাহ নিয়ন্ত্রণ
   ================================================================ */
let selectionModalInstance = null;

function openSelectionModal(actionKey) {
  GameState.currentAction = actionKey;
  GameState.selectedIds = [];
  clearBubbleStates();

  const modalEl = document.getElementById('selectionModal');
  const ac = ActionConfig[actionKey];
  document.getElementById('selectionModalLabel').textContent = `${ac.icon} ${ac.labelBn} — ব্যক্তি নির্বাচন`;

  setSelectionStep(1);
  populatePersonGrid(null);

  selectionModalInstance = selectionModalInstance || new bootstrap.Modal(modalEl, { backdrop: 'static' });
  selectionModalInstance.show();
}

function setSelectionStep(step) {
  const dot1 = document.getElementById('stepDot1');
  const dot2 = document.getElementById('stepDot2');
  const prompt = document.getElementById('selectionPrompt');

  if (step === 1) {
    dot1.className = 'step-dot active';
    dot2.className = 'step-dot';
    prompt.textContent = '১ম ব্যক্তি নির্বাচন করুন';
  } else {
    dot1.className = 'step-dot done';
    dot2.className = 'step-dot active';
    prompt.textContent = '২য় ব্যক্তি নির্বাচন করুন';
  }

  refreshPreview();
}

function refreshPreview() {
  const [id1, id2] = GameState.selectedIds;
  updatePreviewSlot('previewSlot1', id1 ? memberMap[id1] : null, '১ম ব্যক্তি');
  updatePreviewSlot('previewSlot2', id2 ? memberMap[id2] : null, '২য় ব্যক্তি');
}

function updatePreviewSlot(slotId, member, defaultLabel) {
  const slot = document.getElementById(slotId);
  if (!slot) return;
  if (!member) {
    slot.innerHTML = `<div class="preview-avatar empty-preview">?</div><span class="preview-name">${defaultLabel}</span>`;
    return;
  }
  slot.innerHTML = `
    <div class="preview-avatar" style="background:linear-gradient(135deg,${member.avatar.color}cc,${member.avatar.color}66)">
      ${member.avatar.initials || member.name[0]}
    </div>
    <span class="preview-name">${member.nameBn}</span>
  `;
}

function populatePersonGrid(disabledId) {
  const grid = document.getElementById('personGrid');
  grid.innerHTML = '';
  FAMILY_DATA.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('person-card');
    if (member.id === disabledId) card.classList.add('disabled');
    card.setAttribute('data-id', member.id);
    card.innerHTML = `
      <div class="pc-avatar" style="background:linear-gradient(135deg,${member.avatar.color}cc,${member.avatar.color}66)">
        ${member.avatar.initials || member.name[0]}
      </div>
      <span class="pc-name">${member.nameBn}</span>
    `;
    card.addEventListener('click', () => onPersonCardClick(member.id));
    grid.appendChild(card);
  });
}

function onPersonCardClick(id) {
  const step = GameState.selectedIds.length + 1;
  if (step === 1) {
    GameState.selectedIds = [id];
    highlightBubble(id, 'selected-1');
    setSelectionStep(2);
    populatePersonGrid(id);   // disable 1st person from step 2
  } else {
    if (id === GameState.selectedIds[0]) {
      showToast('একই ব্যক্তি দুইবার নির্বাচন করা যাবে না! 😄', 'warning');
      return;
    }
    GameState.selectedIds.push(id);
    highlightBubble(id, 'selected-2');
    refreshPreview();

    // Close modal and process
    setTimeout(() => {
      selectionModalInstance.hide();
      setTimeout(() => processAction(), 400);
    }, 500);
  }
}

/* Called when user clicks a canvas bubble during active action */
function onBubbleClick(id) {
  if (!GameState.currentAction) return;
  onPersonCardClick(id);
}

/* ================================================================
   ১০. ACTION PROCESSOR
   কার্যক্রম যাচাই ও ফলাফল দেখানো
   ================================================================ */
function processAction() {
  const [id1, id2] = GameState.selectedIds;
  const p1 = memberMap[id1];
  const p2 = memberMap[id2];
  const ac  = ActionConfig[GameState.currentAction];
  const rel = getRelation(id1, id2);

  // Validate
  let validation;
  if (GameState.currentAction === 'salami') {
    validation = ac.validate(rel, id1, id2);
  } else {
    validation = ac.validate(rel);
  }

  if (rel.type === 'self') {
    showToast(`${p1.nameBn} — নিজেই নিজের দিকে তাকালেন! 😂`, 'warning');
    clearSelectionState();
    return;
  }

  const allowed = validation.allowed;
  const pts     = allowed ? ac.points.success : ac.points.fail;
  const msg     = allowed
    ? ac.successMsg(p1, p2, rel)
    : ac.failMsg(p1, p2, rel, validation.reason);

  // Update score
  GameState.score += pts;
  if (allowed) GameState.successCount++; else GameState.failCount++;
  updateScoreDisplay();

  // Avatar effects
  if (allowed) {
    triggerBubbleCelebrate(id1);
    triggerBubbleCelebrate(id2);
    attractBubbles(id1, id2);
    spawnParticles(ac.successEmoji, id1, id2);
  } else {
    triggerBubbleShake(id1);
    triggerBubbleShake(id2);
  }

  // Add to history
  addHistory({
    action: ac.labelBn,
    p1: p1.nameBn,
    p2: p2.nameBn,
    relation: rel.labelBn,
    allowed,
    msg
  });

  // Show result modal
  showResultModal({ p1, p2, rel, ac, allowed, pts, msg, validation });

  clearSelectionState();
}

/* ================================================================
   ১১. RESULT MODAL
   ফলাফল দেখানো
   ================================================================ */
let resultModalInstance = null;

function showResultModal({ p1, p2, rel, ac, allowed, pts, msg, validation }) {
  const header  = document.getElementById('resultModalHeader');
  const body    = document.getElementById('resultModalBody');
  const title   = document.getElementById('resultModalLabel');

  header.className = `modal-header result-modal-header ${allowed ? 'success-header' : 'fail-header'}`;
  title.textContent = `${ac.icon} ${ac.labelBn} — ফলাফল`;

  const mahramText = rel.mahram === true  ? '<span class="mahram-badge mahram">✅ মাহরাম</span>'
                   : rel.mahram === false ? '<span class="mahram-badge non-mahram">🚫 গায়রে মাহরাম</span>'
                   : '<span class="mahram-badge">—</span>';

  const ageStatus = (() => {
    const diff = ageDiff(p1.id, p2.id);
    if (diff === 'smaller') return `${p1.nameBn} বয়সে বড়`;
    if (diff === 'larger')  return `${p1.nameBn} বয়সে ছোট`;
    return 'বয়স সমান';
  })();

  const ptsBadge = pts >= 0
    ? `<span class="score-delta plus">+${pts} পয়েন্ট</span>`
    : `<span class="score-delta minus">${pts} পয়েন্ট</span>`;

  const resultBannerClass = allowed ? 'success' : 'fail';

  body.innerHTML = `
    <div class="result-persons">
      <div class="result-person">
        <div class="result-avatar" style="background:linear-gradient(135deg,${p1.avatar.color}cc,${p1.avatar.color}66)">
          ${p1.avatar.initials || p1.name[0]}
        </div>
        <span class="result-person-name">${p1.nameBn}</span>
      </div>
      <div class="result-arrow">→</div>
      <div class="result-person">
        <div class="result-avatar" style="background:linear-gradient(135deg,${p2.avatar.color}cc,${p2.avatar.color}66)">
          ${p2.avatar.initials || p2.name[0]}
        </div>
        <span class="result-person-name">${p2.nameBn}</span>
      </div>
    </div>

    <div class="result-row">
      <span class="result-row-label">সম্পর্ক</span>
      <span class="result-row-value">${rel.labelBn}</span>
    </div>
    <div class="result-row">
      <span class="result-row-label">মাহরাম?</span>
      <span class="result-row-value">${mahramText}</span>
    </div>
    <div class="result-row">
      <span class="result-row-label">বয়স</span>
      <span class="result-row-value"><span class="age-badge">${ageStatus}</span></span>
    </div>
    <div class="result-row">
      <span class="result-row-label">স্কোর</span>
      <span class="result-row-value">${ptsBadge}</span>
    </div>

    <div class="result-emoji-big">${allowed ? ac.successEmoji : '⚠️'}</div>
    <div class="result-banner ${resultBannerClass}">${msg}</div>
  `;

  const modalEl = document.getElementById('resultModal');
  resultModalInstance = resultModalInstance || new bootstrap.Modal(modalEl);
  resultModalInstance.show();
}

/* ================================================================
   ১২. SCORE + HISTORY UI
   ================================================================ */
function updateScoreDisplay() {
  document.getElementById('totalScore').textContent  = GameState.score;
  document.getElementById('successCount').textContent = GameState.successCount;
  document.getElementById('failCount').textContent   = GameState.failCount;
}

function addHistory(item) {
  GameState.history.unshift(item);
  if (GameState.history.length > 30) GameState.history.pop();
  renderHistory();
}

function renderHistory() {
  const list = document.getElementById('historyList');
  if (GameState.history.length === 0) {
    list.innerHTML = '<li class="history-empty">এখনো কোনো কার্যক্রম নেই।</li>';
    return;
  }
  list.innerHTML = GameState.history.map(item => `
    <li class="history-item ${item.allowed ? 'success' : 'fail'}">
      <span class="h-action">${item.action}</span>
      <span class="h-persons">${item.p1} → ${item.p2}</span>
      <span class="h-result">${item.relation} • ${item.allowed ? '✅ সফল' : '❌ বাতিল'}</span>
    </li>
  `).join('');
}

/* ================================================================
   ১৩. PARTICLE EFFECTS
   উদযাপনের পার্টিকেল
   ================================================================ */
function spawnParticles(emojiStr, id1, id2) {
  const container = document.getElementById('particleContainer');
  const emojis = emojiStr.split('');
  const b = GameState.bubbles[id1] || GameState.bubbles[id2];
  if (!b) return;

  for (let i = 0; i < 14; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.textContent = emojis[i % emojis.length];
    const angle = (Math.PI * 2 / 14) * i;
    const dist  = 80 + Math.random() * 80;
    p.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
    p.style.setProperty('--dy', `${Math.sin(angle) * dist - 60}px`);
    p.style.left = `${b.x + 36}px`;
    p.style.top  = `${b.y + 36}px`;
    p.style.animationDelay = `${Math.random() * 0.3}s`;
    container.appendChild(p);
    setTimeout(() => p.remove(), 2200);
  }
}

/* ================================================================
   ১৪. BUBBLE STATE HELPERS
   ================================================================ */
function clearBubbleStates() {
  document.querySelectorAll('.avatar-bubble').forEach(el => {
    el.classList.remove('selected-1','selected-2','celebrate','shake');
  });
  const svg = document.getElementById('connectionSvg');
  if (svg) svg.innerHTML = '';
}

function clearSelectionState() {
  GameState.currentAction = null;
  GameState.selectedIds   = [];
  setTimeout(clearBubbleStates, 3000);
}

function highlightBubble(id, cls) {
  const el = document.getElementById(`bubble-${id}`);
  if (el) el.classList.add(cls);
}

function triggerBubbleCelebrate(id) {
  const el = document.getElementById(`bubble-${id}`);
  if (!el) return;
  el.classList.remove('shake');
  el.classList.add('celebrate');
  setTimeout(() => el.classList.remove('celebrate'), 800);
}

function triggerBubbleShake(id) {
  const el = document.getElementById(`bubble-${id}`);
  if (!el) return;
  el.classList.remove('celebrate');
  el.classList.add('shake');
  setTimeout(() => el.classList.remove('shake'), 700);
}

/** Temporarily attract two bubbles toward each other for warmth effect */
function attractBubbles(id1, id2) {
  const b1 = GameState.bubbles[id1];
  const b2 = GameState.bubbles[id2];
  if (!b1 || !b2) return;

  const origPos1 = { x: b1.x, y: b1.y };
  const origPos2 = { x: b2.x, y: b2.y };
  const midX = (b1.x + b2.x) / 2;
  const midY = (b1.y + b2.y) / 2;

  // Save velocities
  const ov1 = { x: b1.vx, y: b1.vy };
  const ov2 = { x: b2.vx, y: b2.vy };

  // Pause velocity
  b1.vx = 0; b1.vy = 0;
  b2.vx = 0; b2.vy = 0;

  // Move toward mid point
  let t = 0;
  const attract = setInterval(() => {
    t += 0.08;
    if (t >= 1) { clearInterval(attract); return; }
    b1.x = origPos1.x + (midX - 36 - origPos1.x) * t;
    b1.y = origPos1.y + (midY - 36 - origPos1.y) * t;
    b2.x = origPos2.x + (midX + 36 - origPos2.x) * t;
    b2.y = origPos2.y + (midY + 36 - origPos2.y) * t;
  }, 16);

  // Restore after 1.5s
  setTimeout(() => {
    clearInterval(attract);
    b1.vx = ov1.x; b1.vy = ov1.y;
    b2.vx = ov2.x; b2.vy = ov2.y;
  }, 1500);
}

/* ================================================================
   ১৫. TOAST HELPER
   ================================================================ */
function showToast(msg, type = 'success') {
  const el = document.getElementById('gameToast');
  const body = document.getElementById('toastBody');
  el.className = `toast align-items-center text-white border-0 bg-${type === 'warning' ? 'warning' : type === 'danger' ? 'danger' : 'success'}`;
  body.textContent = msg;
  const t = new bootstrap.Toast(el, { delay: 3000 });
  t.show();
}

/* ================================================================
   ১৬. RESET GAME
   ================================================================ */
function resetGame() {
  GameState.score = 0;
  GameState.successCount = 0;
  GameState.failCount = 0;
  GameState.history = [];
  GameState.currentAction = null;
  GameState.selectedIds = [];
  updateScoreDisplay();
  renderHistory();
  clearBubbleStates();
  // Re-randomize bubble velocities (speed adapted for current screen)
  const speedScale = window.innerWidth < 480 ? 0.35 : 0.5;
  FAMILY_DATA.forEach(member => {
    const b = GameState.bubbles[member.id];
    if (!b) return;
    const speed = (0.3 + Math.random() * 0.45) * speedScale;
    const angle = Math.random() * 2 * Math.PI;
    b.vx = Math.cos(angle) * speed;
    b.vy = Math.sin(angle) * speed;
  });
  showToast('গেম রিসেট করা হয়েছে! নতুন করে শুরু করুন। 🎮', 'success');
}

/* ================================================================
   ১৭. EVENT WIRING
   সকল UI ইভেন্ট সংযুক্ত করা
   ================================================================ */
function wireEvents() {
  // Action buttons
  document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      openSelectionModal(action);
    });
  });

  // History toggle
  const histPanel    = document.getElementById('historyPanel');
  const histBtn      = document.getElementById('historyToggleBtn');
  const closeHistBtn = document.getElementById('closeHistoryBtn');

  histBtn.addEventListener('click',      () => histPanel.classList.toggle('open'));
  closeHistBtn.addEventListener('click', () => histPanel.classList.remove('open'));

  // Close history on outside click (desktop) or backdrop touch (mobile)
  document.addEventListener('click', e => {
    if (!histPanel.contains(e.target) && e.target !== histBtn && !histBtn.contains(e.target)) {
      histPanel.classList.remove('open');
    }
  });

  // Reset button
  document.getElementById('resetBtn').addEventListener('click', resetGame);

  // Close selection modal → clear state
  document.getElementById('selectionModal').addEventListener('hidden.bs.modal', () => {
    if (GameState.selectedIds.length < 2) clearSelectionState();
  });

  // ── Responsive: re-clamp bubbles on resize / orientation change ──
  let resizeTimer;
  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      clampAllBubbles();
    }, 150);
  };
  window.addEventListener('resize',            onResize, { passive: true });
  window.addEventListener('orientationchange', onResize, { passive: true });
}

/* ================================================================
   ১৮. INIT
   গেম শুরু
   ================================================================ */
function init() {
  initBubbles();
  wireEvents();
  updateScoreDisplay();
  renderHistory();
}

document.addEventListener('DOMContentLoaded', init);
