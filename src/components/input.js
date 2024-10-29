import React, { useState } from 'react';
import { load } from 'cheerio';  // Corrected import


function TextInputWithDownload() {
  const [url, setUrl] = useState('');
  const [preContent, setPreContent] = useState('');

  // Function to handle the fetch and parsing
  const handleFetch = async () => {
    try {
      const response = await fetch(url);
      const html = await response.text();

      // Parse HTML using Cheerio
      const $ = load(html);  // Using 'load' from 'cheerio'
      console.log(html);  
      // Extract the content inside the <pre> tag
      const preTagContent = $('pre').text(); // This grabs the text inside the <pre> tag

      setPreContent(preTagContent); // Set the extracted content to the state
    } catch (error) {
      console.error('Error fetching the page:', error);
      setPreContent('Error fetching the page');
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border rounded p-2 w-64"
        placeholder="Enter webpage URL..."
      />
      <button
        onClick={handleFetch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Fetch Content
      </button>

      {preContent && (
        <textarea
          readOnly
          value={preContent}
          rows="20"
          className="border rounded p-2 w-full"
        />
      )}
    </div>
  );
}

export default TextInputWithDownload;