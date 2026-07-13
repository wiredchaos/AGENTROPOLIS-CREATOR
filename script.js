const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
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
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}

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

const setActiveButton = (buttons, activeButton) => {
  buttons.forEach(button => button.classList.toggle('active', button === activeButton));
};

const districtProfiles = {
  forge: {
    title: 'World Forge',
    body: 'Owns Blender, procedural generation, human crowds, scene specs, asset prep, and export-ready 3D infrastructure.'
  },
  media: {
    title: 'Media Forge',
    body: 'Owns OpenCut timelines, captions, preview renders, shorts, product explainers, broadcast assets, and media-diff previews.'
  },
  runtime: {
    title: 'Runtime Layer',
    body: 'Owns Unreal, Unity, PlayCanvas, WebXR, simulation, browser previews, and deployment tests.'
  },
  registry: {
    title: 'Registry Layer',
    body: 'Owns MCP adapter manifests, asset provenance, licenses, metadata sidecars, and reusable templates.'
  },
  governance: {
    title: 'Verifier Layer',
    body: 'Owns cost checks, license checks, likeness checks, approval states, world diffs, media diffs, and audit receipts.'
  }
};

const districtPanel = document.querySelector('#district-panel');
const districtNodes = document.querySelectorAll('.district-node');

function selectDistrict(key, activeButton) {
  const profile = districtProfiles[key];
  if (!profile || !districtPanel) return;

  districtPanel.innerHTML = `<p class="eyebrow">District Profile</p><h3>${profile.title}</h3><p>${profile.body}</p>`;
  if (activeButton) setActiveButton(districtNodes, activeButton);
}

districtNodes.forEach(button => {
  button.addEventListener('click', () => selectDistrict(button.dataset.district, button));
});

const registryAdapters = [
  { name: 'Blender MCP', className: '3D Authoring', status: 'evaluate', risk: 'medium', role: 'Scene authoring, Geometry Nodes, materials, cameras, exports, and repeatable city assets.', allowed: ['Create scene specs', 'Prepare assets', 'Generate preview diffs'], blocked: ['Publish without approval', 'Import unclear-license assets'] },
  { name: 'OpenCut', className: 'Video Rendering / Timeline', status: 'watch/evaluate', risk: 'medium', role: 'Timeline assembly, captions, preview renders, shorts, explainers, and broadcast assets.', allowed: ['Build timeline specs', 'Render low-risk previews', 'Prepare media diffs'], blocked: ['Public output before approval', 'Unlicensed music or footage'] },
  { name: 'HY-World 2.0', className: 'World Model', status: 'research', risk: 'high', role: 'Research lane for world genesis, reconstruction, and explorable scene experiments.', allowed: ['Prototype isolated worlds', 'Compare world diffs'], blocked: ['Production mutation', 'Unreviewed deployment'] },
  { name: 'TRELLIS', className: '3D Asset Generation', status: 'research', risk: 'medium', role: 'Candidate object creation and prototype asset expansion.', allowed: ['Generate prototype props', 'Attach provenance'], blocked: ['Final asset promotion without review', 'License-blind reuse'] },
  { name: 'Hunyuan3D', className: '3D Asset Generation', status: 'research', risk: 'medium', role: 'Candidate object and prop generation for early asset pipelines.', allowed: ['Draft asset variants', 'Package metadata sidecars'], blocked: ['Skip likeness checks', 'Ship unverified geometry'] },
  { name: 'ComfyUI', className: 'Visual Generation', status: 'evaluate', risk: 'medium', role: 'Concept frames, textures, mood boards, and controlled image pipelines.', allowed: ['Create concept frames', 'Prepare texture variations'], blocked: ['Use restricted likenesses', 'Bypass provenance records'] },
  { name: 'Infinigen', className: 'Procedural Generation', status: 'evaluate', risk: 'medium', role: 'Procedural terrain, natural systems, and Blender-first world variation.', allowed: ['Generate procedural sets', 'Export scene candidates'], blocked: ['Overwrite approved worlds', 'Skip performance checks'] },
  { name: 'WFC + MarkovJunior', className: 'Constraint Generation', status: 'evaluate', risk: 'low', role: 'Constraint-based rooms, maps, tile grammars, streets, and districts.', allowed: ['Generate layout options', 'Validate constraints'], blocked: ['Ignore district rules', 'Commit without diff'] },
  { name: 'Gaussian Splatting', className: 'Reconstruction / 3DGS', status: 'evaluate', risk: 'medium', role: 'Experimental scene capture, reconstruction, and splat-editing tools.', allowed: ['Create reconstruction previews', 'Tag capture provenance'], blocked: ['Expose private captures', 'Publish unchecked scans'] },
  { name: 'Unreal / Unity', className: 'Runtime Engine', status: 'watch/evaluate', risk: 'high', role: 'High-fidelity runtime environments, simulation, NavMesh, and gameplay tests.', allowed: ['Run deployment tests', 'Package runtime previews'], blocked: ['Deploy unapproved builds', 'Disable safety gates'] },
  { name: 'PlayCanvas / WebXR', className: 'Web Runtime', status: 'evaluate', risk: 'medium', role: 'Browser-native previews for lightweight spaces and creator-facing city scenes.', allowed: ['Publish private browser previews', 'Test WebXR flows'], blocked: ['Public launch without approval', 'Collect unexpected user data'] },
  { name: 'Verifier', className: 'Governance', status: 'core', risk: 'low', role: 'Receipts layer for checks, diffs, export manifests, and approvals.', allowed: ['Run cost/license/likeness checks', 'Record audit receipts'], blocked: ['Self-approve risky output', 'Erase review history'] }
];

