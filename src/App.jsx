import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import './index.css'

export default function App() {
  const [stage, setStage] = useState("boot");

  useEffect(() => {
    if (stage === "boot") {
      const timer = setTimeout(() => setStage("welcome"), 10000); // Boot duration
      return () => clearTimeout(timer);
    }
    if (stage === "welcome") {
      const timer = setTimeout(() => setStage("desktop"), 6000); // Welcome duration
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

// ------------------ Boot Screen ------------------
function BootScreen() {
  const lines = [
    "portfolioOS v0.1-alpha",
    "Initializing system modules...",
    "Loading credentials... [OK]",
    "Verifying environment... [OK]",
    "Checking firewall... what firewall? [OK]",
    "Scanning for surveillance... found 247 devices [IGNORED]",
    "Loading personality matrix... sarcasm.dll loaded",
    "Encrypting nothing important... [OK]",
    "Running background processes... definitely not suspicious",
    "Verifying integrity... questionable, but we'll allow it.",
    "System ready. Welcome to the machine.",
  ];
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    let i = 0;
    let timeoutId;

    const showNextLine = () => {
      setVisible((prev) => [...prev, lines[i]]);
      i++;
      
      if (i < lines.length) {
        // Random delay between 300ms and 900ms
        const randomDelay = Math.random() * 800 + 200;
        timeoutId = setTimeout(showNextLine, randomDelay);
      }
    };

    // Start the sequence
    timeoutId = setTimeout(showNextLine, 400);

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

// ------------------ Welcome Screen ------------------
function WelcomeScreen() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing connection");
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const statuses = [
      "Initializing connection",
      "Establishing secure handshake",
      "Bypassing security protocols",
      "Retrieving portfolio data",
      "Decrypting user interface",
      "Loading complete"
    ];

    let currentStatus = 0;
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 15 + 5;
        
        // Update status at certain milestones
        if (next > 20 && currentStatus === 0) {
          setStatus(statuses[1]);
          currentStatus = 1;
        } else if (next > 40 && currentStatus === 1) {
          setStatus(statuses[2]);
          currentStatus = 2;
        } else if (next > 60 && currentStatus === 2) {
          setStatus(statuses[3]);
          currentStatus = 3;
        } else if (next > 80 && currentStatus === 3) {
          setStatus(statuses[4]);
          currentStatus = 4;
        } else if (next >= 100) {
          setStatus(statuses[5]);
          clearInterval(progressInterval);
          return 100;
        }
        
        return Math.min(next, 100);
      });
    }, 200);

    // Random glitch effect
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 100);
    }, 1500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(glitchInterval);
    };
  }, []);

  const barLength = 40;
  const filled = Math.floor((progress / 100) * barLength);
  const empty = barLength - filled;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-cyan-400 font-mono"
    >
      <motion.div
        className="text-center mb-8"
        animate={{ opacity: glitch ? 0.3 : 1 }}
        transition={{ duration: 0.05 }}
      >
        <pre className="text-5xl mb-4">
{`   ___  ___ 
  / _ \\/ __|
 | (_) \\__ \\
  \\___/|___/`}
        </pre>
        <p className="text-sm text-cyan-500/70">portfolioOS</p>
      </motion.div>

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

      {progress === 100 && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-green-400 mt-4"
        >
          Access granted. Welcome.
        </motion.p>
      )}
    </motion.div>
  );
}

