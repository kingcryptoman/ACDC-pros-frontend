import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaRobot, FaPaperPlane, FaUser, FaDollarSign, FaClock, FaTools, FaExclamationTriangle, FaShieldAlt, FaCheckCircle, FaBook, FaExternalLinkAlt, FaShoppingCart, FaArrowRight, FaRedo, FaTachometerAlt } from 'react-icons/fa';

// ─────────────────────────────────────────────
// Scenario data — ported from coachbot-scenarios.js
// ─────────────────────────────────────────────
const SAFETY_CONFIG = {
  diy:     { label: 'DIY',         color: '#10B981', bg: 'rgba(16,185,129,0.15)',  icon: <FaCheckCircle /> },
  permit:  { label: 'Permit May Be Required', color: '#F59E0B', bg: 'rgba(245,158,11,0.15)', icon: <FaExclamationTriangle /> },
  pro:     { label: 'Call a Pro',  color: '#EF4444', bg: 'rgba(239,68,68,0.15)',   icon: <FaShieldAlt /> },
};

const ICON_MAP = {
  'dollar-sign': <FaDollarSign />,
  'clock':        <FaClock />,
  'gauge':        <FaTachometerAlt />,
  'wrench':       <FaTools />,
  'truck-medical': <span style={{ fontSize: '0.85em' }}>🚑</span>,
  'shield-halved': <FaShieldAlt />,
};

const CARD_ICONS = {
  'dollar-sign': FaDollarSign,
  'clock': FaClock,
  'gauge': FaTachometerAlt,
  'wrench': FaTools,
};

// ─────────────────────────────────────────────
// Scenario definitions — matches the original 40+ scenarios
// Each entry: { match: RegExp, handler: (text) => responseObject }
// ─────────────────────────────────────────────
const SCENARIOS = [];

// ── DOORS (5 scenarios) ─────────────────────────────────────────────────────
SCENARIOS.push({
  match: /(replace|new|install).{0,20}(exterior|front|back|entry).{0,15}door/,
  handler: () => ({
    text: `🚪 **Exterior door replacement** — here's the full walkthrough:\n\n**Measure first** (critical):\n- Width & height of the door slab (most common: 32" or 36" wide × 80" tall)\n- Frame depth (typical 4-9/16" for 2x4 walls, 6-9/16" for 2x6 walls)\n- Hinge side (left or right, looking from outside)\n\n**Decision: Slab vs Pre-Hung**\n- **Pre-hung** (recommended for replacement) — comes with frame, hinges, threshold. ~3-4 hours install.\n- **Slab only** — reuse existing frame. Cheaper but requires precise hinge mortising.\n\n**Install steps (pre-hung):**\n1. Remove old door + frame. Pry interior trim, score caulk, remove screws/nails.\n2. Check rough opening — should be 2" wider + 2.5" taller than frame.\n3. Apply flashing tape to sill, then 6"-wide butyl flashing up sides 12".\n4. Set new pre-hung in opening, shim plumb & level.\n5. Drive 3" screws through hinge jamb into framing (one per hinge).\n6. Foam gaps with low-expansion (door/window-rated) foam.\n7. Replace trim, caulk exterior, paint/stain.\n\n**Pro tip:** Replace the 1-1/4" hinge screws with 3" screws into the framing — adds significant security against kick-ins.`,
    safety: 'permit',
    cards: [
      { icon: 'dollar-sign', title: 'Door cost', value: '$200–$2,500', note: 'Steel cheapest, fiberglass mid, solid wood premium' },
      { icon: 'clock', title: 'Time', value: '4–6 hours', note: 'First time DIYer' },
      { icon: 'gauge', title: 'Difficulty', value: 'Moderate', note: 'Permit may be required' },
      { icon: 'wrench', title: 'Tools', value: 'Level, drill, pry bar', note: 'Caulk gun, foam, shims' }
    ],
    codes: [
      { code: 'IRC R311', text: 'Egress doors must be at least 36" wide × 6\'8" tall, swing inward, with no more than a 1.5" threshold height.' },
      { code: 'IRC R612', text: 'Exterior doors require proper flashing to prevent water intrusion.' }
    ],
    followups: [
      { label: 'What dimensions should I order?', action: 'q', value: 'How do I measure for a new exterior door?' },
      { label: 'Slab vs pre-hung — which?', action: 'q', value: 'Should I get slab only or pre-hung?' },
      { label: '🚀 Auto-dispatch a Carpenter', action: 'dispatch' },
      { label: 'Get cost estimate', action: 'estimator' }
    ]
  })
});

SCENARIOS.push({
  match: /(replace|new|install).{0,20}(interior|inside|bedroom|bathroom).{0,10}door|interior.{0,5}door.{0,15}(replace|install)/,
  handler: () => ({
    text: `🚪 **Interior door swap** — much easier than exterior:\n\n**Slab swap (easiest, 30 min):** if hinges are in same position\n1. Pull hinge pins, remove old slab.\n2. Lay new slab on old one, mark hinge & latch positions.\n3. Mortise hinges with chisel (or use a router).\n4. Drill 2-1/8" hole for knob, 1" hole for latch edge.\n5. Hang and adjust.\n\n**Pre-hung replacement (full unit, 2-3 hours):**\n1. Remove trim on both sides.\n2. Pry old frame from studs.\n3. Set new pre-hung, shim plumb (especially hinge side).\n4. Nail through jamb into framing at every shim location.\n5. Replace trim, caulk, paint.\n\n**Standard sizes:** 24", 28", 30", 32", 36" wide × 80" tall.`,
    safety: 'diy',
    cards: [
      { icon: 'dollar-sign', title: 'Cost', value: '$80–$400', note: 'Hollow core to solid wood' },
      { icon: 'clock', title: 'Time', value: '30 min – 3 hr', note: 'Slab vs pre-hung' },
      { icon: 'gauge', title: 'Difficulty', value: 'Easy–Moderate' }
    ],
    followups: [
      { label: 'How to mortise hinges?', action: 'q', value: 'How do I mortise hinges into a slab door?' },
      { label: 'Door is wrong size', action: 'q', value: 'My new door is too tall/wide — can I trim it?' },
      { label: '🚀 Auto-dispatch a Carpenter', action: 'dispatch' }
    ]
  })
});

SCENARIOS.push({
  match: /(door).{0,20}(sag|sagging|won.t close|wont close|dragging|drag|rubbing|rubs)/,
  handler: () => ({
    text: `🛠 **Sagging or rubbing door** — usually a 10-minute fix:\n\n**Diagnosis:** Open the door and look at the gap around the frame. Sagging = bigger gap on the latch side at top, smaller at bottom (or vice versa).\n\n**Fix (90% of cases): Long screws in top hinge**\n1. Open door, prop bottom with shim.\n2. Remove ONE screw from top hinge (the one furthest into the frame).\n3. Replace it with a 3" wood screw.\n4. Drive it in tight — this pulls the frame back into alignment.\n5. Repeat with another screw if needed.\n\n**Other causes:**\n- **Loose hinge screws** — tighten all 6.\n- **Stripped hinge screws** — fill holes with toothpicks + wood glue, redrive.\n- **Painted-shut hinge** — clean paint out of barrel.\n- **Swollen door (humidity)** — sand the rubbing edge, seal with poly.`,
    safety: 'diy',
    cards: [
      { icon: 'dollar-sign', title: 'Cost', value: '< $5', note: 'Just screws' },
      { icon: 'clock', title: 'Time', value: '10–30 min' },
      { icon: 'gauge', title: 'Difficulty', value: 'Very Easy' }
    ],
    followups: [
      { label: 'Door rubs at the bottom', action: 'q', value: 'My door drags on the floor at the bottom — how do I trim it?' },
      { label: "Won't latch closed", action: 'q', value: "My door won't latch closed" },
      { label: 'Hinge screws are stripped', action: 'q', value: 'My hinge screws are stripped' }
    ]
  })
});

SCENARIOS.push({
  match: /(slid(ing|er)|patio).{0,15}door/,
  handler: () => ({
    text: `🏠 **Sliding patio door** — common issues + fixes:\n\n**Hard to slide:**\n1. Vacuum the bottom track (debris is #1 cause).\n2. Spray track with silicone (NOT WD-40 — collects more dirt).\n3. Adjust rollers — small screw on bottom of door, turn clockwise to raise.\n4. Replace rollers if they're flat-spotted ($20-50/pair, 1 hr DIY).\n\n**Replacing the whole unit:**\n- Standard size: 6' or 8' wide × 80" tall (rough opening +2").\n- Full replacement: $1,500–$5,000+ installed (vinyl to fiberglass).\n- DIY install possible but 2-person job — these doors are HEAVY.\n- **Permit required** in most jurisdictions for replacement (egress + structural).\n\n**Air leaks?** Replace the weatherstrip (the fuzzy fin) — cheap fix, big efficiency gain.`,
    safety: 'permit',
    cards: [
      { icon: 'dollar-sign', title: 'Roller fix', value: '$20–$50', note: 'DIY repair' },
      { icon: 'dollar-sign', title: 'Full replace', value: '$1,500–$5,000', note: 'Installed' },
      { icon: 'clock', title: 'Roller fix', value: '1 hour' },
      { icon: 'clock', title: 'Full replace', value: '4–6 hours', note: '2-person job' }
    ],
    followups: [
      { label: 'Replace rollers — walkthrough', action: 'q', value: 'How do I replace sliding door rollers?' },
      { label: 'Get full install estimate', action: 'estimator' },
      { label: '🚀 Auto-dispatch a pro', action: 'dispatch' }
    ]
  })
});

SCENARIOS.push({
  match: /(storm|screen).{0,10}door/,
  handler: () => ({
    text: `🌬 **Storm door install** — solid weekend project:\n\n**Pre-buy checklist:**\n- Measure your door **opening width** and **opening height** (not the door itself).\n- Determine **hinge side** (right or left when facing from outside).\n- Pick style: full-view (glass), self-storing (interchangeable glass/screen), or retractable screen.\n\n**Standard sizes:** 32", 36" wide × 81" tall (matches most exterior doors).\n\n**Install steps (3-4 hours):**\n1. Attach the **Z-bar / hinge mounting bar** to the latch side of the door frame.\n2. Hang the door on the Z-bar.\n3. Drill pilot holes, screw the hinge side to the frame.\n4. Install the bottom expander to seal the threshold.\n5. Install the closer + safety chain.\n6. Caulk top + sides exterior.\n\n**Pro tip:** If you're in direct sun (south/west-facing), get a **closer with a shock absorber** — protects against wind whip.`,
    safety: 'diy',
    cards: [
      { icon: 'dollar-sign', title: 'Cost', value: '$200–$600', note: 'Aluminum to retractable' },
      { icon: 'clock', title: 'Time', value: '3–4 hours' },
      { icon: 'gauge', title: 'Difficulty', value: 'Moderate' }
    ],
    followups: [
      { label: 'How to measure properly?', action: 'q', value: 'How do I measure for a storm door?' },
      { label: 'Buy a storm door', action: 'product' }
    ]
  })
});

// ── WINDOWS (4 scenarios) ───────────────────────────────────────────────────
SCENARIOS.push({
  match: /(replace|new|install).{0,15}window|window.{0,15}(replace|installation)/,
  handler: () => ({
    text: `🪟 **Window replacement** — two paths:\n\n**1. Insert / pocket replacement (DIY-able)**\n- Reuses existing frame, just swaps the sash/glass unit.\n- 1-2 hours per window.\n- $300–$800 per window installed (DIY ~$200-500 in materials).\n- Best if existing frame is in good shape.\n\n**2. Full-frame replacement (Pro recommended)**\n- Removes everything down to the rough opening.\n- Required if frame is rotted or you're changing the size.\n- 4-6 hours per window.\n- $700–$2,500 per window installed.\n\n**Measure for inserts:**\n- Width: measure at top, middle, bottom — use the **smallest**.\n- Height: measure left, middle, right — use the **smallest**.\n- Subtract 1/4" from each for ordering clearance.\n\n**Energy ratings to compare:**\n- **U-factor:** lower is better (target ≤ 0.30)\n- **SHGC:** lower in hot climates (Atlanta: ≤ 0.25)\n- **ENERGY STAR** label saves ~12% on energy bills`,
    safety: 'permit',
    cards: [
      { icon: 'dollar-sign', title: 'Insert', value: '$300–$800/window' },
      { icon: 'dollar-sign', title: 'Full-frame', value: '$700–$2,500/window' },
      { icon: 'clock', title: 'Per window', value: '1–6 hours' },
      { icon: 'gauge', title: 'Difficulty', value: 'Moderate–Hard' }
    ],
    codes: [
      { code: 'IRC R310', text: 'Bedroom windows must meet egress requirements: min 5.7 sq ft openable, sill ≤ 44" from floor.' },
      { code: 'IECC', text: 'Energy code requires specific U-factor & SHGC ratings by climate zone (Atlanta = Zone 3).' }
    ],
    followups: [
      { label: 'How to measure properly?', action: 'q', value: 'How do I measure for a window replacement?' },
      { label: 'Whole-home cost estimate', action: 'estimator' },
      { label: '🚀 Auto-dispatch a pro', action: 'dispatch' }
    ]
  })
});

SCENARIOS.push({
  match: /window.{0,15}(seal|fog|fogged|condensation|moisture between)/,
  handler: () => ({
    text: `💨 **Foggy / condensation between glass panes** — the seal has failed.\n\n**What's happening:** Insulated glass units (IGUs) have a sealed argon-filled space between panes. When the seal breaks, moisture gets in and condenses.\n\n**Fix options:**\n\n1. **IGU replacement only** ($150–$400 per unit)\n   - Best value. Just the glass insert is replaced — frame and sash stay.\n   - Find a local glass shop.\n   - Order takes 1-2 weeks, install is 30 minutes.\n\n2. **Defogging service** ($60–$150 per window)\n   - A tech drills tiny holes, dries the cavity, reseals.\n   - Cosmetic fix only — does NOT restore argon insulation.\n   - Quality varies; results don't always last.\n\n3. **Live with it** — if it doesn't bother you, foggy windows aren't an emergency.\n\n**Don't replace the whole window** unless multiple are bad or the frame is also damaged.`,
    safety: 'diy',
    cards: [
      { icon: 'dollar-sign', title: 'IGU only', value: '$150–$400' },
      { icon: 'dollar-sign', title: 'Defog svc', value: '$60–$150' },
      { icon: 'clock', title: 'Install time', value: '30 min' }
    ],
    followups: [
      { label: 'Multiple windows are foggy', action: 'q', value: 'Several of my windows have failed seals' },
      { label: 'Get whole-home replacement quote', action: 'estimator' }
    ]
  })
});

