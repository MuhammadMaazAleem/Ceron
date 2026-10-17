# HOW TO WORK (read first)

You are building the complete lesson content for a private family learning app for students of BISE Swat (Khyber Pakhtunkhwa, Pakistan), **Class 10**. This file lists every subject and topic. Produce deep, original lesson content for EVERY topic below. Do not skip, merge or summarise topics.

## Deliverable per topic
Create one file per topic at `content/class-10/<subject-slug>/<NN>-<topic-slug>.md` with this structure:

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
- Keep difficulty age-appropriate for Class 10.
- Work order: one subject at a time, topics in the order listed, highest-weightage topics get the deepest treatment. After each subject, output a checklist of topics completed and any `needs-review` flags.
- Also produce `content/class-10/index.json` listing every subject, topic, file path and weightage.

# SYLLABUS (BISE Swat, Class 10)

**Subjects offered by the board in Class 10:** Biology, Chemistry, Computer Science, English, Islamiat Compulsory, Mathematics, Pakistan Studies, Physics, Urdu, Islamiat Elective, General Mathematics

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
| 1 | Oscillations and Waves | 10 |
| 2 | Sound | 11 |
| 3 | Geometrical Optics | 15 |
| 4 | Electrostatics | 14 |
| 5 | Current Electricity | 11 |
| 6 | Electromagnetism | 14 |
| 7 | Introductory Electronics | 6 |
| 8 | Information and Communication Technology | 7 |
| 9 | Radioactivity | 12 |

---

## SUBJECT: Chemistry

**Diagram guidance:** Atom and electron-shell diagrams, dot-and-cross bonding, lab apparatus setups, reaction energy profiles, periodic-trend charts, organic structural/skeletal formulas, flow diagrams for industrial processes.

| # | Topic | Board weightage % |
|---|-------|-------------------|
| 1 | Chemical Equilibrium | 10 |
| 2 | Acids, Bases and Salts | 10 |
| 3 | Organic Chemistry | 16 |
| 4 | Hydrocarbons | 10 |
| 5 | Biochemistry | 14 |
| 6 | Environmental Chemistry I: Atmosphere | 12 |
| 7 | Environmental Chemistry II: Water | 12 |
| 8 | Chemical Industries | 16 |

---

## SUBJECT: Biology

**Diagram guidance:** Fully labelled structure diagrams (cells, organs, systems), process flow diagrams (cycles, pathways), life cycles, comparison tables, step-by-step animated sequences for processes.

| # | Topic | Board weightage % |
|---|-------|-------------------|
| 1 | Gases Exchange | 6 |
| 2 | Homeostasis | 14 |
| 3 | Coordination and Control | 16 |
| 4 | Support and Movement | 8 |
| 5 | Reproduction | 14 |
| 6 | Inheritance | 10 |
| 7 | Man and His Environment | 14 |
| 8 | Biotechnology | 10 |
| 9 | Pharmacology | 8 |

---

## SUBJECT: Mathematics

**Diagram guidance:** Graphs with annotated points, geometric figures for every theorem and construction (step-by-step), number lines, worked-solution flow, interactive graph/figure explorers.

| # | Topic | Board weightage % |
|---|-------|-------------------|
| 1 | Quadratic Equations | 10.53 |
| 2 | Theory of Quadratic Equations | 10.53 |
| 3 | Variations | 6.32 |
| 4 | Partial Fractions | 5.27 |
| 5 | Sets and Functions | 7.37 |
| 6 | Basic Statistics | 6.32 |
| 7 | Introduction to Trigonometry | 10.53 |
| 8 | Projection of a Side of a Triangle | 8.42 |
| 9 | Chords of a Circle | 9.47 |
| 10 | Tangent to a Circle | 4.2 |
| 11 | Chords and Arcs | 4.2 |
| 12 | Angle in a Segment of a Circle | 8.42 |
| 13 | Practical Geometry Circle | 8.42 |

---

## SUBJECT: Computer Science

**Diagram guidance:** Flowcharts, block diagrams, network topologies, memory hierarchy, trace tables for code, database table/relationship diagrams, annotated screenshots-style mockups.

Topics (board did not publish per-topic weightage):

1. Programming Technique
2. Programming in C
3. Input and Output Handling
4. Control Structure
5. Loop Structure
6. Computer Logic and Gates
7. World Wide Web and HTML

---

## SUBJECT: Pakistan Studies

**Diagram guidance:** Timelines, outline maps, cause-and-effect charts, comparison tables, institution/structure charts.

Topics (board did not publish per-topic weightage):

1. History of Pakistan
2. Pakistan and World Affairs
3. Economic Development
4. Population, Society and Culture

---

## SUBJECT: Islamiat Compulsory

**Diagram guidance:** Timelines, structured notes, thematic mind maps. Arabic text and references must be copied only from the official textbook and flagged for human review.

Topics (board did not publish per-topic weightage):

1. Min Huda al-Quran: Surah Al-Ahzab (lessons 1-3), Surah Al-Mumtahina (lesson 4)
2. Min Huda al-Hadith
3. Topical study: Zakat; patience and gratitude; family life; Hijrat and Jihad; rights of people (Huqooq-ul-Ibad)

---

## SUBJECT: English

**Diagram guidance:** Mind maps, writing templates with annotated model answers, grammar rule tables, translation side-by-side tables.

**Paper pattern:** MCQ 15; short questions 6x3; paraphrase 5; stanza comprehension 4x2; do-as-directed 5; English-to-Urdu translation 2x(4+4); essay 10; dialogue 6

The board documents give the paper pattern but no chapter list. Build skill-based modules, and map each to the prescribed KPTBB textbook units once the contents page is available:

1. Reading comprehension (passages and textbook texts)
2. Poetry: stanza reading, reference to context, paraphrasing
3. Grammar, usage and vocabulary (do-as-directed / lexical)
4. Writing skills (formats and model answers for the writing types in this class's paper pattern)
5. Translation English-to-Urdu and Urdu-to-English

---

## SUBJECT: Urdu

**Diagram guidance:** Mind maps, poetry structure tables (matla, sher, maqta etc.), annotated model answers, grammar rule tables.

**Paper pattern:** MCQ 15; passage 8x2; poem 5x2; lexical 5x2; ERQ: passage, nazam, ghazal 5 each; essay 9

The board documents give the paper pattern but no chapter list. Build skill-based modules, and map each to the prescribed KPTBB textbook units once the contents page is available:

1. Iqtibas (prose passage) reading and explanation
2. Nazm and ghazal: explanation, themes, literary devices
3. Zaban shanasi (language and grammar)
4. Creative writing (letter, application, essay, roudad etc. per the paper pattern)

---

## SUBJECTS WITH NO PUBLISHED TOPIC LIST (do not invent topics)

General Mathematics, Islamiat Elective

Ask the owner for the textbook contents page (photo or PDF) for each before building these. Skip them until then.

---

## START
Begin with the first subject above, first topic. Output the topic file, then continue through the list. After every 5 topics, print a short progress checklist.