// ------------------ Desktop ------------------
function Desktop() {
  const [activeWindow, setActiveWindow] = useState(null);
  const [terminalInput, setTerminalInput] = useState("");

  const apps = [
    { 
      id: "about", 
      name: "about.txt", 
      icon: "📄",
      type: "file"
    },
    { 
      id: "experience", 
      name: "experience.log", 
      icon: "📊",
      type: "file"
    },
    { 
      id: "projects", 
      name: "projects/", 
      icon: "📁",
      type: "directory"
    },
    { 
      id: "contact", 
      name: "contact.sh", 
      icon: "📧",
      type: "executable"
    },
    { 
      id: "terminal", 
      name: "terminal", 
      icon: "⌨️",
      type: "app"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full bg-[#0a0e14] text-cyan-400 font-mono relative"
    >
      {/* Top Status Bar */}
      <div className="h-8 bg-[#1a1f29] border-b border-cyan-900/30 flex items-center justify-between px-4 text-xs">
        <div className="flex gap-4">
          <span className="text-cyan-500">portfolioOS v0.1</span>
          <span className="text-cyan-700">|</span>
          <span className="text-cyan-600">user@portfolio:~$</span>
        </div>
        <div className="flex gap-3">
          <span className="text-green-500">⬤ ONLINE</span>
          <span className="text-cyan-600">{new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Desktop Area */}
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

      {/* Windows */}
      <AnimatePresence>
        {activeWindow && (
          <Window 
            id={activeWindow}
            onClose={() => setActiveWindow(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ------------------ Window Component ------------------
function Window({ id, onClose }) {
  const windowContent = {
    about: <AboutContent />,
    experience: <ExperienceContent />,
    projects: <ProjectsContent />,
    contact: <ContactContent />,
    terminal: <TerminalContent />
  };

  const windowTitles = {
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
      {/* Window Title Bar */}
      <div className="h-10 bg-[#161b22] border-b border-cyan-900/30 flex items-center justify-between px-4">
        <span className="text-xs text-cyan-400">{windowTitles[id]}</span>
        <button
          onClick={onClose}
          className="text-red-400 hover:text-red-300 text-sm hover:bg-red-900/20 px-2 py-1 rounded transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto p-6 text-sm">
        {windowContent[id]}
      </div>
    </motion.div>
  );
}

// ------------------ Content Components ------------------
function AboutContent() {
  return (
    <div className="text-cyan-300 space-y-4">
      <div className="text-cyan-500 mb-6">
        <span className="text-cyan-700"># </span>WHO AM I?
      </div>
      <p>
        <span className="text-cyan-600">&gt;</span> Aspiring cybersecurity professional and computer science enthusiast.
      </p>
      <p>
        <span className="text-cyan-600">&gt;</span> Passionate about ethical hacking, penetration testing, and secure software development.
      </p>
      <p>
        <span className="text-cyan-600">&gt;</span> Currently exploring network security, cryptography, and vulnerability research.
      </p>
      
      <div className="text-cyan-500 mt-8 mb-4">
        <span className="text-cyan-700"># </span>SKILLS
      </div>
      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <p className="text-green-400 mb-2">▸ Security</p>
          <p className="text-cyan-700 pl-4">• Penetration Testing</p>
          <p className="text-cyan-700 pl-4">• Network Analysis</p>
          <p className="text-cyan-700 pl-4">• Vulnerability Assessment</p>
        </div>
        <div>
          <p className="text-green-400 mb-2">▸ Development</p>
          <p className="text-cyan-700 pl-4">• Python, JavaScript</p>
          <p className="text-cyan-700 pl-4">• Linux/Unix Systems</p>
          <p className="text-cyan-700 pl-4">• Scripting & Automation</p>
        </div>
      </div>
    </div>
  );
}

function ExperienceContent() {
  return (
    <div className="text-cyan-300 space-y-4 text-xs font-mono">
      <div className="text-cyan-500 mb-4">
        <span className="text-cyan-700">[ </span>EXPERIENCE LOG<span className="text-cyan-700"> ]</span>
      </div>
      
      <div className="border-l-2 border-cyan-900 pl-4 space-y-6">
        <div>
          <div className="text-green-400 mb-1">[2024] Education</div>
          <p className="text-cyan-400">Computer Science Student</p>
          <p className="text-cyan-700 mt-1">Focusing on cybersecurity, networking, and software engineering fundamentals</p>
        </div>

        <div>
          <div className="text-green-400 mb-1">[2024] Self-Learning</div>
          <p className="text-cyan-400">Capture The Flag (CTF) Participant</p>
          <p className="text-cyan-700 mt-1">Actively solving challenges on platforms like HackTheBox, TryHackMe</p>
        </div>

        <div>
          <div className="text-green-400 mb-1">[Ongoing] Projects</div>
          <p className="text-cyan-400">Security Tools & Scripts Development</p>
          <p className="text-cyan-700 mt-1">Building custom tools for network analysis and automation</p>
        </div>
      </div>
    </div>
  );
}

function ProjectsContent() {
  const projects = [
    {
      name: "network-scanner.py",
      desc: "Custom network reconnaissance tool",
      tech: "Python, Scapy"
    },
    {
      name: "vuln-checker/",
      desc: "Automated vulnerability scanner",
      tech: "Python, Requests"
    },
    {
      name: "portfolio-os/",
      desc: "This interactive terminal portfolio",
      tech: "React, Tailwind"
    }
  ];

  return (
    <div className="text-cyan-300 space-y-4">
      <div className="text-cyan-500 mb-6">
        <span className="text-cyan-700">$ </span>ls -la ~/projects
      </div>
      
      <div className="space-y-4">
        {projects.map((project, idx) => (
          <div key={idx} className="border border-cyan-900/30 rounded p-4 hover:border-cyan-700/50 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-400">▸</span>
              <span className="text-cyan-400 font-semibold">{project.name}</span>
            </div>
            <p className="text-cyan-600 text-sm mb-2">{project.desc}</p>
            <p className="text-cyan-800 text-xs">Tech: {project.tech}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactContent() {
  return (
    <div className="text-cyan-300 space-y-4">
      <div className="text-cyan-500 mb-6">
        <span className="text-cyan-700">$ </span>./contact.sh --execute
      </div>
      
      <div className="space-y-4 text-sm">
        <p className="text-cyan-600">Establishing secure communication channels...</p>
        
        <div className="border-l-2 border-cyan-900 pl-4 space-y-3 mt-6">
          <div>
            <p className="text-green-400 mb-1">📧 Email</p>
            <p className="text-cyan-400">your.email@example.com</p>
          </div>
          
          <div>
            <p className="text-green-400 mb-1">💼 LinkedIn</p>
            <p className="text-cyan-400">linkedin.com/in/yourprofile</p>
          </div>
          
          <div>
            <p className="text-green-400 mb-1">🐙 GitHub</p>
            <p className="text-cyan-400">github.com/yourusername</p>
          </div>
          
          <div>
            <p className="text-green-400 mb-1">🔐 PGP Key</p>
            <p className="text-cyan-700 text-xs">Available on request for secure communications</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TerminalContent() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    "portfolioOS Terminal v0.1",
    "Type 'help' for available commands",
    ""
  ]);

  const commands = {
    help: "Available commands: about, skills, projects, contact, clear",
    about: "Aspiring cybersecurity professional passionate about ethical hacking and secure development.",
    skills: "Security: Penetration Testing, Network Analysis\nDev: Python, JavaScript, Linux",
    projects: "Check out my projects using the Projects folder!",
    contact: "Email: your.email@example.com | GitHub: github.com/yourusername",
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
          <div key={idx} className={line.startsWith('$') ? 'text-green-400' : 'text-cyan-400'}>
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