SCENARIOS.push({
  match: /(weather.?strip|drafty window|window draft|cold air.{0,10}window)/,
  handler: () => ({
    text: `🌬 **Drafty window — fix in 30 minutes:**\n\n**Step 1: Find the leak**\n- Light an incense stick or use a candle, hold near edges. Smoke movement = air leak.\n- Or: tape a tissue along the edge — flutter = draft.\n\n**Step 2: Pick the right fix**\n\n| Leak location | Fix | Cost |\n|---|---|---|\n| Around the frame (between frame and wall) | Caulk (interior + exterior) | $5 |\n| Where sash meets frame | V-strip or foam weatherstrip | $10 |\n| Sliding window track | Self-adhesive felt | $8 |\n| Bottom of sash | Door-sweep style strip | $12 |\n| Whole window air leak | Window insulation film (winter) | $15 |\n\n**Pro tip:** Most window air leaks are at the **frame-to-wall junction**, not the sash. Pull off interior trim and check if the gap is foamed properly. Re-foam with door/window-rated low-expansion foam.`,
    safety: 'diy',
    cards: [
      { icon: 'dollar-sign', title: 'DIY cost', value: '$5–$30' },
      { icon: 'clock', title: 'Time', value: '30 min – 2 hr' },
      { icon: 'gauge', title: 'Difficulty', value: 'Very Easy' }
    ],
    followups: [
      { label: 'Window film install — how?', action: 'q', value: 'How do I install winter window film?' },
      { label: 'Time for new windows?', action: 'q', value: 'How do I know when to replace vs reseal?' }
    ]
  })
});

SCENARIOS.push({
  match: /(broken|crack|cracked|shattered).{0,15}(window|glass pane|window glass)/,
  handler: () => ({
    text: `🪟 **Broken window glass — repair options:**\n\n**Single-pane (older homes):**\n- DIY-friendly if the frame is wood.\n- Remove old glazing putty + glazier points.\n- Cut new glass to size (or have hardware store cut it).\n- Bed in fresh glazing compound, set glass, install glazier points.\n- Apply glazing putty around edges, smooth at 45°.\n- Cost: $20–$60. Time: 1-2 hours.\n\n**Double-pane (most homes built after 1990):**\n- Cannot DIY — requires professional IGU replacement.\n- Order through a local glass shop.\n- Cost: $150–$400. Lead time: 1-2 weeks.\n\n**Tempered glass (sliding doors, large windows, near floors):**\n- Required by code (IRC R308) in safety-glazing zones.\n- Must be replaced with tempered. Look for "T" etched in corner.\n\n**Quick safety while waiting:** Cover with thick plastic sheeting + duct tape, or a sheet of cardboard. Tape any cracked but intact glass.`,
    safety: 'permit',
    cards: [
      { icon: 'dollar-sign', title: 'Single-pane DIY', value: '$20–$60' },
      { icon: 'dollar-sign', title: 'Double-pane pro', value: '$150–$400' },
      { icon: 'clock', title: 'Lead time', value: '1–2 weeks', note: 'Custom IGU' }
    ],
    codes: [
      { code: 'IRC R308', text: 'Safety glazing (tempered or laminated) required in doors, near doors, near tubs/showers, in stairways, and within 18" of floor.' }
    ],
    followups: [
      { label: 'Is this tempered glass?', action: 'q', value: 'How do I tell if my window is tempered glass?' },
      { label: '🚀 Dispatch a glazier', action: 'dispatch' }
    ]
  })
});

// ── PLUMBING (6 scenarios) ──────────────────────────────────────────────────
SCENARIOS.push({
  match: /(replace|swap|new|install).{0,15}(faucet|kitchen faucet|bathroom faucet|sink faucet)/,
  handler: () => ({
    text: `🚰 **Faucet replacement — 20-minute job:**\n\n**Tools you need:**\n- Basin wrench (the secret weapon — $15)\n- Adjustable wrench\n- Plumber's putty or silicone\n- Bucket / towels\n\n**Steps:**\n1. **Shut off water** at the supply stops under the sink (turn clockwise).\n2. Open the faucet to release pressure.\n3. Disconnect supply lines (have bucket ready).\n4. Disconnect P-trap if needed for access.\n5. Use **basin wrench** to loosen the mounting nuts.\n6. Lift old faucet out, clean the deck.\n7. Apply silicone or rubber gasket per new faucet's instructions.\n8. Drop new faucet in, secure mounting nuts.\n9. Connect new supply lines (use NEW braided stainless lines — old ones leak).\n10. Turn water on slowly, check for leaks.\n\n**If it's a single-handle:** there are usually 1-3 mounting holes. Check if your sink matches the new faucet (1-hole vs 3-hole).`,
    safety: 'diy',
    cards: [
      { icon: 'dollar-sign', title: 'Faucet', value: '$80–$500', note: 'Big quality range' },
      { icon: 'dollar-sign', title: 'Tools', value: '$25', note: 'Basin wrench is the must-have' },
      { icon: 'clock', title: 'Time', value: '20–60 min' },
      { icon: 'gauge', title: 'Difficulty', value: 'Easy' }
    ],
    followups: [
      { label: "My supply stops won't turn", action: 'q', value: "My water supply stops are stuck — what do I do?" },
      { label: 'No supply stops at all', action: 'q', value: 'There are no shut-off valves under my sink' },
      { label: '🚀 Dispatch a plumber', action: 'dispatch' }
    ]
  })
});

SCENARIOS.push({
  match: /(garbage disposal|disposer|in.?sink.?erator)/,
  handler: () => ({
    text: `🍳 **Garbage disposal** — common issues:\n\n**Won't run, no hum:**\n1. Press the **red reset button** on the bottom of the unit.\n2. Check the breaker.\n3. If still dead, the disposal motor is shot ($150-300 to replace).\n\n**Hums but won't spin (jammed):**\n1. **Cut power at the breaker** — DO NOT skip this.\n2. Insert the **hex wrench** (came with disposal) into the bottom socket.\n3. Crank back and forth — clears the jam.\n4. Use tongs (NEVER your hand) to remove the obstruction.\n5. Press reset, restore power.\n\n**Leaking:**\n- **Top (sink flange):** Plumber's putty failed. Disconnect, scrape old putty, reseat with fresh.\n- **Side (dishwasher hose):** Replace the hose clamp.\n- **Bottom:** The disposal seal failed — replace the unit.\n\n**Replacement install (1 hour):**\n- 3/4 HP minimum for households of 3+.\n- Match flange type (3-bolt is most common).\n- Don't forget to **knock out the dishwasher port plug** if connecting one.`,
    safety: 'diy',
    cards: [
      { icon: 'dollar-sign', title: 'Replace cost', value: '$150–$400', note: 'Unit only' },
      { icon: 'clock', title: 'Replace time', value: '1 hour' },
      { icon: 'gauge', title: 'Difficulty', value: 'Easy–Moderate' }
    ],
    followups: [
      { label: 'Walk me through unjamming', action: 'q', value: 'My disposal is jammed and humming' },
      { label: 'Replace whole disposal', action: 'q', value: 'How do I replace a garbage disposal?' },
      { label: 'Buy a disposal', action: 'product' }
    ]
  })
});

SCENARIOS.push({
  match: /(water heater|hot water tank|tankless|hwh|water heat).{0,30}(replace|install|new|leaking|leak|out)/,
  handler: () => ({
    text: `♨️ **Water heater replacement** — major project:\n\n**Tank vs Tankless:**\n\n| | Tank (Standard) | Tankless |\n|---|---|---|\n| Cost installed | $1,200–$2,500 | $2,500–$5,500 |\n| Lifespan | 10-12 yrs | 20+ yrs |\n| Energy bill | Baseline | -20-30% |\n| Hot water | Limited (40-80 gal) | Endless |\n| Installation | Simple swap | Often needs gas line + venting upgrade |\n\n**Sizing (tank):**\n- 1-2 people: 30-40 gallon\n- 3-4 people: 40-50 gallon\n- 5+ people: 50-80 gallon or tankless\n\n**Code requirements (Atlanta + most jurisdictions):**\n- **Permit required** for replacement.\n- **Expansion tank** required if you have a check valve / PRV.\n- **T&P relief valve** + drain pipe to within 6" of floor.\n- **Sediment trap** on gas line.\n- **Earthquake straps** in seismic zones.\n\n**This is a permit + pro job in most cases.** DIY possible for like-for-like swap if handy, but inspections required.`,
    safety: 'pro',
    cards: [
      { icon: 'dollar-sign', title: 'Tank', value: '$1,200–$2,500', note: 'Installed w/ permit' },
      { icon: 'dollar-sign', title: 'Tankless', value: '$2,500–$5,500', note: 'May need gas/venting upgrade' },
      { icon: 'clock', title: 'Lifespan', value: '10–20 yrs' },
      { icon: 'gauge', title: 'Difficulty', value: 'Pro recommended' }
    ],
    codes: [
      { code: 'IPC 504', text: 'Water heaters require T&P relief valve discharging within 6" of floor.' },
      { code: 'IPC 607', text: 'Thermal expansion control (expansion tank) required in closed plumbing systems.' }
    ],
    followups: [
      { label: 'Is mine leaking from the bottom?', action: 'q', value: 'My water heater is leaking from the bottom' },
      { label: 'Tank or tankless for my home?', action: 'q', value: 'Should I get a tank or tankless water heater?' },
      { label: '🚀 Dispatch a plumber', action: 'dispatch' },
      { label: 'Get install estimate', action: 'estimator' }
    ]
  })
});

SCENARIOS.push({
  match: /(low water pressure|weak water|pressure low|no pressure)/,
  handler: () => ({
    text: `💧 **Low water pressure** — let's diagnose:\n\n**Step 1: Where?**\n- **One faucet:** Aerator clogged. Unscrew the tip, soak in vinegar 10 min, rinse, reinstall. 90% fixed.\n- **Hot side only:** Sediment in water heater. Drain & flush.\n- **Cold side only:** Could be a partially closed shut-off, supply line kink.\n- **Whole house:** Main shut-off, PRV, or municipal issue.\n\n**Step 2: Test main pressure**\n- Buy a $10 pressure gauge that screws onto an outdoor hose bib.\n- Normal: **45-75 PSI**.\n- < 40 PSI: low (PRV failing or municipal issue).\n- > 80 PSI: too high (PRV needed before fixtures fail).\n\n**Common fixes:**\n- **Aerator clog:** $0, 5 min.\n- **Faucet cartridge clog:** Pull cartridge, flush. $0-30 if cartridge needs replacing.\n- **PRV replacement:** $200-400 with a plumber.\n- **Galvanized pipe corrosion (older homes):** Major project — repipe with PEX or copper.`,
    safety: 'diy',
    cards: [
      { icon: 'dollar-sign', title: 'Aerator clean', value: '$0', note: '90% of cases' },
      { icon: 'dollar-sign', title: 'PRV replace', value: '$200–$400' },
      { icon: 'dollar-sign', title: 'Repipe', value: '$3,500–$15,000', note: 'Older galvanized homes' },
      { icon: 'clock', title: 'Aerator fix', value: '5 min' }
    ],
    followups: [
      { label: "It's only the hot water", action: 'q', value: 'My hot water pressure is low but cold is fine' },
      { label: 'Whole-house low pressure', action: 'q', value: 'My whole house has low water pressure' },
      { label: '🚀 Dispatch a plumber', action: 'dispatch' }
    ]
  })
});

SCENARIOS.push({
  match: /(leak|leaking|drip|dripping).{0,15}(under|kitchen sink|bathroom sink|sink)/,
  handler: () => ({
    text: `💦 **Leak under sink** — diagnose by location:\n\n**1. Drain leak (P-trap area)**\n- Most common. Slip-nut connections loosen over time.\n- Hand-tighten the slip nuts. If still dripping, replace the washers ($2).\n- If P-trap is corroded → replace whole assembly with PVC ($15, 30 min).\n\n**2. Supply line leak**\n- Check the braided stainless lines coming up to the faucet.\n- If wet anywhere along their length → replace immediately ($10/pair, 10 min).\n- These DO fail — recommend replacing every 10 years.\n\n**3. Faucet base leak**\n- Water on the deck or pooling around the faucet base = the faucet itself is leaking.\n- Water tracks down the supply line and drips at the connection point.\n- Tighten faucet mounting nuts, or replace the faucet.\n\n**4. Shut-off valve leak**\n- Old multi-turn valves often leak from the stem.\n- Tighten the packing nut (1/4 turn).\n- If still leaking, replace with a quarter-turn ball valve ($15).\n\n**Quick test:** Dry everything with paper towels. Run water for 30 sec. Wherever the first drop appears = the source.`,
    safety: 'diy',
    cards: [
      { icon: 'dollar-sign', title: 'P-trap fix', value: '$2–$15' },
      { icon: 'dollar-sign', title: 'Supply lines', value: '$10/pair' },
      { icon: 'clock', title: 'Time', value: '15–45 min' },
      { icon: 'gauge', title: 'Difficulty', value: 'Easy' }
    ],
    followups: [
      { label: 'Drain area is leaking', action: 'q', value: 'My P-trap is leaking — how do I fix it?' },
      { label: 'Supply line is leaking', action: 'q', value: 'My supply line is leaking — how do I replace it?' },
      { label: '🚀 Dispatch a plumber', action: 'dispatch' }
    ]
  })
});

SCENARIOS.push({
  match: /(shut.?off|shutoff).{0,10}valve|supply stop|angle stop/,
  handler: () => ({
    text: `🔧 **Shut-off valve replacement (angle stop):**\n\n**When to replace:**\n- Won't turn (frozen / stuck)\n- Leaks from the stem when you turn it\n- Old multi-turn style — upgrade to quarter-turn ball valve\n\n**Two types:**\n- **Compression** (most common, no soldering, $8) — slides onto copper pipe, tightens with brass ferrule\n- **Push-fit (SharkBite)** (no tools, $15) — pushes on, locks via O-ring\n- **Sweat / soldered** (permanent, requires torch) — pro territory\n\n**DIY install (compression, 30 min):**\n1. **Shut off water at the main**.\n2. Open the highest faucet to drain pressure.\n3. Disconnect supply line from old valve.\n4. Cut copper pipe with a tubing cutter (clean, square cut).\n5. Slide compression nut + brass ferrule onto pipe.\n6. Slide new valve on, tighten the nut wrench-tight.\n7. Restore main, check for leaks at the compression joint.\n\n**Pro tip:** If your old valve is soldered, use a **SharkBite push-fit** to avoid soldering.`,
    safety: 'diy',
    cards: [
      { icon: 'dollar-sign', title: 'Compression', value: '$8' },
      { icon: 'dollar-sign', title: 'SharkBite', value: '$15' },
      { icon: 'clock', title: 'Time', value: '30 min' },
      { icon: 'gauge', title: 'Difficulty', value: 'Moderate' }
    ],
    followups: [
      { label: "Main shut-off won't turn", action: 'q', value: 'My main water shut-off is stuck' },
      { label: '🚀 Dispatch a plumber', action: 'dispatch' }
    ]
  })
});

