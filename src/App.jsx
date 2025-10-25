import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";

export default function App() {
  const [stage, setStage] = useState("boot");

  useEffect(() => {
    if (stage === "boot") {
      const timer = setTimeout(() => setStage("welcome"), 7000);
      return () => clearTimeout(timer);
    }
    if (stage === "welcome") {
      const timer = setTimeout(() => setStage("desktop"), 5000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  return (
    <div className="w-screen h-screen bg-black text-green-400 font-mono flex items-center justify-center">
      <AnimatePresence mode="wait">
        {stage === "boot" && <BootScreen key="boot" />}
        {stage === "welcome" && <WelcomeScreen key="welcome" />}
        {stage === "desktop" && <Desktop key="desktop" />}
      </AnimatePresence>
    </div>
  );
}

/* ------------------ Boot Screen ------------------ */
function BootScreen() {
  const lines = [
    "portfolioOS v0.2-beta",
    "Initializing network stack...",
    "Loading credentials... [OK]",
    "Checking for surveillance... found 312 devices [IGNORED]",
    "Connecting to GitHub servers... [OK]",
    "Fetching recent projects... [OK]",
    "Installing sarcasm.dll... [OK]",
    "Verifying integrity... questionable, but accepted.",
    "System ready. Welcome, Operator."
  ];
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    let i = 0;
    let timeoutId;
    const showNextLine = () => {
      setVisible((prev) => [...prev, lines[i]]);
      i++;
      if (i < lines.length) {
        timeoutId = setTimeout(showNextLine, Math.random() * 600 + 200);
      }
    };
    timeoutId = setTimeout(showNextLine, 300);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute top-0 left-0 p-4 text-sm"
    >
      {visible.map((line, idx) => (
        <div key={idx}>{line}</div>
      ))}
      <span className="cursor-blink">_</span>
    </motion.div>
  );
}

/* ------------------ Welcome Screen ------------------ */
function WelcomeScreen() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Connecting to systems");
  const statuses = [
    "Connecting to systems",
    "Retrieving data streams",
    "Decrypting interface",
    "Establishing secure session",
    "Boot complete"
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.random() * 20, 100);
        if (next > (i + 1) * 20 && i < statuses.length - 1) {
          i++;
          setStatus(statuses[i]);
        }
        if (next === 100) clearInterval(interval);
        return next;
      });
    }, 250);
    return () => clearInterval(interval);
  }, []);

  const barLength = 40;
  const filled = Math.floor((progress / 100) * barLength);
  const empty = barLength - filled;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center text-cyan-400 font-mono"
    >
      <pre className="text-5xl mb-4">{`
   ___  ___ 
  / _ \\/ __|
 | (_) \\__ \\
  \\___/|___/
      `}</pre>
      <p className="text-sm text-cyan-500/70 mb-6">portfolioOS v0.2</p>

      <div className="text-sm mb-2 w-96 text-left">
        <span className="text-cyan-300">&gt;</span> {status}
        <span className="cursor-blink">_</span>
      </div>

      <div className="text-sm mb-2 font-mono">
        <span className="text-cyan-500">[</span>
        <span className="text-cyan-400">{'█'.repeat(filled)}</span>
        <span className="text-cyan-900">{'-'.repeat(empty)}</span>
        <span className="text-cyan-500">]</span>
        <span className="ml-3 text-cyan-300">{Math.floor(progress)}%</span>
      </div>
    </motion.div>
  );
}

