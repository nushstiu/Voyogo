import { useEffect, useState } from 'react';
import { testApi, getDataApi } from './api/client';
import Navbar from "./components/navbar.tsx";
import Footer from "./components/footer.tsx";

interface DataItem {
  id: number;
  name: string;
}

function App() {
  const [message, setMessage] = useState<string>('');
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const msgResponse = await testApi();
        setMessage(msgResponse.message);

        const dataResponse = await getDataApi();
        setData(dataResponse);
      } catch (err) {
        setError('Nu s-a putut conecta la backend!');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
      <>
        <Navbar />
        <main>
          {/* Your page content here */}
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {message && <p>{message}</p>}
        </main>
        <Footer />
      </>
  );
}

export default App;