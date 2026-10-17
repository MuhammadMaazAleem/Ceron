# HOW TO WORK (read first)

You are building the complete lesson content for a private family learning app for students of BISE Swat (Khyber Pakhtunkhwa, Pakistan), **Class 12**. This file lists every subject and topic. Produce deep, original lesson content for EVERY topic below. Do not skip, merge or summarise topics.

## Deliverable per topic
Create one file per topic at `content/class-12/<subject-slug>/<NN>-<topic-slug>.md` with this structure:

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
- Keep difficulty age-appropriate for Class 12.
- Work order: one subject at a time, topics in the order listed, highest-weightage topics get the deepest treatment. After each subject, output a checklist of topics completed and any `needs-review` flags.
- Also produce `content/class-12/index.json` listing every subject, topic, file path and weightage.

# SYLLABUS (BISE Swat, Class 12)

**Subjects offered by the board in Class 12:** Biology, Chemistry, English, Mathematics, Pakistan Studies, Physics, Urdu

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
| 1 | Electrostatics | 12 |
| 2 | Current Electricity | 10 |
| 3 | Electromagnetism | 10 |
| 4 | Electromagnetic Induction | 12 |
| 5 | Alternating Current | 10 |
| 6 | Physics of Solids | 7 |
| 7 | Electronics | 7 |
| 8 | Dawn of Modern Physics | 10 |
| 9 | Atomic Spectra | 10 |
| 10 | Nuclear Physics | 12 |

---

## SUBJECT: Chemistry

**Diagram guidance:** Atom and electron-shell diagrams, dot-and-cross bonding, lab apparatus setups, reaction energy profiles, periodic-trend charts, organic structural/skeletal formulas, flow diagrams for industrial processes.

| # | Topic | Board weightage % |
|---|-------|-------------------|
| 1 | S and P Block Elements | 22 |
| 2 | D and F Block Elements | 6 |
| 3 | Organic Compounds | 3 |
| 4 | Hydrocarbons | 12 |
| 5 | Alkyl Halides and Amines | 8 |
| 6 | Alcohols, Phenols and Ethers | 9 |
| 7 | Carbonyl Compounds I: Aldehydes and Ketones | 4 |
| 8 | Carbonyl Compounds II: Carboxylic Acids and Functional Derivatives | 6 |
| 9 | Biochemistry | 6 |
| 10 | Industrial Chemistry | 6 |
| 11 | Environmental Chemistry | 6 |
| 12 | Analytical Chemistry | 12 |

---

## SUBJECT: Biology

**Diagram guidance:** Fully labelled structure diagrams (cells, organs, systems), process flow diagrams (cycles, pathways), life cycles, comparison tables, step-by-step animated sequences for processes.

**Main-area weightage %:** Life Processes: 50, Continuity in Life: 29.3, Ecology: 6.0, Application of Biology: 14.7

Chapters (in order):

1. Respiration
2. Homeostasis
3. Support and Movements
4. Nervous Coordination
5. Chemical Coordination
6. Behaviour
7. Reproduction
8. Development and Ageing
9. Inheritance
10. Chromosomes and DNA
11. Evolution
12. Man and His Environment
13. Biotechnology
14. Biology and Human Welfare

Note: Chapter-level percentages in the board document do not add up to 100, so only area weights are given.

---

## SUBJECT: Mathematics

**Diagram guidance:** Graphs with annotated points, geometric figures for every theorem and construction (step-by-step), number lines, worked-solution flow, interactive graph/figure explorers.

| # | Topic | Board weightage % |
|---|-------|-------------------|
| 1 | Introduction to Symbolic Package: Maple | 0 |
| 2 | Function and Limits | 11 |
| 3 | Differentiation | 11 |
| 4 | Higher Order Derivatives and Applications | 4 |
| 5 | Differentiation of Vector Functions | 4 |
| 6 | Integration | 18 |
| 7 | Plane Analytic Geometry: Straight Line | 13 |
| 8 | Conics I | 5 |
| 9 | Conics II | 12 |
| 10 | Differential Equations | 8 |
| 11 | Partial Differentiation | 4 |
| 12 | Introduction to Numerical Methods | 10 |

---

## SUBJECT: Pakistan Studies

**Diagram guidance:** Timelines, outline maps, cause-and-effect charts, comparison tables, institution/structure charts.

Topics (board did not publish per-topic weightage):

1. Genesis of Islamic Republic of Pakistan
2. Initial Problems of Pakistan
3. Land of Pakistan
4. Steps towards an Islamic Republic of Pakistan
5. Administrative Structure and Good Governance
6. Culture of Pakistan
7. Languages of Pakistan
8. National Integration and Prosperity
9. Economic Planning and Development
10. Foreign Policy of Pakistan
11. Problems of Pakistan

---

## SUBJECT: English

**Diagram guidance:** Mind maps, writing templates with annotated model answers, grammar rule tables, translation side-by-side tables.

**Paper pattern:** MCQ 20; comprehension passage 8x5; reference to context 5; paraphrase 5; essay 10; grammar 10; summary of 'The Last Leaf' 10; critical response on 'Lord of the Flies' 10

The board documents give the paper pattern but no chapter list. Build skill-based modules, and map each to the prescribed KPTBB textbook units once the contents page is available:

1. Reading comprehension (passages and textbook texts)
2. Poetry: stanza reading, reference to context, paraphrasing
3. Grammar, usage and vocabulary (do-as-directed / lexical)
4. Writing skills (formats and model answers for the writing types in this class's paper pattern)
5. Translation English-to-Urdu and Urdu-to-English

Set texts named in the board table of specification: 'The Last Leaf' (summary) and 'Lord of the Flies' (critical response). Cover both in depth.

---

## SUBJECT: Urdu

**Diagram guidance:** Mind maps, poetry structure tables (matla, sher, maqta etc.), annotated model answers, grammar rule tables.

**Paper pattern:** MCQ 20; short: passage 5x5, poem 3x5, language 2x5; long: passage 10, poem/ghazal 10, essay 10

The board documents give the paper pattern but no chapter list. Build skill-based modules, and map each to the prescribed KPTBB textbook units once the contents page is available:

1. Iqtibas (prose passage) reading and explanation
2. Nazm and ghazal: explanation, themes, literary devices
3. Zaban shanasi (language and grammar)
4. Creative writing (letter, application, essay, roudad etc. per the paper pattern)

---

## START
Begin with the first subject above, first topic. Output the topic file, then continue through the list. After every 5 topics, print a short progress checklist.
