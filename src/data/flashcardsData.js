export const flashcardsData = [
  {
    id: 'fc_ds',
    subject: 'Data Science',
    color: '#4285f4',
    decks: [
      {
        id: 'fc_ds_d5',
        name: 'Top Exam Questions (PYQ)',
        cards: [
          { id: 'fc_ds_d5_c1', q: 'Which NumPy function is used to generate an identity matrix?', a: 'The eye() or identity() function.' },
          { id: 'fc_ds_d5_c2', q: 'What is the primary difference between a Pandas Series and a DataFrame?', a: 'A Series is a one-dimensional labeled array, while a DataFrame is a two-dimensional tabular structure with rows and columns.' },
          { id: 'fc_ds_d5_c3', q: 'List the six steps of the complete Data Science process.', a: '1. Setting the research goal; 2. Retrieving data; 3. Data preparation; 4. Data exploration; 5. Data modeling; 6. Presentation and automation.' },
          { id: 'fc_ds_d5_c4', q: 'Which Pandas functions are used to handle missing (NaN) values?', a: 'dropna() (to remove missing values) and fillna() (to replace missing values).' },
          { id: 'fc_ds_d5_c5', q: 'What type of algorithm is best suited for handling large datasets without loading everything into RAM?', a: 'Online Learning algorithms, as they can be trained using one observation at a time.' },
          { id: 'fc_ds_d5_c6', q: 'What is the primary purpose of a Box Plot?', a: 'To display the spread of a dataset, show quartiles/median, and specifically to detect outliers.' },
          { id: 'fc_ds_d5_c7', q: 'What does "Data Alignment" refer to in Pandas?', a: 'Matching data from multiple objects based on common indices.' },
          { id: 'fc_ds_d5_c8', q: 'What is the goal of "Standardization" using a Z-Score?', a: 'To scale numerical data so it has a mean of 0 and a standard deviation (or variance) of 1.' },
          { id: 'fc_ds_d5_c9', q: 'Which Seaborn plot is best for visualizing relationships between all pairs of numeric columns?', a: 'The Pair Plot (pairplot()).' },
          { id: 'fc_ds_d5_c10', q: 'What is "Data Munging"?', a: 'Another term for Data Wrangling, which is the process of transforming and cleaning raw data into a suitable format for analysis.' },
          { id: 'fc_ds_d5_c11', q: 'Identify the method used to join two DataFrames on a common column.', a: 'The merge() function.' },
        ]
      },
      {
        id: 'fc_ds_d1',
        name: 'Data Science Process & Facets',
        cards: [
          { id: 'fc_ds_d1_c1', q: 'What are the 6 steps of the Data Science Process?', a: 'Goal Setting → Data Retrieval → Data Preparation → Data Exploration → Modeling → Presentation/Deployment' },
          { id: 'fc_ds_d1_c2', q: 'What is the difference between Structured and Unstructured data?', a: 'Structured data fits neatly into rows/columns (like SQL tables). Unstructured data has no predefined format (e.g., text, images, videos).' },
          { id: 'fc_ds_d1_c3', q: 'What is Natural Language Processing (NLP)?', a: 'A field of AI enabling computers to understand, interpret, and generate human language. Used for text classification, sentiment analysis, machine translation, etc.' },
          { id: 'fc_ds_d1_c4', q: 'What is streaming data?', a: 'Data generated continuously from sources like sensors, social media, or IoT devices, processed in real-time or near-real-time.' },
          { id: 'fc_ds_d1_c5', q: 'What is web scraping vs. a Web API?', a: 'Web API: Official, structured interface to get data from a service. Web scraping: Extracting data by parsing raw HTML of websites (no official API).' },
        ]
      },
      {
        id: 'fc_ds_d2',
        name: 'NumPy & Pandas',
        cards: [
          { id: 'fc_ds_d2_c1', q: 'What does np.identity(n) return?', a: 'An n×n square matrix with 1s on the main diagonal and 0s elsewhere (identity matrix).' },
          { id: 'fc_ds_d2_c2', q: 'What is the difference between loc and iloc in Pandas?', a: 'loc: Label-based indexing (uses actual row/column names). iloc: Integer position-based indexing (uses 0-based indices).' },
          { id: 'fc_ds_d2_c3', q: 'What is the difference between a Pandas Series and a DataFrame?', a: 'Series: 1D labeled array (single column). DataFrame: 2D labeled data structure (multiple columns), like a spreadsheet.' },
          { id: 'fc_ds_d2_c4', q: 'What does array.reshape() do in NumPy?', a: 'Changes the shape of an array without changing its data. E.g., reshape(3,4) turns a 12-element array into a 3-row, 4-column matrix.' },
          { id: 'fc_ds_d2_c5', q: 'What is vectorization in NumPy?', a: 'Applying operations to entire arrays at once without explicit loops, leveraging optimized C code for much faster computation.' },
        ]
      },
      {
        id: 'fc_ds_d3',
        name: 'Data Wrangling & Cleaning',
        cards: [
          { id: 'fc_ds_d3_c1', q: 'What is Online Learning vs Batch Learning?', a: 'Batch: Model trained on entire dataset at once. Online: Model updated incrementally as new data arrives — useful for large/streaming datasets.' },
          { id: 'fc_ds_d3_c2', q: 'What is MapReduce?', a: 'A parallel processing framework: Map phase distributes data across nodes and applies a function; Reduce phase aggregates the results.' },
          { id: 'fc_ds_d3_c3', q: 'What are 3 ways to handle missing data in Pandas?', a: '1. dropna() — remove rows/cols with NaN. 2. fillna(value) — fill with a constant. 3. interpolate() — fill using interpolation.' },
          { id: 'fc_ds_d3_c4', q: 'What is data discretization?', a: 'Converting continuous numerical data into discrete categories/bins. E.g., age 0-18 = "young", 19-60 = "adult", 60+ = "senior".' },
          { id: 'fc_ds_d3_c5', q: 'What is the difference between merge and concat in Pandas?', a: 'concat: Stacks DataFrames along rows or columns. merge: Joins DataFrames based on a common key column (like SQL JOIN).' },
        ]
      },
      {
        id: 'fc_ds_d4',
        name: 'Data Visualization',
        cards: [
          { id: 'fc_ds_d4_c1', q: 'What is a FacetGrid in Seaborn?', a: 'A multi-plot grid for plotting conditional relationships — creates a grid of subplots based on categorical variables.' },
          { id: 'fc_ds_d4_c2', q: 'What does plt.subplot() do?', a: 'Creates multiple plots in a single figure. E.g., plt.subplot(2,2,1) creates a 2x2 grid and selects the 1st subplot.' },
          { id: 'fc_ds_d4_c3', q: 'What is the difference between a histogram and a boxplot?', a: 'Histogram: Shows frequency distribution of data. Boxplot: Shows median, quartiles, and outliers — better for comparing distributions.' },
          { id: 'fc_ds_d4_c4', q: 'What is a pair plot?', a: "A grid of scatter plots for every pair of numerical features in a dataset, useful for detecting correlations. Created with seaborn's pairplot()." },
        ]
      },
    ]
  },
  {
    id: 'fc_sepm',
    subject: 'SEPM',
    color: '#34a853',
    decks: [
      {
        id: 'fc_sepm_pyq',
        name: 'Top Exam Questions (PYQ)',
        cards: [
          { id: 'fc_sepm_pyq_c1', q: 'Which SDLC model is also known as the "classic life cycle"?', a: 'The Waterfall Model.' },
          { id: 'fc_sepm_pyq_c2', q: 'Which model should be chosen for projects with heavy risk analysis?', a: 'The Spiral Model.' },
          { id: 'fc_sepm_pyq_c3', q: 'What is the primary factor for effort estimation in COCOMO?', a: 'Software size, typically in KLOC (Kilo Lines of Code).' },
          { id: 'fc_sepm_pyq_c4', q: 'What is the difference between Verification and Validation?', a: 'Verification: "Are we building the product right?". Validation: "Are we building the right product?".' },
          { id: 'fc_sepm_pyq_c5', q: 'Which testing technique is known as "Glass-Box" testing?', a: 'White-box testing.' },
          { id: 'fc_sepm_pyq_c6', q: 'What is the term for the number of customer stories implemented during the first release in agile?', a: 'Project velocity.' },
          { id: 'fc_sepm_pyq_c7', q: 'What does SWOT stand for in risk analysis?', a: 'Strengths, Weaknesses, Opportunities, and Threats.' },
          { id: 'fc_sepm_pyq_c8', q: 'What is the primary goal of the Scrum methodology?', a: 'To maximize product value by frequently delivering working increments.' },
          { id: 'fc_sepm_pyq_c9', q: 'What is the difference between Coupling and Cohesion?', a: 'Coupling: Connectivity between modules. Cohesion: Strength of relationship within a module (Internal focus).' },
          { id: 'fc_sepm_pyq_c10', q: 'What is Adaptive Maintenance?', a: 'Modifying software to match changes in an ever-changing environment.' }
        ]
      },
      {
        id: 'fc_sepm_u1',
        name: 'Unit 1: Process & Management',
        cards: [
          { id: 'fc_sepm_u1_c1', q: 'Define Software.', a: 'A combination of instructions (programs), data structures, and documentation.' },
          { id: 'fc_sepm_u1_c2', q: 'What are the 5 Framework Activities?', a: 'Communication, Planning, Modelling, Construction, and Deployment.' },
          { id: 'fc_sepm_u1_c3', q: 'What is the Waterfall Model?', a: 'A sequential model (Classic Life Cycle) where phases flow downward like a waterfall.' },
          { id: 'fc_sepm_u1_c4', q: 'What is the Spiral Model?', a: 'An iterative, risk-driven process model described by Barry Boehm.' },
          { id: 'fc_sepm_u1_c5', q: 'What is the "Triple Constraint" in PM?', a: 'The balance between Scope, Resources (Cost), and Schedule (Time).' },
          { id: 'fc_sepm_u1_c6', q: 'What are Umbrella Activities?', a: 'Activities applied across the entire process: SQA, SCM, Risk Management, and Tracking.' },
          { id: 'fc_sepm_u1_c7', q: 'What is Scrum?', a: 'An agile framework featuring self-organizing teams, backlogs, and time-boxed Sprints.' }
        ]
      },
      {
        id: 'fc_sepm_u2',
        name: 'Unit 2: Requirement Engineering',
        cards: [
          { id: 'fc_sepm_u2_c1', q: 'What is Functional vs Non-functional?', a: 'Functional: What the system does. Non-functional: Performance, security, and constraints.' },
          { id: 'fc_sepm_u2_c2', q: 'What is the RE Process?', a: 'Feasibility Study → Elicitation → Specification (SRS) → Validation → Management.' },
          { id: 'fc_sepm_u2_c3', q: 'What is an SRS?', a: 'Software Requirement Specification — the technical document detailing all requirements.' },
          { id: 'fc_sepm_u2_c4', q: 'Define FP Analysis.', a: 'Function Point Analysis — measuring software size based on functionality from the user perspective.' },
          { id: 'fc_sepm_u2_c5', q: 'What are the 3 modes of COCOMO I?', a: 'Organic (simple), Semi-detached (medium), and Embedded (complex/strict).' },
          { id: 'fc_sepm_u2_c6', q: 'What are Use Cases?', a: 'Scenarios describing how a system will be used by actors.' }
        ]
      },
      {
        id: 'fc_sepm_u3',
        name: 'Unit 3: Software Design',
        cards: [
          { id: 'fc_sepm_u3_c1', q: 'What is Information Hiding?', a: 'Encapsulating internal data and procedural details of a module from others.' },
          { id: 'fc_sepm_u3_c2', q: 'Define Modularity.', a: 'Dividing software into addressable components or modules.' },
          { id: 'fc_sepm_u3_c3', q: 'What is the Pipe and Filter architecture?', a: 'A data-flow style where data flows through a series of filters/processes.' },
          { id: 'fc_sepm_u3_c4', q: 'What is the MVC pattern?', a: 'Model-View-Controller — separating data logic, user interface, and control logic.' },
          { id: 'fc_sepm_u3_c5', q: 'What are the building blocks of UML?', a: 'Things (Structural/Behavioral), Relationships, and Diagrams.' },
          { id: 'fc_sepm_u3_c6', q: 'What is a Sequence Diagram?', a: 'A UML diagram showing chronological interactions between objects.' },
          { id: 'fc_sepm_u3_c7', q: 'What is Abstraction?', a: 'Specifying entities while suppressing low-level details (Procedural, Data, Control).' }
        ]
      },
      {
        id: 'fc_sepm_u4',
        name: 'Unit 4: Construction & Testing',
        cards: [
          { id: 'fc_sepm_u4_c1', q: 'What are Coding Standards?', a: 'Rules ensuring code is modular, clear, simple, and maintainable.' },
          { id: 'fc_sepm_u4_c2', q: 'What is Unit Testing?', a: 'Testing individual modules in isolation, often using drivers and stubs.' },
          { id: 'fc_sepm_u4_c3', q: 'What is Regression Testing?', a: 'Re-testing to ensure changes didn\'t break existing functionality.' },
          { id: 'fc_sepm_u4_c4', q: 'Define Black-Box Testing.', a: 'Functional testing without knowledge of internal code (e.g., Equivalence Partitioning, BVA).' },
          { id: 'fc_sepm_u4_c5', q: 'What is Boundary Value Analysis (BVA)?', a: 'Testing at the edges/boundaries of input ranges where errors often occur.' },
          { id: 'fc_sepm_u4_c6', q: 'What is a Code Walkthrough?', a: 'A peer review to find algorithmic and logical errors in code.' },
          { id: 'fc_sepm_u4_c7', q: 'What is TDD?', a: 'Test-Driven Development — writing tests before writing the actual code.' }
        ]
      },
      {
        id: 'fc_sepm_u5',
        name: 'Unit 5: Product Management',
        cards: [
          { id: 'fc_sepm_u5_c1', q: 'What is Reverse Engineering?', a: 'Analyzing source code to extract high-level design and requirements.' },
          { id: 'fc_sepm_u5_c2', q: 'What is Forward Engineering?', a: 'The conventional SDLC process from requirements to final implementation.' },
          { id: 'fc_sepm_u5_c3', q: 'What is an RMMM Plan?', a: 'Risk Mitigation, Monitoring, and Management Plan.' },
          { id: 'fc_sepm_u5_c4', q: 'What are the 4 types of Maintenance?', a: 'Corrective (fix bugs), Adaptive (new environment), Perfective (add features), and Preventive (refactoring).' },
          { id: 'fc_sepm_u5_c5', q: 'Define Reengineering.', a: 'Altering an existing system to re-create it in a new form without changing behavior.' },
          { id: 'fc_sepm_u5_c6', q: 'What is Proactive Risk Strategy?', a: 'Identifying and mitigating potential risks early, before they become problems.' }
        ]
      }
    ]
  },
  {
    id: 's3',
    subject: 'Compiler Design',
    color: '#8b5cf6', // Violet color for CD
    decks: [
      {
        id: 'cd_d0',
        name: 'Top Exam Questions (PYQ)',
        cards: [
          { id: 'fc_cd_pyq_1', q: 'Describe the roles of the two pointers used in the input buffering scheme.', a: 'The lexemeBegin pointer marks the start of the current lexeme being identified, while the forward pointer scans ahead until a pattern match is found.' },
          { id: 'fc_cd_pyq_2', q: 'Distinguish the operational difference between a compiler and an interpreter.', a: 'A compiler translates the entire high-level source program into an equivalent target machine program before execution; an interpreter executes the source program line-by-line, often providing better error diagnostics.' },
          { id: 'fc_cd_pyq_3', q: 'Provide the formal definition of a Deterministic Finite Automaton (DFA).', a: 'A DFA is a 5-tuple M = (Q, Σ, δ, q0, F), consisting of a finite set of states (Q), a finite set of input symbols (Σ), a transition function (δ), an initial state (q0), and a set of final/accepting states (F).' },
          { id: 'fc_cd_pyq_4', q: 'What is an ambiguous grammar?', a: 'A grammar is considered ambiguous if it can produce more than one parse tree (or more than one leftmost/rightmost derivation) for the same input string.' },
          { id: 'fc_cd_pyq_5', q: 'Name the four possible actions a shift-reduce parser can perform.', a: 'The four actions are Shift (push input to stack), Reduce (replace a handle with a non-terminal), Accept (successful completion), and Error.' },
          { id: 'fc_cd_pyq_6', q: 'Distinguish between Quadruple and Triple representations of three-address code.', a: 'Quadruples use four fields (op, arg1, arg2, result). Triples use only three fields (op, arg1, arg2) and refer to the results of instructions by their position/index in the code sequence.' },
          { id: 'fc_cd_pyq_7', q: 'Define peephole optimization.', a: 'It is a local optimization technique that examines a short sequence of target instructions (the "peephole") and replaces them with a faster or shorter sequence if possible.' },
          { id: 'fc_cd_pyq_8', q: 'State the rules for determining the "header" or leader in a basic block.', a: '1. The first instruction is a leader; 2. Any instruction that is the target of a jump is a leader; 3. Any instruction immediately following a jump is a leader.' },
          { id: 'fc_cd_pyq_9', q: 'In global data flow analysis for reaching definitions, define GEN and KILL sets.', a: 'GEN[B] contains definitions generated within block B that reach the end of the block; KILL[B] contains definitions outside of block B that are redefined (killed) by definitions within block B.' },
          { id: 'fc_cd_pyq_10', q: 'Why are FIRST and FOLLOW sets computed for a grammar?', a: 'They are required to construct predictive parsing tables (LL(1) tables) and are also used in error recovery to determine where the parser can safely resume.' },
          { id: 'fc_cd_pyq_11', q: 'The sequence of procedure calls in a program corresponds to which traversal of the activation tree?', a: 'It corresponds to a pre-order traversal.' },
          { id: 'fc_cd_pyq_12', q: 'In SLR parsing, how does the parser decide when to perform a reduction?', a: 'It reduces A → β if the next input symbol is in the FOLLOW(A) set.' },
          { id: 'fc_cd_pyq_13', q: 'What is the general form of a three-address code statement?', a: 'It is a sequence of instructions where each instruction has at most three operands, typically represented as x = y op z.' },
          { id: 'fc_cd_pyq_14', q: 'What is the primary purpose of backpatching in intermediate code generation?', a: 'It is used to fill in the target labels of jump or goto statements that were left unspecified during a single pass over the source code.' }
        ]
      },
      {
        id: 'cd_d1',
        name: 'Unit 1: Introduction',
        cards: [
          { id: 'fc_cd_u1_1', q: 'What is the difference between a "phase" and a "pass" in a compiler?', a: 'A phase is a logical stage (e.g., Lexical Analysis). A pass refers to one complete reading of the source file. Multiple phases can be grouped into a single pass.' },
          { id: 'fc_cd_u1_2', q: 'What kind of information is stored in the Symbol Table?', a: 'Identifier names, their types, memory addresses (offsets), and other attributes discovered during analysis.' },
          { id: 'fc_cd_u1_3', q: 'What are the three sections of a Lex program?', a: '1. Declarations (constants/definitions); 2. Translation Rules (patterns/actions); 3. Auxiliary Functions (C routines).' },
          { id: 'fc_cd_u1_4', q: 'Give an example of an error a Lexical Analyser cannot detect.', a: 'A misspelled keyword (like `fi` instead of `if`) if it matches the identifier pattern, or an infinitely recursive call.' },
          { id: 'fc_cd_u1_5', q: 'Which phases are commonly grouped together in the "Front End"?', a: 'Lexical analysis, syntax analysis, semantic analysis, and intermediate code generation. (Machine-independent).' }
        ]
      },
      {
        id: 'cd_d2',
        name: 'Unit 2: Top-Down Parsing',
        cards: [
          { id: 'fc_cd_u2_1', q: 'What are the three goals of a parser\'s error handler?', a: '1. Report errors clearly; 2. Recover quickly to find subsequent errors; 3. Add minimal overhead to correct programs.' },
          { id: 'fc_cd_u2_2', q: 'In a CFG, what is the difference between Terminals and Non-terminals?', a: 'Terminals are basic symbols (e.g., id, +). Non-terminals are syntactic variables representing sets of strings, replaced by productions.' },
          { id: 'fc_cd_u2_3', q: 'When is left factoring necessary?', a: 'When a production has alternatives with a common prefix, making it difficult for the parser to decide which to choose.' },
          { id: 'fc_cd_u2_4', q: 'What is the relationship between a derivation and a parse tree?', a: 'A parse tree is a hierarchical graphical representation of a derivation. Root = start symbol, interior = productions, leaves = terminals.' },
          { id: 'fc_cd_u2_5', q: 'If A → α is a production, for which terminals do we add it to entry M[A, a]?', a: 'For every terminal `a` in FIRST(α). If ε is in FIRST(α), also add it for every terminal in FOLLOW(A).' }
        ]
      },
      {
        id: 'cd_d3',
        name: 'Unit 3: Bottom-Up Parsing',
        cards: [
          { id: 'fc_cd_u3_1', q: 'Why is SLR more powerful than LR(0)?', a: 'LR(0) decides based only on current state. SLR uses FOLLOW(A) sets to only reduce if the next input is a valid successor.' },
          { id: 'fc_cd_u3_2', q: 'What does YACC stand for and what is its purpose?', a: 'Yet Another Compiler Compiler. It generates a parser (LALR) based on a given context-free grammar.' },
          { id: 'fc_cd_u3_3', q: 'Describe the general process of handle pruning.', a: 'Find a handle (substring matching a production body), replace it with the production head. Repeat until start symbol is reached.' },
          { id: 'fc_cd_u3_4', q: 'Give an example of a grammar problem causing a Shift/Reduce conflict.', a: 'The "Dangling Else" problem: the parser cannot decide whether to shift `else` or reduce the preceding `if-then`.' },
          { id: 'fc_cd_u3_5', q: 'What does the lookahead `a` represent in LR(1) item [A → α • β, a]?', a: 'Reduction A → αβ should only occur if the next symbol in the input stream is `a`.' }
        ]
      },
      {
        id: 'cd_d4',
        name: 'Unit 4: Code Generation',
        cards: [
          { id: 'fc_cd_u4_1', q: 'How are elements of a 2D array A[i, j] stored in "Row-Major" order?', a: 'Elements are stored row by row (standard in C).' },
          { id: 'fc_cd_u4_2', q: 'In boolean expression translation, what are truelist and falselist?', a: 'Lists of jump instructions that must be backpatched with the label where control flows if the expression is true or false.' },
          { id: 'fc_cd_u4_3', q: 'Why is instruction selection difficult during code generation?', a: 'Different instructions have different costs. Finding the optimal sequence is mathematically NP-complete.' },
          { id: 'fc_cd_u4_4', q: 'What is the benefit of producing relocatable machine code?', a: 'Allows subprograms to be compiled separately; a linker combines them and resolves memory addresses into an executable.' },
          { id: 'fc_cd_u4_5', q: 'Distinguish between Synthesized and Inherited attributes in SDT.', a: 'Synthesized attributes are computed from children nodes. Inherited attributes are computed from parent or sibling nodes.' }
        ]
      },
      {
        id: 'cd_d5',
        name: 'Unit 5: Code Optimization',
        cards: [
          { id: 'fc_cd_u5_1', q: 'What is "Rule 2" for identifying leaders in basic blocks?', a: 'Any instruction that is the target of a conditional or unconditional jump is a leader.' },
          { id: 'fc_cd_u5_2', q: 'What does it mean for a variable to be "live"?', a: 'A variable is live if its current value is needed for a future use in the program before it is redefined.' },
          { id: 'fc_cd_u5_3', q: 'Define the GEN[B] set in Data Flow Analysis.', a: 'The set of definitions created within basic block B that are not redefined before the end of the block.' },
          { id: 'fc_cd_u5_4', q: 'What is the purpose of an Activation Record (Stack Frame)?', a: 'A block of memory on the stack used to manage a procedure call (local variables, return address, parameters).' },
          { id: 'fc_cd_u5_5', q: 'What are the four typical code and data areas in a runtime environment?', a: '1. Code (instructions); 2. Static (global data); 3. Heap (dynamic data); 4. Stack (activation records).' }
        ]
      }
    ]
  }
];