// ── ELECTRICAL (5 scenarios) ────────────────────────────────────────────────
SCENARIOS.push({
  match: /(replace|install|change|swap).{0,15}(light fixture|ceiling light|chandelier|sconce|pendant)/,
  handler: () => ({
    text: `💡 **Light fixture replacement** — 30-minute DIY:\n\n**Safety first:**\n1. **Kill power at the breaker** — not just the switch.\n2. Test the wires with a non-contact voltage tester before touching.\n3. Use a stable ladder; have a helper if it's heavy.\n\n**Steps:**\n1. Remove the old fixture — usually 2 mounting screws on the canopy.\n2. Lower it carefully, supporting the weight.\n3. Disconnect wires:\n   - **Black (hot) → Black**\n   - **White (neutral) → White**\n   - **Bare/Green (ground) → Green or to the box**\n4. Check the **junction box** is rated for fixture weight (heavy chandeliers need a fan-rated box).\n5. Install new fixture's mounting bracket.\n6. Connect wires with wire nuts (twist clockwise, give a tug — should hold).\n7. Tuck wires into the box, mount the fixture, install bulbs.\n8. Restore power, test.\n\n**If you have multiple wires:**\n- Multiple blacks = traveler wires for 3-way switches.\n- Red wire = often a switch leg or 3-way traveler.`,
    safety: 'diy',
    cards: [
      { icon: 'dollar-sign', title: 'Fixture cost', value: '$30–$500+', note: 'Wide range' },
      { icon: 'clock', title: 'Time', value: '30–60 min' },
      { icon: 'gauge', title: 'Difficulty', value: 'Easy' },
      { icon: 'wrench', title: 'Tools', value: 'Voltage tester, screwdriver, wire nuts' }
    ],
    codes: [
      { code: 'NEC 314.27', text: 'Outlet boxes used as the sole support for ceiling-suspended (paddle) fans must be listed for that purpose (fan-rated boxes).' }
    ],
    followups: [
      { label: 'How to install a ceiling fan?', action: 'q', value: 'How do I install a ceiling fan?' },
      { label: 'Old wiring, no ground', action: 'q', value: 'My house has old wiring without a ground wire' },
      { label: '🚀 Dispatch an electrician', action: 'dispatch' }
    ]
  })
});

SCENARIOS.push({
  match: /(replace|install|swap).{0,15}(outlet|receptacle|electrical socket|wall outlet)/,
  handler: () => ({
    text: `🔌 **Outlet replacement** — 15-minute job:\n\n**Safety first:**\n1. **Kill power at the breaker.**\n2. Confirm with a non-contact tester.\n3. Pull outlet from box.\n\n**Wire it:**\n- **Black wire(s) → Brass screws** (hot)\n- **White wire(s) → Silver screws** (neutral)\n- **Bare/Green wire → Green screw** (ground)\n\n**If GFCI required** (NEC 210.8 — bath, kitchen, garage, outdoors, basement, laundry, within 6' of any sink):\n- Use a **GFCI outlet** ($15) instead of a regular one.\n- LINE side connects to power source; LOAD side protects downstream outlets.\n\n**Tamper-resistant (TR)** outlets are required in dwellings (NEC 406.12). Look for "TR" on the face.\n\n**Self-grounding vs pigtail:**\n- Self-grounding outlets touch the metal box via mounting screws.\n- Pigtail: bundle 2+ wires of same color with a wire nut + a short tail to the outlet.\n\n**Multiple wires?** "Pigtail" them — bundle 2+ wires of same color with a wire nut + a short tail to the outlet. Don't backstab (spring-load) — use the screws.`,
    safety: 'diy',
    cards: [
      { icon: 'dollar-sign', title: 'Standard outlet', value: '$1–$3' },
      { icon: 'dollar-sign', title: 'GFCI', value: '$15' },
      { icon: 'dollar-sign', title: 'TR/USB', value: '$25' },
      { icon: 'clock', title: 'Time', value: '15 min' }
    ],
    codes: [
      { code: 'NEC 210.8', text: "GFCI required in bathrooms, kitchens, garages, outdoors, basements, crawl spaces, laundry, and within 6' of any sink." },
      { code: 'NEC 406.12', text: 'Tamper-resistant receptacles required in dwelling units.' },
      { code: 'NEC 210.12', text: 'AFCI required in most living areas.' }
    ],
    followups: [
      { label: 'How to install GFCI?', action: 'q', value: 'How do I install a GFCI outlet?' },
      { label: 'Outlet has 2 black wires', action: 'q', value: 'My outlet has multiple wires of each color — what now?' },
      { label: '🚀 Dispatch an electrician', action: 'dispatch' }
    ]
  })
});

SCENARIOS.push({
  match: /(replace|install|swap).{0,15}(switch|light switch|dimmer|smart switch)/,
  handler: () => ({
    text: `🔘 **Switch replacement** — pick your type:\n\n**Single-pole** (one switch controls light):\n- 2 brass screws + ground = 3 wires total.\n- Black hot in → Brass screw 1.\n- Black hot out (load) → Brass screw 2.\n- Bare ground → Green screw.\n\n**3-way** (two switches control same light):\n- 1 black "common" screw + 2 brass "traveler" screws + ground.\n- COMMON wire (often red or black) goes to the COMMON screw (look for the dark screw).\n- The other two go to travelers — order doesn't matter.\n- **Mark the common before disconnecting!** Take a photo too.\n\n**Dimmer install:**\n- Wire same as single-pole.\n- Make sure the dimmer wattage rating ≥ total bulb wattage.\n- LED bulbs need an **LED-compatible dimmer** or you'll get flicker/buzz.\n\n**Smart switch (Lutron Caséta, etc.):**\n- Most need **neutral wire** in the box (white wire).\n- Older homes (pre-1985) often DON'T have neutrals at switches — use a **no-neutral smart switch** or hire a pro.\n- Set up via app after wiring.\n\n**Pro tip:** Take a phone pic of the existing wiring before you touch anything.`,
    safety: 'diy',
    cards: [
      { icon: 'dollar-sign', title: 'Standard', value: '$2–$5' },
      { icon: 'dollar-sign', title: 'Dimmer', value: '$15–$40' },
      { icon: 'dollar-sign', title: 'Smart switch', value: '$50–$100' },
      { icon: 'clock', title: 'Time', value: '15–30 min' }
    ],
    followups: [
      { label: '3-way switch wiring', action: 'q', value: 'How do I wire a 3-way switch?' },
      { label: 'No neutral wire at switch', action: 'q', value: 'My switch box has no neutral wire — how do I install a smart switch?' },
      { label: '🚀 Dispatch an electrician', action: 'dispatch' }
    ]
  })
});

SCENARIOS.push({
  match: /(install|hang|mount).{0,15}(ceiling fan|paddle fan)/,
  handler: () => ({
    text: `🌀 **Ceiling fan install** — 1-2 hour project:\n\n**Critical: Box rating**\n- Standard light fixture box ≠ fan-rated.\n- A 50+ lb spinning load can rip a normal box out of the ceiling.\n- **Replace with a fan-rated box** (NEC 314.27) — they're labeled "FOR CEILING FAN SUPPORT".\n- If accessible from above (attic): screw fan box to a 2×4 between joists.\n- If not accessible: use a **saddle / expansion bracket** that wedges between joists.\n\n**Wiring:**\n- **Black** → Black (fan motor)\n- **Red** → Blue (light kit) — if you have a separate switch for the light\n- **White** → White (neutral)\n- **Bare** → Green (ground)\n\n**Steps:**\n1. **Power off.**\n2. Replace box if needed.\n3. Mount the bracket to the box.\n4. Hang the fan motor from the bracket hook.\n5. Connect wires.\n6. Mount canopy, install blades.\n7. Install light kit (if applicable).\n8. Balance with included balance kit if it wobbles.`,
    safety: 'diy',
    cards: [
      { icon: 'dollar-sign', title: 'Fan cost', value: '$80–$500+' },
      { icon: 'dollar-sign', title: 'Fan-rated box', value: '$10–$25', note: 'If you need to swap' },
      { icon: 'clock', title: 'Time', value: '1–2 hours' },
      { icon: 'gauge', title: 'Difficulty', value: 'Moderate' }
    ],
    codes: [
      { code: 'NEC 314.27', text: 'Outlet boxes used as the sole support for ceiling-suspended (paddle) fans must be listed for that purpose.' }
    ],
    followups: [
      { label: 'Box is not fan-rated', action: 'q', value: 'How do I replace a regular box with a fan-rated box?' },
      { label: 'Fan is wobbling', action: 'q', value: 'My ceiling fan wobbles — how do I balance it?' },
      { label: '🚀 Dispatch an electrician', action: 'dispatch' }
    ]
  })
});

SCENARIOS.push({
  match: /(ev charger|electric vehicle|tesla|level 2|240v outlet|nema 14.50|nema 6.50)/,
  handler: () => ({
    text: `⚡ **EV Level 2 charger install** — typical 240V upgrade:\n\n**Permit + electrician strongly recommended.** This involves panel work, dedicated 240V circuit, and inspection.\n\n**The two paths:**\n\n**1. Hardwired wall charger (Tesla Wall Connector, ChargePoint, etc.)**\n- 48A circuit on a 60A breaker.\n- 6-AWG copper wire.\n- $500-1000 charger + $700-2000 install = $1,200-3,000 total.\n- Smart features: app, scheduling, power sharing.\n\n**2. NEMA 14-50 outlet (most flexible)**\n- 50A circuit on a 50A breaker.\n- 6-AWG copper wire.\n- $30 outlet + $700-1500 install = ~$800 total.\n- Use the EV's mobile connector, max 32A continuous.\n\n**Panel capacity check:**\n- Add up your home's existing load.\n- A 200A panel typically handles EV charging fine.\n- 100A panel may need a load calculation or panel upgrade ($2,500-5,000 extra).\n\n**Tax credits:** Federal **30C** credit covers 30% of install cost (up to $1,000) through 2032.`,
    safety: 'pro',
    cards: [
      { icon: 'dollar-sign', title: 'NEMA 14-50', value: '$800', note: 'Outlet + install' },
      { icon: 'dollar-sign', title: 'Wall charger', value: '$1,200–$3,000', note: 'Hardwired' },
      { icon: 'dollar-sign', title: 'Tax credit', value: '30%', note: 'Up to $1,000 federal' },
      { icon: 'clock', title: 'Install time', value: '4–8 hours' }
    ],
    codes: [
      { code: 'NEC 625', text: 'Article 625 governs Electric Vehicle Power Transfer Systems — covers EVSE installation requirements.' },
      { code: 'NEC 220.87', text: 'Load calculation required when adding significant new loads to existing services.' }
    ],
    followups: [
      { label: '100A panel — can I do it?', action: 'q', value: 'I have a 100A panel — can I install an EV charger?' },
      { label: 'Tesla Wall Connector vs NEMA 14-50?', action: 'q', value: 'Tesla Wall Connector vs NEMA 14-50 — which is better?' },
      { label: '🚀 Dispatch an electrician', action: 'dispatch' },
      { label: 'Get install estimate', action: 'estimator' }
    ]
  })
});

// ── HVAC (4 scenarios) ──────────────────────────────────────────────────────
SCENARIOS.push({
  match: /(filter|air filter).{0,15}(replace|change|swap|new|hvac)/,
  handler: () => ({
    text: `🌬 **HVAC filter replacement** — easiest maintenance there is:\n\n**How often?**\n- **1" filters:** Every 30-60 days.\n- **4-5" media filters:** Every 6-12 months.\n- **HEPA / hospital-grade:** Per manufacturer.\n- More often if: pets, smokers, allergies, recent renovation.\n\n**Pick the right MERV rating:**\n- **MERV 8:** Standard. Catches dust, pollen, pet dander.\n- **MERV 11:** Better. Catches mold spores, fine dust. Recommended for most homes.\n- **MERV 13:** Premium. Catches viruses, smoke. ⚠ May restrict airflow on older systems.\n- **MERV 16+:** Hospital-grade. Often too restrictive for residential.\n\n**Where to find the size:** Printed on the side of the existing filter (e.g., 16x25x1).\n\n**Replacement steps:**\n1. Turn the system OFF at the thermostat.\n2. Locate the filter slot — usually at the air handler / furnace, or behind a return grille on a wall/ceiling.\n3. Note the **airflow arrow** direction on the new filter.\n4. Slide old filter out, new one in (arrow pointing toward the unit).\n5. Restore power.\n\n**Pro tip:** Set a phone reminder. A clogged filter is the #1 cause of frozen evaporator coils.`,
    safety: 'diy',
    cards: [
      { icon: 'dollar-sign', title: 'Filter cost', value: '$5–$40' },
      { icon: 'clock', title: 'Time', value: '5 min' },
      { icon: 'gauge', title: 'Difficulty', value: 'Trivial' }
    ],
    followups: [
      { label: 'What MERV should I use?', action: 'q', value: 'What MERV rating should I use for my home?' },
      { label: "I can't find the filter slot", action: 'q', value: "Where is my HVAC filter located?" },
      { label: 'Buy filters in bulk', action: 'product' }
    ]
  })
});

SCENARIOS.push({
  match: /(condensate|condensation|drain.{0,5}line|drain.{0,5}pan|water leak.{0,15}(ac|hvac|furnace))/,
  handler: () => ({
    text: `💧 **Condensate drain issue** — common cause of HVAC water leaks:\n\n**What's happening:**\n- AC pulls humidity from the air → condenses on the evaporator coil → drips into a pan → drains via a small PVC line outside.\n- When that line clogs (algae, dust, gunk), water backs up and either:\n  - Leaks out of the air handler (if no float switch)\n  - Triggers a float switch and shuts the system off\n  - Overflows into your ceiling/walls\n\n**DIY fix (15 min):**\n1. **Turn HVAC OFF** at the thermostat.\n2. Find the drain line — typically 3/4" PVC near the air handler. Often has a T with a cap (the cleanout).\n3. **Wet/dry vac the outdoor end** — this is the most effective method. Press a rag around the pipe to make a seal, vacuum 1-2 minutes.\n4. Remove the cleanout cap and pour 1 cup white vinegar (or diluted bleach) into the line. Let sit 30 min.\n5. Flush with water. Verify it drains outside.\n6. Restart the system.\n\n**Prevention:** Pour vinegar in the cleanout monthly during cooling season. ~$2/year vs $200+ service call.\n\n**If you don't have a float switch (safety overflow shutoff):** Get one installed — it's a $50 part that can save thousands in water damage.`,
    safety: 'diy',
    cards: [
      { icon: 'dollar-sign', title: 'DIY fix', value: '$0–$5' },
      { icon: 'dollar-sign', title: 'Float switch', value: '$50', note: 'One-time install' },
      { icon: 'clock', title: 'Time', value: '15 min' },
      { icon: 'gauge', title: 'Difficulty', value: 'Easy' }
    ],
    followups: [
      { label: "AC won't turn on (float tripped)", action: 'q', value: "My AC won't turn on — I think the float switch tripped" },
      { label: 'Water dripping from ceiling', action: 'q', value: 'Water is dripping from the ceiling under my air handler' },
      { label: '🚀 Dispatch an HVAC tech', action: 'dispatch' }
    ]
  })
});

