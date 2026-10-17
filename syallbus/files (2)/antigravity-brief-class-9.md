# HOW TO WORK (read first)

You are building the complete lesson content for a private family learning app for students of BISE Swat (Khyber Pakhtunkhwa, Pakistan), **Class 9**. This file lists every subject and topic. Produce deep, original lesson content for EVERY topic below. Do not skip, merge or summarise topics.

## Deliverable per topic
Create one file per topic at `content/class-9/<subject-slug>/<NN>-<topic-slug>.md` with this structure:

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
- Keep difficulty age-appropriate for Class 9.
- Work order: one subject at a time, topics in the order listed, highest-weightage topics get the deepest treatment. After each subject, output a checklist of topics completed and any `needs-review` flags.
- Also produce `content/class-9/index.json` listing every subject, topic, file path and weightage.

# SYLLABUS (BISE Swat, Class 9)

**Subjects offered by the board in Class 9:** Biology, Chemistry, Computer Science, Elective Mathematics, English, General Mathematics, Islamiat Elective, Mutala-e-Quran Hakeem, Islamiat Compulsory, Pakistan Studies, Physics, Urdu

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

Topics (board did not publish per-topic weightage):

1. Physical Quantities and Measurement
2. Kinematics
3. Dynamics
4. Turning Effect of Forces
5. Gravitation
6. Work and Power
7. Properties of Matter
8. Thermal Properties of Matter
9. Transfer of Heat

---

## SUBJECT: Chemistry

**Diagram guidance:** Atom and electron-shell diagrams, dot-and-cross bonding, lab apparatus setups, reaction energy profiles, periodic-trend charts, organic structural/skeletal formulas, flow diagrams for industrial processes.

| # | Topic | Board weightage % |
|---|-------|-------------------|
| 1 | Fundamentals of Chemistry | 10 |
| 2 | Structure of Atom | 10 |
| 3 | Periodic Table and Periodicity of Properties | 10 |
| 4 | Structure of Molecules | 16 |
| 5 | Physical States of Matter | 10 |
| 6 | Solutions | 14 |
| 7 | Electrochemistry | 20 |
| 8 | Chemical Reactivity | 10 |

---

## SUBJECT: Biology

**Diagram guidance:** Fully labelled structure diagrams (cells, organs, systems), process flow diagrams (cycles, pathways), life cycles, comparison tables, step-by-step animated sequences for processes.

| # | Topic | Board weightage % |
|---|-------|-------------------|
| 1 | Introduction to Biology | 6 |
| 2 | Solving Biological Problems | 6 |
| 3 | Biodiversity | 6 |
| 4 | Cells and Tissues | 16 |
| 5 | Cell Cycle | 14 |
| 6 | Enzymes | 12 |
| 7 | Bio-Energetics | 14 |
| 8 | Nutrition | 12 |
| 9 | Transport | 14 |

---

## SUBJECT: Elective Mathematics

**Diagram guidance:** Graphs with annotated points, geometric figures for every theorem and construction (step-by-step), number lines, worked-solution flow, interactive graph/figure explorers.

| # | Topic | Board weightage % |
|---|-------|-------------------|
| 1 | Matrices | 7 |
| 2 | Real and Complex Numbers | 11 |
| 3 | Logarithm | 5 |
| 4 | Algebraic Expressions and Algebraic Formulas | 9 |
| 5 | Factorization | 4 |
| 6 | Algebraic Manipulation | 4 |
| 7 | Linear Equations and Inequalities | 8 |
| 8 | Linear Graphs and their Applications | 4 |
| 9 | Introduction to Coordinate Geometry | 4 |
| 10 | Congruent Triangles | 4 |
| 11 | Parallelograms and Triangles | 4 |
| 12 | Line Bisector and Angle Bisector | 6 |
| 13 | Sides and Angles of a Triangle | 6 |
| 14 | Ratio and Proportion | 6 |
| 15 | Pythagoras Theorem | 6 |
| 16 | Theorems Related with Area | 6 |
| 17 | Practical Geometry Triangles | 6 |

