# HOW TO WORK (read first)

You are building the complete lesson content for a private family learning app for students of BISE Swat (Khyber Pakhtunkhwa, Pakistan), **Class 11**. This file lists every subject and topic. Produce deep, original lesson content for EVERY topic below. Do not skip, merge or summarise topics.

## Deliverable per topic
Create one file per topic at `content/class-11/<subject-slug>/<NN>-<topic-slug>.md` with this structure:

1. **Frontmatter**: class, subject, unit number, topic title, board weightage %, language, `verified: false`, source note.
2. **Learning objectives**: 4-8 measurable outcomes (student can define / explain / calculate / draw / compare).
3. **Prerequisites**: what the student should already know, with links to earlier topics.
4. **Deep explanation**: start from the basic idea, build step by step, use everyday Pakistani examples, explain WHY not just WHAT. Break into short sections with headings. No copying of textbook text; write in your own words.
5. **Key terms, definitions, laws and formulas**: boxed list with units and symbols where relevant.
6. **Diagrams (required)**: at least 2-4 per topic. Produce real, working SVG or Mermaid code (or an interactive HTML widget where a simulation helps). For each diagram give: title, what it shows, labels, and a one-line caption. Subject guidance: see the 'Diagram guidance' line under each subject below.
7. **Worked examples**: 3-6, from easy to exam level, every step shown (numericals with units, proofs with reasons, essays/answers with a marking breakdown where relevant).
8. **Common mistakes and how to avoid them.**
9. **Practice set** matched to the BISE Swat paper pattern for this subject: MCQs (4 options, correct answer, one-line explanation), short questions (4-mark style) with model answers, long questions with model answers and marks split. Tag each item easy / moderate / difficult and knowledge / understanding / application.
10. **Quick recap**: 5-8 bullet points and 6-10 flashcards (front/back).
11. **Exam tips**: how this topic is usually asked, based on the weightage given below.

## Rules
- Content must be original. Reference the board textbook chapter by number/title only; never paste textbook text or past-paper questions.
- Language: Urdu subjects and Islamiat explanations in Urdu (right-to-left, clean Unicode, no transliteration unless asked); English subjects in English; science and maths in simple English with Urdu key-term glosses in brackets for first use.
- Never invent Quran verses, hadith text or references. For Islamiat, use only text you can attribute to the prescribed textbook and mark every Arabic passage `needs-review`.
- Accuracy over volume: if unsure of a fact, formula or date, flag it `needs-review` instead of guessing.
- Keep difficulty age-appropriate for Class 11.
- Work order: one subject at a time, topics in the order listed, highest-weightage topics get the deepest treatment. After each subject, output a checklist of topics completed and any `needs-review` flags.
- Also produce `content/class-11/index.json` listing every subject, topic, file path and weightage.

# SYLLABUS (BISE Swat, Class 11)

**Subjects offered by the board in Class 11:** Biology, Chemistry, Computer Science, English, Islamiat, Mathematics, Physics, Urdu

**Paper pattern notes (from board tables of specification):**
- science 9 10: Theory 65 marks: 12 MCQ x1 + 8 of 11 RRQ x4 + 3 of 4 ERQ x7
- science 11 12: Theory 85 marks: 18 MCQ x1 + 10 of 13 RRQ x4 + 3 of 4 ERQ x9
- english urdu 9 10: 75 marks: 15 MCQ + 36 RRQ/short + 24 ERQ/long
- english 11: 100 marks: 20 MCQ + 50 RRQ + 30 ERQ
- english 12: 110 marks: 20 MCQ + 50 Section B + 40 Section C
- urdu 11 12: 100 marks: 20 MCQ + short (attempt 50) + 30 long
- computer science 9 10: 75 marks: 55 theory + 20 practical
- math 12: 125 marks set: 20 MCQ + 13 RRQ x5 + 4 ERQ x10
- pak studies 10 12: 10 MCQ + short + long (attempt 50 theory marks)

---

## SUBJECT: Physics

**Diagram guidance:** Force/free-body diagrams, ray diagrams, circuit diagrams, wave and graph plots, field-line diagrams. Build interactive simulations where motion, optics or circuits are involved (sliders for values, live graphs).

| # | Topic | Board weightage % |
|---|-------|-------------------|
| 1 | Measurement | 8 |
| 2 | Vectors and Equilibrium | 10 |
| 3 | Forces and Motion | 12 |
| 4 | Work and Energy | 10 |
| 5 | Rotational and Circular Motion | 12 |
| 6 | Fluid Dynamics | 8 |
| 7 | Oscillations | 9 |
| 8 | Waves | 12 |
| 9 | Physical Optics | 9 |
| 10 | Thermodynamics | 10 |

---

## SUBJECT: Chemistry

**Diagram guidance:** Atom and electron-shell diagrams, dot-and-cross bonding, lab apparatus setups, reaction energy profiles, periodic-trend charts, organic structural/skeletal formulas, flow diagrams for industrial processes.