SCENARIOS.push({
  match: /(short.?cycle|short cycling|short.?cycles|turning on.{0,10}off|cycling on.{0,10}off)/,
  handler: () => ({
    text: `🔁 **HVAC short-cycling** (turning on/off rapidly) — common causes ranked:\n\n**1. Dirty filter (50% of cases)**\n- Replace it. Wait 24 hours. Often resolves.\n\n**2. Frozen evaporator coil**\n- Caused by: dirty filter, low refrigerant, or weak airflow.\n- Turn system OFF (set fan to ON to thaw faster). Wait 4-6 hours.\n- Replace filter, then test. If freezes again → call a pro for refrigerant check.\n\n**3. Oversized system**\n- An AC that's too big cools too fast, then shuts off — can't dehumidify properly.\n- Common in homes with replaced AC where contractor "upsized" thinking bigger = better.\n- Fix: variable-speed unit, or right-sized replacement.\n\n**4. Thermostat location**\n- Stat in direct sunlight, near a vent, or on an exterior wall reads wrong.\n- Relocate or shield it.\n\n**5. Low refrigerant (R-410A leak)**\n- System cools briefly then shuts off on low-pressure cutoff.\n- **Pro territory** — refrigerant work requires EPA cert.\n\n**6. Dirty condenser (outdoor unit)**\n- Hose down the fins (gently, from inside out). Cut back vegetation 2 ft minimum.`,
    safety: 'permit',
    cards: [
      { icon: 'dollar-sign', title: 'Filter fix', value: '$10', note: 'First thing to try' },
      { icon: 'dollar-sign', title: 'Refrigerant', value: '$150–$400', note: 'Pro service call' },
      { icon: 'dollar-sign', title: 'Replace unit', value: '$5,000–$12,000', note: 'If oversized' },
      { icon: 'clock', title: 'Diagnosis', value: '30 min' }
    ],
    followups: [
      { label: 'Coil is frozen', action: 'q', value: 'My evaporator coil is frozen — what now?' },
      { label: 'Could be oversized — how to tell?', action: 'q', value: 'How do I know if my AC is oversized?' },
      { label: '🚀 Dispatch an HVAC tech', action: 'dispatch' }
    ]
  })
});

SCENARIOS.push({
  match: /(heat pump|mini.?split|ductless|hvac size|sizing|tonnage|btu)/,
  handler: () => ({
    text: `❄️ **Heat pump / HVAC sizing** — get this right or pay for it forever:\n\n**Rule of thumb (rough!):**\n- 1 ton = 12,000 BTU = ~500-600 sq ft (in moderate climate)\n- 2,000 sq ft home → 3.5-4 ton system\n\n**But that's not enough.** Get a **Manual J load calculation**:\n- Accounts for: insulation, windows, sun exposure, ceiling height, climate zone, infiltration.\n- A right-sized system saves 20-30% on energy + lasts longer + dehumidifies better.\n- Many contractors will do this free with a sales quote.\n\n**Heat pump vs furnace + AC** (Atlanta climate is *ideal* for heat pumps):\n\n| | Heat pump | Furnace + AC |\n|---|---|---|\n| Equipment | $7,000–$15,000 | $8,000–$14,000 |\n| Annual energy cost | $800–$1,400 | $1,200–$2,000 |\n| Tax credits | Up to $2,000 IRA | Up to $600 |\n| Cold-climate performance | Modern: down to -15°F | Always works |\n| Lifespan | 12–18 yrs | 15–25 yrs |\n\n**Mini-split / ductless** (great for additions, garages, ADUs, no-duct homes):\n- $2,000-5,000 per zone installed.\n- 1 outdoor unit can serve 2-8 indoor heads.\n- SEER2 ratings of 18-30+ — extremely efficient.`,
    safety: 'permit',
    cards: [
      { icon: 'dollar-sign', title: 'Heat pump', value: '$7,000–$15,000' },
      { icon: 'dollar-sign', title: 'Mini-split', value: '$2,000–$5,000/zone' },
      { icon: 'dollar-sign', title: 'IRA tax credit', value: 'Up to $2,000', note: 'Heat pump' },
      { icon: 'gauge', title: 'Atlanta zone', value: 'Ideal for heat pump' }
    ],
    citations: [
      { label: 'IRS — Energy Efficient Home Improvement Credit', url: 'https://www.irs.gov/credits-deductions/energy-efficient-home-improvement-credit' }
    ],
    followups: [
      { label: 'Get a Manual J estimate', action: 'estimator' },
      { label: 'Mini-split for my garage?', action: 'q', value: 'Should I install a mini-split in my garage?' },
      { label: '🚀 Dispatch an HVAC pro', action: 'dispatch' }
    ]
  })
});

// ── EXTERIOR (4 scenarios) ─────────────────────────────────────────────────
SCENARIOS.push({
  match: /(gutter|gutters|downspout)/,
  handler: () => ({
    text: `🏡 **Gutter cleaning / replacement:**\n\n**Cleaning (do this 2x/year minimum):**\n1. Use a stable extension ladder, gloves, scoop or trowel.\n2. Scoop debris into a bucket.\n3. Flush downspouts with a hose. If clogged, snake from the top.\n4. Check for sagging sections (rusted hangers).\n5. Look for leaks at seams — seal with butyl gutter sealant.\n\n**Cost:** DIY $0 / Pro $150-300 for a typical home.\n\n**Replacement (when):**\n- Visible rust holes / leaking seams that won't seal.\n- Sagging sections, pulling away from house.\n- Improper slope (water pools).\n- Splashes onto siding (downspouts undersized).\n\n**Material options:**\n- **Aluminum** ($5-10/ft installed) — most common, paintable, 20+ yr lifespan.\n- **Vinyl** ($3-7/ft) — cheapest, brittle in cold, 10-15 yr.\n- **Copper** ($25-40/ft) — premium, 50+ yr, develops patina.\n- **Steel/galvanized** ($8-15/ft) — strong but rusts, 20 yr.\n\n**Gutter guards (worth it?):** Reduce cleaning to 1x/year. Quality varies massively. Premium screen/mesh systems ($8-15/ft) work; cheap plastic inserts often clog worse.`,
    safety: 'diy',
    cards: [
      { icon: 'dollar-sign', title: 'DIY clean', value: '$0' },
      { icon: 'dollar-sign', title: 'Replace (aluminum)', value: '$5–$10/ft installed' },
      { icon: 'dollar-sign', title: 'Gutter guards', value: '$8–$15/ft' },
      { icon: 'clock', title: 'Cleaning time', value: '2–4 hours' }
    ],
    followups: [
      { label: 'Are gutter guards worth it?', action: 'q', value: 'Are gutter guards worth the cost?' },
      { label: 'Get replacement estimate', action: 'estimator' },
      { label: '🚀 Dispatch a pro', action: 'dispatch' }
    ]
  })
});

SCENARIOS.push({
  match: /(deck|patio|outdoor wood).{0,15}(stain|seal|sealing|refinish|restore)/,
  handler: () => ({
    text: `🪵 **Deck staining / sealing** — extends life by years:\n\n**When to redo:**\n- Water no longer beads on the surface (do the splash test).\n- Color is gray / faded.\n- Wood feels rough or is splintering.\n- Every 2-3 years for transparent stains, 4-5 for solids.\n\n**Process (1 weekend):**\n\n**Day 1: Clean & strip**\n1. Sweep thoroughly.\n2. Apply deck cleaner (oxygenated, NOT bleach which damages wood).\n3. Scrub with a stiff brush or rent a 1500-PSI pressure washer.\n4. Rinse, let dry **48 hours**.\n5. If old finish is peeling, use a deck stripper.\n6. Sand any rough spots (60-80 grit).\n\n**Day 2: Apply stain**\n1. Choose: **Transparent** (most natural, 1-2 yr) / **Semi-transparent** (most popular, 2-4 yr) / **Solid** (covers grain, 4-6 yr).\n2. Apply with stain pad on a pole, working with the grain.\n3. Cover 2-3 boards at a time, maintain wet edge.\n4. Don't over-apply.\n5. **Don't walk on it for 24 hours**, no furniture for 48.\n\n**Pro tips:**\n- Pick a 2-3 day window with no rain forecast.\n- Stain when wood is 50-80°F, not in direct sun.\n- Use a fresh roller / pad — old ones leave streaks.`,
    safety: 'diy',
    cards: [
      { icon: 'dollar-sign', title: 'Stain', value: '$30–$60/gallon', note: 'Covers ~250 sqft' },
      { icon: 'dollar-sign', title: 'Cleaner/stripper', value: '$25–$50' },
      { icon: 'clock', title: 'Time', value: '1 weekend' },
      { icon: 'gauge', title: 'Difficulty', value: 'Moderate' }
    ],
    followups: [
      { label: 'Pressure-treated needs to dry?', action: 'q', value: 'How long does new pressure-treated wood need to dry before staining?' },
      { label: 'Solid vs semi-transparent?', action: 'q', value: 'Solid stain vs semi-transparent — which is better?' }
    ]
  })
});

SCENARIOS.push({
  match: /(caulk|caulking|sealant|seal exterior|exterior sealing)/,
  handler: () => ({
    text: `🧴 **Exterior caulking** — easy, big impact on weather + energy bills:\n\n**Where to caulk:**\n- Around windows + doors (between trim and siding).\n- Where siding meets corners, soffits, fascia.\n- Around exterior penetrations: hose bibs, dryer vents, cable lines.\n- Foundation-to-siding gap (sill plate).\n\n**Where NOT to caulk:**\n- Bottom edge of siding (drainage path).\n- Weep holes in brick / EIFS.\n- Furnace flue openings.\n\n**Pick the right product:**\n- **Polyurethane** (Sashco Lexel, OSI Quad) — best for paintable, 20+ yr life.\n- **Silicone** — best UV/water resistance but NOT paintable. Use on flashings, plumbing penetrations.\n- **Acrylic latex** — easiest to apply, paintable, but only 5-10 yr life.\n- **Hybrid (Big Stretch, etc.)** — moderate everything.\n\n**Application steps:**\n1. **Remove old caulk** completely (utility knife + caulk-remover tool).\n2. Clean joint, let dry.\n3. For gaps wider than 1/2", insert backer rod first.\n4. Cut tube tip at 45° angle, hole size matched to gap.\n5. Apply consistent bead, push (not pull) the gun.\n6. Tool with finger or spoon dipped in soapy water.\n7. Don't paint for 24+ hours.`,
    safety: 'diy',
    cards: [
      { icon: 'dollar-sign', title: 'Caulk tube', value: '$5–$15' },
      { icon: 'dollar-sign', title: 'Gun + tools', value: '$20', note: 'One-time' },
      { icon: 'clock', title: 'Whole-house', value: '4–8 hours' },
      { icon: 'gauge', title: 'Difficulty', value: 'Easy' }
    ],
    followups: [
      { label: 'Caulk vs paintable?', action: 'q', value: 'When should I use silicone vs polyurethane caulk?' },
      { label: 'How do I remove old caulk?', action: 'q', value: 'How do I remove old caulk?' }
    ]
  })
});

SCENARIOS.push({
  match: /(soffit|fascia|wood rot|rotted trim|rotted wood)/,
  handler: () => ({
    text: `🪚 **Rotted soffit / fascia / trim** — common but fixable:\n\n**Diagnose extent:**\n- Use a screwdriver — if it sinks in, that section is rotted.\n- Probe surrounding areas to find the boundary.\n- Look for the **water source** — usually a roof leak, gutter overflow, or failed flashing. Fix that first or rot returns.\n\n**Repair vs Replace:**\n- **< 25% rotted:** Cut out bad wood, treat surrounding area with wood preservative, fill with epoxy wood filler (Abatron), sand, prime, paint.\n- **> 25% rotted:** Replace the board. Use **PVC trim** (Azek, Versatex) — never rots, paints like wood, $5-12/linear ft. Worth the upgrade.\n\n**Replacement steps:**\n1. Pry off old board carefully.\n2. Inspect framing behind it — replace any rotted framing first.\n3. Cut new PVC to length, allow 1/8" gap for thermal expansion.\n4. Pre-drill stainless trim screws.\n5. Caulk all seams with paintable polyurethane.\n6. Prime + 2 coats acrylic exterior paint.\n\n**Before you start:** Check the roof above for the water source. Common culprits:\n- Missing/damaged drip edge flashing.\n- Clogged or undersized gutters.\n- Missing kickout flashing where roof meets a wall.\n\n**This often signals other roof/gutter issues** — get a roof inspection while you're at it.`,
    safety: 'permit',
    cards: [
      { icon: 'dollar-sign', title: 'PVC trim', value: '$5–$12/lf' },
      { icon: 'dollar-sign', title: 'Epoxy filler', value: '$30–$60/kit' },
      { icon: 'clock', title: 'Time', value: '4–10 hrs', note: 'Per section' },
      { icon: 'gauge', title: 'Difficulty', value: 'Moderate' }
    ],
    followups: [
      { label: 'Find the water source first', action: 'q', value: "How do I find what's causing wood rot on my soffit?" },
      { label: '🚀 Dispatch a roofer', action: 'dispatch' },
      { label: 'Get full repair estimate', action: 'estimator' }
    ]
  })
});

