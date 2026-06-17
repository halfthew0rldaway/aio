const fs = require('fs');
const https = require('https');

const requestedRepos = [
  'kalkulatorkalori',
  'utilify',
  'gear-in',
  'FluxState',
  'neuroplan-v.3',
  'curio',
  'animix',
  'devdock',
  'manajemen-perpustakaan-digital'
];

const options = {
  hostname: 'api.github.com',
  path: '/users/halfthew0rldaway/repos?per_page=100',
  headers: {
    'User-Agent': 'Node.js',
  }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const repos = JSON.parse(data);
    const projects = requestedRepos.map((repoName, index) => {
      const repo = repos.find(r => r.name.toLowerCase() === repoName.toLowerCase());
      
      let description = repo?.description || 'A cool project by halfthew0rldaway.';
      let techStack = [repo?.language || 'TypeScript'];
      let homepage = repo?.homepage || '';
      
      // Add more specific tech stack based on keywords or repo name if needed
      if (repoName === 'animix') techStack.push('Next.js', 'Consumet API');
      if (repoName === 'devdock') techStack.push('Docker', 'DevOps');
      if (repoName === 'neuroplan-v.3') techStack.push('React', 'Productivity');
      if (repoName === 'curio') techStack.push('Frontend');
      if (repoName === 'FluxState') techStack.push('State Management', 'React');
      
      techStack = [...new Set(techStack.filter(Boolean))];

      return `    {
        id: '${index + 1}',
        name: '${repoName}',
        description: '${description.replace(/'/g, "\\'")}',
        techStack: ${JSON.stringify(techStack)},
        ${homepage ? `liveUrl: '${homepage}',` : ''}
        githubUrl: 'https://github.com/halfthew0rldaway/${repoName}',
    }`;
    });

    const output = `import { Project } from '@/types';

export const projectsData: Project[] = [
${projects.join(',\n')}
];
`;

    fs.writeFileSync('/home/bleu/work-surface/data/projects.ts', output);
    console.log('Successfully generated data/projects.ts');
  });
}).on('error', (err) => {
  console.error(err);
});