| # | Topic | Board weightage % |
|---|-------|-------------------|
| 1 | Stoichiometry | 8 |
| 2 | Atomic Structure | 8 |
| 3 | Theories of Covalent Bonding and Shapes of Molecules | 11 |
| 4 | States of Matter I: Gases | 12 |
| 5 | States of Matter II: Liquids | 11 |
| 6 | States of Matter III: Solids | 7 |
| 7 | Chemical Equilibrium | 7 |
| 8 | Acids, Bases and Salts | 6 |
| 9 | Chemical Kinetics | 5 |
| 10 | Solutions and Colloids | 9 |
| 11 | Thermochemistry | 8 |
| 12 | Electrochemistry | 8 |

---

## SUBJECT: Biology

**Diagram guidance:** Fully labelled structure diagrams (cells, organs, systems), process flow diagrams (cycles, pathways), life cycles, comparison tables, step-by-step animated sequences for processes.

**Main-area weightage %:** Cell Biology: 35, Biodiversity: 33, Life Processes: 32

**Book:** KPTBB Peshawar Grade XI

Chapters (in order):

1. Cell Structure and Function
2. Biological Molecules
3. Enzymes
4. Bioenergetics
5. A Cellular Life
6. Prokaryotes
7. Protista and Fungi
8. Diversity among Plants
9. Diversity among Animals
10. Form and Functions in Plants
11. Digestion
12. Circulation
13. Immunity

---

## SUBJECT: Mathematics

**Diagram guidance:** Graphs with annotated points, geometric figures for every theorem and construction (step-by-step), number lines, worked-solution flow, interactive graph/figure explorers.

| # | Topic | Board weightage % |
|---|-------|-------------------|
| 1 | Complex Numbers | 6 |
| 2 | Matrices and Determinants | 15 |
| 3 | Vectors | 10 |
| 4 | Sequences and Series | 6 |
| 5 | Miscellaneous Series | 3 |
| 6 | Permutation, Combination and Probability | 8 |
| 7 | Mathematical Induction and Binomial Theorem | 8 |
| 8 | Functions and Graphs | 9 |
| 9 | Linear Programming | 5 |
| 10 | Trigonometric Identities of Sum and Difference of Angles | 8 |
| 11 | Application of Trigonometry | 7 |
| 12 | Graphs of Trigonometric and Inverse Trigonometric Functions and Solution of Trigonometric Equations | 15 |

---

## SUBJECT: Computer Science

**Diagram guidance:** Flowcharts, block diagrams, network topologies, memory hierarchy, trace tables for code, database table/relationship diagrams, annotated screenshots-style mockups.

Topics (board did not publish per-topic weightage):

1. Overview of Computer System
2. Computer Memory
3. Central Processing Unit
4. Inside System Unit
5. Network Communication and Protocols
6. Wireless Communications
7. Database Fundamentals
8. Database Development

---

## SUBJECT: English

**Diagram guidance:** Mind maps, writing templates with annotated model answers, grammar rule tables, translation side-by-side tables.

**Paper pattern:** MCQ 20 (11 formal/lexical + 9 reading); textbook comprehension 5x5; passage 14; stanza 3x2; English-to-Urdu 5; critical thinking 10; letter/application 10; story 10

The board documents give the paper pattern but no chapter list. Build skill-based modules, and map each to the prescribed KPTBB textbook units once the contents page is available:

1. Reading comprehension (passages and textbook texts)
2. Poetry: stanza reading, reference to context, paraphrasing
3. Grammar, usage and vocabulary (do-as-directed / lexical)
4. Writing skills (formats and model answers for the writing types in this class's paper pattern)
5. Translation English-to-Urdu and Urdu-to-English

---

## SUBJECT: Urdu

**Diagram guidance:** Mind maps, poetry structure tables (matla, sher, maqta etc.), annotated model answers, grammar rule tables.

**Paper pattern:** MCQ 20; short: passage 6x5, poem 3x5, language 4x5 (attempt 10 of 13); long: passage 10, poem/ghazal 10, letter/application 5, creative writing 5

The board documents give the paper pattern but no chapter list. Build skill-based modules, and map each to the prescribed KPTBB textbook units once the contents page is available:

1. Iqtibas (prose passage) reading and explanation
2. Nazm and ghazal: explanation, themes, literary devices
3. Zaban shanasi (language and grammar)
4. Creative writing (letter, application, essay, roudad etc. per the paper pattern)

---

## SUBJECTS WITH NO PUBLISHED TOPIC LIST (do not invent topics)

Islamiat

Ask the owner for the textbook contents page (photo or PDF) for each before building these. Skip them until then.

---

## START
Begin with the first subject above, first topic. Output the topic file, then continue through the list. After every 5 topics, print a short progress checklist.