// ── DRYWALL / PAINT (4 scenarios) ─────────────────────────────────────────
SCENARIOS.push({
  match: /(water stain|water mark|ceiling stain|brown spot|yellow spot).{0,20}(ceiling|wall)/,
  handler: () => ({
    text: `🟡 **Water stain on ceiling/wall** — 2-step fix:\n\n**STEP 1 (CRITICAL): Find the leak.**\n- Touch the stain — wet = active leak. Dry = old.\n- For a ceiling stain: what's directly above? Bathroom? Roof? AC condensate line?\n- **Don't skip this** — paint over an active leak and the stain comes back, water damage continues, mold develops.\n\n**STEP 2: After leak is fixed, cover the stain.**\n\n1. **Don't paint regular paint over it** — water-soluble dyes in the stain bleed through any latex paint, even after drying.\n2. **Use a stain-blocking primer:**\n   - **Kilz Original (oil-based)** — works on everything, smelly, mineral spirits cleanup.\n   - **Zinsser BIN (shellac)** — best for tough stains, dries fast, alcohol cleanup.\n   - **Zinsser Cover Stain** — oil-based, less smelly than Kilz.\n   - Spray cans available for small spots.\n3. Apply 1-2 coats of stain-blocker.\n4. Once dry, paint with regular ceiling/wall paint.\n\n**If the drywall is soft / sagging:**\n- Replace the drywall — water damage compromised the structure.\n- Cut out the affected area, install patch.\n- Tape, mud (3 coats), sand, prime, paint.`,
    safety: 'diy',
    cards: [
      { icon: 'dollar-sign', title: 'Spray primer', value: '$12' },
      { icon: 'dollar-sign', title: 'Quart primer', value: '$20' },
      { icon: 'clock', title: 'Cover stain', value: '30 min' },
      { icon: 'gauge', title: 'Difficulty', value: 'Easy' }
    ],
    followups: [
      { label: 'Stain is wet — find the leak', action: 'q', value: 'My ceiling stain is wet — how do I find the leak?' },
      { label: 'Drywall is sagging — replace it?', action: 'q', value: 'My ceiling drywall is sagging from water damage' },
      { label: '🚀 Dispatch a roofer', action: 'dispatch' }
    ]
  })
});

SCENARIOS.push({
  match: /(texture|orange peel|knockdown|popcorn|smooth ceiling|texture matching)/,
  handler: () => ({
    text: `🎨 **Texture matching** — the trickiest part of drywall repair:\n\n**Identify the texture first:**\n- **Smooth** — no texture, just paint.\n- **Orange peel** — fine bumps, like an orange skin.\n- **Knockdown** — splatter, then flattened with a knockdown knife.\n- **Skip trowel** — random Mediterranean look, applied with a trowel.\n- **Popcorn / cottage cheese** — stippled ceiling texture (often contains asbestos in pre-1980 homes — TEST BEFORE DISTURBING).\n\n**Orange peel match:**\n1. Spray-can technique: stand 3-4 ft away, light dusting passes.\n2. Adjust nozzle for fine vs coarse.\n3. Practice on cardboard first to dial it in.\n4. Apply, let it set 1 minute, no flatten.\n\n**Knockdown match:**\n1. Spray heavier than orange peel.\n2. Wait 5-10 min until it's tacky but not wet.\n3. Drag a 12" knockdown knife across the surface.\n4. Match the existing pattern.\n\n**Popcorn ceiling repair:**\n1. ⚠ **Test for asbestos first** if pre-1980 — $40 mail-in test.\n2. Spray-can popcorn texture ($15).\n3. Match coarse / fine grade.\n4. Mist water lightly to soften edges to existing.\n\n**Pro tip:** Even a perfect texture match can show under raking light. Repaint the **entire wall or ceiling** for invisible repair.`,
    safety: 'diy',
    cards: [
      { icon: 'dollar-sign', title: 'Spray can', value: '$15' },
      { icon: 'dollar-sign', title: 'Asbestos test', value: '$40', note: 'Pre-1980 homes' },
      { icon: 'clock', title: 'Practice + apply', value: '1–2 hours' }
    ],
    followups: [
      { label: 'How to test for asbestos?', action: 'q', value: 'How do I test my popcorn ceiling for asbestos?' },
      { label: 'Want it removed?', action: 'q', value: 'How do I remove a popcorn ceiling?' },
      { label: '🚀 Dispatch a pro', action: 'dispatch' }
    ]
  })
});

SCENARIOS.push({
  match: /(prime|primer|primer for cabinet|paint cabinet|prep cabinet|cabinet refinish)/,
  handler: () => ({
    text: `🎨 **Cabinet painting / refinishing** — pro results at home:\n\n**The secret is prep.** 90% of cabinet paint failures are skipped prep.\n\n**Steps:**\n\n**Day 1: Disassemble + clean**\n1. Remove all doors, drawers, hardware. Number them with masking tape (e.g., U1 = upper #1).\n2. Take photos of everything before disassembly.\n3. Clean with **TSP or degreaser**. Cabinets — especially kitchens — have grease that NOTHING sticks to.\n4. Rinse, let dry overnight.\n\n**Day 2: Sand + prime**\n5. Sand everything with 220-grit. Goal: scuff, not strip.\n6. Wipe with tack cloth.\n7. **Primer is critical:**\n   - **INSL-X Cabinet Coat** — best topcoat, no separate primer (acrylic).\n   - **Zinsser BIN shellac** — best primer for stain-blocking + adhesion. Smelly, alcohol cleanup.\n   - **Stix waterborne** — easy cleanup, good adhesion.\n8. Apply primer with HVLP sprayer (best) or microfiber roller + brush.\n9. Sand lightly between coats with 320-grit.\n\n**Day 3-4: Topcoat (2 coats)**\n10. Use **Benjamin Moore Advance** or **Sherwin-Williams Emerald Urethane Trim Enamel**.\n11. Apply 2 coats, sanding lightly between.\n12. Cabinets need 5-7 days to fully cure before heavy use.\n\n**Don't do this:** Latex wall paint on cabinets — peels, chips, blocks.`,
    safety: 'diy',
    cards: [
      { icon: 'dollar-sign', title: 'Materials', value: '$200–$400', note: 'Whole kitchen' },
      { icon: 'dollar-sign', title: 'Pro paint job', value: '$3,000–$8,000' },
      { icon: 'clock', title: 'DIY time', value: '4–7 days' },
      { icon: 'gauge', title: 'Difficulty', value: 'Hard but worth it' }
    ],
    followups: [
      { label: 'Best brush vs sprayer?', action: 'q', value: 'Should I spray or roll my cabinets?' },
      { label: 'Get cabinet refinish quote', action: 'estimator' },
      { label: '🚀 Dispatch a painter', action: 'dispatch' }
    ]
  })
});

SCENARIOS.push({
  match: /(streak|streaks|paint not covering|brush mark|roller mark|paint streaky|holiday|holidays in paint)/,
  handler: () => ({
    text: `🎨 **Paint streaks / brush marks / poor coverage** — common causes:\n\n**1. Wrong nap on the roller**\n- Smooth surfaces (drywall, doors): 3/8" nap.\n- Light texture: 1/2" nap.\n- Heavy texture (popcorn, stucco): 3/4"-1" nap.\n- Wrong nap = streaks or stippling.\n\n**2. Cheap roller / brush**\n- Spend $20 on a quality Wooster or Purdy roller cover. The $3 ones leave fibers and inconsistent coverage.\n\n**3. Wrong technique**\n- **Wet edge:** Always overlap into still-wet paint. If your edge dries before you get back to it = lap marks.\n- **Roll in W or M pattern**, then back-roll in straight lines without reloading.\n- **One direction final pass.**\n\n**4. Paint is too thin / not enough coats**\n- Premium paints (Sherwin Williams Duration, BM Aura) often cover in 1 coat.\n- Cheap paint = always 2+ coats.\n\n**5. Wrong sheen for the surface**\n- Glossy paint shows EVERY imperfection. Use eggshell or satin for walls.\n- Flat / matte hides imperfections but isn't washable.\n\n**Pro tip:** Roll the FULL height in one pass. Don't roll halfway up, then come back to finish — you'll see the lap line forever.`,
    safety: 'diy',
    cards: [
      { icon: 'dollar-sign', title: 'Quality roller', value: '$15–$25', note: 'Reusable' },
      { icon: 'dollar-sign', title: 'Premium paint', value: '$50–$80/gal', note: 'vs $25 cheap = 1 coat vs 2-3' },
      { icon: 'clock', title: 'Time per room', value: '4–8 hours' }
    ],
    followups: [
      { label: 'Wall over old gloss paint', action: 'q', value: 'How do I paint over glossy paint?' },
      { label: 'Best paint for kitchen?', action: 'q', value: "What's the best paint for a kitchen?" },
      { label: 'Get paint job estimate', action: 'estimator' }
    ]
  })
});

// ── FLOORING (4 scenarios) ──────────────────────────────────────────────────
SCENARIOS.push({
  match: /(squeak|squeaky|creaky|creak).{0,15}floor/,
  handler: () => ({
    text: `🪵 **Squeaky floors** — fix from above or below:\n\n**Cause:** Subfloor has separated from floor joist (nails loose) and rubs against them as you walk.\n\n**FROM BELOW (best — invisible fix):**\n1. Have someone walk the floor while you're under it.\n2. Look for any visible movement of subfloor against joists.\n3. **Squeak-Ender bracket** ($5/each) screws to the joist and pulls the subfloor down with a wedge.\n4. Or drive 1-1/4" wood screws up through joist into subfloor.\n\n**FROM ABOVE (carpet):**\n1. Use a stud finder to locate the joists (16" or 24" on center).\n2. **Squeeeeek-No-More kit** ($25) — you drive special breakaway screws through the carpet and subfloor into the joist. Snap off the head, kit hides the hole.\n\n**FROM ABOVE (hardwood / engineered):**\n1. Find the joist.\n2. Predrill at an angle through the floor.\n3. Drive a trim screw, set the head, fill with wood filler matching the floor.\n\n**FROM ABOVE (tile / vinyl):**\n- Address from below.\n- Or: replace any cracked tiles + re-bond loose ones with adhesive.\n\n**Pro tip:** Lubricant tricks (talcum powder, graphite) are temporary — mechanical fix is the only permanent solution.`,
    safety: 'diy',
    cards: [
      { icon: 'dollar-sign', title: 'Squeak-Ender', value: '$5/each' },
      { icon: 'dollar-sign', title: 'Squeeeeek-No-More', value: '$25/kit' },
      { icon: 'clock', title: 'Time per squeak', value: '5–15 min' },
      { icon: 'gauge', title: 'Difficulty', value: 'Easy' }
    ],
    followups: [
      { label: 'Carpeted floor squeaks', action: 'q', value: 'How do I fix squeaky carpeted floors?' },
      { label: 'Hardwood squeaks', action: 'q', value: 'How do I fix squeaky hardwood floors?' }
    ]
  })
});

SCENARIOS.push({
  match: /(grout|regrout|re-grout|tile grout|cracked grout|grout repair)/,
  handler: () => ({
    text: `🧱 **Tile grout repair / regrouting:**\n\n**Spot repair (cracked grout, single tile area):**\n1. Use a **grout removal tool** (manual or oscillating multi-tool with grout blade).\n2. Remove old grout to at least 2/3 the depth.\n3. Vacuum dust thoroughly.\n4. Mix new grout to match (sanded for joints > 1/8", unsanded for tighter).\n5. Apply with rubber float at 45° angle.\n6. Wait 15-20 min, wipe with damp sponge in circles.\n7. Buff haze after 2-3 hours.\n8. Seal with grout sealer after 7 days.\n\n**Whole-room regrout (1-2 days):**\n- Same process, just scaled up.\n- Rent a **grout removal tool** ($30/day) instead of doing it manually.\n- Cost: $50-100 in materials for a typical bathroom.\n\n**Should you replace grout or just clean it?**\n- **Clean first:** Oxygen bleach + scrub brush. Or a steam cleaner. 70% of "ugly grout" just needs deep cleaning.\n- **Regrout when:** Cracking, missing chunks, mold/mildew won't come out, tiles have shifted.\n\n**Pro tip:** Use **epoxy grout** (Spectralock, Mapei Kerapoxy) for high-moisture areas. Costs more, harder to install, but waterproof and stain-proof.`,
    safety: 'diy',
    cards: [
      { icon: 'dollar-sign', title: 'Materials', value: '$50–$100' },
      { icon: 'dollar-sign', title: 'Tool rental', value: '$30/day' },
      { icon: 'clock', title: 'Time', value: '1–2 days', note: 'Whole bathroom' }
    ],
    followups: [
      { label: 'Should I clean or regrout?', action: 'q', value: 'How do I know if I should clean or regrout my tile?' },
      { label: 'Mold in grout', action: 'q', value: "There's mold in my grout — how do I get rid of it?" }
    ]
  })
});

SCENARIOS.push({
  match: /(scratch|scratched|gouge|dent).{0,15}(hardwood|wood floor|engineered|vinyl|laminate|lvp|lvt)/,
  handler: () => ({
    text: `🪵 **Floor scratch repair** — by floor type:\n\n**Hardwood (solid or engineered):**\n- **Light surface scratches:** Use a wood floor cleaner + a stain-matched **scratch cover marker** ($8) or **Howard Restor-A-Finish** ($15).\n- **Deeper scratches (into the wood):** Sand the area lightly with 220-grit, apply matching **wood filler stick**, buff smooth.\n- **Whole-floor refinish:** $3-7/sqft pro, or DIY with rented drum sander.\n\n**Engineered hardwood:**\n- Wear layer is thin (0.6mm-3mm) — limited refinishing capability.\n- Use the **fill + match** method. Don't sand deep.\n\n**LVP / LVT (luxury vinyl plank/tile):**\n- Most are scratch-resistant but not scratch-proof.\n- For minor scratches: **Quickshine LVP polish** or a small dab of **car polish**.\n- For deeper damage: pop the plank and replace it (LVP is click-lock).\n\n**Laminate:**\n- Cannot be refinished. Use color-matched **laminate floor repair kit** with hard wax fillers.\n- Can replace single planks if they're click-together.\n\n**Tile:**\n- Hairline cracks can be filled with **two-part epoxy** color-matched.\n- Replace the tile if the crack is wide or chip is deep.`,
    safety: 'diy',
    cards: [
      { icon: 'dollar-sign', title: 'Marker / wax stick', value: '$8–$15' },
      { icon: 'dollar-sign', title: 'Replacement plank', value: '$5–$30' },
      { icon: 'dollar-sign', title: 'Whole-floor refinish', value: '$3–$7/sqft' },
      { icon: 'clock', title: 'Spot fix', value: '15 min' }
    ],
    followups: [
      { label: 'How to refinish hardwood?', action: 'q', value: 'How do I refinish my hardwood floors?' },
      { label: 'Replace single LVP plank', action: 'q', value: 'How do I replace a single LVP plank?' },
      { label: 'Get refinish estimate', action: 'estimator' }
    ]
  })
});

