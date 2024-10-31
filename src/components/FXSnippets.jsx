import React, { useEffect, useState } from 'react';
import { supabase } from './SupabaseClient';

const CodeSnippets = () => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('new'); // Default view is 'new snippets'

  // Fetch snippets based on the selected view
  useEffect(() => {
    const fetchSnippets = async () => {
      setLoading(true);
      let data, error;

      // Query for "New Snippets" view
      if (view === 'new') {
        const response = await supabase
          .from('Code Snippets')
          .select('id, title, subtitle, prod_enabled, author_id')
          .neq('prod_enabled', true)
          .not('author_id', 'in', '(1, 2, 3)'); // Filter where author_id is not 1, 2, or 3 and prod_enabled = false
        data = response.data;
        error = response.error;
      }
      // Query for "pnp" view
      if (view === 'pnp') {
        const response = await supabase
          .from('Code Snippets')
          .select('id, title, subtitle, prod_enabled, author_id')
          .eq('source', 'pnp'); // Filter where author_id is not 1, 2, or 3 and prod_enabled = false
        data = response.data;
        error = response.error;
      }

      // Query for "Prod Enabled" view
      if (view === 'prod_enabled') {
        const response = await supabase
          .from('Code Snippets')
          .select('id, title, subtitle, prod_enabled')
          .eq('prod_enabled', true) // Only fetch prod_enabled = true
          .order('title', { ascending: true }); 
        data = response.data;
        error = response.error;
      }

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setSnippets(data);
      }
      setLoading(false);
    };

    fetchSnippets();
  }, [view]); // Re-run the effect when the view changes

  // Toggle prod_enabled for a specific snippet
  const toggleProdEnabled = async (id, currentValue) => {
    const { error } = await supabase
      .from('Code Snippets')
      .update({ prod_enabled: !currentValue }) // Toggle the boolean value
      .eq('id', id);

    if (error) {
      console.error('Error updating prod_enabled:', error);
    } else {
      // Update state to reflect the change
      setSnippets((prevSnippets) =>
        prevSnippets.map((snippet) =>
          snippet.id === id ? { ...snippet, prod_enabled: !currentValue } : snippet
        )
      );
    }
  };

  // Delete a specific snippet with confirmation
  const deleteSnippet = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this snippet?");
    if (confirmDelete) {
      const { error } = await supabase
        .from('Code Snippets')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting snippet:', error);
      } else {
        // Update state to remove the deleted snippet
        setSnippets((prevSnippets) => prevSnippets.filter((snippet) => snippet.id !== id));
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Code Snippets</h2>
      
      {/* Buttons to toggle between views */}
      <div className="flex space-x-4 mb-4">
        <TabButton
          onClick={() => setView('new')}
          isActive={view === 'new'}
          label = 'New Snippets'
        />
        <TabButton
          onClick={() => setView('prod_enabled')}
          isActive={view === 'prod_enabled'}
          label = 'Production'
        />
        <TabButton
          onClick={() => setView('pnp')}
          isActive={view === 'pnp'}
          label = 'Respository'
        />
      </div>

      {/* Show "No Results" message if there are no snippets */}
      {snippets.length === 0 ? (
        <p className="text-center text-gray-500">No snippets found for this view.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Subtitle</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {snippets.map((snippet) => (
              <tr key={snippet.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{snippet.title}</td>
                <td className="border px-4 py-2">{snippet.subtitle}</td>
                <td className="border px-4 py-2">
                  <div className='flex space-x-2'>
                    <button
                      onClick={() => toggleProdEnabled(snippet.id, snippet.prod_enabled)}
                      className={`px-4 py-2 ${snippet.prod_enabled ? 'bg-red-100  text-red-500' : 'bg-green-100 text-green-500'} rounded-lg mr-2`}
                    >
                      {snippet.prod_enabled ? 'Disable' : 'Enable'}
                    </button>
                    <button
                      onClick={() => deleteSnippet(snippet.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};



function TabButton({ onClick, isActive, label }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 ${isActive ? 'bg-purple-300 text-purple-700 '  : 'bg-gray-200 text-black hover:bg-purple-300 hover:text-purple-700'} rounded transition-all duration-500 ease-in-out`}
    >
      {label}
    </button>
  );
}

export default CodeSnippets;