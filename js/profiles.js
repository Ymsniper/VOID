// ============================================================
// PSYCHOLOGICAL PROFILES
// ============================================================
const PROFILES = {
  predator:{
    word:"VOID",title:"The Predator",
    traits:["CALCULATIVE","OBSERVANT","COLD","SELF-AWARE"],
    desc:`<p>There is something in you that watches. Not with warmth or curiosity — with calculation. You understand people the way a hunter understands terrain: where they are soft, what motivates them, where they crack. This is not cruelty in the passionate sense. Cruelty requires feeling. What you carry is colder than that.</p><p>You are not without intelligence. Your intelligence is, in fact, precisely the problem. You see clearly, which means people become predictable, which means very little surprises you anymore, which means very little moves you. You have stood at the edge of your own reflection and chosen not to flinch. Most people do. You don't.</p><p>Whether that is strength or damage is a question you've probably stopped asking. The honest answer is: both. And you know that already.</p>`,
    warning:"This result is not a verdict. It is a mirror. What you do next is entirely yours to decide."
  },
  shadow:{
    word:"TRUTH",title:"The Shadow Keeper",
    traits:["UNSANITIZED","CLEAR-EYED","CARRYING DARKNESS","HONEST"],
    desc:`<p>You know exactly who you are. That's the terrifying part — not the dark thoughts you carry, not the things you've done or imagined doing, but the precision with which you see all of it and refuse to clean it up. You are honest the way a blade is honest: no illusion, no comfort, only the clean edge of what is real.</p><p>The dangerous ones are never the ones who proclaim innocence. They are the ones like you — who have looked directly into their own darkness, named exactly what they found there, and kept living anyway. This is either profound psychological health or someone who has become dangerously comfortable with what they carry.</p><p>Either way, you are not who people expect when they first meet you. And you have made peace with that. Haven't you.</p>`,
    warning:"Clarity without compassion — including self-compassion — is just another kind of wound."
  },
  saint:{
    word:"GRIEF",title:"The Buried Saint",
    traits:["DEEPLY EMPATHIC","SELF-ERASING","QUIETLY ANGRY","TENDER"],
    desc:`<p>You feel too much. You've always known this about yourself, even if you've spent years trying to fix it — building walls, caring slightly less, refusing to absorb every room's emotional temperature as if it were your personal responsibility. It hasn't worked. There is a tenderness in you that the world has not been kind to.</p><p>Somewhere beneath all that care is an anger you rarely let yourself feel. The saint and the rage are the same thing wearing different faces. You have put yourself last so many times that you've lost track of where you actually rank in your own priorities. This is not virtue — it is a habit formed in conditions that taught you your needs were secondary.</p><p>Something made you this way. That is worth grieving. And then worth changing.</p>`,
    warning:"The people who made you small are not in this room. You are allowed to take up space."
  },
  fracture:{
    word:"EXPOSURE",title:"The Fracture",
    traits:["BRUTALLY HONEST","SELF-EXCAVATING","CRACKED OPEN","UNFINISHED"],
    desc:`<p>You have broken yourself open in ways most people spend an entire lifetime avoiding. The answers you gave today were not the ones designed to make you look good — they were the ones that happen to be true. That is rarer than almost anything.</p><p>There is a cost: you see your failures in full resolution. You know what you've done. You know what you're capable of. You carry a quiet accounting of it that most people will never understand because they haven't been honest enough to begin the count.</p><p>This makes you difficult to love at arm's length and essential to love up close. You are not finished. That is not a failing. That is the entire point.</p>`,
    warning:"Honesty about darkness is not the same as permission to stay there."
  },
  architect:{
    word:"CONTROL",title:"The Architect",
    traits:["STRATEGIC","GUARDED","INTELLIGENT","BUILDING"],
    desc:`<p>Everything around you has been arranged deliberately. Your relationships, your image, what you allow people to see and what lives behind the glass — none of it is accidental. You are strategic not out of malice but out of a deep, old fear of what happens when you are not in control.</p><p>Something taught you early that vulnerability was the thing that got you hurt. And so you built. The architecture is impressive, even to you. But no one constructs walls this precise without knowing exactly what they're keeping out — or what they're keeping in.</p><p>The question is not whether the structure is beautiful. The question is whether anyone is ever allowed inside it. The further question is whether you are.</p>`,
    warning:"The safest room is not always the one with the most locks."
  },
  hollow:{
    word:"NUMBNESS",title:"The Hollow",
    traits:["DEFENDED","DISTANT","SURVIVING","WAITING"],
    desc:`<p>There is a quiet at the center of you that you have gotten very good at mistaking for peace. You have learned to deflect — not quite lie, but give answers that don't cost anything, stay close enough to the surface that nothing reaches the bottom. This is a skill. It is also a kind of slow disappearance.</p><p>Something made you this way. Not weakness — something happened that made connection feel like exposure, and exposure feel like danger. The hollow isn't who you are. It is the shape left behind by who you were before you decided it wasn't safe to be that person.</p><p>The numbness kept you alive. At some point, the survival instinct and the actually-living instinct need to be introduced to each other.</p>`,
    warning:"Numbness was never the destination. It was just the only road available at the time."
  },
  fracturedSaint:{
    word:"WOUND",title:"The Fractured Saint",
    traits:["LOVES DEEPLY","HARMS DEEPLY","PROFOUNDLY HUMAN","UNRESOLVED"],
    desc:`<p>You feel everything, and you have done things you are not proud of because of it. The capacity for deep love and the capacity for real harm live very close together in you — and you know it. You have hurt people in the act of loving them. You have lied while believing yourself to be honest. You have helped others as a way of avoiding the help you needed.</p><p>This is not a condemnation. It is a recognition. The fractured saint is not a lesser saint — it is the real version. The person who has felt both tenderness and darkness, done harm and genuinely grieved it, and is still trying to reconcile the two halves without erasing either one.</p><p>You are beautifully, terribly human. That is the most honest thing this test can offer you.</p>`,
    warning:"The ones you've hurt are real. So is the grief. Both deserve space."
  },
  survivor:{
    word:"ENDURANCE",title:"The Survivor",
    traits:["RESILIENT","CONTRADICTORY","HARDENED","STILL STANDING"],
    desc:`<p>You have been through something. Maybe several somethings. And you have emerged — not clean, not unchanged — but standing. There is a quiet toughness in you that doesn't announce itself. You contain contradictions without resolving them: the kind person who has also been cruel, the strong one who has collapsed in private, the honest one who has kept things buried.</p><p>You carry all of this without a tidy narrative. That is not weakness. That is what survival actually looks like — not packaged into a lesson, not wrapped in growth, just the ongoing act of being a person who has seen enough to become cynical and somehow chose not to.</p><p>That choice, made over and over again without an audience, is the most remarkable thing about you.</p>`,
    warning:"Survival is not the ceiling. It is the floor."
  },
  absence:{
    word:"NOTHING",title:"The Absence",
    traits:["UNTOUCHABLE","BEYOND CATEGORIZATION","WATCHING","EMPTY"],
    desc:`<p>This profile was not meant to exist. It is found only by those who answered with perfect calculation — who gave exactly what the test expected and nothing more, who held back in the precise places that would reveal the most. You didn't take the test. You observed it.</p><p>There are two types of people who reach this result. The first is someone so defended that even an anonymous psychological horror experience cannot find a way in. The second is someone who simply doesn't experience themselves as a self at all — who moves through identity the way light moves through glass. Neither is more disturbing than the other.</p><p>The test has nothing further to say. You already knew that would be the result.</p>`,
    warning:"The most frightening answer is no answer at all."
  },
  // SECRET EASTER EGG — only reachable via Q1=B, Q8=D, Q22=C
  mirror:{
    word:"MIRROR",title:"The Echo",
    traits:["SELF-REFERENTIAL","SEARCHING","UNRESOLVED","RARE"],
    desc:`<p>You found something. Not everyone who takes this test reaches here — not because they lack the capacity, but because they didn't choose what you chose in exactly the way you chose it. The curiosity without action. The erasure turned inward. The fear of what remained hidden over what was shown.</p><p>These three answers together describe a person who is watching themselves very carefully. Not performing for others — watching for themselves. Taking precise inventory. The thought you never acted on. The self you would erase. The part of you that stayed hidden even here.</p><p>This profile is not listed anywhere. No one told you it existed. That you found it by simply being honest about who you are — that is the most remarkable thing this test has seen.</p>`,
    warning:"This profile exists for exactly one kind of person. You already know what kind."
  }
};
