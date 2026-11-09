import { useEffect, useState } from 'react';

export default function useContributions() {
  const [contributions, setContributions] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/contributions', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Contribution API is unavailable.');
        return response.json();
      })
      .then(setContributions)
      .catch((error) => {
        if (error.name !== 'AbortError') setContributions({ error: error.message });
      });

    return () => controller.abort();
  }, []);

  return contributions;
}