---

## SUBJECT: General Mathematics

**Diagram guidance:** Graphs with annotated points, geometric figures for every theorem and construction (step-by-step), number lines, worked-solution flow, interactive graph/figure explorers.

| # | Topic | Board weightage % |
|---|-------|-------------------|
| 1 | Percentage, Ratio and Proportion | 14 |
| 2 | Zakat, Ushr and Inheritance | 6 |
| 3 | Business Mathematics | 6 |
| 4 | Financial Mathematics | 6 |
| 5 | Consumer Mathematics | 10 |
| 6 | Exponents and Logarithms | 10 |
| 7 | Arithmetic and Geometric Sequences | 10 |
| 8 | Sets and Functions | 14 |
| 9 | Linear Graphs | 14 |
| 10 | Basic Statistics | 10 |

---

## SUBJECT: Computer Science

**Diagram guidance:** Flowcharts, block diagrams, network topologies, memory hierarchy, trace tables for code, database table/relationship diagrams, annotated screenshots-style mockups.

| # | Topic | Board weightage % |
|---|-------|-------------------|
| 1 | Fundamentals of Computer | 15 |
| 2 | Fundamentals of Operating System | 15 |
| 3 | Office Automation | 25 |
| 4 | Data Communication | 20 |
| 5 | Computer Networks | 15 |
| 6 | Computer Security and Ethics | 10 |

---

## SUBJECT: English

**Diagram guidance:** Mind maps, writing templates with annotated model answers, grammar rule tables, translation side-by-side tables.

**Paper pattern:** MCQ 15; short questions 6x3; paraphrase 5; stanza comprehension 4x2; passage comprehension 5; English-to-Urdu translation 2x(3+3); application/letter 6; story 6; Urdu-to-English translation 6

The board documents give the paper pattern but no chapter list. Build skill-based modules, and map each to the prescribed KPTBB textbook units once the contents page is available:

1. Reading comprehension (passages and textbook texts)
2. Poetry: stanza reading, reference to context, paraphrasing
3. Grammar, usage and vocabulary (do-as-directed / lexical)
4. Writing skills (formats and model answers for the writing types in this class's paper pattern)
5. Translation English-to-Urdu and Urdu-to-English

---

## SUBJECT: Urdu

**Diagram guidance:** Mind maps, poetry structure tables (matla, sher, maqta etc.), annotated model answers, grammar rule tables.

**Paper pattern:** MCQ 15; passage questions 8x2; writing 2x5; lexical 5x2; ERQ: passage, poem, ghazal, creative writing (roudad / aap beeti / dialogue / letter) 6 each

The board documents give the paper pattern but no chapter list. Build skill-based modules, and map each to the prescribed KPTBB textbook units once the contents page is available:

1. Iqtibas (prose passage) reading and explanation
2. Nazm and ghazal: explanation, themes, literary devices
3. Zaban shanasi (language and grammar)
4. Creative writing (letter, application, essay, roudad etc. per the paper pattern)

---

## SUBJECT: Islamiat Compulsory

**Diagram guidance:** Timelines, structured notes, thematic mind maps. Arabic text and references must be copied only from the official textbook and flagged for human review.

**Paper pattern:** MCQ 10; RRQ 8 (attempt 6) x4; ERQ 3 (attempt 2) x8

No chapter list found in board documents. Build lessons from the prescribed textbook contents page; ask the owner for it before starting this subject.

---

## SUBJECTS WITH NO PUBLISHED TOPIC LIST (do not invent topics)

Pakistan Studies, Islamiat Elective, Mutala-e-Quran Hakeem

Ask the owner for the textbook contents page (photo or PDF) for each before building these. Skip them until then.

---

## START
Begin with the first subject above, first topic. Output the topic file, then continue through the list. After every 5 topics, print a short progress checklist.
