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
  '> world_forge.plan("mission_control")',
  '> adapter.select("blender_mcp")',
  '> procedural.constraints.load()',
  '> media_forge.storyboard.preview()',
  '> verifier.diff.preview()',
  '> human_approval.required = true'
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
