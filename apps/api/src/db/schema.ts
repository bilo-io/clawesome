import * as agents from '../features/agents/agents.schema';
import * as skills from '../features/skills/skills.schema';
import * as memories from '../features/memories/memories.schema';
import * as projects from '../features/projects/projects.schema';
import * as workflows from '../features/workflows/workflows.schema';
import * as swarms from '../features/swarms/swarms.schema';

export const schema = {
  ...agents,
  ...skills,
  ...memories,
  ...projects,
  ...workflows,
  ...swarms,
};
