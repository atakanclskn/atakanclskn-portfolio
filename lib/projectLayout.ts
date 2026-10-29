import { Project, ProjectLayout } from '../types';

// Before layouts were editable the grid was positional: first project featured, fourth wide
const positionalLayout = (index: number): ProjectLayout =>
  index === 0 ? 'featured' : index === 3 ? 'wide' : 'standard';

// Uses the admin-chosen layouts once any project has one, otherwise the old positional layout
export const getProjectLayout = (projects: Project[], index: number): ProjectLayout =>
  projects.some(p => p.layout) ? (projects[index].layout ?? 'standard') : positionalLayout(index);
