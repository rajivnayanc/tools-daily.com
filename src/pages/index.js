import { useState, useEffect } from "react";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import ToolCard from "../components/ToolCard";
import AdUnit from "../components/AdUnit";
import { tools } from "../data/tools";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTools, setFilteredTools] = useState([]);


  useEffect(() => {
    setFilteredTools(tools);
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = tools.filter(tool =>
      tool.name.toLowerCase().includes(term) ||
      tool.category.toLowerCase().includes(term)
    );
    setFilteredTools(filtered);
  };


  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>DailyTools - Cyberpunk Utilities</title>
        <meta name="description" content="Next-gen simple, fast, and reliable utilities. No ads, no signup." />
      </Head>

      <div className="background-grid"></div>


      {/* Header is handled by Layout in _app.js */}


      <main>
        <section className={`hero ${searchTerm ? 'search-mode' : ''}`}>
          <div className="hero-content">
            {!searchTerm && (
              <>
                <h2>The Future of Web Tools</h2>
                <p>Powerful utilities for developers and designers. Fast, privacy-focused, and free.</p>
              </>
            )}

            <div className={`search-container ${searchTerm ? 'active' : ''}`}>
              <input
                type="text"
                placeholder="Search tools (e.g., 'json', 'time')..."
                value={searchTerm}
                onChange={handleSearch}
                autoFocus
              />
              <button className="search-button">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>

            {searchTerm && (
              <div className="search-results-grid">
                {filteredTools.length > 0 ? (
                  filteredTools.map((tool, index) => (
                    <ToolCard key={index} tool={tool} />
                  ))
                ) : (
                  <p className="no-results">No tools found matching "{searchTerm}"</p>
                )}
              </div>
            )}
          </div>
        </section>

        <div className="container" id="all-tools">
          <AdUnit slot="1234567890" style={{ height: '90px' }} />

          {!searchTerm && (
            <>
              <div className="tool-grid">
                {filteredTools.map((tool, index) => (
                  <ToolCard key={index} tool={tool} />
                ))}
              </div>
              <AdUnit slot="0987654321" style={{ height: '250px', marginTop: '50px' }} />
            </>
          )}
        </div>

        <section id="about" className="container mt-20 text-center glass-panel" style={{ padding: '50px', marginTop: '100px' }}>
          <h3><FontAwesomeIcon icon={faLayerGroup} /> About DailyTools</h3>
          <p style={{ maxWidth: '600px', margin: '20px auto' }}>
            We provide high-quality, free-to-use tools for everyday tasks.
            Whether you need to convert data, format code, or edit text, we have you covered.
          </p>
        </section>
      </main>


      {/* Footer is handled by Layout in _app.js */}

    </>
  );
}
