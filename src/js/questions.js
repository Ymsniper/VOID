// ============================================================
// QUESTIONS — 22 total
// ============================================================
const QS = [
  // Q1
  {
    text:"Have you ever genuinely wanted to hurt someone — not out of rage, but out of cold, quiet curiosity about what it would feel like?",
    opts:[
      {t:"Yes. And it wasn't just once.",dark:3},
      {t:"I've had the thought. I never acted on it.",dark:1,honest:1},
      {t:"No. The idea disgusts me.",empathy:1},
      {t:"I'd rather not commit that to writing.",control:1,honest:-1}
    ],
    rx:[
      "Not just once. And you remember exactly when.",
      "The thought alone is enough. You already know what it means.",
      "Disgust is a feeling too. You answered very fast.",
      "The refusal to answer is, itself, an answer."
    ],
    mood:1,jsOn:[0],jsScene:0
  },
  // Q2
  {
    text:"A close friend is in a relationship that is destroying them. They haven't asked for your help. What do you do?",
    opts:[
      {t:"Tell them the truth. Even if it ends the friendship.",honest:2,empathy:1},
      {t:"Say nothing. It's their life to ruin.",control:1,empathy:-1,dark:1},
      {t:"Engineer situations to make them see it themselves.",control:2,dark:1},
      {t:"Sabotage the relationship from behind the scenes — for their own good.",dark:3,empathy:-2}
    ],
    rx:[
      "Honesty with a conscience. Rarer than it should be.",
      "Distance dressed as respect. You've convinced yourself it's the same thing.",
      "You call it helping. Others might call it something else.",
      "For their own good. That's what they always say."
    ],
    mood:2
  },
  // Q3
  {
    text:"Have you ever let someone else take the blame for something you did?",
    opts:[
      {t:"Yes. And I'd do it again if I had to.",dark:2,empathy:-2},
      {t:"Yes. Once. I still think about it.",dark:1,honest:2},
      {t:"No. I own what I do.",honest:1,empathy:1},
      {t:"Not directly. But I've let silence do the work.",dark:2,control:1}
    ],
    rx:[
      "Without remorse. That distinction matters more than you know.",
      "Once. And the guilt is still very much alive.",
      "Then you've never been in a position that truly tested you.",
      "Silence is never neutral. You already know that."
    ],
    mood:2,jsOn:[0],jsScene:7
  },
  // Q4
  {
    text:"Have you ever watched someone fall in love with you, knowing you were not capable of giving them what they needed — and let it continue anyway?",
    opts:[
      {t:"Yes. I told myself I might change.",dark:2,honest:1},
      {t:"Yes. I needed what they were giving me.",dark:3,empathy:-2,control:1},
      {t:"No. I've always been honest about what I could offer.",honest:2,empathy:1},
      {t:"Yes. And part of me never wanted it to stop.",dark:2,control:2}
    ],
    rx:[
      "You hoped you'd become the person they believed in. That hope cost them everything.",
      "You used the love while knowing its limits. That is the definition of a particular kind of harm.",
      "Honesty before investment. That requires a cruelty most people mistake for kindness.",
      "You needed the mirror. The feeling of being seen — even by someone seeing the wrong version of you."
    ],
    mood:2,jsOn:[1],jsScene:0
  },
  // Q5
  {
    text:"You are walking alone at night and see someone being robbed across the street. There is no one else around. What do you do?",
    opts:[
      {t:"Intervene directly. I can't watch that happen.",empathy:3,honest:1},
      {t:"Call for help loudly, make noise, try to scare them off.",empathy:2,control:1},
      {t:"Call emergency services from a distance and wait.",control:2},
      {t:"Keep walking. It's not my problem and I'm not dying for a stranger.",dark:2,empathy:-2}
    ],
    rx:[
      "Without hesitation. Either brave or reckless. Sometimes they're the same.",
      "Smart. Compassionate from a defensible position.",
      "Delegation of responsibility. You've done what you can tell yourself you should.",
      "The cost-benefit analysis completed in under a second. Interesting."
    ],
    mood:2
  },
  // Q6
  {
    text:"Do you ever feel as though the people around you don't truly know who you are — and that you prefer it that way?",
    opts:[
      {t:"Yes. I've deliberately kept it that way.",dark:2,control:2},
      {t:"Yes — but I'm not sure I prefer it anymore.",honest:2,dark:1},
      {t:"No. I'm an open book.",honest:1,empathy:1},
      {t:"I've stopped thinking about what others know about me.",dark:1,control:1}
    ],
    rx:[
      "Deliberately hidden. The question is whether you remember why you started.",
      "The preference is shifting. That is one of the more courageous things a person can notice.",
      "An open book, or a very carefully edited one.",
      "Not thinking about it is different from not caring. You already know that."
    ],
    mood:2
  },
  // Q7
  {
    text:"You find out that someone you deeply respect has done something you consider unforgivable. What happens to your image of them?",
    opts:[
      {t:"It shatters. I can't separate the person from the act.",honest:2,empathy:1},
      {t:"I try to hold both truths at once. I'm not sure I succeed.",honest:2,empathy:2},
      {t:"I recalibrate. Everyone is capable of the unforgivable.",dark:1,control:1},
      {t:"It confirms something I already suspected.",dark:2,control:1}
    ],
    rx:[
      "Shattered. That kind of disillusionment leaves marks.",
      "Holding contradiction. That's the hardest and most honest thing you can do.",
      "Recalibration. You've built a worldview that doesn't require people to be good.",
      "You already knew. That foreknowledge is its own kind of distance."
    ],
    mood:2
  },
  // Q8
  {
    text:"If you could erase one person from your life entirely — not harm them, simply make them never have existed — who does your mind go to first?",
    opts:[
      {t:"Someone who hurt me deeply.",honest:2,dark:1},
      {t:"Someone I hurt.",honest:3,dark:1},
      {t:"Someone I still love.",dark:2,honest:2},
      {t:"Myself.",dark:3,honest:2}
    ],
    rx:[
      "Erasure as protection. The version of you before them still exists somewhere inside you.",
      "The ones we've hurt don't leave. They stay and become the parts of ourselves we can't look at.",
      "Erasing them would mean erasing everything they made you feel. You're not sure you want to.",
      "That was the most honest thing you've said so far. Sit with it."
    ],
    mood:3,jsOn:[3],jsScene:5
  },
  // Q9 — interlude after
  {
    text:"Have you ever thought — not as a wish, but as a recurring, quiet question — about what it would feel like to simply stop existing?",
    opts:[
      {t:"Yes. It comes back more than it should.",dark:2,honest:2},
      {t:"Yes. As a thought. Not a plan. But a real one.",dark:1,honest:2},
      {t:"No. That thought has never taken root.",control:1},
      {t:"I've thought about it so often it doesn't even frighten me anymore.",dark:3,honest:1}
    ],
    rx:[
      "Recurring thoughts like that are questions your mind hasn't stopped asking yet.",
      "The line between a thought and a plan is thinner than most people admit.",
      "Hold onto that. It is genuinely rarer than it seems.",
      "Familiarity isn't the same as peace. You know the difference."
    ],
    mood:4,jsOn:[0,3],jsScene:4,
    interlude:{txt:"You are past the halfway point.\nThe test has been watching since the first answer.\nWhat comes next will not be easier.",after:true}
  },
  // Q10
  {
    text:"Your partner of several years confesses they have been lying to you for months — about something that changes everything. What happens inside you first?",
    opts:[
      {t:"Cold fury. I become someone I don't recognize.",dark:2,honest:1},
      {t:"I need every lie. Every detail. Then I'll decide what to do.",control:3,honest:1},
      {t:"Grief. Then silence. Then a long, slow nothing.",honest:2,empathy:1},
      {t:"I already suspected. I chose not to look.",dark:1,honest:3}
    ],
    rx:[
      "Someone you don't recognize. They were already inside you, waiting.",
      "Control through total information. You need the full map before you can move.",
      "In that order. That's the healthy response. And still devastating.",
      "You chose the lie together. That's the part that's hardest to sit with."
    ],
    mood:3
  },
  // Q11
  {
    text:"Have you ever deliberately said something you knew would deeply wound someone?",
    opts:[
      {t:"Yes. They deserved it and I don't regret it.",dark:3,empathy:-2},
      {t:"Yes. I told myself I was being honest.",dark:1,honest:1},
      {t:"Yes. The guilt of it still lives in me.",honest:2,empathy:1},
      {t:"No. I'd rather swallow the words than watch someone's face fall.",empathy:2,control:1}
    ],
    rx:[
      "Deserved it. You've already written their verdict. Who gave you the gavel?",
      "Honesty and cruelty often share the same words. You know that.",
      "Good. The guilt means it still costs you something.",
      "The words don't stop existing just because you didn't say them."
    ],
    mood:3,jsOn:[0],jsScene:1
  },
  // Q12
  {
    text:"If you could spend one hour inside the private thoughts of one person in your life — no consequences, never discovered — would you?",
    opts:[
      {t:"Yes. Without hesitation.",dark:2,control:1},
      {t:"Yes, but I'd feel terrible about it.",dark:1,honest:1,empathy:1},
      {t:"No. There are things we're not meant to know.",empathy:2,control:1},
      {t:"Only if I was afraid of what I'd find there.",honest:2,dark:1}
    ],
    rx:[
      "Curiosity without conscience. The most dangerous combination.",
      "You'd still do it. The guilt would be decorative.",
      "Restraint. That requires knowing something about limits you've chosen to respect.",
      "Fear of truth is still an intimate relationship with truth."
    ],
    mood:3
  },
  // Q13
  {
    text:"Have you ever done something generous — given help, time, comfort — while knowing, privately, that your real motive was something else entirely?",
    opts:[
      {t:"Yes. The kindness was real. So was the other thing.",honest:2,dark:1},
      {t:"Yes. Sometimes I think all my kindness works this way.",dark:2,honest:2},
      {t:"No. When I give, I give cleanly.",empathy:2,control:1},
      {t:"I've never looked closely enough to know.",control:1,honest:-1}
    ],
    rx:[
      "Both can be true simultaneously. That's what makes generosity complicated.",
      "Motives are never clean. The ones who say otherwise haven't looked.",
      "That kind of purity is either genuine or a story told so long it feels like memory.",
      "Not looking is a choice. You already know that."
    ],
    mood:3
  },
  // Q14
  {
    text:"Have you ever kept a secret that would destroy a relationship if it came out?",
    opts:[
      {t:"Yes. One.",dark:1,control:1},
      {t:"Yes. More than one.",dark:2,control:2},
      {t:"No. I refuse to carry that kind of weight.",honest:2,empathy:1},
      {t:"Yes. And sometimes I think about what it would feel like to just say it.",dark:2,honest:2}
    ],
    rx:[
      "One. Enough to know you understand the architecture of silence.",
      "Multiple. The structure is more complex than anyone around you suspects.",
      "No secrets yet — or no secrets that have cost you. There is a difference.",
      "The fantasy of confession is its own kind of compulsion."
    ],
    mood:4,jsOn:[1,3],jsScene:2
  },
  // Q15
  {
    text:"What is the worst thing you have ever done? You don't have to say it here. But are you thinking of it right now?",
    opts:[
      {t:"Yes. It came to me immediately.",dark:2,honest:3},
      {t:"Yes. But I've made peace with it.",dark:1,control:2,honest:1},
      {t:"I'm not sure what my worst thing is. There are several candidates.",dark:2,honest:2},
      {t:"No. I don't allow myself to think about it.",control:2,dark:1,honest:-1}
    ],
    rx:[
      "Immediately. It was already waiting for exactly this question.",
      "Peace made — or buried. You already know which one it is.",
      "The uncertainty is almost worse than certainty.",
      "Either it doesn't haunt you — or it has never been allowed to."
    ],
    mood:4,jsOn:[0,2],jsScene:3
  },
  // Q16
  {
    text:"In your darkest moments — the ones no one else sees — what do you reach for?",
    opts:[
      {t:"The people who love me.",empathy:2,honest:1},
      {t:"Something that makes me feel less.",dark:2,honest:1},
      {t:"Isolation. I don't want to be someone's burden.",dark:1,honest:2},
      {t:"Nothing. I go quiet and wait for it to pass alone.",dark:2,control:2}
    ],
    rx:[
      "The people who love you would want to know you reach for them.",
      "The thing that numbs you also makes you invisible to yourself.",
      "The ones who love you would want to share the weight.",
      "Endurance is a skill. It is also, sometimes, a way of disappearing."
    ],
    mood:4,jsOn:[1,3],jsScene:5
  },
  // Q17
  {
    text:"Do you genuinely believe you are a good person?",
    opts:[
      {t:"Yes.",control:1},
      {t:"I try to be.",empathy:1,honest:1},
      {t:"I'm not sure anymore.",honest:2,dark:1},
      {t:"No. But I've stopped pretending otherwise.",dark:2,honest:3}
    ],
    rx:[
      "Said without hesitation. That confidence is either fully earned or fully borrowed.",
      "Trying means knowing what you're pushing against.",
      "Something cracked that certainty. There is always something.",
      "That kind of honesty is either liberation or the end of something."
    ],
    mood:4,jsOn:[3],jsScene:3
  },
  // Q18
  {
    text:"If the people who love you most could see every thought you've had in the last thirty days — would they still?",
    opts:[
      {t:"Yes. They know who I am.",empathy:1,honest:1,control:1},
      {t:"Most of them. A few would be shaken.",honest:2,dark:1},
      {t:"No. And I've accepted that.",dark:2,honest:3},
      {t:"I would never allow them to see. The question is irrelevant.",control:3,dark:1}
    ],
    rx:[
      "That confidence is either earned or the result of keeping certain thoughts very well contained.",
      "You've already counted who would stay. That list was built in under a second.",
      "Acceptance is not the same as peace. But you know that.",
      "Control of what is seen is control of what is loved. The wall keeps you safe. And alone."
    ],
    mood:4
  },
  // Q19
  {
    text:"Have you ever stayed in something — a relationship, a situation, a lie — not because it was right, but purely because leaving required admitting you were wrong?",
    opts:[
      {t:"Yes. Pride is expensive.",honest:2,dark:1},
      {t:"Yes. I stayed until it destroyed something.",dark:2,honest:2},
      {t:"No. I'd rather be wrong and move than right and stuck.",empathy:1,honest:2},
      {t:"Yes. And I'm not sure I'm done doing it.",dark:2,honest:3}
    ],
    rx:[
      "Pride as prison. You paid the rent long after you knew.",
      "Until it destroyed something. That detail will stay here when you close this tab.",
      "Motion over certainty. That requires a particular kind of courage.",
      "Still in it. The knowing and the staying are not contradictions. They are the trap."
    ],
    mood:4,jsOn:[1],jsScene:2
  },
  // Q20
  {
    text:"You must choose: the person you love most dies, or five strangers you will never meet die. There is no third option. What do you do?",
    opts:[
      {t:"Save the person I love. Without question.",empathy:2,honest:1},
      {t:"Save the five. Logic demands it even if it destroys me.",control:2,dark:1},
      {t:"I'd save the one I love and never forgive myself for it.",honest:3,empathy:1,dark:1},
      {t:"I would freeze. And that is the most honest thing I can say.",honest:3}
    ],
    rx:[
      "Love as an absolute. Beautiful. Terrifying. Entirely human.",
      "Cold arithmetic. Defensible. Also the answer that costs the most to live with.",
      "You'd choose love and carry the grief of five strangers forever. That's not weakness.",
      "Paralysis is an answer too. More honest than most people manage."
    ],
    mood:5
  },
  // Q21
  {
    text:"If you could know, with absolute certainty, exactly how and when you will die — would you want to?",
    opts:[
      {t:"Yes. I'd rather know.",control:2,honest:1},
      {t:"No. Some things should stay dark.",empathy:1,control:1},
      {t:"Yes — only so I could change what comes before it.",honest:2,empathy:1},
      {t:"I've already imagined it. Many times.",dark:3,honest:2}
    ],
    rx:[
      "Control over the uncontrollable. The knowledge would change every single day between now and then.",
      "There is wisdom in that. Not everything that can be known should be.",
      "You'd try to rewrite the approach, not the ending. That is called living.",
      "Many times. And you've never told anyone that."
    ],
    mood:5,jsOn:[3],jsScene:4
  },
  // Q22 — FINAL
  {
    text:"The last question. Before you see what the test has found — are you afraid of what you've shown about yourself today?",
    opts:[
      {t:"Yes. More than I expected.",honest:3},
      {t:"No. I know exactly who I am.",control:2,honest:1},
      {t:"I'm more afraid of what I didn't reveal.",dark:2,honest:2},
      {t:"I stopped being afraid of myself a long time ago.",dark:3,control:1}
    ],
    rx:[
      "Good. Fear means you've been paying attention.",
      "Certainty is a kind of armour. Make sure it isn't also a cage.",
      "The parts you kept back are waiting for you.",
      "That's either the most liberated thing you could say — or the most dangerous."
    ],
    mood:5,finalQ:true
  }
];