/* ------------------ Desktop ------------------ */
function Desktop() {
  const [activeWindow, setActiveWindow] = useState(null);
  const apps = [
    { id: "about", name: "about.txt", icon: "📄" },
    { id: "experience", name: "experience.log", icon: "📊" },
    { id: "projects", name: "projects/", icon: "📁" },
    { id: "contact", name: "contact.sh", icon: "📧" },
    { id: "terminal", name: "terminal", icon: "⌨️" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full bg-[#0a0e14] text-cyan-400 font-mono relative"
    >
      <div className="h-8 bg-[#1a1f29] border-b border-cyan-900/30 flex items-center justify-between px-4 text-xs">
        <div className="flex gap-4">
          <span className="text-cyan-500">portfolioOS v0.2</span>
          <span className="text-cyan-700">|</span>
          <span className="text-cyan-600">user@portfolio:~$</span>
        </div>
        <div className="flex gap-3">
          <span className="text-green-500">⬤ ONLINE</span>
          <span className="text-cyan-600">{new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="h-[calc(100%-2rem)] p-6 grid grid-cols-5 gap-4 content-start">
        {apps.map((app) => (
          <motion.div
            key={app.id}
            onClick={() => setActiveWindow(app.id)}
            className="flex flex-col items-center cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-4xl mb-2 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] transition-all">
              {app.icon}
            </div>
            <div className="text-xs text-center px-2 py-1 rounded group-hover:bg-cyan-900/20 transition-colors">
              {app.name}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeWindow && (
          <Window id={activeWindow} onClose={() => setActiveWindow(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------ Window ------------------ */
function Window({ id, onClose }) {
  const content = {
    about: <AboutContent />,
    experience: <ExperienceContent />,
    projects: <ProjectsContent />,
    contact: <ContactContent />,
    terminal: <TerminalContent />
  };

  const title = {
    about: "about.txt - nano",
    experience: "experience.log - viewer",
    projects: "~/projects - file manager",
    contact: "contact.sh - executable",
    terminal: "terminal - bash"
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="absolute inset-12 bg-[#0d1117] border border-cyan-900/50 rounded-lg shadow-2xl flex flex-col overflow-hidden"
      style={{ boxShadow: "0 0 40px rgba(34,211,238,0.15)" }}
    >
      <div className="h-10 bg-[#161b22] border-b border-cyan-900/30 flex items-center justify-between px-4">
        <span className="text-xs text-cyan-400">{title[id]}</span>
        <button
          onClick={onClose}
          className="text-red-400 hover:text-red-300 text-sm hover:bg-red-900/20 px-2 py-1 rounded transition-colors"
        >
          ✕
        </button>
      </div>
      <div className="flex-1 overflow-auto p-6 text-sm">{content[id]}</div>
    </motion.div>
  );
}

/* ------------------ Content Components ------------------ */
function AboutContent() {
  return (
    <div className="text-cyan-300 space-y-4">
      <p>
        <span className="text-cyan-600">&gt;</span> Cybersecurity enthusiast
        focused on ethical hacking, network security, and automation.
      </p>
      <p>
        <span className="text-cyan-600">&gt;</span> Passionate about creating secure
        systems and finding vulnerabilities before others do.
      </p>
    </div>
  );
}

function ExperienceContent() {
  return (
    <div className="text-cyan-300 space-y-4 text-xs font-mono">
      <div className="text-cyan-500 mb-4">
        <span className="text-cyan-700">[ </span>EXPERIENCE LOG
        <span className="text-cyan-700"> ]</span>
      </div>

      <div className="border-l-2 border-cyan-900 pl-4 space-y-6">
        <div>
          <div className="text-green-400 mb-1">[2025] Learning & Research</div>
          <p className="text-cyan-400">
            Exploring cybersecurity tools and frameworks.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------ Live GitHub Projects ------------------ */
function ProjectsContent() {
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const username = "SimonOkolo"; // ← change if needed

  // Local projects with image galleries
  const localProjects = [
    {
      id: "hiroikku",
      name: "Hiroikku",
      desc: "A physics-driven action game prototype built in Unity.",
      type: "local",
      images: [
        "/assets/images/projects/DEV Hiroikku MainMenu Sketch.png",
        "/assets/images/projects/DEV Hiroikku CollisionFix2.png",
        "/assets/images/projects/DEV Hiroikku Plans.png"
      ]
    },
    {
      id: "vsh",
      name: "Virtual Social Hub",
      desc: "UI concept for a virtual networking and meeting platform.",
      type: "local",
      images: [
        "/assets/images/projects/VSH HOME 1.png",
        "/assets/images/projects/VSH DASH.png",
        "/assets/images/projects/VSH PROFILE.png"
      ]
    },
    {
      id: "lensstudio",
      name: "LensStudio + Blender Workflow",
      desc: "Experiments integrating Blender 3D assets into LensStudio filters.",
      type: "local",
      images: ["/assets/images/projects/DEV LensStudio Blender.png"]
    }
  ];

  // Fetch live GitHub repositories
  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
      .then((res) => res.json())
      .then((data) => {
        const githubProjects = data
          .filter((repo) => !repo.fork)
          .map((repo) => ({
            id: repo.id,
            name: repo.name,
            desc: repo.description || "No description provided.",
            tech: repo.language || "Unknown",
            type: "github",
            url: repo.html_url
          }));
        // Merge local + GitHub projects
        setProjects([...localProjects, ...githubProjects]);
      })
      .catch(() =>
        setProjects([...localProjects]) // fallback if GitHub fails
      );
  }, []);

  return (
    <div className="text-cyan-300 space-y-4 relative">
      <div className="text-cyan-500 mb-6">
        <span className="text-cyan-700">$ </span>ls -la ~/projects
      </div>

      {projects.length === 0 ? (
        <p className="text-cyan-700">Fetching latest repositories...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              onClick={() =>
                project.type === "github"
                  ? window.open(project.url, "_blank")
                  : setActiveProject(project)
              }
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="border border-cyan-900/30 hover:border-cyan-700/50 transition-colors cursor-pointer rounded p-4 bg-[#0f131a]"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-green-400">▸</span>
                <span className="text-cyan-400 font-semibold">
                  {project.name}
                </span>
              </div>
              <p className="text-cyan-600 text-sm mb-2">{project.desc}</p>
              {project.tech && (
                <p className="text-cyan-800 text-xs">Tech: {project.tech}</p>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal for local projects */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  const [index, setIndex] = useState(0);

  const next = () =>
    setIndex((i) => (i + 1) % project.images.length);
  const prev = () =>
    setIndex((i) =>
      i === 0 ? project.images.length - 1 : i - 1
    );

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <motion.div
      className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-50 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-3xl w-full bg-[#0d1117] border border-cyan-900 rounded-lg overflow-hidden shadow-2xl relative">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-cyan-900 text-cyan-400 text-sm">
          <span>{project.name}</span>
          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-300 hover:bg-red-900/20 px-2 py-1 rounded transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Slideshow */}
        <div className="relative w-full h-[400px] bg-[#0b0f14] flex items-center justify-center overflow-hidden">
          <motion.img
            key={index}
            src={project.images[index]}
            alt={project.name}
            className="max-h-full max-w-full object-contain rounded"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          />

          {/* Controls */}
          {project.images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 text-cyan-400 hover:text-cyan-200 text-3xl"
              >
                ‹
              </button>
              <button
                onClick={next}
                className="absolute right-4 text-cyan-400 hover:text-cyan-200 text-3xl"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Description */}
        <div className="p-4 text-cyan-300 text-sm border-t border-cyan-900">
          {project.desc}
        </div>
      </div>
    </motion.div>
  );
}

function ContactContent() {
  return (
    <div className="text-cyan-300 space-y-4">
      <p className="text-cyan-600">Establishing secure communication...</p>
      <div className="border-l-2 border-cyan-900 pl-4 space-y-3 mt-6">
        <div>
          <p className="text-green-400 mb-1">📧 Email</p>
          <p className="text-cyan-400">your.email@example.com</p>
        </div>
        <div>
          <p className="text-green-400 mb-1">🐙 GitHub</p>
          <p className="text-cyan-400">github.com/SimonOkolo</p>
        </div>
      </div>
    </div>
  );
}

function TerminalContent() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    "portfolioOS v0.2",
    "Type 'help' for available commands",
    ""
  ]);

  const commands = {
    help: "Commands: about, projects, contact, clear",
    about: "Cybersecurity professional in development mode.",
    projects: "Opening projects/ directory...",
    contact: "Opening contact.sh...",
    clear: "CLEAR"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    let output;

    if (cmd === "clear") {
      setHistory([]);
    } else if (commands[cmd]) {
      output = commands[cmd];
      setHistory([...history, `$ ${input}`, output, ""]);
    } else if (cmd) {
      output = `Command not found: ${cmd}. Type 'help' for available commands.`;
      setHistory([...history, `$ ${input}`, output, ""]);
    }

    setInput("");
  };

  return (
    <div className="h-full flex flex-col text-cyan-300 text-sm font-mono">
      <div className="flex-1 overflow-auto mb-4">
        {history.map((line, idx) => (
          <div
            key={idx}
            className={line.startsWith("$") ? "text-green-400" : "text-cyan-400"}
          >
            {line}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <span className="text-green-400">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-cyan-300"
          autoFocus
          placeholder="enter command..."
        />
      </form>
    </div>
  );
}
