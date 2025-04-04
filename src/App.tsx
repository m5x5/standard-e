import { useState, useEffect } from "react";
import { Template, FilterType, TemplateFormData } from "./types";
import Modal from "./components/Modal";
import SettingsModal from "./components/SettingsModal";
import "./App.css";

const STORAGE_KEY = 'standard-e-templates';
const REPO_PATH_KEY = 'standard-e-repo-path';

const defaultTemplates: Template[] = [
  {
    "id": "react-vite",
    "name": "React (Vite)",
    "command": "npm create vite@latest my-app -- --template react",
    "image": "/icons/react.svg",
    "language": "JavaScript",
    "framework": "React",
    "npmDownloads": "30M/week",
    "githubStars": "220k",
    "lastUpdated": "2 days ago"
  },
  {
    "id": "vue",
    "name": "Vue (Create Vue)",
    "command": "npm init vue@latest my-app",
    "image": "/icons/vue.svg",
    "language": "JavaScript",
    "framework": "Vue 3",
    "npmDownloads": "8M/week",
    "githubStars": "210k",
    "lastUpdated": "1 week ago"
  },
  {
    "id": "angular",
    "name": "Angular CLI",
    "command": "npx @angular/cli new my-app",
    "image": "/icons/angular.svg",
    "language": "TypeScript",
    "framework": "Angular",
    "npmDownloads": "",
    "githubStars": "",
    "lastUpdated": ""
  },
  {
    "id": "sveltekit",
    "name": "SvelteKit",
    "command": "npm create svelte@latest my-app",
    "image": "/icons/svelte.svg",
    "language": "TypeScript",
    "framework": "SvelteKit",
    "npmDownloads": "",
    "githubStars": "",
    "lastUpdated": ""
  },
  {
    "id": "solidstart",
    "name": "SolidStart (SolidJS)",
    "command": "npm init solid@latest my-app",
    "image": "/icons/solid.svg",
    "language": "TypeScript",
    "framework": "SolidJS",
    "npmDownloads": "",
    "githubStars": "",
    "lastUpdated": ""
  },
  {
    "id": "qwik",
    "name": "Qwik",
    "command": "npm create qwik@latest",
    "image": "/icons/qwik.svg",
    "language": "TypeScript",
    "framework": "Qwik",
    "npmDownloads": "",
    "githubStars": "",
    "lastUpdated": ""
  },
  {
    "id": "express",
    "name": "Express Generator",
    "command": "npx express-generator my-app",
    "image": "/icons/express.svg",
    "language": "JavaScript",
    "framework": "Express.js",
    "npmDownloads": "25M/week",
    "githubStars": "62k",
    "lastUpdated": "1 month ago"
  },
  {
    "id": "fastify",
    "name": "Fastify CLI",
    "command": "npx fastify-cli generate my-app",
    "image": "/icons/fastify.svg",
    "language": "JavaScript (or TypeScript)",
    "framework": "Fastify",
    "npmDownloads": "",
    "githubStars": "",
    "lastUpdated": ""
  },
  {
    "id": "nestjs",
    "name": "NestJS CLI",
    "command": "npx @nestjs/cli new my-app",
    "image": "/icons/nestjs.svg",
    "language": "TypeScript",
    "framework": "NestJS",
    "npmDownloads": "",
    "githubStars": "",
    "lastUpdated": ""
  },
  {
    "id": "hono",
    "name": "Hono (create-hono)",
    "command": "npm create hono@latest my-app",
    "image": "/icons/hono.svg",
    "language": "TypeScript",
    "framework": "Hono",
    "npmDownloads": "",
    "githubStars": "",
    "lastUpdated": ""
  },
  {
    "id": "deno-fresh",
    "name": "Fresh (Deno)",
    "command": "deno run -A -r https://fresh.deno.dev my-app",
    "image": "/icons/deno.svg",
    "language": "TypeScript",
    "framework": "Fresh (Deno)",
    "npmDownloads": "",
    "githubStars": "",
    "lastUpdated": ""
  },
  {
    "id": "deno-init",
    "name": "Deno Project (deno init)",
    "command": "deno init my_project",
    "image": "/icons/deno.svg",
    "language": "TypeScript",
    "framework": "Deno (runtime)",
    "npmDownloads": "",
    "githubStars": "",
    "lastUpdated": ""
  },
  {
    "id": "nextjs",
    "name": "Next.js (Create Next App)",
    "command": "npx create-next-app@latest my-app",
    "image": "/icons/nextjs.svg",
    "language": "JavaScript",
    "framework": "Next.js",
    "npmDownloads": "15M/week",
    "githubStars": "120k",
    "lastUpdated": "3 days ago"
  },
  {
    "id": "nuxt",
    "name": "Nuxt 3 (Nuxi)",
    "command": "npm create nuxt@latest my-app",
    "image": "/icons/nuxt.svg",
    "language": "JavaScript/TypeScript",
    "framework": "Nuxt 3",
    "npmDownloads": "",
    "githubStars": "",
    "lastUpdated": ""
  },
  {
    "id": "remix",
    "name": "Remix (Create Remix)",
    "command": "npx create-remix@latest my-app",
    "image": "/icons/remix.svg",
    "language": "TypeScript",
    "framework": "Remix",
    "npmDownloads": "",
    "githubStars": "",
    "lastUpdated": ""
  },
  {
    "id": "redwood",
    "name": "RedwoodJS",
    "command": "yarn create redwood-app my-redwood-project",
    "image": "/icons/redwood.svg",
    "language": "JavaScript",
    "framework": "RedwoodJS",
    "npmDownloads": "",
    "githubStars": "",
    "lastUpdated": ""
  },
  {
    "id": "blitz",
    "name": "Blitz.js",
    "command": "npx blitz@latest new my-app",
    "image": "/icons/blitz.svg",
    "language": "TypeScript",
    "framework": "Blitz.js",
    "npmDownloads": "",
    "githubStars": "",
    "lastUpdated": ""
  },
  {
    "id": "astro",
    "name": "Astro",
    "command": "npm create astro@latest",
    "image": "/icons/astro.svg",
    "language": "TypeScript",
    "framework": "Astro",
    "npmDownloads": "",
    "githubStars": "",
    "lastUpdated": ""
  },
  {
    "id": "hugo",
    "name": "Hugo",
    "command": "hugo new site my-site",
    "image": "/icons/hugo.svg",
    "language": "Markdown (content)",
    "framework": "Hugo",
    "npmDownloads": "",
    "githubStars": "",
    "lastUpdated": ""
  },
  {
    "id": "eleventy",
    "name": "Eleventy (Base Blog)",
    "command": "npx degit 11ty/eleventy-base-blog my-blog",
    "image": "/icons/11ty.svg",
    "language": "JavaScript & Markdown",
    "framework": "Eleventy (11ty)",
    "npmDownloads": "",
    "githubStars": "",
    "lastUpdated": ""
  },
  {
    "id": "gatsby",
    "name": "Gatsby",
    "command": "npm init gatsby my-site",
    "image": "/icons/gatsby.svg",
    "language": "JavaScript",
    "framework": "Gatsby",
    "npmDownloads": "",
    "githubStars": "",
    "lastUpdated": ""
  },
  {
    "id": "turborepo",
    "name": "Turborepo (Monorepo Starter)",
    "command": "npx create-turbo@latest",
    "image": "/icons/turbo.svg",
    "language": "TypeScript",
    "framework": "Turborepo",
    "npmDownloads": "",
    "githubStars": "",
    "lastUpdated": ""
  },
  {
    "id": "nx",
    "name": "Nx Workspace",
    "command": "npx create-nx-workspace@latest",
    "image": "/icons/nx.svg",
    "language": "TypeScript",
    "framework": "Nx (monorepo)",
    "npmDownloads": "",
    "githubStars": "",
    "lastUpdated": ""
  },
  {
    "id": "vite",
    "name": "Vite (Vanilla)",
    "command": "npm create vite@latest my-app",
    "image": "/icons/vite.svg",
    "language": "JavaScript",
    "framework": "Vite",
    "npmDownloads": "",
    "githubStars": "",
    "lastUpdated": ""
  },
  {
    "id": "bun",
    "name": "Bun Create (Next.js)",
    "command": "bun create next-app ./my-app",
    "image": "/icons/bun.svg",
    "language": "JavaScript/TypeScript",
    "framework": "Bun + Next.js",
    "npmDownloads": "2M/week",
    "githubStars": "45k",
    "lastUpdated": "1 day ago"
  }
];

