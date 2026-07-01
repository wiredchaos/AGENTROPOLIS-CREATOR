const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach(item => observer.observe(item));

const terminalLines = [
  '> creator_stack.boot()',
  '> adapter.registry.scan()',
  '> world_forge.plan("mission_control")',
  '> media_forge.timeline.spec("opencut")',
  '> verifier.diff.preview()',
  '> approval_gate.status = "required"',
  '> export.package.ready = false'
];

const terminal = document.querySelector('.terminal-lines');
let cursor = 0;

function rotateTerminal() {
  if (!terminal) return;

  const visible = [
    terminalLines[cursor % terminalLines.length],
    terminalLines[(cursor + 1) % terminalLines.length],
    terminalLines[(cursor + 2) % terminalLines.length]
  ];

  terminal.innerHTML = visible.map(line => `<p>${line}</p>`).join('');
  cursor += 1;
}

setInterval(rotateTerminal, 2400);

const filters = document.querySelectorAll('.filter');
const stackCards = document.querySelectorAll('.stack-grid .feature-card');

filters.forEach(filter => {
  filter.addEventListener('click', () => {
    const selected = filter.dataset.filter;

    filters.forEach(item => item.classList.remove('active'));
    filter.classList.add('active');

    stackCards.forEach(card => {
      const shouldShow = selected === 'all' || card.dataset.category === selected;
      card.classList.toggle('hidden', !shouldShow);
    });
  });
});

const agentProfiles = {
  world: {
    eyebrow: 'World Agent',
    title: 'WorldForge',
    body: 'Creates or modifies the base world structure: terrain, rooms, districts, streets, interiors, landmarks, portals, and staging areas.'
  },
  district: {
    eyebrow: 'District Agent',
    title: 'DistrictBuilder',
    body: 'Turns abstract Agentropolis districts into consistent physical spaces with repeatable templates, placement rules, and scene logic.'
  },
  asset: {
    eyebrow: 'Asset Agent',
    title: 'AssetSmith',
    body: 'Creates, imports, tags, prepares, and verifies reusable assets with metadata sidecars, license notes, and export-ready structure.'
  },
  crowd: {
    eyebrow: 'Population Agent',
    title: 'CrowdForge',
    body: 'Builds NPC population layers, crowd presets, pathing concepts, density rules, companions, pets, and background life.'
  },
  audio: {
    eyebrow: 'Sound Agent',
    title: 'AudioForge',
    body: 'Creates narration, ambience, sonic identity, character voice notes, captions, multilingual dubbing, and localization plans.'
  },
  media: {
    eyebrow: 'Media Agent',
    title: 'MediaForge',
    body: 'Turns approved city assets into governed timeline packages, preview renders, short-form clips, product explainers, and broadcast assets.'
  },
  verify: {
    eyebrow: 'Governance Agent',
    title: 'Verifier',
    body: 'Checks cost, license, likeness, performance, metadata, output risk, and approval state before anything becomes permanent or public.'
  }
};

const agentPanel = document.querySelector('#agent-panel');
const agentTabs = document.querySelectorAll('.agent-tab');
const cityAgentButtons = document.querySelectorAll('.agent-node[data-panel]');

function selectAgent(key) {
  const profile = agentProfiles[key];
  if (!profile || !agentPanel) return;

  agentPanel.innerHTML = `
    <p class="eyebrow">${profile.eyebrow}</p>
    <h3>${profile.title}</h3>
    <p>${profile.body}</p>
  `;

  agentTabs.forEach(tab => {
    tab.classList.toggle('active', tab.dataset.target === key);
  });
}

agentTabs.forEach(tab => {
  tab.addEventListener('click', () => selectAgent(tab.dataset.target));
});

cityAgentButtons.forEach(button => {
  button.addEventListener('click', () => {
    selectAgent(button.dataset.panel);
    document.querySelector('#agents')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const statValues = document.querySelectorAll('.stat-strip strong');
const statTargets = [12, 7, 0];

statValues.forEach((value, index) => {
  const target = statTargets[index] ?? 0;
  let current = 0;
  const steps = Math.max(target, 1);
  const interval = setInterval(() => {
    if (current >= target) {
      value.textContent = target.toString();
      clearInterval(interval);
      return;
    }
    current += 1;
    value.textContent = current.toString();
  }, 70 / steps);
});

rotateTerminal();