SCENARIOS.push({
  match: /(install|new|laying|lay).{0,15}(vinyl|lvp|lvt|laminate|hardwood|engineered).{0,15}floor/,
  handler: () => ({
    text: `🪵 **Floor installation** — by type:\n\n**LVP / LVT (Luxury Vinyl Plank/Tile)** — easiest DIY:\n- Click-lock floating install over almost any subfloor.\n- Acclimate planks 48 hrs in the room.\n- Underlayment included or required.\n- Allow 1/4" expansion gap at walls (covered by baseboard).\n- Cost: $2-7/sqft material, $1-3/sqft labor.\n\n**Laminate** — also easy DIY:\n- Similar process to LVP.\n- Less water-resistant (avoid for bathrooms unless waterproof variant).\n- Cost: $1-4/sqft material, $1-2/sqft labor.\n\n**Engineered hardwood:**\n- Click-lock floating, glue-down, or nail-down.\n- Acclimate 5-7 days.\n- Cost: $4-12/sqft material, $3-6/sqft labor.\n\n**Solid hardwood:**\n- Always nail-down.\n- Acclimate 7-14 days at conditioned temp + humidity.\n- Subfloor must be flat (1/8" in 6 ft) and dry.\n- Cost: $5-15/sqft material, $4-8/sqft labor.\n\n**Tile (porcelain / ceramic):**\n- Most prep-intensive. Cement board or uncoupling membrane required.\n- Wet saw rental: $50/day.\n- Cost: $2-15/sqft material, $5-15/sqft labor.\n\n**Subfloor checks (any floor):**\n1. **Flat:** 1/8" deviation in 6 ft for hard surfaces. Self-leveling compound if not.\n2. **Solid:** Squeaky? Fix before installing.\n3. **Dry:** Tape a 2'x2' plastic sheet to concrete for 24 hrs. Moisture under = need vapor barrier.`,
    safety: 'diy',
    cards: [
      { icon: 'dollar-sign', title: 'LVP DIY', value: '$2–$7/sqft' },
      { icon: 'dollar-sign', title: 'Hardwood DIY', value: '$5–$15/sqft' },
      { icon: 'clock', title: '500 sqft DIY', value: '1–3 days' },
      { icon: 'gauge', title: 'Difficulty', value: 'Easy–Hard' }
    ],
    followups: [
      { label: 'Get full install estimate', action: 'estimator' },
      { label: 'Best floor for bathroom?', action: 'q', value: "What's the best flooring for a bathroom?" },
      { label: '🚀 Dispatch a flooring pro', action: 'dispatch' }
    ]
  })
});

// ── APPLIANCES (3 scenarios) ────────────────────────────────────────────────
SCENARIOS.push({
  match: /(install|new|hookup|hook up).{0,15}(dishwasher)/,
  handler: () => ({
    text: `🍽 **Dishwasher install** — 2-3 hour DIY:\n\n**You need:**\n- Water supply (hot water, 3/8" connection — usually a saddle valve from the hot water line under the sink, or a dedicated stub-out).\n- Drain (connects to disposal port or air gap).\n- 120V dedicated circuit (most homes have this).\n\n**Pre-install checks:**\n1. **Water supply:** Is there a shut-off under the sink? If not, you need to add one ($15).\n2. **Drain:** New disposal? **Knock out the dishwasher port plug** before connecting — huge source of "new dishwasher won't drain" complaints.\n3. **Air gap (required by code in some states):** Mounted on the sink/countertop.\n\n**Steps:**\n1. **Shut off water + power** to the area.\n2. Slide unit out (if replacement). Disconnect water, drain, electrical.\n3. Slide new unit halfway in.\n4. **Connect water** to the inlet on the bottom-front. Use a 90° brass elbow + Teflon tape. Hand-tighten then 1/4 turn with wrench.\n5. **Connect drain** to disposal port (or air gap). Loop hose UP higher than the disposal connection (high-loop) to prevent backflow.\n6. **Connect electrical** — either plug-in or hardwire to junction box.\n7. Slide fully in, level with adjustable feet.\n8. Secure to underside of countertop with included brackets.\n9. **Restore water + power.**\n10. Run a test cycle. Check for leaks at all connections.`,
    safety: 'diy',
    cards: [
      { icon: 'dollar-sign', title: 'Dishwasher', value: '$400–$2,000' },
      { icon: 'dollar-sign', title: 'Install kit', value: '$25–$50', note: 'Hose, elbow, cord' },
      { icon: 'clock', title: 'Time', value: '2–3 hours' },
      { icon: 'gauge', title: 'Difficulty', value: 'Moderate' }
    ],
    codes: [
      { code: 'IPC 802', text: 'Dishwasher discharge must connect to drain via air gap or high-loop to prevent contamination.' }
    ],
    followups: [
      { label: 'No drain port at disposal', action: 'q', value: "My garbage disposal doesn't have a dishwasher drain port" },
      { label: 'Tile / quartz countertop bracket?', action: 'q', value: 'How do I secure a dishwasher under a quartz countertop?' },
      { label: '🚀 Dispatch an installer', action: 'dispatch' }
    ]
  })
});

SCENARIOS.push({
  match: /(washer|washing machine|dryer|laundry).{0,15}(install|hookup|hook up|new)/,
  handler: () => ({
    text: `🧺 **Washer + Dryer hookup:**\n\n**WASHER requirements:**\n- Hot + cold water supply (3/4" hose threads on most modern units).\n- Drain — either a 2" standpipe (preferred) or laundry sink.\n- 120V outlet on its own circuit (or shared with dryer for non-electric dryers).\n\n**DRYER requirements (electric):**\n- 240V dedicated circuit on a 30A breaker.\n- 4-prong outlet (NEMA 14-30) — pre-1996 homes have 3-prong (NEMA 10-30); upgrade or use a 3-prong cord.\n- 4" rigid metal vent to exterior — **NOT plastic flex**. Plastic flex is a fire hazard.\n- Vent run as short as possible, max 25 ft minus 5 ft per 90° elbow.\n\n**DRYER (gas):**\n- 1/2" gas line with shutoff valve.\n- 120V outlet for igniter / control board.\n- Same venting as electric.\n- **Permit required** for new gas line.\n\n**Install steps:**\n\n**Washer:**\n1. Connect hot + cold supply hoses. Use NEW hoses (5-yr lifespan, common failure = flood). Stainless braided > rubber.\n2. Drain hose into standpipe (don't push deeper than 6").\n3. Plug in.\n4. Level — front to back AND left to right.\n\n**Dryer:**\n1. Connect vent (rigid metal, 4 sheet-metal screws max).\n2. Plug in (or wire if hardwired).\n3. Connect gas line (gas units only, with leak test using soapy water).\n4. Slide back, leaving 6" min for vent clearance.`,
    safety: 'permit',
    cards: [
      { icon: 'dollar-sign', title: 'Washer', value: '$500–$2,000' },
      { icon: 'dollar-sign', title: 'Dryer', value: '$500–$1,500' },
      { icon: 'dollar-sign', title: 'Hoses + cord', value: '$50–$100' },
      { icon: 'clock', title: 'Install time', value: '1–2 hours' }
    ],
    codes: [
      { code: 'IRC M1502', text: 'Dryer exhaust ducts shall be at least 4" diameter, smooth-walled, terminate outdoors, max 35 ft minus elbow penalties.' }
    ],
    followups: [
      { label: '3-prong → 4-prong upgrade', action: 'q', value: 'How do I upgrade a 3-prong dryer outlet to 4-prong?' },
      { label: 'Gas line for dryer', action: 'q', value: 'How do I install a gas line for a gas dryer?' },
      { label: '🚀 Dispatch a pro', action: 'dispatch' }
    ]
  })
});

SCENARIOS.push({
  match: /(install|new|range|stove|oven|cooktop).{0,20}(install|hookup|electric|gas|induction)/,
  handler: () => ({
    text: `🔥 **Range / cooktop install:**\n\n**Electric range (240V):**\n- 240V on a 40-50A circuit (check unit nameplate).\n- 4-prong outlet (NEMA 14-50) — not 3-prong (older homes).\n- 6-AWG copper wire on a 50A breaker (standard).\n- Anti-tip bracket required (code: IRC + manufacturer).\n\n**Gas range:**\n- 1/2" gas line with shutoff valve within 6 ft.\n- 120V outlet (igniter, controls, oven light).\n- Flexible appliance connector (yellow-coated stainless, listed for the appliance).\n- Anti-tip bracket required.\n\n**Induction cooktop:**\n- 240V on 40-50A circuit, hardwired typically.\n\n**Install (drop-in range):**\n1. **Power off** at breaker. Verify with non-contact tester.\n2. Connect appliance cord (4-prong: bare to green/box, white to neutral, red + black to two hot terminals).\n3. Slide range into place.\n4. Install anti-tip bracket — screws to floor or back wall, slot under the rear leg.\n5. Restore power, test all burners + oven.\n\n**Gas connection extra steps:**\n4. Apply yellow gas-rated thread sealant (not Teflon tape).\n5. Tighten flex connector.\n6. **Leak test** with soapy water on every joint. Bubbles = leak.\n\n**Anti-tip bracket** is required and frequently skipped — kids climbing on the open oven door is a major injury source.`,
    safety: 'permit',
    cards: [
      { icon: 'dollar-sign', title: 'Range', value: '$500–$3,000+' },
      { icon: 'dollar-sign', title: 'Anti-tip bracket', value: '$10', note: 'Required by code' },
      { icon: 'clock', title: 'Install time', value: '1–2 hours' },
      { icon: 'gauge', title: 'Difficulty', value: 'Moderate' }
    ],
    codes: [
      { code: 'IRC M1901', text: 'Cooking appliances must be installed per manufacturer instructions, including anti-tip device for ranges.' },
      { code: 'NFPA 54', text: 'Gas connector and shutoff valve required at appliance, accessible without tools.' }
    ],
    followups: [
      { label: 'Going from gas to induction', action: 'q', value: 'How do I switch from a gas range to induction?' },
      { label: '3-prong outlet, new 4-prong range', action: 'q', value: 'My outlet is 3-prong but my new range came with a 4-prong cord' },
      { label: '🚀 Dispatch an installer', action: 'dispatch' }
    ]
  })
});

// ── PROFESSIONAL CLEANING (6 scenarios) ────────────────────────────────────
SCENARIOS.push({
  match: /(deep clean|deep cleaning|whole.?house clean|whole.?home clean|spring clean)/,
  handler: () => ({
    text: `🧽 **Deep cleaning a whole home** — here's the pro checklist:\n\n**Top-down rule:** Always start high, end low. Dust falls — clean the floor last.\n\n**Whole-home deep clean order (6–10 hrs for 2,000 sq ft):**\n1. **Declutter first** (1 hr)\n2. **Dust ceilings, fans, vents, crown molding**\n3. **Wipe walls + baseboards** — Magic Eraser for scuffs\n4. **Light fixtures + bulbs**\n5. **Windows (interior)** — Windex + microfiber, never paper towels\n6. **Kitchen deep:**\n   - Empty + wipe inside cabinets/drawers\n   - Degrease range hood + filter\n   - Clean oven (self-clean cycle OR baking soda paste)\n   - Pull fridge, vacuum coils, clean under it\n   - Sanitize sink with bleach solution\n7. **Bathrooms deep:**\n   - Soak shower head in vinegar bag overnight\n   - Scrub grout (oxy-clean paste + stiff brush)\n   - Descale toilet bowl with pumice stone\n8. **Bedrooms** — flip mattresses, wash bedding, vacuum under beds.\n9. **Floors last** — sweep, vacuum, mop. Steam clean carpets if scheduled.\n\n**Pro tip:** Hire help for spring cleaning every 6 months. Typical cost: $250–$600 for 2,000 sq ft.`,
    safety: 'diy',
    cards: [
      { icon: 'dollar-sign', title: 'DIY supplies', value: '$50–$100', note: 'One-time stock-up' },
      { icon: 'dollar-sign', title: 'Pro service', value: '$250–$600', note: 'Whole-home deep clean' },
      { icon: 'clock', title: 'DIY time', value: '6–10 hrs', note: '2,000 sq ft' },
      { icon: 'gauge', title: 'Difficulty', value: 'Easy', note: 'Just thorough' }
    ],
    followups: [
      { label: 'Move-out / move-in cleaning', action: 'q', value: 'How do I do a move-out cleaning to get my deposit back?' },
      { label: 'Get cleaning estimate', action: 'estimator' },
      { label: '🚀 Dispatch a cleaning pro', action: 'dispatch' },
      { label: 'Recurring service plans', action: 'q', value: 'How often should I schedule recurring cleaning service?' }
    ]
  })
});

SCENARIOS.push({
  match: /(move.?out|move.?in|moving out|deposit back|landlord clean|tenant clean)/,
  handler: () => ({
    text: `📦 **Move-out cleaning checklist** (the kind that gets your deposit back):\n\nLandlords typically deduct $200–$500 from deposits for inadequate cleaning. A pro move-out clean costs $300–$600 — often less than the deduction.\n\n**The "deposit back" checklist:**\n\n**Kitchen (the #1 deduction zone):**\n- ☑ Inside oven — bake-on grease must go\n- ☑ Inside fridge + freezer — defrost, scrub shelves, wipe gaskets\n- ☑ Inside ALL cabinets + drawers\n- ☑ Range hood + filter degreased\n- ☑ Microwave — interior + turntable\n- ☑ Dishwasher — run an empty cycle with cleaner tablet\n- ☑ Behind/under fridge + stove\n\n**Bathroom:**\n- ☑ Tub/shower scrubbed, no soap scum\n- ☑ Toilet — bowl, base, behind\n- ☑ Mirror + chrome polished\n- ☑ Inside vanity drawers/cabinet\n- ☑ Grout free of mildew\n\n**Whole apartment:**\n- ☑ Walls — patch nail holes, touch-up paint\n- ☑ Baseboards wiped\n- ☑ Window tracks vacuumed (often missed!)\n- ☑ All blinds dusted\n- ☑ Closets emptied + shelves wiped\n- ☑ Ceiling fans dusted\n- ☑ Floors — vacuum, mop hardwood, shampoo carpet\n\n**Pro tip:** Document everything with date-stamped photos AFTER cleaning. Email them to the landlord same day. Disputes drop dramatically.\n\n**Worth hiring out?** Yes if your deposit is over $500.`,
    safety: 'diy',
    cards: [
      { icon: 'dollar-sign', title: 'Pro move-out', value: '$300–$600', note: '1,000–1,500 sq ft' },
      { icon: 'dollar-sign', title: 'Carpet shampoo', value: '$150–$300', note: 'Often required separately' },
      { icon: 'clock', title: 'DIY time', value: '8–12 hrs', note: 'Plus carpet drying' },
      { icon: 'gauge', title: 'Difficulty', value: 'Tedious', note: 'Inspector-grade' }
    ],
    followups: [
      { label: 'Carpet shampoo or steam clean?', action: 'q', value: 'Should I shampoo or steam clean carpets before move-out?' },
      { label: 'Wall patch + paint touchup', action: 'q', value: 'How do I patch nail holes and touch up paint?' },
      { label: '🚀 Book a move-out clean', action: 'dispatch' },
      { label: 'Get exact cost', action: 'estimator' }
    ]
  })
});

