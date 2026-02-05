import { useEffect, useState } from 'react';
import { testApi, getDataApi } from './api/client';

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
    <div className='min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4'>
      <div className='bg-white p-8 rounded-lg shadow-2xl max-w-md w-full'>
        <h1 className='text-4xl font-bold text-gray-800 mb-4'>
          Voyogo Project
        </h1>

        {loading && <p className='text-gray-600'>Se încarcă...</p>}
        
        {error && <p className='text-red-500'>{error}</p>}

        {!loading && !error && (
          <>
            <p className='text-green-600 font-semibold mb-4'>{message}</p>
            
            <div className='space-y-2'>
              <h2 className='text-xl font-bold text-gray-700'>Date din API:</h2>
              {data.map(item => (
                <div key={item.id} className='bg-gray-100 p-3 rounded'>
                  {item.name}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
