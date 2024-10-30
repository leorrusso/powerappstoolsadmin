import Sidebar from './components/sidebar';
import CodeSnippets from './components/snippets';
import Header from './components/header';

export default function App() {
  return (
    <div>
      {/* Header should be placed outside the flex container */}
      <Header /> 

      <div className="flex">

        
        {/* Main content with flex-col for vertical layout */}
        <div className="flex flex-col w-full h-screen space-y-2">
          <CodeSnippets />
        </div>
      </div>
    </div>
  );
}