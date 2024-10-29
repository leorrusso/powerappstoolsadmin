import TextInputWithDownload from './components/input';  // Ensure this path is correct relative to where the file is
import Sidebar from './components/sidebar';

export default function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex items-center justify-center w-full h-screen space-x-2">
        <TextInputWithDownload />
      </div>
    </div>
  );
}