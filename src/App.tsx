
import "./App.css";
import uploadToFirestore from "./hooks/use-upload-dummy";

function App() {
  const handleUpload = () => {
    uploadToFirestore();
  };
  return (
    <div className="App">
      <h1>FreshTani Admin Panel</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleUpload}
      >
        Upload Data Produk
      </button>
    </div>
  );
}

export default App;
