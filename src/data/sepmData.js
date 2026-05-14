export const sepmSyllabusData = [
  {
    id: 'sepm_1',
    name: 'Unit 1: Software Process and Project Management',
    progress: 0,
    modules: [
      {
        id: 'sepm_u1_m1',
        name: 'Software & Applications',
        topics: [
          { id: 'sepm_u1_m1_t1', name: 'Definition of Software: Instructions, data structures, and documentation.', completed: false },
          { id: 'sepm_u1_m1_t2', name: 'Features: Engineered vs. manufactured; deterioration; component-based.', completed: false },
          { id: 'sepm_u1_m1_t3', name: 'Applications: System, application, scientific, embedded, WebApps, AI.', completed: false }
        ]
      },
      {
        id: 'sepm_u1_m2',
        name: 'The Software Process & SPM',
        topics: [
          { id: 'sepm_u1_m2_t1', name: 'Software Process: Activities, actions, and tasks.', completed: false },
          { id: 'sepm_u1_m2_t2', name: 'SPM Goals, resource needs, and lifecycle.', completed: false },
          { id: 'sepm_u1_m2_t3', name: 'SPM Activities: Planning, estimation, risk, and configuration mgmt.', completed: false }
        ]
      },
      {
        id: 'sepm_u1_m3',
        name: 'Process Framework',
        topics: [
          { id: 'sepm_u1_m3_t1', name: 'Framework Activities: Communication, Planning, Modelling, Construction, Deployment.', completed: false, important: true },
          { id: 'sepm_u1_m3_t2', name: 'Umbrella Activities: Tracking, SQA, SCM, risk management.', completed: false, important: true }
        ]
      },
      {
        id: 'sepm_u1_m4',
        name: 'Prescriptive Process Models',
        topics: [
          { id: 'sepm_u1_m4_t1', name: 'Waterfall Model: Sequential phases, limitations.', completed: false, important: true },
          { id: 'sepm_u1_m4_t2', name: 'V-Shaped Model: Emphasis on verification and validation (V&V).', completed: false, important: true },
          { id: 'sepm_u1_m4_t3', name: 'Incremental Model: Delivering software in small pieces.', completed: false },
          { id: 'sepm_u1_m4_t4', name: 'RAD: Short cycles using reusable components.', completed: false }
        ]
      },
      {
        id: 'sepm_u1_m5',
        name: 'Evolutionary Process Models',
        topics: [
          { id: 'sepm_u1_m5_t1', name: 'Prototyping: Iterative design for fuzzy requirements.', completed: false },
          { id: 'sepm_u1_m5_t2', name: 'Spiral Model: Prototyping with linear control cycles.', completed: false, important: true }
        ]
      },
      {
        id: 'sepm_u1_m6',
        name: 'Agile Development',
        topics: [
          { id: 'sepm_u1_m6_t1', name: 'Principles of Agility: Agile Manifesto.', completed: false, important: true },
          { id: 'sepm_u1_m6_t2', name: 'Extreme Programming (XP): User stories, pair programming, TDD.', completed: false, important: true },
          { id: 'sepm_u1_m6_t3', name: 'Scrum: Self-organizing teams, sprints, product backlogs.', completed: false, important: true }
        ]
      },
      {
        id: 'sepm_u1_m7',
        name: 'Project Management Fundamentals',
        topics: [
          { id: 'sepm_u1_m7_t1', name: 'SMART Objectives: Specific, Measurable, Achievable...', completed: false },
          { id: 'sepm_u1_m7_t2', name: 'The Triple Constraint: Scope, Resources (Cost), Schedule (Time).', completed: false, important: true }
        ]
      }
    ]
  },
  {
    id: 'sepm_2',
    name: 'Unit 2: Requirement Engineering',
    progress: 0,
    modules: [
      {
        id: 'sepm_u2_m1',
        name: 'Requirement Basics & Types',
        topics: [
          { id: 'sepm_u2_m1_t1', name: 'User requirements vs. system requirements.', completed: false },
          { id: 'sepm_u2_m1_t2', name: 'Functional vs. Non-functional (Capacity, Availability).', completed: false, important: true }
        ]
      },
      {
        id: 'sepm_u2_m2',
        name: 'Requirement Engineering Process',
        topics: [
          { id: 'sepm_u2_m2_t1', name: 'Feasibility Study: Technical, operational, economic.', completed: false, important: true },
          { id: 'sepm_u2_m2_t2', name: 'Elicitation & Analysis: Interviews, Brainstorming, JAD.', completed: false, important: true },
          { id: 'sepm_u2_m2_t3', name: 'SRS: ER diagrams, DFDs, and Data Dictionaries.', completed: false, important: true },
          { id: 'sepm_u2_m2_t4', name: 'Requirement Validation: Reviews, prototyping, test-cases.', completed: false, important: true },
          { id: 'sepm_u2_m2_t5', name: 'Requirement Management: Handling changes and priorities.', completed: false }
        ]
      },
      {
        id: 'sepm_u2_m3',
        name: 'Software Project Estimation',
        topics: [
          { id: 'sepm_u2_m3_t1', name: 'Estimation Metrics: LOC and Function Point (FP) analysis.', completed: false, important: true },
          { id: 'sepm_u2_m3_t2', name: 'COCOMO I: Organic, Semi-detached, Embedded modes.', completed: false, important: true },
          { id: 'sepm_u2_m3_t3', name: 'COCOMO II: Models for app composition, early design.', completed: false, important: true },
          { id: 'sepm_u2_m3_t4', name: 'Intermediate COCOMO: Cost Drivers and EAF.', completed: false }
        ]
      }
    ]
  },
  {
    id: 'sepm_3',
    name: 'Unit 3: Software Design Fundamentals',
    progress: 0,
    modules: [
      {
        id: 'sepm_u3_m1',
        name: 'Design Process & Concepts',
        topics: [
          { id: 'sepm_u3_m1_t1', name: 'Design Process: Blueprint for construction.', completed: false },
          { id: 'sepm_u3_m1_t2', name: 'Abstraction: Procedural, data, and control types.', completed: false, important: true },
          { id: 'sepm_u3_m1_t3', name: 'Refinement & Modularity: Stepwise elaboration, composability.', completed: false, important: true },
          { id: 'sepm_u3_m1_t4', name: 'Software Architecture & Data Design.', completed: false },
          { id: 'sepm_u3_m1_t5', name: 'Control Hierarchy: Superordinate/subordinate, Fan-out/Fan-in.', completed: false },
          { id: 'sepm_u3_m1_t6', name: 'Structural Partitioning & Information Hiding.', completed: false, important: true }
        ]
      },
      {
        id: 'sepm_u3_m2',
        name: 'Architectural Styles & Patterns',
        topics: [
          { id: 'sepm_u3_m2_t1', name: 'Design Models and Heuristics: The Design Pyramid.', completed: false },
          { id: 'sepm_u3_m2_t2', name: 'Styles: Data-centered, data-flow, call and return, layered.', completed: false, important: true },
          { id: 'sepm_u3_m2_t3', name: 'Patterns: MVC, Repository, and Client-Server.', completed: false, important: true }
        ]
      },
      {
        id: 'sepm_u3_m3',
        name: 'UML Models & Diagrams',
        topics: [
          { id: 'sepm_u3_m3_t1', name: 'UML Things: Structural, Behavioral, Grouping, Annotational.', completed: false, important: true },
          { id: 'sepm_u3_m3_t2', name: 'UML Relationships: Dependency, Association, Generalization.', completed: false, important: true },
          { id: 'sepm_u3_m3_t3', name: 'Structural Diagrams: Class, Object, Component diagrams.', completed: false, important: true },
          { id: 'sepm_u3_m3_t4', name: 'Behavioral Diagrams: Sequence, Collaboration, Use Case diagrams.', completed: false, important: true }
        ]
      },
      {
        id: 'sepm_u3_m4',
        name: 'User Interface (UI) Design',
        topics: [
          { id: 'sepm_u3_m4_t1', name: 'UI Models: User model, design model, system image.', completed: false, important: true },
          { id: 'sepm_u3_m4_t2', name: 'UI Process: Analysis, Design, Construction, Validation.', completed: false, important: true },
          { id: 'sepm_u3_m4_t3', name: 'Design Issues: Response time, error handling.', completed: false },
          { id: 'sepm_u3_m4_t4', name: 'GUI Features: Error prevention, feedback, aesthetics.', completed: false }
        ]
      }
    ]
  },
  {
    id: 'sepm_4',
    name: 'Unit 4: Software Construction and Testing',
    progress: 0,
    modules: [
      {
        id: 'sepm_u4_m1',
        name: 'Software Construction & Coding',
        topics: [
          { id: 'sepm_u4_m1_t1', name: 'Construction Process: Coding, testing, and reviewing.', completed: false },
          { id: 'sepm_u4_m1_t2', name: 'Coding Standards: Modularity, clarity, reliability.', completed: false, important: true },
          { id: 'sepm_u4_m1_t3', name: 'Coding Methods: OOP, auto generation, TDD, pair programming.', completed: false }
        ]
      },
      {
        id: 'sepm_u4_m2',
        name: 'Quality Control & Reviews',
        topics: [
          { id: 'sepm_u4_m2_t1', name: 'Reviews: Deskchecks, Walkthroughs, Code Reviews, Inspections.', completed: false },
          { id: 'sepm_u4_m2_t2', name: 'Debugging: Locating causes via hypotheses and correcting errors.', completed: false }
        ]
      },
      {
        id: 'sepm_u4_m3',
        name: 'Software Testing Basics & Strategies',
        topics: [
          { id: 'sepm_u4_m3_t1', name: 'Testing Basics: Errors, faults, and failures.', completed: false },
          { id: 'sepm_u4_m3_t2', name: 'V&V: Verification vs. Validation.', completed: false, important: true },
          { id: 'sepm_u4_m3_t3', name: 'Testing Levels: Unit, Integration, Validation, System testing.', completed: false, important: true }
        ]
      },
      {
        id: 'sepm_u4_m4',
        name: 'Testing Techniques',
        topics: [
          { id: 'sepm_u4_m4_t1', name: 'White-Box (Glass-Box): Independent paths, logical decisions.', completed: false, important: true },
          { id: 'sepm_u4_m4_t2', name: 'Black-Box (Behavioral): Equivalence partitioning, boundary value analysis (BVA).', completed: false, important: true }
        ]
      }
    ]
  },
  {
    id: 'sepm_5',
    name: 'Unit 5: Product Management',
    progress: 0,
    modules: [
      {
        id: 'sepm_u5_m1',
        name: 'Release & Implementation',
        topics: [
          { id: 'sepm_u5_m1_t1', name: 'Product Release Management: Planning, deployment; Alpha, Beta, Internal.', completed: false },
          { id: 'sepm_u5_m1_t2', name: 'Product Implementation: Interfaces, test data, user training.', completed: false }
        ]
      },
      {
        id: 'sepm_u5_m2',
        name: 'Risk Management',
        topics: [
          { id: 'sepm_u5_m2_t1', name: 'Strategies: Reactive vs. Proactive.', completed: false, important: true },
          { id: 'sepm_u5_m2_t2', name: 'Response & Classifications: Avoidance, Mitigation, Transfer, Acceptance.', completed: false, important: true },
          { id: 'sepm_u5_m2_t3', name: 'Processes & RMMM Plan: Identification, projection, contingency planning.', completed: false, important: true }
        ]
      },
      {
        id: 'sepm_u5_m3',
        name: 'Software Maintenance',
        topics: [
          { id: 'sepm_u5_m3_t1', name: 'Types: Corrective, Adaptive, Perfective, and Preventive.', completed: false, important: true },
          { id: 'sepm_u5_m3_t2', name: "Maintenance Cost & Models: Direct vs. indirect costs, Quick Fix, Boehm's.", completed: false, important: true }
        ]
      },
      {
        id: 'sepm_u5_m4',
        name: 'Engineering Techniques',
        topics: [
          { id: 'sepm_u5_m4_t1', name: 'Reengineering: Inventory analysis, code restructuring.', completed: false, important: true },
          { id: 'sepm_u5_m4_t2', name: 'Reverse Engineering: Extracting design from source code.', completed: false, important: true },
          { id: 'sepm_u5_m4_t3', name: 'Forward Engineering: High-level design to implementation.', completed: false, important: true }
        ]
      }
    ]
  }
];
