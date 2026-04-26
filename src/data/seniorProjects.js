export const brandStorePlatform = {
  eyebrow: 'Frontend Platform Case Study',
  title: 'Brand Store Platform',
  summary:
    'A server-driven storefront system for composing dynamic brand pages with reusable entities, safe configuration contracts, and scalable frontend rendering patterns.',
  tech: ['React', 'TypeScript', 'GraphQL', 'Server Driven UI', 'Design Systems'],
  metrics: [
    { label: 'Domain', value: 'E-commerce' },
    { label: 'Focus', value: 'Dynamic UI' },
    { label: 'Architecture', value: 'Entity Driven' },
    { label: 'Ownership', value: 'End-to-end' },
  ],
  sections: [
    {
      title: 'Problem',
      body:
        'Brand storefronts need frequent campaign updates, flexible layouts, and consistent UI quality. Static JSON page definitions become rigid as component count, dependencies, and business rules grow.',
    },
    {
      title: 'Approach',
      points: [
        'Modeled pages as composable entities instead of one large static configuration blob.',
        'Defined predictable contracts between backend configuration and frontend rendering.',
        'Separated layout, content, validation, and rendering concerns so teams can iterate independently.',
        'Built reusable storefront blocks that preserve design consistency while supporting campaign-specific variation.',
      ],
    },
    {
      title: 'Senior-Level Decisions',
      points: [
        'Optimized for maintainability and platform scale rather than one-off page delivery.',
        'Designed for graceful handling of incomplete configuration and evolving data contracts.',
        'Balanced product flexibility with guardrails that reduce regressions in live storefronts.',
      ],
    },
    {
      title: 'Impact',
      points: [
        'Improved iteration speed for brand campaigns.',
        'Reduced rigidity in page creation workflows.',
        'Created a cleaner foundation for server-driven frontend capabilities.',
      ],
    },
  ],
  visualPanels: [
    {
      title: 'Page Composition',
      rows: [
        { label: 'Hero Entity', value: 'Ready', status: true },
        { label: 'Product Rail', value: 'Configured', status: true },
        { label: 'Offer Banner', value: 'Reusable', status: true },
      ],
    },
    {
      title: 'Rendering Contract',
      rows: [
        { label: 'Layout', value: 'Schema' },
        { label: 'Content', value: 'Entity' },
        { label: 'Rules', value: 'Validation' },
      ],
    },
  ],
};

export const graphUiSystems = {
  eyebrow: 'Architecture Case Study',
  title: 'Graph-Based UI Systems',
  summary:
    'A dependency-management model for dynamic UI composition using adjacency lists, DAG validation, cycle detection, and deterministic render ordering.',
  tech: ['React', 'TypeScript', 'Data Structures', 'DAG', 'State Machines'],
  metrics: [
    { label: 'Pattern', value: 'DAG' },
    { label: 'Core Idea', value: 'Safe Updates' },
    { label: 'Use Case', value: 'Dynamic Pages' },
    { label: 'Risk Reduced', value: 'Cycles' },
  ],
  sections: [
    {
      title: 'Problem',
      body:
        'Dynamic pages often have hidden dependencies between components, data, and configuration. Without an explicit dependency model, updates can create cycles, inconsistent render order, or hard-to-debug page states.',
    },
    {
      title: 'Approach',
      points: [
        'Represented UI dependencies as an adjacency-list graph.',
        'Used cycle detection before accepting page updates.',
        'Applied topological ordering so dependent blocks render after their prerequisites.',
        'Separated graph validation from rendering to keep UI components simpler.',
      ],
    },
    {
      title: 'Senior-Level Decisions',
      points: [
        'Made invalid states difficult to publish instead of handling every failure at render time.',
        'Kept the model framework-agnostic so the dependency layer can outlive a specific UI implementation.',
        'Designed the system for explainability so product and platform teams can understand why an update is blocked.',
      ],
    },
    {
      title: 'Impact',
      points: [
        'Prevented cyclic dependency issues in dynamic page composition.',
        'Improved confidence when adding new component relationships.',
        'Made complex UI configuration easier to reason about and test.',
      ],
    },
  ],
  visualPanels: [
    {
      title: 'Dependency Graph',
      rows: [
        { label: 'Header', value: 'Root', status: true },
        { label: 'Filter Rail', value: 'Depends on Catalog' },
        { label: 'Product Grid', value: 'Depends on Filters' },
      ],
    },
    {
      title: 'Validation',
      rows: [
        { label: 'Cycle Check', value: 'Passed', status: true },
        { label: 'Render Order', value: 'Resolved', status: true },
        { label: 'Safe Publish', value: 'Enabled', status: true },
      ],
    },
  ],
};