function App() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("language");
  const [filterValue, setFilterValue] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [localTemplates, setLocalTemplates] = useState<Template[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [repoPath, setRepoPath] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  // Load templates and repo path from localStorage
  useEffect(() => {
    const savedTemplates = localStorage.getItem(STORAGE_KEY);
    const savedPath = localStorage.getItem(REPO_PATH_KEY);
    
    if (savedTemplates) {
      setLocalTemplates(JSON.parse(savedTemplates));
    } else {
      setLocalTemplates(defaultTemplates);
    }
    
    if (savedPath) {
      setRepoPath(savedPath);
    }
  }, []);

  // Save templates to localStorage when they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(localTemplates));
  }, [localTemplates]);

  const filteredTemplates = localTemplates.filter(template => {
    if (!search && !filterValue) return true;
    const matchesSearch = template.name.toLowerCase().includes(search.toLowerCase()) ||
                         template.command.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = !filterValue || template[filterType].toLowerCase() === filterValue.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const copyToClipboard = (command: string) => {
    navigator.clipboard.writeText(command);
  };

  const openInCursor = () => {
    if (!repoPath) {
      setShowSettings(true);
      return;
    }
    if (window.__TAURI__?.shell) {
      window.__TAURI__.shell.open(`cursor://${repoPath}`);
    } else {
      alert('Cursor integration is not available. Please make sure you are running this app in Cursor.');
    }
  };

  const handleAddTemplate = (formData: TemplateFormData) => {
    const newTemplate: Template = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9)
    };
    setLocalTemplates([...localTemplates, newTemplate]);
    setShowAddForm(false);
  };

  const handleEditTemplate = (formData: TemplateFormData) => {
    if (!editingTemplate) return;
    setLocalTemplates(localTemplates.map(t => 
      t.id === editingTemplate.id ? { ...formData, id: t.id } : t
    ));
    setEditingTemplate(null);
  };

  const handleDeleteTemplate = (id: string) => {
    setLocalTemplates(localTemplates.filter(t => t.id !== id));
  };

  const handleSaveSettings = (path: string) => {
    setRepoPath(path);
    localStorage.setItem(REPO_PATH_KEY, path);
    setShowSettings(false);
  };

  const handleRestoreDefaults = () => {
    setLocalTemplates(defaultTemplates);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <main className="container">
      <div className="header">
        <h1>Choose your template</h1>
        <div className="header-actions">
          <div className="menu-container">
            <button 
              type="button" 
              className="menu-button"
              onClick={() => setShowMenu(!showMenu)}
              aria-label="Menu"
            >
              ⋮
            </button>
            {showMenu && (
              <div className="menu-dropdown">
                <button type="button" onClick={openInCursor}>
                  Edit in Cursor
                </button>
                <button type="button" onClick={() => setShowSettings(true)}>
                  Settings
                </button>
                <button type="button" onClick={handleRestoreDefaults}>
                  Restore Defaults
                </button>
              </div>
            )}
          </div>
          <button type="button" onClick={() => setShowAddForm(true)} className="add-button">
            Add Template
          </button>
        </div>
      </div>
      
      <div className="search-container">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          placeholder="Search templates..."
          className="search-input"
        />
        <select 
          value={filterType} 
          onChange={(e) => setFilterType(e.target.value as FilterType)}
          className="filter-select"
        >
          <option value="language">Language</option>
          <option value="framework">Framework</option>
        </select>
        <input
          type="text"
          value={filterValue}
          onChange={(e) => setFilterValue(e.currentTarget.value)}
          placeholder={`Filter by ${filterType}...`}
          className="filter-input"
        />
      </div>

      <div className="templates-grid">
        {filteredTemplates.map(template => (
          <div key={template.id} className="template-card">
            <div className="template-header">
              <img src={template.image} alt={template.name} className="template-icon" />
              <h3>{template.name}</h3>
              <div className="template-actions">
                <button type="button" onClick={() => setEditingTemplate(template)} className="edit-icon">
                  ✎
                </button>
                <button type="button" onClick={() => handleDeleteTemplate(template.id)} className="delete-icon">
                  ×
                </button>
              </div>
            </div>
            <div className="command-container">
              <code>{template.command}</code>
              <button type="button" onClick={() => copyToClipboard(template.command)}>Copy</button>
            </div>
            <div className="tags">
              <span className="tag">{template.language}</span>
              <span className="tag">{template.framework}</span>
            </div>
            <div className="metrics">
              {template.npmDownloads && (
                <div className="metric">
                  <span className="metric-label">npm:</span>
                  <span className="metric-value">{template.npmDownloads}</span>
                </div>
              )}
              {template.githubStars && (
                <div className="metric">
                  <span className="metric-label">stars:</span>
                  <span className="metric-value">{template.githubStars}</span>
                </div>
              )}
              {template.lastUpdated && (
                <div className="metric">
                  <span className="metric-label">updated:</span>
                  <span className="metric-value">{template.lastUpdated}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal 
        isOpen={showAddForm || !!editingTemplate}
        onClose={() => {
          setShowAddForm(false);
          setEditingTemplate(null);
        }}
        onSubmit={(data) => {
          if (editingTemplate) {
            handleEditTemplate(data);
          } else {
            handleAddTemplate(data);
          }
        }}
        title={editingTemplate ? 'Edit Template' : 'Add New Template'}
        initialData={editingTemplate || undefined}
      />

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onSave={handleSaveSettings}
        currentPath={repoPath}
      />
    </main>
  );
}

export default App;