SCENARIOS.push({
  match: /(post.?construction|construction clean|after.?renovation|after.?remodel|renovation clean|drywall dust|construction debris)/,
  handler: () => ({
    text: `🔨 **Post-construction cleanup** — drywall dust gets EVERYWHERE. Here's how the pros handle it:\n\n**Why it's different from regular cleaning:**\nDrywall dust is microscopic and electrostatic. It sticks to everything and re-deposits when disturbed.\n\n**The 3-pass system (pro standard):**\n\n**Pass 1: Rough cleanup (debris removal)**\n- Remove all visible debris, scraps, packaging\n- Sweep gross dust into piles, vacuum with **HEPA shop vac**\n- Pull all blue tape, plastic sheeting, paper protection\n- Clean light fixtures (bulbs out, glass washed)\n\n**Pass 2: Fine dust attack**\n- HEPA vacuum **EVERYTHING**: walls, ceilings, vents, top of doors, inside outlets/switches, inside cabinets, window tracks\n- Replace ALL HVAC filters — drywall dust destroys them\n- Wet-mop floors with microfiber TWICE\n- Wipe down every horizontal surface with damp microfiber\n\n**Pass 3: Detail + polish**\n- Re-vacuum any settled dust\n- Polish glass, chrome, stainless\n- Clean inside appliances\n- Run HVAC with new filter for 24 hrs to capture airborne particles\n\n**Critical pro tools:**\n- **HEPA shop vac** ($150–$300) — non-HEPA vacs don't capture fine dust\n- Microfiber cloths — color-coded by zone\n- Tack cloth for trim before final paint\n\n**Cost:** Pros charge $0.30–$0.50/sq ft. A 2,000 sq ft renovation = $600–$1,000.`,
    safety: 'permit',
    cards: [
      { icon: 'dollar-sign', title: 'Pro service', value: '$0.30–$0.50/sq ft', note: '$600–$1,000 typical' },
      { icon: 'dollar-sign', title: 'HEPA vac (DIY)', value: '$150–$300' },
      { icon: 'clock', title: 'Time', value: '1–2 days', note: '3-pass system' },
      { icon: 'gauge', title: 'Difficulty', value: 'Hard', note: 'Wear N95 mask' }
    ],
    followups: [
      { label: 'HEPA vacuum recommendations', action: 'q', value: 'What is the best HEPA vacuum for drywall dust?' },
      { label: 'HVAC filter replacement', action: 'q', value: 'When should I change HVAC filter after construction?' },
      { label: '🚀 Dispatch post-construction crew', action: 'dispatch' },
      { label: 'Get cleanup estimate', action: 'estimator' }
    ]
  })
});

SCENARIOS.push({
  match: /(pressure wash|power wash|driveway clean|deck clean|siding clean|exterior clean|house wash)/,
  handler: () => ({
    text: `💦 **Pressure washing** — done right, transforms a home. Done wrong, destroys siding, lifts paint, and gouges wood.\n\n**Critical PSI rules:**\n- **Vinyl/aluminum siding:** 1,300–1,600 PSI (soft wash with house wash detergent)\n- **Wood deck/fence:** 500–1,200 PSI **MAX** — higher gouges the grain\n- **Concrete driveway:** 3,000+ PSI with surface cleaner attachment\n- **Brick:** 1,500–2,000 PSI (avoid mortar joints)\n- **Stucco:** Soft wash only — 1,200 PSI max\n\n**The right way (most homeowners get it wrong):**\n\n**House wash (soft wash):**\n1. Use a **downstream injector** to pull house-wash mix (sodium hypochlorite + surfactant).\n2. Apply bottom-to-top (prevents streaks).\n3. Let dwell 5–10 min.\n4. Rinse top-to-bottom with low pressure (1,300 PSI), 25° tip, 18" away.\n5. **NEVER** spray upward into siding seams.\n\n**Driveway:**\n1. Sweep, then pre-treat oil stains with degreaser.\n2. Use a **surface cleaner attachment** (rotating dual nozzle).\n3. Move at steady walking pace.\n4. Optional: seal driveway 24–48 hrs after cleaning.\n\n**Common DIY mistakes:**\n- Using 0° tip on anything (always rips/etches)\n- Spraying up into siding (water intrusion)\n- Forgetting to wet plants before/after (chemicals burn foliage)\n\n**When to hire out:** 2-story homes, large driveways, painted exteriors at risk of paint lift. Pro service runs $250–$600 for a typical home + driveway.`,
    safety: 'diy',
    cards: [
      { icon: 'dollar-sign', title: 'Pro pressure wash', value: '$250–$600', note: 'House + driveway' },
      { icon: 'dollar-sign', title: 'Rent washer', value: '$80–$120/day', note: 'Home Depot / Lowe\'s' },
      { icon: 'clock', title: 'Time', value: '4–8 hours' },
      { icon: 'gauge', title: 'Difficulty', value: 'Moderate', note: 'Wear safety glasses' }
    ],
    followups: [
      { label: 'Best pressure washer to buy?', action: 'q', value: 'What size pressure washer should I buy for residential use?' },
      { label: 'Stain my deck after washing?', action: 'q', value: 'How long after pressure washing should I stain my deck?' },
      { label: '🚀 Hire pressure washing pro', action: 'dispatch' },
      { label: 'Get exterior cleaning estimate', action: 'estimator' }
    ]
  })
});

SCENARIOS.push({
  match: /(carpet clean|carpet shampoo|steam clean carpet|upholstery clean|rug clean|stain.*carpet|pet stain)/,
  handler: () => ({
    text: `🧼 **Carpet & upholstery cleaning** — the complete approach:\n\n**3 cleaning levels:**\n\n**1. Surface vacuum (weekly)**\n- HEPA vacuum, slow passes (3 passes per area)\n- High-traffic zones: every 2–3 days\n\n**2. Spot treatment (as needed)**\n- **Coffee/wine:** Blot → cold water → 1 tbsp dish soap + 1 tbsp white vinegar in 2 cups warm water → blot → rinse → blot dry\n- **Pet urine:** Blot → enzymatic cleaner (Nature's Miracle) → let dwell 10 min → blot → repeat. **Critical:** enzymes break down the protein.\n- **Grease/makeup:** Cornstarch overnight → vacuum → followed by detergent solution\n- **Blood:** Cold water ONLY (hot sets it). Hydrogen peroxide on light carpets.\n\n**3. Deep clean (every 6–12 months)**\n- **Hot water extraction (steam clean):** Best method. $25–$75/room pro, $35–$70/day DIY rental.\n- **Encapsulation:** Pro low-moisture method, dries in 1–2 hrs (vs 6–24 for steam)\n\n**Pro tips:**\n- Pre-vacuum thoroughly before any wet method\n- Pre-treat traffic lanes with carpet pre-spray\n- Use clean water for the rinse pass\n- Set fans on cleaned carpet for 4–8 hrs to prevent musty smell\n\n**Upholstery:**\n- Always check fabric code: **W** (water OK), **S** (solvent only), **WS** (both), **X** (vacuum only — pro required)\n- Test in hidden spot first`,
    safety: 'diy',
    cards: [
      { icon: 'dollar-sign', title: 'Pro carpet clean', value: '$25–$75/room', note: '$150–$400 typical home' },
      { icon: 'dollar-sign', title: 'DIY rental', value: '$35–$70/day' },
      { icon: 'clock', title: 'Pro time', value: '1–3 hours', note: '+ 4–6 hr dry' },
      { icon: 'gauge', title: 'Difficulty', value: 'Easy' }
    ],
    followups: [
      { label: 'Pet urine completely soaked', action: 'q', value: 'My carpet is soaked with pet urine, can it be saved?' },
      { label: 'Steam vs encapsulation?', action: 'q', value: 'Which is better steam cleaning or encapsulation?' },
      { label: '🚀 Book a carpet cleaning pro', action: 'dispatch' },
      { label: 'Get cleaning estimate', action: 'estimator' }
    ]
  })
});

SCENARIOS.push({
  match: /(maid service|recurring clean|weekly clean|biweekly clean|bi.?weekly clean|monthly clean|cleaning service|house cleaner|housekeeper)/,
  handler: () => ({
    text: `🏡 **Recurring cleaning service** — the smart guide:\n\n**Frequency recommendations (by household type):**\n\n| Household | Recommended Frequency | Avg cost (2,000 sq ft) |\n|-----------|----------------------|------------------------|\n| Single, no pets | Bi-weekly | $120–$180/visit |\n| Couple, no pets | Bi-weekly | $140–$200/visit |\n| Family with kids | Weekly | $150–$220/visit |\n| Pets (1+) | Weekly | $160–$240/visit |\n| Allergies / asthma | Weekly + monthly deep | $180–$260/visit |\n| Light traffic / WFH solo | Monthly | $200–$300/visit |\n\n**What's typically included (standard clean):**\n- Dust + wipe all surfaces\n- Vacuum + mop floors\n- Bathroom: toilet, tub, sink, mirror, floor\n- Kitchen: counters, exterior of appliances, sink, stovetop, floor\n- Trash + linens (if requested)\n- General tidying\n\n**What's typically EXTRA (ask first):**\n- Inside oven / fridge\n- Inside cabinets\n- Windows\n- Walls / baseboards (deep clean)\n- Laundry, dishes, organizing\n\n**Pro tips for hiring:**\n1. **Get 3 quotes** — prices vary 30–50% between companies\n2. **Ask: insured + bonded?**\n3. **Same crew each visit?** Consistency improves quality 2–3 visits in\n4. **Initial deep clean first** — costs 1.5–2× normal but resets the baseline\n\n**Money-saving tip:** Bi-weekly + a quarterly deep clean is the sweet spot for most families. Costs ~$3,500/yr vs ~$7,000 for weekly+ deep cleans.`,
    safety: 'diy',
    cards: [
      { icon: 'dollar-sign', title: 'Bi-weekly avg', value: '$120–$200/visit' },
      { icon: 'dollar-sign', title: 'Initial deep clean', value: '$300–$600', note: '1.5–2× standard' },
      { icon: 'clock', title: 'Time per visit', value: '2–4 hours', note: '2-cleaner crew' },
      { icon: 'gauge', title: 'Hire difficulty', value: 'Easy', note: 'Get 3 quotes' }
    ],
    followups: [
      { label: 'How to find vetted cleaners?', action: 'pros' },
      { label: '🚀 Match me with a cleaning pro', action: 'dispatch' },
      { label: 'Custom recurring estimate', action: 'estimator' },
      { label: 'Tipping etiquette', action: 'q', value: 'How much should I tip my house cleaner?' }
    ]
  })
});

// ── DISASTER RELIEF (1 scenario) ────────────────────────────────────────────
SCENARIOS.push({
  match: /(disaster|flood|flooded|water damage|water removal|water extraction|mitigation|fire damage|smoke damage|storm damage|sewage backup|black water|mold remediation|restoration company)/,
  handler: () => ({
    text: `🚨 **Disaster Relief — what to do RIGHT NOW:**\n\n**FIRST: Safety**\n1. Get everyone out if structural integrity is in question\n2. Shut off main water if it's a leak/flood\n3. Shut off power at the main breaker if water touches outlets/fixtures\n4. Don't enter flooded areas with active power\n5. For sewage backup: stay out — Cat-3 black water has dangerous pathogens\n\n**SECOND: Document everything (this saves you thousands on insurance)**\n- Photos of every affected room BEFORE cleanup\n- Video walkthrough narrating damage\n- Save damaged items in a pile (don't throw out yet)\n- Receipts for any emergency expenses (hotel, food, supplies)\n\n**THIRD: Call professionals (the 24-hour rule)**\nMold starts growing in **24–48 hours** in wet materials. Every hour matters.\n- Call your insurance carrier — open a claim immediately\n- Call IICRC-certified disaster relief (we dispatch in <60 min)\n- Pros bring **truck-mount water extraction** (10× faster than DIY shop vacs)\n- They place **industrial dehumidifiers + air movers** for structural drying\n- They apply **antimicrobial treatment** to prevent mold\n\n**The 4 disaster relief categories:**\n\n| Type | What's involved | Typical cost |\n|------|----------------|-------------|\n| **Water damage** | Extraction, drying, dehumidification, sanitization | $3,500–$15,000 |\n| **Fire/smoke** | Soot removal, ozone treatment, content cleaning, deodorization | $5,800–$50,000+ |\n| **Storm damage** | Tarping, board-up, structural securing, debris removal | $4,200–$25,000 |\n| **Sewage (Cat-3)** | PPE-required cleanup, demo of saturated materials, antimicrobial | $3,200–$12,000 |\n\n**Our crews are IICRC certified (WRT, ASD, AMRT) and bill insurance directly — typical out-of-pocket is your deductible only.**`,
    safety: 'pro',
    cards: [
      { icon: 'truck-medical', title: 'Response time', value: '< 60 min', note: 'Metro area' },
      { icon: 'dollar-sign', title: 'Out of pocket', value: 'Often $0', note: 'Insurance covers most' },
      { icon: 'clock', title: 'Drying timeline', value: '3–5 days', note: 'Industrial equipment' },
      { icon: 'shield-halved', title: 'Certification', value: 'IICRC', note: 'WRT · ASD · AMRT' }
    ],
    codes: [
      { code: 'IICRC S500', text: 'Standard for water damage restoration — defines categories (Cat-1 clean, Cat-2 grey, Cat-3 black) and required protocols.' },
      { code: 'IICRC S520', text: 'Standard for mold remediation — containment, PPE, and clearance testing requirements.' }
    ],
    citations: [
      { label: 'IICRC — Standards', url: 'https://iicrc.org/page/IICRCStandards' },
      { label: 'FEMA — Flood Recovery', url: 'https://www.fema.gov/flood' },
      { label: 'EPA — Mold After a Flood', url: 'https://www.epa.gov/mold/mold-cleanup-your-home' }
    ],
    followups: [
      { label: '🚨 Dispatch Disaster Relief NOW', action: 'dispatch' },
      { label: "Will my insurance cover this?", action: 'q', value: "How do I know if my homeowner's insurance covers water damage?" },
      { label: 'Mold prevention timeline', action: 'q', value: 'How quickly does mold grow after water damage?' },
      { label: 'Get cleanup estimate', action: 'estimator' }
    ]
  })
});

