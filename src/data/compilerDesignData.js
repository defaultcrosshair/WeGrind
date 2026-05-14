export const compilerDesignSyllabusData = [
  {
    id: 'cd_1',
    name: 'Unit 1: Introduction',
    progress: 0,
    modules: [
      {
        id: 'cd_u1_m1',
        name: 'Compilers & Translators',
        topics: [
          { id: 'cd_u1_m1_t1', name: 'Definition and Types (Compiler, Interpreter, Assembler)', completed: false },
          { id: 'cd_u1_m1_t2', name: 'Working of Compiler Phases [PY]', completed: false, important: true }
        ]
      },
      {
        id: 'cd_u1_m2',
        name: 'Compiler Structure & Construction',
        topics: [
          { id: 'cd_u1_m2_t1', name: 'Phases of Compiler [PY] (Analysis and Synthesis parts)', completed: false, important: true },
          { id: 'cd_u1_m2_t2', name: 'Compiler Passes (Single, Two, and Multi-pass compilers)', completed: false },
          { id: 'cd_u1_m2_t3', name: 'Cousins of the Compiler (Preprocessors, Linkers, Loaders)', completed: false },
          { id: 'cd_u1_m2_t4', name: 'Compiler Construction Tools [PY] (Scanner/Parser Generators)', completed: false, important: true }
        ]
      },
      {
        id: 'cd_u1_m3',
        name: 'Lexical Analysis',
        topics: [
          { id: 'cd_u1_m3_t1', name: 'Role of Lexical Analyser [PY] and interaction with Parser', completed: false, important: true },
          { id: 'cd_u1_m3_t2', name: 'Tokens, Patterns, and Lexemes', completed: false },
          { id: 'cd_u1_m3_t3', name: 'Input Buffering [PY] (Buffer Pairs and Sentinels)', completed: false, important: true },
          { id: 'cd_u1_m3_t4', name: 'Lexical Errors and Error Recovery', completed: false }
        ]
      },
      {
        id: 'cd_u1_m4',
        name: 'LEX & Finite Automata',
        topics: [
          { id: 'cd_u1_m4_t1', name: 'LEX Program [PY] and Lexical-Analyser Generators', completed: false, important: true },
          { id: 'cd_u1_m4_t2', name: 'Structure of Lex programs (Declarations, Rules, etc.)', completed: false },
          { id: 'cd_u1_m4_t3', name: 'DFA Diagram [PY] and Transition Diagrams', completed: false, important: true },
          { id: 'cd_u1_m4_t4', name: 'Regular Expressions to Automata & Minimizing DFA', completed: false }
        ]
      }
    ]
  },
  {
    id: 'cd_2',
    name: 'Unit 2: Top-Down Parsing',
    progress: 0,
    modules: [
      {
        id: 'cd_u2_m1',
        name: 'Parsing Process & Grammars',
        topics: [
          { id: 'cd_u2_m1_t1', name: 'Top-Down Parsing [PY] vs. Bottom-Up Parsing', completed: false, important: true },
          { id: 'cd_u2_m1_t2', name: 'Define CFG (Context-Free Grammar) [PY] and its components', completed: false, important: true },
          { id: 'cd_u2_m1_t3', name: 'Ambiguous Grammar [PY] & Elimination of Ambiguity [PY]', completed: false, important: true },
          { id: 'cd_u2_m1_t4', name: 'Left Recursion & Left Factoring', completed: false }
        ]
      },
      {
        id: 'cd_u2_m2',
        name: 'Parsing Techniques',
        topics: [
          { id: 'cd_u2_m2_t1', name: 'Recursive Descent Parser (backtracking limitations)', completed: false },
          { id: 'cd_u2_m2_t2', name: 'LL(1) Parser [PY] (Non-recursive predictive parsing)', completed: false, important: true },
          { id: 'cd_u2_m2_t3', name: 'Computation of FIRST and FOLLOW [PY]', completed: false, important: true },
          { id: 'cd_u2_m2_t4', name: 'Construction of Predictive Parsing Table & Algorithm', completed: false }
        ]
      },
      {
        id: 'cd_u2_m3',
        name: 'Parse Trees & SDT',
        topics: [
          { id: 'cd_u2_m3_t1', name: 'Parse Tree [PY] and compressed Syntax Trees', completed: false, important: true },
          { id: 'cd_u2_m3_t2', name: 'Derivation and Parse Tree [PY] construction', completed: false, important: true },
          { id: 'cd_u2_m3_t3', name: 'Leading and Trailing [PY]', completed: false, important: true },
          { id: 'cd_u2_m3_t4', name: 'Operator Precedence Relation Table [PY]', completed: false, important: true },
          { id: 'cd_u2_m3_t5', name: 'Assignment Statements using SDT [PY]', completed: false, important: true }
        ]
      }
    ]
  },
  {
    id: 'cd_3',
    name: 'Unit 3: Bottom-Up Parsing',
    progress: 0,
    modules: [
      {
        id: 'cd_u3_m1',
        name: 'Fundamentals & Shift-Reduce',
        topics: [
          { id: 'cd_u3_m1_t1', name: 'Fundamentals of Bottom-Up Parsing [PY]', completed: false, important: true },
          { id: 'cd_u3_m1_t2', name: 'Handle Pruning & Reductions', completed: false },
          { id: 'cd_u3_m1_t3', name: 'Shift Reduce Parsing [PY] and stack implementation', completed: false, important: true }
        ]
      },
      {
        id: 'cd_u3_m2',
        name: 'LR Parsers',
        topics: [
          { id: 'cd_u3_m2_t1', name: 'LR Parsing [PY] (Need and advantages)', completed: false, important: true },
          { id: 'cd_u3_m2_t2', name: 'LR(0), Closure of LR(0), GOTO of LR(0), SLR [PY]', completed: false, important: true },
          { id: 'cd_u3_m2_t3', name: 'LR(1), Closure of LR(1), GOTO of LR(1), LALR/CLR [PY]', completed: false, important: true }
        ]
      },
      {
        id: 'cd_u3_m3',
        name: 'YACC',
        topics: [
          { id: 'cd_u3_m3_t1', name: 'YACC (Yet Another Compiler Compiler)', completed: false },
          { id: 'cd_u3_m3_t2', name: 'Interaction between LEX and YACC', completed: false }
        ]
      }
    ]
  },
  {
    id: 'cd_4',
    name: 'Unit 4: Code Generation',
    progress: 0,
    modules: [
      {
        id: 'cd_u4_m1',
        name: 'Intermediate Code Generation',
        topics: [
          { id: 'cd_u4_m1_t1', name: 'Intermediate Code Generation [PY] (Syntax Trees, Postfix)', completed: false, important: true },
          { id: 'cd_u4_m1_t2', name: 'Syntax Tree [PY] and DAG representation', completed: false, important: true },
          { id: 'cd_u4_m1_t3', name: 'Infix to Postfix [PY] conversion', completed: false, important: true }
        ]
      },
      {
        id: 'cd_u4_m2',
        name: 'Three-Address Code & SDT',
        topics: [
          { id: 'cd_u4_m2_t1', name: 'Types of Three Address Statements [PY]', completed: false, important: true },
          { id: 'cd_u4_m2_t2', name: 'Quadruples, Triples, Indirect Triples [PY]', completed: false, important: true },
          { id: 'cd_u4_m2_t3', name: 'Boolean Expression (Numerical Representation) using SDT [PY]', completed: false, important: true },
          { id: 'cd_u4_m2_t4', name: 'Boolean Expression – Flow of Control using SDT [PY]', completed: false, important: true }
        ]
      },
      {
        id: 'cd_u4_m3',
        name: 'Code Generation Design',
        topics: [
          { id: 'cd_u4_m3_t1', name: 'Issues in Design of Code Generator [PY]', completed: false, important: true },
          { id: 'cd_u4_m3_t2', name: 'Simple Code Generator Algorithm [PY]', completed: false, important: true },
          { id: 'cd_u4_m3_t3', name: 'Register Allocation & Cross Compilation', completed: false }
        ]
      }
    ]
  },
  {
    id: 'cd_5',
    name: 'Unit 5: Code Optimization',
    progress: 0,
    modules: [
      {
        id: 'cd_u5_m1',
        name: 'Optimization Fundamentals',
        topics: [
          { id: 'cd_u5_m1_t1', name: 'Basic Blocks and Flow Graphs [PY]', completed: false, important: true },
          { id: 'cd_u5_m1_t2', name: 'Principal Sources of Optimisation [PY]', completed: false, important: true },
          { id: 'cd_u5_m1_t3', name: 'Peephole Optimisation [PY]', completed: false, important: true }
        ]
      },
      {
        id: 'cd_u5_m2',
        name: 'Optimization Techniques',
        topics: [
          { id: 'cd_u5_m2_t1', name: 'DAG (Directed Acyclic Graph) [PY] for Basic Blocks', completed: false, important: true },
          { id: 'cd_u5_m2_t2', name: 'Transformation on Basic Blocks [PY]', completed: false, important: true },
          { id: 'cd_u5_m2_t3', name: 'Global Data Flow Analysis [PY] (GEN, KILL, IN, OUT)', completed: false, important: true }
        ]
      },
      {
        id: 'cd_u5_m3',
        name: 'Runtime Environments',
        topics: [
          { id: 'cd_u5_m3_t1', name: 'Storage Organization & Allocation Strategies', completed: false },
          { id: 'cd_u5_m3_t2', name: 'Activation Records & Parameter Passing', completed: false }
        ]
      }
    ]
  }
];