const registryList = document.querySelector('#registry-list');
const registryDetail = document.querySelector('#registry-detail');

function renderList(items) {
  return `<ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
}

function selectAdapter(adapter, button) {
  if (!adapter || !registryDetail) return;

  registryDetail.innerHTML = `
    <p class="eyebrow">${adapter.className}</p>
    <h3>${adapter.name}</h3>
    <p><strong>Status:</strong> ${adapter.status} · <strong>Risk:</strong> ${adapter.risk}</p>
    <p>${adapter.role}</p>
    <h4>Allowed actions</h4>${renderList(adapter.allowed)}
    <h4>Blocked actions</h4>${renderList(adapter.blocked)}
  `;

  if (button && registryList) setActiveButton(registryList.querySelectorAll('button'), button);
}

if (registryList) {
  registryList.innerHTML = registryAdapters.map((adapter, index) => `<button type="button" data-adapter="${index}"><strong>${adapter.name}</strong><span>${adapter.status} · ${adapter.risk}</span></button>`).join('');
  registryList.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => selectAdapter(registryAdapters[Number(button.dataset.adapter)], button));
  });
  selectAdapter(registryAdapters[0], registryList.querySelector('button'));
}

const flowStages = {
  brief: 'Define purpose, audience, duration, aspect ratios, source assets, and approval requirements.',
  assets: 'Collect renders, voice, captions, music, provenance, and license records.',
  timeline: 'Assemble timeline spec before editor execution.',
  preview: 'Render low-risk preview, not public output.',
  approval: 'Verifier checks cost, license, likeness, platform risk, and media diff.',
  export: 'Create reviewed export package and hand off publishing separately.'
};

const flowPanel = document.querySelector('#flow-panel');
const flowSteps = document.querySelectorAll('.flow-step');

flowSteps.forEach(button => {
  button.addEventListener('click', () => {
    const text = flowStages[button.dataset.flow];
    if (!text || !flowPanel) return;
    flowPanel.innerHTML = `<p class="eyebrow">OpenCut Timeline Rail</p><h3>${button.textContent.trim()}</h3><p>${text}</p>`;
    setActiveButton(flowSteps, button);
  });
});

const hermesResponses = {
  world: 'Route to WorldForge → create scene spec → select Blender/procedural adapter → preview world diff.',
  media: 'Route to MediaForge → create timeline spec → prepare OpenCut preview → require media diff.',
  adapter: 'Route to Registry → create adapter manifest → define allowed/blocked actions → assign risk.',
  verify: 'Route to Verifier → run cost/license/likeness checks → require human approval before publish/deploy.'
};

const chatLog = document.querySelector('#chat-log');
const intentButtons = document.querySelectorAll('.intent-button');

intentButtons.forEach(button => {
  button.addEventListener('click', () => {
    const response = hermesResponses[button.dataset.intent];
    if (!response || !chatLog) return;

    const entry = document.createElement('p');
    entry.innerHTML = `<strong>HERMES:</strong> ${response}`;
    chatLog.append(entry);
    chatLog.scrollTop = chatLog.scrollHeight;
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