// ─────────────────────────────────────────────
// Scenario matching
// ─────────────────────────────────────────────
function matchScenario(text) {
  const lower = (text || '').toLowerCase();
  for (const scenario of SCENARIOS) {
    if (scenario.match.test(lower)) {
      return scenario.handler(text);
    }
  }
  return null;
}

// ─────────────────────────────────────────────
// Sub-components for rendering a bot response
// ─────────────────────────────────────────────

function SafetyBadge({ safety }) {
  const cfg = SAFETY_CONFIG[safety] || SAFETY_CONFIG.diy;
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '4px 12px',
      borderRadius: '20px',
      backgroundColor: cfg.bg,
      color: cfg.color,
      border: `1px solid ${cfg.color}40`,
      fontSize: '0.8rem',
      fontWeight: '600',
      marginBottom: '12px',
    }}>
      {cfg.icon}
      {cfg.label}
    </div>
  );
}

function InfoCard({ card }) {
  const IconComp = CARD_ICONS[card.icon];
  return (
    <div style={{
      background: 'rgba(28, 94, 115, 0.15)',
      border: '1px solid rgba(28, 94, 115, 0.3)',
      borderRadius: '8px',
      padding: '10px 14px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px',
      flex: '1 1 160px',
      minWidth: '140px',
    }}>
      <div style={{ color: '#22D3EE', fontSize: '1rem', marginTop: '2px' }}>
        {IconComp ? <IconComp /> : <FaDollarSign />}
      </div>
      <div>
        <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {card.title}
        </div>
        <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#e2e8f0', marginTop: '2px' }}>
          {card.value}
        </div>
        {card.note && (
          <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px' }}>
            {card.note}
          </div>
        )}
      </div>
    </div>
  );
}

function CodeReference({ code }) {
  return (
    <div style={{
      background: 'rgba(245, 158, 11, 0.08)',
      border: '1px solid rgba(245, 158, 11, 0.25)',
      borderLeft: '3px solid #F59E0B',
      borderRadius: '6px',
      padding: '10px 14px',
      marginTop: '8px',
    }}>
      <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#F59E0B', fontFamily: 'monospace', marginBottom: '4px' }}>
        {code.code}
      </div>
      <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: '1.5' }}>
        {code.text}
      </div>
    </div>
  );
}

function CitationLink({ citation }) {
  return (
    <a
      href={citation.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '0.78rem',
        color: '#22D3EE',
        textDecoration: 'none',
        padding: '4px 10px',
        border: '1px solid rgba(34, 211, 238, 0.3)',
        borderRadius: '4px',
        transition: 'all 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(34,211,238,0.1)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <FaBook style={{ fontSize: '0.7rem' }} />
      {citation.label}
      <FaExternalLinkAlt style={{ fontSize: '0.6rem' }} />
    </a>
  );
}

function FollowUpButton({ followup, onAction }) {
  const isDispatch = followup.action === 'dispatch';
  const isEstimator = followup.action === 'estimator';
  const isPros = followup.action === 'pros';
  const isProduct = followup.action === 'product';

  let style = {
    padding: '8px 14px',
    borderRadius: '8px',
    fontSize: '0.82rem',
    fontWeight: '600',
    cursor: 'pointer',
    border: '1px solid rgba(34, 211, 238, 0.4)',
    background: 'rgba(28, 94, 115, 0.3)',
    color: '#22D3EE',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
  };

  if (isDispatch) {
    style = { ...style, background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239,68,68,0.5)', color: '#EF4444' };
  } else if (isEstimator) {
    style = { ...style, background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16,185,129,0.4)', color: '#10B981' };
  }

  return (
    <button
      style={style}
      onClick={() => onAction(followup)}
      onMouseEnter={e => {
        if (isDispatch) e.currentTarget.style.background = 'rgba(239,68,68,0.25)';
        else if (isEstimator) e.currentTarget.style.background = 'rgba(16,185,129,0.25)';
        else e.currentTarget.style.background = 'rgba(34,211,238,0.2)';
      }}
      onMouseLeave={e => {
        if (isDispatch) e.currentTarget.style.background = 'rgba(239,68,68,0.15)';
        else if (isEstimator) e.currentTarget.style.background = 'rgba(16,185,129,0.15)';
        else e.currentTarget.style.background = 'rgba(28,94,115,0.3)';
      }}
    >
      {isDispatch && <span>🚀</span>}
      {isEstimator && <FaDollarSign style={{ fontSize: '0.75rem' }} />}
      {isProduct && <FaShoppingCart style={{ fontSize: '0.75rem' }} />}
      {isPros && <span>👥</span>}
      {followup.label}
    </button>
  );
}

function BotResponse({ response, onAction }) {
  if (!response) return null;

  const renderedText = response.text;

  return (
    <div>
      {response.safety && <SafetyBadge safety={response.safety} />}

      <div
        style={{ lineHeight: '1.7', fontSize: '0.92rem', color: '#CBD5E1', whiteSpace: 'pre-wrap', marginBottom: '16px' }}
        dangerouslySetInnerHTML={{ __html: renderedText }}
      />

      {response.cards && response.cards.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
          {response.cards.map((card, i) => (
            <InfoCard key={i} card={card} />
          ))}
        </div>
      )}

      {response.codes && response.codes.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          {response.codes.map((code, i) => (
            <CodeReference key={i} code={code} />
          ))}
        </div>
      )}

      {response.citations && response.citations.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
          {response.citations.map((cite, i) => (
            <CitationLink key={i} citation={cite} />
          ))}
        </div>
      )}

      {response.followups && response.followups.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {response.followups.map((fu, i) => (
            <FollowUpButton key={i} followup={fu} onAction={onAction} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Chat bubble components
// ─────────────────────────────────────────────
function UserBubble({ text }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
      <div style={{
        maxWidth: '78%',
        background: 'linear-gradient(135deg, #1C5E73 0%, #22D3EE 100%)',
        color: '#fff',
        borderRadius: '16px 16px 4px 16px',
        padding: '10px 16px',
        fontSize: '0.9rem',
        lineHeight: '1.5',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      }}>
        {text}
      </div>
    </div>
  );
}

function BotBubble({ children }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '12px' }}>
      <div style={{
        maxWidth: '85%',
        background: '#0F1F2C',
        color: '#CBD5E1',
        borderRadius: '16px 16px 16px 4px',
        padding: '14px 18px',
        fontSize: '0.9rem',
        lineHeight: '1.6',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        border: '1px solid rgba(28, 94, 115, 0.3)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #1C5E73, #22D3EE)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.8rem',
          }}>
            <FaRobot color="#fff" />
          </div>
          <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#22D3EE' }}>
            CoachBot AI
          </span>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main CoachBot component
// ─────────────────────────────────────────────
const CoachBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [markedReady, setMarkedReady] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Inject Marked.js CDN
  useEffect(() => {
    if (window.marked) {
      setMarkedReady(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
    script.onload = () => {
      if (window.marked) {
        window.marked.setOptions({ breaks: true, gfm: true });
        setMarkedReady(true);
      }
    };
    document.head.appendChild(script);
  }, []);

  // Parse markdown helper
  const parseMarkdown = useCallback((text) => {
    if (!text) return '';
    if (typeof window !== 'undefined' && window.marked) {
      return window.marked.parse(text);
    }
    // Fallback: just return escaped HTML
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`{3}[\s\S]*?`{3}/g, (m) => `<pre>${m.replace(/`{3}/g, '')}</pre>`)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/^#{1,6} (.*)/gm, '<strong>$1</strong>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>');
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleAction = useCallback((followup) => {
    if (followup.action === 'q' && followup.value) {
      setInput(followup.value);
      handleSubmit(null, followup.value);
    } else if (followup.action === 'dispatch') {
      window.location.href = '/emergency';
    } else if (followup.action === 'estimator') {
      window.location.href = '/estimator';
    } else if (followup.action === 'product') {
      window.location.href = '/shop';
    } else if (followup.action === 'pros') {
      window.location.href = '/pros';
    }
  }, [input]);

  const handleSubmit = useCallback((e, overrideText) => {
    const text = (overrideText !== undefined ? overrideText : input).trim();
    if (!text || isTyping) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');
    setIsTyping(true);

    // Simulate async bot response
    setTimeout(() => {
      const scenarioResponse = matchScenario(text);

      let botText;
      if (scenarioResponse) {
        botText = parseMarkdown(scenarioResponse.text);
        // Add parsed text to response for BotResponse
        scenarioResponse._parsedText = botText;
        setMessages(prev => [...prev, { role: 'bot', response: scenarioResponse }]);
      } else {
        const fallbackLines = [
          `🤖 I'm CoachBot AI, your ACDC Pros home repair assistant. I specialize in:\n`,
          `• 🔧 **Plumbing** — faucets, leaks, water heaters, garbage disposals`,
          `• ⚡ **Electrical** — outlets, switches, light fixtures, ceiling fans`,
          `• 🚪 **Doors & Windows** — replacement, repair, weatherstripping`,
          `• ❄️ **HVAC** — filters, condensate, heat pumps, AC sizing`,
          `• 🏡 **Exterior** — gutters, decks, caulking, wood rot`,
          `• 🎨 **Drywall & Paint** — stains, texture, cabinet refinishing`,
          `• 🪵 **Flooring** — LVP, hardwood, grout, squeak repair`,
          `• 🍽 **Appliances** — dishwashers, washers, dryers, ranges`,
          `• 🧹 **Professional Cleaning** — deep cleans, move-out, post-renovation`,
          `\n**Try asking something like:**`,
          `• "How do I fix a leaky faucet?"`,
          `• "What does it cost to install a heat pump?"`,
          `• "My ceiling fan is wobbling — help!"`,
          `• "How do I clean grout in my shower?"`,
        ];
        botText = parseMarkdown(fallbackLines.join('\n'));
        const fallbackResponse = {
          text: fallbackLines.join('\n'),
          _parsedText: botText,
          safety: 'diy',
          followups: [],
        };
        setMessages(prev => [...prev, { role: 'bot', response: fallbackResponse }]);
      }
      setIsTyping(false);
      inputRef.current?.focus();
    }, 600);
  }, [input, isTyping, parseMarkdown]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }, [handleSubmit]);

  const quickPrompts = [
    'How do I fix a leaky faucet?',
    'What does a heat pump cost?',
    'My door is sagging — help!',
    'How do I clean grout?',
    'Low water pressure',
    'Ceiling fan wobble fix',
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      maxHeight: '80vh',
      background: '#0A0F14',
      borderRadius: '12px',
      border: '1px solid rgba(28, 94, 115, 0.4)',
      overflow: 'hidden',
      fontFamily: "'Roboto', sans-serif",
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1C5E73 0%, #0f3d4d 100%)',
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        borderBottom: '1px solid rgba(34, 211, 238, 0.2)',
      }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%',
          background: 'rgba(34, 211, 238, 0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <FaRobot color="#22D3EE" size={18} />
        </div>
        <div>
          <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#fff' }}>
            CoachBot AI
          </div>
          <div style={{ fontSize: '0.72rem', color: 'rgba(34, 211, 238, 0.8)' }}>
            ACDC Pros · 40+ Home Repair Scenarios · Powered by AI
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
          <div style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: '#10B981', boxShadow: '0 0 6px #10B981',
          }} />
          <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Online</span>
        </div>
      </div>

      {/* Chat area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px 20px',
        background: '#0A0F14',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', padding: '20px 0', color: '#64748b', fontSize: '0.85rem' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>🏠</div>
            <div style={{ fontWeight: '600', color: '#94a3b8', marginBottom: '6px' }}>
              Welcome to CoachBot AI
            </div>
            <div style={{ marginBottom: '16px' }}>
              Ask any home repair question — I have 40+ scenarios ready.
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
              {quickPrompts.map((q, i) => (
                <button
                  key={i}
                  onClick={() => { setInput(q); handleSubmit(null, q); }}
                  style={{
                    background: 'rgba(28, 94, 115, 0.2)',
                    border: '1px solid rgba(28, 94, 115, 0.4)',
                    borderRadius: '20px',
                    padding: '6px 14px',
                    fontSize: '0.78rem',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(28,94,115,0.4)';
                    e.currentTarget.style.color = '#22D3EE';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(28,94,115,0.2)';
                    e.currentTarget.style.color = '#94a3b8';
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i}>
            {msg.role === 'user' && <UserBubble text={msg.text} />}
            {msg.role === 'bot' && (
              <BotBubble>
                <BotResponse
                  response={{
                    ...msg.response,
                    text: msg.response._parsedText || parseMarkdown(msg.response.text),
                  }}
                  onAction={handleAction}
                />
              </BotBubble>
            )}
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '12px' }}>
            <div style={{
              background: '#0F1F2C',
              borderRadius: '16px 16px 16px 4px',
              padding: '12px 18px',
              border: '1px solid rgba(28, 94, 115, 0.3)',
            }}>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: '7px', height: '7px', borderRadius: '50%',
                    background: '#22D3EE',
                    animation: 'bounce 1.2s infinite',
                    animationDelay: `${i * 0.2}s`,
                  }} />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div style={{
        padding: '14px 16px',
        background: '#0A0F14',
        borderTop: '1px solid rgba(28, 94, 115, 0.3)',
        display: 'flex',
        gap: '10px',
        alignItems: 'flex-end',
      }}>
        <textarea
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about any home repair topic..."
          rows={1}
          style={{
            flex: 1,
            background: '#0F1F2C',
            border: '1px solid rgba(28, 94, 115, 0.5)',
            borderRadius: '10px',
            padding: '10px 14px',
            color: '#e2e8f0',
            fontSize: '0.88rem',
            resize: 'none',
            outline: 'none',
            fontFamily: 'inherit',
            lineHeight: '1.5',
            maxHeight: '120px',
            overflowY: 'auto',
          }}
          onInput={e => {
            e.target.style.height = 'auto';
            e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={!input.trim() || isTyping}
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: input.trim()
              ? 'linear-gradient(135deg, #1C5E73, #22D3EE)'
              : 'rgba(28, 94, 115, 0.3)',
            border: 'none',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: input.trim() && !isTyping ? 'pointer' : 'not-allowed',
            opacity: input.trim() && !isTyping ? 1 : 0.5,
            transition: 'all 0.2s',
            flexShrink: 0,
          }}
        >
          <FaPaperPlane size={16} />
        </button>
      </div>

      {/* CSS animation for typing dots */}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default CoachBot;