/* ================================================================
   ঈদ ফ্যামিলি গেম — script.js (Game-Vibe Edition)
   Family Pods · Web Audio Sound Engine · Combo System · Animations
   ================================================================ */
'use strict';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ১. FAMILY DATA
   নতুন সদস্য যোগ: এই array-এ object add করুন।
   Avatar image: avatar.img ফিল্ডে path দিন।
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const FAMILY_DATA = [
  { id:'rouf',     name:'Rouf',     nameBn:'রওফ',      gender:'male',   spouseIds:['anjuman'],  parentIds:[],                         childrenIds:['mostak','feroza','sharmin','jannat'], generation:0, ageRank:1,  avatar:{img:'images/rouf.svg',initials:'র',  color:'#a855f7'} },
  { id:'anjuman',  name:'Anjuman',  nameBn:'আঞ্জুমান', gender:'female', spouseIds:['rouf'],     parentIds:[],                         childrenIds:['mostak','feroza','sharmin','jannat'], generation:0, ageRank:2,  avatar:{img:'images/anjuman.svg',initials:'আ',  color:'#c084fc'} },
  { id:'mostak',   name:'Mostak',   nameBn:'মোস্তাক',  gender:'male',   spouseIds:['shetu'],    parentIds:['rouf','anjuman'],          childrenIds:[], generation:1, ageRank:3,  avatar:{img:'images/mostak.svg',initials:'ম',  color:'#06b6d4'} },
  { id:'shetu',    name:'Shetu',    nameBn:'শেতু',     gender:'female', spouseIds:['mostak'],   parentIds:[],                         childrenIds:[], generation:1, ageRank:4,  avatar:{img:'images/shetu.svg',initials:'শে', color:'#38bdf8'} },
  { id:'feroza',   name:'Feroza',   nameBn:'ফেরোজা',   gender:'female', spouseIds:['anis'],     parentIds:['rouf','anjuman'],          childrenIds:['sumaiya','tasfia','suaiba','mohammad'], generation:1, ageRank:5, avatar:{img:'images/feroza.svg',initials:'ফে', color:'#f59e0b'} },
  { id:'anis',     name:'Anis',     nameBn:'আনিস',     gender:'male',   spouseIds:['feroza'],   parentIds:[],                         childrenIds:['sumaiya','tasfia','suaiba','mohammad'], generation:1, ageRank:6, avatar:{img:'images/anis.svg',initials:'আন', color:'#fbbf24'} },
  { id:'sumaiya',  name:'Sumaiya',  nameBn:'সুমাইয়া', gender:'female', spouseIds:[],           parentIds:['anis','feroza'],           childrenIds:[], generation:2, ageRank:11, avatar:{img:'images/sumaiya.svg',initials:'সু', color:'#fcd34d'} },
  { id:'tasfia',   name:'Tasfia',   nameBn:'তাসফিয়া', gender:'female', spouseIds:[],           parentIds:['anis','feroza'],           childrenIds:[], generation:2, ageRank:12, avatar:{img:'images/tasfia.svg',initials:'তা', color:'#f97316'} },
  { id:'suaiba',   name:'Suaiba',   nameBn:'সুআইবা',   gender:'female', spouseIds:[],           parentIds:['anis','feroza'],           childrenIds:[], generation:2, ageRank:13, avatar:{img:'images/suaiba.svg',initials:'সুআ',color:'#fb923c'} },
  { id:'mohammad', name:'Mohammad', nameBn:'মোহাম্মদ', gender:'male',   spouseIds:[],           parentIds:['anis','feroza'],           childrenIds:[], generation:2, ageRank:14, avatar:{img:'images/mohammad.svg',initials:'মো', color:'#ea580c'} },
  { id:'sharmin',  name:'Sharmin',  nameBn:'শারমিন',   gender:'female', spouseIds:['aziz'],     parentIds:['rouf','anjuman'],          childrenIds:['abdullah'], generation:1, ageRank:7,  avatar:{img:'images/sharmin.svg',initials:'শা', color:'#10b981'} },
  { id:'aziz',     name:'Aziz',     nameBn:'আজিজ',     gender:'male',   spouseIds:['sharmin'],  parentIds:[],                         childrenIds:['abdullah'], generation:1, ageRank:8,  avatar:{img:'images/aziz.svg',initials:'আজ', color:'#34d399'} },
  { id:'abdullah', name:'Abdullah', nameBn:'আব্দুল্লাহ',gender:'male',  spouseIds:[],           parentIds:['aziz','sharmin'],          childrenIds:[], generation:2, ageRank:15, avatar:{img:'images/abdullah.svg',initials:'আব', color:'#6ee7b7'} },
  { id:'jannat',   name:'Jannat',   nameBn:'জান্নাত',  gender:'female', spouseIds:['iftekhar'], parentIds:['rouf','anjuman'],          childrenIds:[], generation:1, ageRank:9,  avatar:{img:'images/jannat.svg',initials:'জা', color:'#ec4899'} },
  { id:'iftekhar', name:'Iftekhar', nameBn:'ইফতেখার',  gender:'male',   spouseIds:['jannat'],   parentIds:[],                         childrenIds:[], generation:1, ageRank:10, avatar:{img:'images/iftekhar.svg',initials:'ই',  color:'#f472b6'} },
];
const memberMap = {};
FAMILY_DATA.forEach(m => { memberMap[m.id] = m; });

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ২. FAMILY GROUPS (Pods)
   নতুন group যোগ করতে এই array-এ object add করুন।
   CSS grid-area: game-canvas এর grid-template-areas-এ match করাতে হবে।
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const FAMILY_GROUPS = [
  { id:'parents', emoji:'👴', labelBn:'বাবা-মা',               color:'#a855f7', colorGlow:'rgba(168,85,247,.28)',   members:['rouf','anjuman'],                              floatDur:4.2, floatDel:0   },
  { id:'mostak',  emoji:'🏠', labelBn:'মোস্তাকের পরিবার',       color:'#06b6d4', colorGlow:'rgba(6,182,212,.28)',    members:['mostak','shetu'],                              floatDur:3.8, floatDel:.8  },
  { id:'feroza',  emoji:'🌸', labelBn:'ফেরোজার পরিবার',         color:'#f59e0b', colorGlow:'rgba(245,158,11,.28)',   members:['feroza','anis','sumaiya','tasfia','suaiba','mohammad'], floatDur:5.1, floatDel:1.5 },
  { id:'sharmin', emoji:'🌺', labelBn:'শারমিনের পরিবার',        color:'#10b981', colorGlow:'rgba(16,185,129,.28)',   members:['sharmin','aziz','abdullah'],                   floatDur:4.5, floatDel:.3  },
  { id:'jannat',  emoji:'🌹', labelBn:'জান্নাতের পরিবার',       color:'#ec4899', colorGlow:'rgba(236,72,153,.28)',   members:['jannat','iftekhar'],                           floatDur:3.6, floatDel:2.1 },
];
/* Reverse map: memberId → groupId */
const memberGroupMap = {};
FAMILY_GROUPS.forEach(g => g.members.forEach(id => { memberGroupMap[id] = g.id; }));

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ৩. MAHRAM RULES (Configurable)
   এখানে edit করুন — relation key → {mahram, note}
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const MAHRAM_RULES = {
  'spouse':                   {mahram:true,  note:'স্বামী/স্ত্রী — মাহরাম'},
  'father':                   {mahram:true,  note:'বাবা — মাহরাম'},
  'mother':                   {mahram:true,  note:'মা — মাহরাম'},
  'son':                      {mahram:true,  note:'ছেলে — মাহরাম'},
  'daughter':                 {mahram:true,  note:'মেয়ে — মাহরাম'},
  'brother':                  {mahram:true,  note:'ভাই — মাহরাম'},
  'sister':                   {mahram:true,  note:'বোন — মাহরাম'},
  'nephew':                   {mahram:true,  note:'ভাতিজা/ভাগ্নে — মাহরাম'},
  'niece':                    {mahram:true,  note:'ভাতিজি/ভাগ্নি — মাহরাম'},
  'father-in-law':            {mahram:true,  note:'শ্বশুর — মাহরাম'},
  'mother-in-law':            {mahram:true,  note:'শাশুড়ি — মাহরাম'},
  'son-in-law':               {mahram:true,  note:'জামাই — মাহরাম'},
  'daughter-in-law':          {mahram:true,  note:'বউমা — মাহরাম'},
  'grandfather':              {mahram:true,  note:'দাদা/নানা — মাহরাম'},
  'grandmother':              {mahram:true,  note:'দাদি/নানি — মাহরাম'},
  'grandson':                 {mahram:true,  note:'নাতি — মাহরাম'},
  'granddaughter':            {mahram:true,  note:'নাতনি — মাহরাম'},
  'uncle':                    {mahram:true,  note:'চাচা/মামা — মাহরাম'},
  'aunt':                     {mahram:false, note:'খালা/চাচি — গায়রে মাহরাম'},
  'brother-in-law-dever':     {mahram:false, note:'দেবর — গায়রে মাহরাম'},
  'sister-in-law-nanod':      {mahram:false, note:'ননদ — গায়রে মাহরাম'},
  'brother-in-law-dulabhai':  {mahram:false, note:'দুলাভাই — গায়রে মাহরাম'},
  'sister-in-law-bhabi':      {mahram:false, note:'ভাবি — গায়রে মাহরাম'},
  'self':                     {mahram:null,  note:'নিজে নিজে!'},
  'unknown':                  {mahram:false, note:'অজানা সম্পর্ক'},
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ৪. RELATION ENGINE
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function getRelation(id1, id2) {
  if (id1 === id2) return resolve('self','নিজে');
  const p1 = memberMap[id1], p2 = memberMap[id2];
  if (!p1 || !p2) return resolve('unknown','অজানা');

  if (p1.spouseIds.includes(id2)) return resolve('spouse', p1.gender==='male'?'স্ত্রী':'স্বামী');
  if (p1.parentIds.includes(id2)) return resolve(p2.gender==='male'?'father':'mother', p2.gender==='male'?'বাবা':'মা');
  if (p1.childrenIds.includes(id2)) return resolve(p2.gender==='male'?'son':'daughter', p2.gender==='male'?'ছেলে':'মেয়ে');

  const sharedParents = p1.parentIds.filter(pid => p2.parentIds.includes(pid));
  if (sharedParents.length > 0) return resolve(p2.gender==='male'?'brother':'sister', p2.gender==='male'?'ভাই':'বোন');

  const p1Sibs = getSiblings(id1);
  for (const s of p1Sibs) { if (memberMap[s]?.childrenIds.includes(id2)) return resolve(p2.gender==='male'?'nephew':'niece', p2.gender==='male'?'ভাতিজা/ভাগ্নে':'ভাতিজি/ভাগ্নি'); }

  const p2Sibs = getSiblings(id2);
  for (const s of p2Sibs) { if (memberMap[s]?.childrenIds.includes(id1)) return resolve(p2.gender==='male'?'uncle':'aunt', p2.gender==='male'?'চাচা/মামা':'খালা/চাচি'); }

  for (const pid of p1.parentIds) { if (memberMap[pid]?.parentIds.includes(id2)) return resolve(p2.gender==='male'?'grandfather':'grandmother', p2.gender==='male'?'নানা/দাদা':'নানি/দাদি'); }
  for (const pid of p2.parentIds) { if (memberMap[pid]?.parentIds.includes(id1)) return resolve(p2.gender==='male'?'grandson':'granddaughter', p2.gender==='male'?'নাতি':'নাতনি'); }

  for (const s of p1Sibs) {
    const sib = memberMap[s];
    if (sib?.spouseIds.includes(id2)) return resolve(sib.gender==='male'?'sister-in-law-bhabi':'brother-in-law-dulabhai', sib.gender==='male'?'ভাবি':'দুলাভাই');
  }
  for (const spId of p1.spouseIds) {
    const sp = memberMap[spId];
    if (!sp) continue;
    const spSibs = getSiblings(spId);
    if (spSibs.includes(id2)) {
      if (p1.gender==='female') return resolve(p2.gender==='male'?'brother-in-law-dever':'sister-in-law-nanod', p2.gender==='male'?'দেবর':'ননদ');
      return resolve(p2.gender==='male'?'brother-in-law-dulabhai':'sister-in-law-nanod', p2.gender==='male'?'শ্যালক':'শ্যালিকা');
    }
    if (sp.parentIds.includes(id2)) return resolve(p2.gender==='male'?'father-in-law':'mother-in-law', p2.gender==='male'?'শ্বশুর':'শাশুড়ি');
  }
  for (const cid of p1.childrenIds) { if (memberMap[cid]?.spouseIds.includes(id2)) return resolve(p2.gender==='male'?'son-in-law':'daughter-in-law', p2.gender==='male'?'জামাই':'বউমা'); }
  return resolve('unknown','আত্মীয়');
}

function getSiblings(id) {
  const m = memberMap[id]; if (!m || !m.parentIds.length) return [];
  const sibs = new Set();
  m.parentIds.forEach(pid => memberMap[pid]?.childrenIds.forEach(cid => { if (cid!==id) sibs.add(cid); }));
  return [...sibs];
}

function resolve(type, labelBn) {
  const rule = MAHRAM_RULES[type] || MAHRAM_RULES.unknown;
  return { type, labelBn, mahram: rule.mahram, mahramNote: rule.note };
}

function ageDiff(id1, id2) {
  const r1 = memberMap[id1]?.ageRank??99, r2 = memberMap[id2]?.ageRank??99;
  return r1 < r2 ? 'smaller' : r1 > r2 ? 'larger' : 'equal';
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ৫. ACTION CONFIG
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const ActionConfig = {
  greet: {
    labelBn:'শুভেচ্ছা', icon:'🤲',
    pts:{ ok:5, bad:-3 }, emoji:'🌙✨🌟',
    okMsg :(p1,p2,r)=>`ঈদ মোবারক! ${p1.nameBn} ও ${p2.nameBn} (${r.labelBn}) পরস্পরকে শুভেচ্ছা জানালেন! 🎉`,
    badMsg:(p1,p2,r)=>`⚠️ ${p2.nameBn} (${r.labelBn}) গায়রে মাহরাম। এভাবে মেলামেশা অনুমোদিত নয়!`,
    validate(r){ return { ok: r.mahram===true }; }
  },
  salami: {
    labelBn:'সালামি', icon:'💰',
    pts:{ ok:10, bad:-3 }, emoji:'💰🎁🙏',
    okMsg :(p1,p2,r)=>`সালামি সফল! ${p1.nameBn} তার ${r.labelBn} ${p2.nameBn}-এর কাছ থেকে সালামি পেলেন! 🎊`,
    badMsg:(p1,p2,r,rsn)=>rsn,
    validate(r,id1,id2){
      if(r.mahram===false) return { ok:false, reason:`${memberMap[id2]?.nameBn} গায়রে মাহরাম। সালামি নেওয়া যাবে না!` };
      const d = ageDiff(id1,id2);
      if(d==='smaller'||d==='equal') return { ok:false, reason:`সালামি শুধু বড়দের কাছ থেকে নেওয়া যায়। ${memberMap[id1]?.nameBn} বয়সে বড় বা সমান।` };
      return { ok:true };
    }
  },
  hug: {
    labelBn:'কোলাকুলি', icon:'🤗',
    pts:{ ok:8, bad:-3 }, emoji:'🤗❤️💛',
    okMsg :(p1,p2,r)=>`উষ্ণ আলিঙ্গন! ${p1.nameBn} ও ${p2.nameBn} (${r.labelBn}) কোলাকুলি করলেন! ❤️`,
    badMsg:(p1,p2,r)=>`🚫 ${p2.nameBn} (${r.labelBn}) গায়রে মাহরাম। কোলাকুলি অনুমোদিত নয়!`,
    validate(r){ return { ok: r.mahram===true }; }
  }
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ৬. WEB AUDIO SOUND ENGINE  (code-generated, no imports)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const SFX = (() => {
  let ctx = null;
  const vol = .4;

  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function note(freq, type='sine', dur=.15, amp=vol, delay=0) {
    try {
      const c = getCtx(), now = c.currentTime + delay;
      const osc = c.createOscillator(), g = c.createGain();
      osc.connect(g); g.connect(c.destination);
      osc.type = type; osc.frequency.value = freq;
      g.gain.setValueAtTime(amp, now);
      g.gain.exponentialRampToValueAtTime(.0001, now + dur);
      osc.start(now); osc.stop(now + dur + .02);
    } catch(e) { /* audio might be blocked */ }
  }

  function ramp(f1, f2, type='sine', dur=.18, amp=vol, delay=0) {
    try {
      const c = getCtx(), now = c.currentTime + delay;
      const osc = c.createOscillator(), g = c.createGain();
      osc.connect(g); g.connect(c.destination);
      osc.type = type;
      osc.frequency.setValueAtTime(f1, now);
      osc.frequency.exponentialRampToValueAtTime(f2, now + dur);
      g.gain.setValueAtTime(amp, now);
      g.gain.exponentialRampToValueAtTime(.0001, now + dur);
      osc.start(now); osc.stop(now + dur + .02);
    } catch(e) {}
  }

  return {
    tap()     { ramp(700,350,'sine',.08,.3); },
    select1() { ramp(440,660,'sine',.14,.28); },
    select2() { [523,659,784].forEach((f,i)=>note(f,'sine',.22,.2,i*.05)); },
    success() { [523,659,784,1047].forEach((f,i)=>note(f,'sine',.3,.35,i*.1)); },
    successBig() {
      [523,659,784,1047,880,1047,1318].forEach((f,i)=>note(f,'sine',.28,.38,i*.09));
      ramp(200,100,'sine',.3,.12,.1); // bass thud
    },
    fail()    { ramp(350,90,'sawtooth',.45,.28); },
    score()   { note(880,'square',.07,.18); note(1100,'square',.07,.18,.09); },
    combo(lv) { const b=440*Math.pow(1.12,lv-2); [b,b*1.25,b*1.5].forEach((f,i)=>note(f,'triangle',.18,.28,i*.06)); },
    reset()   { [784,659,523,392].forEach((f,i)=>note(f,'sine',.14,.2,i*.08)); },
    histOpen(){ ramp(300,500,'sine',.1,.18); },
    btnPress(){ ramp(500,350,'sine',.06,.25); },
  };
})();

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ৭. GAME STATE
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const GS = {
  score: 0, successCount: 0, failCount: 0,
  history: [], currentAction: null, selectedIds: [],
  combo: 0, comboTimer: null,
  members: {},  // id → { el (bubble), podId }
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ৮. POD RENDERING
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function createAvatarBubble(member) {
  const wrap = document.createElement('div');
  wrap.className = 'avatar-bubble';
  wrap.id = `bubble-${member.id}`;
  wrap.dataset.id = member.id;
  wrap.setAttribute('tabindex','0');
  wrap.setAttribute('role','button');
  wrap.setAttribute('aria-label', member.nameBn);

  const circle = document.createElement('div');
  circle.className = 'avatar-circle';
  circle.style.background = `linear-gradient(135deg,${member.avatar.color}dd,${member.avatar.color}88)`;
  if (member.avatar.img) {
    const img = document.createElement('img');
    img.src = member.avatar.img; img.alt = member.nameBn;
    img.onerror = () => { img.remove(); circle.textContent = member.avatar.initials || member.name[0]; };
    circle.appendChild(img);
  } else {
    circle.textContent = member.avatar.initials || member.name[0];
  }

  const nameEl = document.createElement('div');
  nameEl.className = 'avatar-name';
  nameEl.textContent = member.nameBn;

  wrap.appendChild(circle);
  wrap.appendChild(nameEl);
  return wrap;
}

function initPods() {
  const canvas = document.getElementById('gameCanvas');
  canvas.innerHTML = '';

  FAMILY_GROUPS.forEach(group => {
    const pod = document.createElement('div');
    pod.className = 'family-pod';
    pod.id = `pod-${group.id}`;
    pod.style.gridArea = group.id;
    pod.style.setProperty('--pc',  group.color);
    pod.style.setProperty('--pcg', group.colorGlow);
    pod.style.setProperty('--fld', `${group.floatDur}s`);
    pod.style.setProperty('--fldl',`${group.floatDel}s`);

    /* Pod header */
    const hdr = document.createElement('div');
    hdr.className = 'pod-header';
    hdr.innerHTML = `<span class="pod-emoji">${group.emoji}</span><span class="pod-label">${group.labelBn}</span>`;
    pod.appendChild(hdr);

    /* Pod members */
    const mems = document.createElement('div');
    mems.className = 'pod-members';

    group.members.forEach(memberId => {
      const m = memberMap[memberId];
      if (!m) return;
      const bubble = createAvatarBubble(m);
      mems.appendChild(bubble);
      GS.members[memberId] = { el: bubble, podId: group.id };

      bubble.addEventListener('click',    () => onBubbleClick(memberId));
      bubble.addEventListener('touchend', e => { e.preventDefault(); onBubbleClick(memberId); }, { passive:false });
      bubble.addEventListener('keydown',  e => { if(e.key==='Enter'||e.key===' ') onBubbleClick(memberId); });
    });

    pod.appendChild(mems);
    canvas.appendChild(pod);
  });
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ৯. SELECTION MODAL
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
let selModal = null, resModal = null;

function openSelectionModal(actionKey) {
  GS.currentAction = actionKey;
  GS.selectedIds = [];
  clearMemberStates();

  const ac = ActionConfig[actionKey];
  document.getElementById('selectionModalLabel').textContent = `${ac.icon} ${ac.labelBn} — ব্যক্তি নির্বাচন`;
  document.getElementById('selectionModalHdr').style.backgroundImage =
    `linear-gradient(90deg,rgba(245,200,66,.14),rgba(0,212,255,.07))`;

  setStep(1);
  buildPersonGrid(null);

  // Highlight canvas
  document.getElementById('gameCanvas').classList.add('action-active');

  selModal = selModal || new bootstrap.Modal(document.getElementById('selectionModal'), { backdrop:'static' });
  selModal.show();
}

function setStep(n) {
  const d1=document.getElementById('stepDot1'), d2=document.getElementById('stepDot2');
  const pr=document.getElementById('selectionPrompt');
  if (n===1) { d1.className='step-dot active'; d2.className='step-dot'; pr.textContent='১ম ব্যক্তি নির্বাচন করুন'; }
  else       { d1.className='step-dot done';   d2.className='step-dot active'; pr.textContent='২য় ব্যক্তি নির্বাচন করুন'; }
  refreshPreview();
}

function refreshPreview() {
  updatePrevSlot('previewSlot1', GS.selectedIds[0]?memberMap[GS.selectedIds[0]]:null,'১ম ব্যক্তি');
  updatePrevSlot('previewSlot2', GS.selectedIds[1]?memberMap[GS.selectedIds[1]]:null,'২য় ব্যক্তি');
}

function updatePrevSlot(slotId, m, def) {
  const el = document.getElementById(slotId);
  if (!el) return;
  if (!m) { el.innerHTML=`<div class="prev-av empty">?</div><span class="prev-nm">${def}</span>`; return; }
  let content = m.avatar.initials || m.name[0];
  if (m.avatar.img) {
    content = `<img src="${m.avatar.img}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;
  }
  el.innerHTML=`<div class="prev-av" style="background:linear-gradient(135deg,${m.avatar.color}cc,${m.avatar.color}66)">${content}</div><span class="prev-nm">${m.nameBn}</span>`;
}

function buildPersonGrid(disabledId) {
  const grid = document.getElementById('personGrid');
  grid.innerHTML = '';
  FAMILY_DATA.forEach(m => {
    const card = document.createElement('div');
    card.className = 'person-card' + (m.id===disabledId ? ' disabled' : '');
    card.dataset.id = m.id;
    let content = m.avatar.initials || m.name[0];
    if (m.avatar.img) {
      content = `<img src="${m.avatar.img}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;
    }
    card.innerHTML = `<div class="pc-av" style="background:linear-gradient(135deg,${m.avatar.color}cc,${m.avatar.color}66)">${content}</div><span class="pc-nm">${m.nameBn}</span>`;
    card.addEventListener('click', () => { SFX.tap(); onPersonPick(m.id); });
    grid.appendChild(card);
  });
}

function onPersonPick(id) {
  const step = GS.selectedIds.length + 1;
  if (step === 1) {
    GS.selectedIds = [id];
    glowBubble(id, 'selected-1');
    SFX.select1();
    setStep(2);
    buildPersonGrid(id);
  } else {
    if (id === GS.selectedIds[0]) { showToast('একই ব্যক্তি দুইবার নির্বাচন করা যাবে না! 😄','warning'); return; }
    GS.selectedIds.push(id);
    glowBubble(id, 'selected-2');
    SFX.select2();
    refreshPreview();
    drawConnectionLine();
    setTimeout(() => { selModal?.hide(); setTimeout(processAction, 450); }, 500);
  }
}

function onBubbleClick(id) {
  if (!GS.currentAction) return;
  onPersonPick(id);
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ১০. CONNECTION LINE (SVG)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function drawConnectionLine() {
  const svg = document.getElementById('svgOverlay');
  if (!svg) return;
  const [id1, id2] = GS.selectedIds;
  if (!id1 || !id2) { svg.innerHTML=''; return; }
  const el1 = document.getElementById(`bubble-${id1}`);
  const el2 = document.getElementById(`bubble-${id2}`);
  if (!el1 || !el2) { svg.innerHTML=''; return; }
  const r1=el1.getBoundingClientRect(), r2=el2.getBoundingClientRect();
  const cx1=r1.left+r1.width/2, cy1=r1.top+r1.height/2;
  const cx2=r2.left+r2.width/2, cy2=r2.top+r2.height/2;
  svg.innerHTML=`<line class="conn-line" x1="${cx1}" y1="${cy1}" x2="${cx2}" y2="${cy2}" stroke="#f5c842" stroke-width="2" opacity=".7"/>`;
}

function clearLine() {
  const svg = document.getElementById('svgOverlay');
  if (svg) svg.innerHTML = '';
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ১১. ACTION PROCESSOR
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function processAction() {
  const [id1, id2] = GS.selectedIds;
  const p1=memberMap[id1], p2=memberMap[id2];
  const ac=ActionConfig[GS.currentAction];
  const rel=getRelation(id1,id2);

  if (rel.type==='self') { showToast(`${p1.nameBn} — নিজেই নিজের দিকে তাকালেন! 😂`,'warning'); SFX.fail(); endAction(); return; }

  const vld = GS.currentAction==='salami' ? ac.validate(rel,id1,id2) : ac.validate(rel);
  const ok  = vld.ok;
  const pts0 = ok ? ac.pts.ok : ac.pts.bad;

  /* Combo system */
  let pts = pts0;
  if (ok) {
    GS.combo++;
    if (GS.combo > 1) {
      pts = pts0 * Math.min(GS.combo, 4);
      showComboBadge(GS.combo, pts);
      GS.combo > 2 ? SFX.successBig() : SFX.success();
    } else {
      SFX.success();
    }
    setTimeout(SFX.score, 350);
  } else {
    GS.combo = 0;
    SFX.fail();
  }

  /* Score update */
  GS.score += pts;
  if (ok) GS.successCount++; else GS.failCount++;
  updateScoreDisplay();
  animateScoreCounter();

  /* Score float */
  spawnScoreFloat(pts, id1);

  /* Screen flash */
  screenFlash(ok ? 'success-flash' : 'fail-flash');

  /* Pod / member FX */
  podFX(id1, ok); podFX(id2, ok);
  bubbleFX(id1, ok); bubbleFX(id2, ok);

  /* Particles */
  if (ok) spawnParticles(ac.emoji, id1, id2);

  /* History */
  const msg = ok ? ac.okMsg(p1,p2,rel) : ac.badMsg(p1,p2,rel,vld.reason||rel.mahramNote);
  addHistory({ action:ac.labelBn, p1:p1.nameBn, p2:p2.nameBn, relation:rel.labelBn, ok, msg });

  /* Result modal */
  showResultModal({ p1, p2, rel, ac, ok, pts, msg });

  endAction();
}

function endAction() {
  document.getElementById('gameCanvas').classList.remove('action-active');
  setTimeout(() => { clearMemberStates(); clearLine(); GS.currentAction=null; GS.selectedIds=[]; }, 3500);
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ১২. VISUAL EFFECTS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function podFX(memberId, ok) {
  const pod = document.getElementById(`pod-${memberGroupMap[memberId]}`);
  if (!pod) return;
  const cls = ok ? 'pod-success' : 'pod-fail';
  pod.classList.add(cls);
  setTimeout(() => pod.classList.remove(cls), 1000);
}

function bubbleFX(id, ok) {
  const el = document.getElementById(`bubble-${id}`);
  if (!el) return;
  const cls = ok ? 'celebrate' : 'shake';
  el.classList.add(cls);
  setTimeout(() => el.classList.remove(cls), 700);
}

function screenFlash(cls) {
  const el = document.getElementById('screenFlash');
  if (!el) return;
  el.className = `screen-flash ${cls}`;
  setTimeout(() => { el.className = 'screen-flash'; }, 500);
}

function spawnScoreFloat(pts, memberId) {
  const container = document.getElementById('scoreFloats');
  const el = document.getElementById(`bubble-${memberId}`);
  const rect = el ? el.getBoundingClientRect() : { left: window.innerWidth/2, top: window.innerHeight/2 };
  const div = document.createElement('div');
  div.className = `score-float ${pts >= 0 ? 'plus' : 'minus'}`;
  div.textContent = pts >= 0 ? `+${pts}` : `${pts}`;
  div.style.left = `${rect.left + rect.width/2}px`;
  div.style.top  = `${rect.top}px`;
  container.appendChild(div);
  setTimeout(() => div.remove(), 1200);
}

function showComboBadge(level, pts) {
  const badge = document.getElementById('comboBadge');
  const icons = ['','','🔥','⚡','💥','🌟'];
  badge.textContent = `${icons[Math.min(level,5)]} COMBO ×${level}! (+${pts}পয়েন্ট)`;
  badge.classList.add('show');
  clearTimeout(GS.comboTimer);
  GS.comboTimer = setTimeout(() => badge.classList.remove('show'), 2000);
}

function spawnParticles(emojiStr, id1, id2) {
  const container = document.getElementById('particleContainer');
  const emojis = [...emojiStr];
  const bEl = document.getElementById(`bubble-${id1}`) || document.getElementById(`bubble-${id2}`);
  const b = bEl ? bEl.getBoundingClientRect() : { left: window.innerWidth/2 - 20, top: window.innerHeight/3 };
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.textContent = emojis[i % emojis.length];
    const angle = (Math.PI * 2 / 18) * i;
    const dist  = 70 + Math.random() * 90;
    p.style.setProperty('--dx', `${Math.cos(angle)*dist}px`);
    p.style.setProperty('--dy', `${Math.sin(angle)*dist - 50}px`);
    p.style.left = `${b.left + b.width/2}px`;
    p.style.top  = `${b.top  + b.height/2}px`;
    p.style.animationDelay = `${Math.random()*.3}s`;
    container.appendChild(p);
    setTimeout(() => p.remove(), 2200);
  }
}

/* Score counter animate (CSS counting up) */
function animateScoreCounter() {
  const el = document.getElementById('totalScore');
  if (!el) return;
  el.style.transform = 'scale(1.4)';
  el.style.color = '#f5c842';
  setTimeout(() => { el.style.transform = 'scale(1)'; }, 300);
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ১৩. RESULT MODAL
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function showResultModal({ p1, p2, rel, ac, ok, pts, msg }) {
  const hdr  = document.getElementById('resultModalHeader');
  const body = document.getElementById('resultModalBody');
  const title= document.getElementById('resultModalLabel');

  hdr.style.backgroundImage = ok
    ? 'linear-gradient(90deg,rgba(0,230,118,.2),rgba(0,230,118,.06))'
    : 'linear-gradient(90deg,rgba(255,69,105,.2),rgba(255,69,105,.06))';
  title.textContent = `${ac.icon} ${ac.labelBn} — ফলাফল`;

  const mhExp = rel.mahram===true ? `<span class="mahram-badge yes">✅ মাহরাম</span>`
               : rel.mahram===false ? `<span class="mahram-badge no">🚫 গায়রে মাহরাম</span>`
               : `<span class="age-badge">—</span>`;

  const aged = (() => { const d=ageDiff(p1.id,p2.id); return d==='smaller'?`${p1.nameBn} বয়সে বড়`:d==='larger'?`${p1.nameBn} বয়সে ছোট`:'বয়স সমান'; })();

  const p1Content = p1.avatar.img ? `<img src="${p1.avatar.img}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">` : (p1.avatar.initials || p1.name[0]);
  const p2Content = p2.avatar.img ? `<img src="${p2.avatar.img}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">` : (p2.avatar.initials || p2.name[0]);

  body.innerHTML = `
    <div class="result-persons">
      <div class="result-person">
        <div class="result-avatar" style="background:linear-gradient(135deg,${p1.avatar.color}cc,${p1.avatar.color}66)">${p1Content}</div>
        <span class="result-pname">${p1.nameBn}</span>
      </div>
      <div class="result-arrow">→</div>
      <div class="result-person">
        <div class="result-avatar" style="background:linear-gradient(135deg,${p2.avatar.color}cc,${p2.avatar.color}66)">${p2Content}</div>
        <span class="result-pname">${p2.nameBn}</span>
      </div>
    </div>
    <div class="result-row"><span class="rl-label">সম্পর্ক</span><span class="rl-value">${rel.labelBn}</span></div>
    <div class="result-row"><span class="rl-label">মাহরাম?</span><span class="rl-value">${mhExp}</span></div>
    <div class="result-row"><span class="rl-label">বয়স</span><span class="rl-value"><span class="age-badge">${aged}</span></span></div>
    <div class="result-row"><span class="rl-label">স্কোর</span><span class="rl-value"><span class="score-delta ${pts>=0?'plus':'minus'}">${pts>=0?'+':''}${pts} পয়েন্ট</span></span></div>
    <div class="result-emoji-big">${ok ? ac.emoji : '⚠️'}</div>
    <div class="result-banner ${ok?'ok':'bad'}">${msg}</div>
  `;

  resModal = resModal || new bootstrap.Modal(document.getElementById('resultModal'));
  resModal.show();
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ১৪. SCORE & HISTORY UI
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
/* Bengali digit converter */
const toBn = n => String(n).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[d]);

function updateScoreDisplay() {
  document.getElementById('totalScore').textContent   = toBn(GS.score);
  document.getElementById('successCount').textContent = toBn(GS.successCount);
  document.getElementById('failCount').textContent    = toBn(GS.failCount);
}

function addHistory(item) {
  GS.history.unshift(item);
  if (GS.history.length > 30) GS.history.pop();
  renderHistory();
}

function renderHistory() {
  const list = document.getElementById('historyList');
  if (!GS.history.length) { list.innerHTML='<li class="h-empty">এখনো কোনো কার্যক্রম নেই।</li>'; return; }
  list.innerHTML = GS.history.map(it=>`
    <li class="h-item ${it.ok?'ok':'bad'}">
      <span class="h-action">${it.action}</span>
      <span class="h-persons">${it.p1} → ${it.p2}</span>
      <span class="h-result">${it.relation} • ${it.ok?'✅ সফল':'❌ বাতিল'}</span>
    </li>`).join('');
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ১৫. STATE HELPERS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function glowBubble(id, cls) {
  const el = document.getElementById(`bubble-${id}`);
  if (el) el.classList.add(cls);
}

function clearMemberStates() {
  document.querySelectorAll('.avatar-bubble').forEach(el =>
    el.classList.remove('selected-1','selected-2','celebrate','shake'));
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ১৬. TOAST
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function showToast(msg, type='success') {
  const el = document.getElementById('gameToast');
  const bd = document.getElementById('toastBody');
  el.className = `toast align-items-center text-white border-0 bg-${type==='warning'?'warning':type==='danger'?'danger':'success'}`;
  bd.textContent = msg;
  new bootstrap.Toast(el, { delay:3000 }).show();
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ১৭. RESET
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function resetGame() {
  GS.score = 0; GS.successCount = 0; GS.failCount = 0;
  GS.history = []; GS.currentAction = null; GS.selectedIds = []; GS.combo = 0;
  document.getElementById('gameCanvas').classList.remove('action-active');
  clearMemberStates(); clearLine();
  document.getElementById('comboBadge').classList.remove('show');
  updateScoreDisplay(); renderHistory();
  SFX.reset();
  screenFlash('success-flash');
  showToast('গেম রিসেট! নতুন করে শুরু করুন 🎮','success');
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ১৮. EVENT WIRING
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function wireEvents() {
  /* Action buttons */
  document.querySelectorAll('.act-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      SFX.btnPress();
      openSelectionModal(btn.dataset.action);
    });
  });

  /* History panel */
  const histPanel = document.getElementById('historyPanel');
  const histBtn   = document.getElementById('historyToggleBtn');
  const closeHist = document.getElementById('closeHistoryBtn');
  histBtn .addEventListener('click', () => { SFX.histOpen(); histPanel.classList.toggle('open'); });
  closeHist.addEventListener('click', () => histPanel.classList.remove('open'));
  document.addEventListener('click', e => {
    if (!histPanel.contains(e.target) && !histBtn.contains(e.target)) histPanel.classList.remove('open');
  });

  /* Reset */
  document.getElementById('resetBtn').addEventListener('click', resetGame);

  /* Selection modal dismissed → cleanup */
  document.getElementById('selectionModal').addEventListener('hidden.bs.modal', () => {
    if (GS.selectedIds.length < 2) {
      document.getElementById('gameCanvas').classList.remove('action-active');
      GS.currentAction = null; GS.selectedIds = [];
      clearMemberStates(); clearLine();
    }
  });

  /* First user gesture → warm up AudioContext */
  document.body.addEventListener('pointerdown', () => {
    try { new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {}
  }, { once: true });
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ১৯. INIT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function init() {
  initPods();
  wireEvents();
  updateScoreDisplay();
  renderHistory();
}

document.addEventListener('DOMContentLoaded', init);
