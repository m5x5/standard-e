import { useState } from "react";
import { Template, FilterType, TemplateFormData } from "./types";
import "./App.css";

const templates: Template[] = [
  {
    "id": "react-vite",
    "name": "React (Vite)",
    "command": "npm create vite@latest my-app -- --template react",
    "image": "https://react.dev/favicon.ico",
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
    "image": "https://vuejs.org/images/logo.png",
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
    "image": "https://angular.io/assets/images/favicons/favicon.ico",
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
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg",
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
    "image": "https://api.iconify.design/devicon:solidjs.svg",
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
    "image": "https://qwik.dev/logos/qwik.svg",
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
    "image": "https://icon.icepanel.io/Technology/svg/Express.svg",
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
    "image": "https://icon.icepanel.io/Technology/svg/Fastify.svg",
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
    "image": "https://docs.nestjs.com/favicon.ico",
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
    "image": "",
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
    "image": "https://deno.land/logo.svg",
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
    "image": "https://deno.land/logo.svg",
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
    "image": "https://nextjs.org/favicon.ico",
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
    "image": "https://nuxt.com/icon.png",
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
    "image": "https://remix.run/favicon.ico",
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
    "image": "",
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
    "image": "",
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
    "image": "",
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
    "image": "",
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
    "image": "",
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
    "image": "https://www.gatsbyjs.com/favicon-32x32.png",
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
    "image": "https://turbo.build/favicon/favicon-32x32.png",
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
    "image": "https://nx.dev/favicon.ico",
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
    "image": "https://vitejs.dev/logo.svg",
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
    "image": "https://bun.sh/logo.svg",
    "language": "JavaScript/TypeScript",
    "framework": "Bun + Next.js",
    "npmDownloads": "2M/week",
    "githubStars": "45k",
    "lastUpdated": "1 day ago"
  }
]

function App() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("language");
  const [filterValue, setFilterValue] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [localTemplates, setLocalTemplates] = useState<Template[]>(templates);

  const filteredTemplates = localTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(search.toLowerCase()) ||
                         template.command.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = !filterValue || template[filterType].toLowerCase() === filterValue.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const copyToClipboard = (command: string) => {
    navigator.clipboard.writeText(command);
  };

  const openInCursor = () => {
    // Using Tauri API to open in Cursor
    window.__TAURI__.shell.open('cursor://');
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

  return (
    <main className="container">
      <div className="header">
        <h1>Choose your template</h1>
        <div className="header-actions">
          <button type="button" onClick={openInCursor} className="edit-button">
            Edit in Cursor
          </button>
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

      {(showAddForm || editingTemplate) && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingTemplate ? 'Edit Template' : 'Add New Template'}</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const data: TemplateFormData = {
                name: formData.get('name') as string,
                command: formData.get('command') as string,
                image: formData.get('image') as string,
                language: formData.get('language') as string,
                framework: formData.get('framework') as string,
                npmDownloads: formData.get('npmDownloads') as string,
                githubStars: formData.get('githubStars') as string,
                lastUpdated: formData.get('lastUpdated') as string
              };
              if (editingTemplate) {
                handleEditTemplate(data);
              } else {
                handleAddTemplate(data);
              }
            }}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" defaultValue={editingTemplate?.name} required />
              </div>
              <div className="form-group">
                <label htmlFor="command">Command</label>
                <input type="text" id="command" name="command" defaultValue={editingTemplate?.command} required />
              </div>
              <div className="form-group">
                <label htmlFor="image">Image URL</label>
                <input type="url" id="image" name="image" defaultValue={editingTemplate?.image} required />
              </div>
              <div className="form-group">
                <label htmlFor="language">Language</label>
                <input type="text" id="language" name="language" defaultValue={editingTemplate?.language} required />
              </div>
              <div className="form-group">
                <label htmlFor="framework">Framework</label>
                <input type="text" id="framework" name="framework" defaultValue={editingTemplate?.framework} required />
              </div>
              <div className="form-group">
                <label htmlFor="npmDownloads">NPM Downloads</label>
                <input type="text" id="npmDownloads" name="npmDownloads" defaultValue={editingTemplate?.npmDownloads} />
              </div>
              <div className="form-group">
                <label htmlFor="githubStars">GitHub Stars</label>
                <input type="text" id="githubStars" name="githubStars" defaultValue={editingTemplate?.githubStars} />
              </div>
              <div className="form-group">
                <label htmlFor="lastUpdated">Last Updated</label>
                <input type="text" id="lastUpdated" name="lastUpdated" defaultValue={editingTemplate?.lastUpdated} />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => {
                  setShowAddForm(false);
                  setEditingTemplate(null);
                }}>Cancel</button>
                <button type="submit">{editingTemplate ? 'Save Changes' : 'Add Template'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
