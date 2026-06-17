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

const headers = {
  'User-Agent': 'Node.js',
};

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(JSON.parse(data));
        } else {
            console.error(`Failed to fetch ${url}`, res.statusCode, data);
            resolve(null);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  const repos = await fetchJson('https://api.github.com/users/halfthew0rldaway/repos?per_page=100');
  if (!repos) return;

  const projects = [];
  
  for (let i = 0; i < requestedRepos.length; i++) {
    const repoName = requestedRepos[i];
    const repo = repos.find(r => r.name.toLowerCase() === repoName.toLowerCase());
    
    let description = repo?.description || 'A project by halfthew0rldaway.';
    let techStack = [];
    let homepage = repo?.homepage || '';

    if (repo && repo.languages_url) {
        const langs = await fetchJson(repo.languages_url);
        if (langs) Object.keys(langs).slice(0, 4).forEach(l => techStack.push(l));
    }
    
    // Add fallback if languages API fails
    if (techStack.length === 0 && repo?.language) techStack.push(repo.language);
    
    // Custom overrides based on known repo context to make it look professional
    if (repoName === 'FluxState') techStack.push('State Management');
    if (repoName === 'neuroplan-v.3') techStack.push('Productivity');
    if (repoName === 'devdock') techStack.push('Docker');
    if (repoName === 'animix') techStack.push('Consumet API');

    techStack = [...new Set(techStack.filter(Boolean))];

    projects.push({
        id: String(i + 1),
        name: repo?.name || repoName,
        description: description,
        techStack: techStack,
        liveUrl: homepage,
        githubUrl: repo?.html_url || `https://github.com/halfthew0rldaway/${repoName}`,
    });
  }

  const output = `import { Project } from '@/types';\n\nexport const projectsData: Project[] = [\n${projects.map(p => `    {
        id: '${p.id}',
        name: '${p.name}',
        description: '${p.description.replace(/'/g, "\\'")}',
        techStack: ${JSON.stringify(p.techStack)},
        ${p.liveUrl ? `liveUrl: '${p.liveUrl}',` : ''}
        githubUrl: '${p.githubUrl}',
    }`).join(',\n')}\n];\n`;

  fs.writeFileSync('/home/bleu/work-surface/data/projects.ts', output);
  console.log('Successfully generated accurate data/projects.ts');
}

main();
