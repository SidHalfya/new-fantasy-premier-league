"use client";
import { useEffect, useState } from "react";

interface Quote {
  _id: string;
  content: string;
  author: string;
}

const QUOTE_API = "https://api.quotable.io/random";

export const DailyQuote = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [removeQuote, setRemoveQuote] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(QUOTE_API);
        const data = await response.json();
        setQuote(() => ({
          _id: data?._id,
          content: data?.content,
          author: data?.author,
        }));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch quotes:", error);
        setError("Failed to fetch quotes");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (removeQuote) return null;
  return (
    <div className="relative w-full flex py-8 pl-8 pr-12 border border-coffeeLight rounded-lg">
      <div className="h-fit w-full flex flex-col gap-2">
        {quote && (
          <>
            <p className="text-2xl italic">{`"${quote?.content}"`}</p>
            <p className="flex text-base">-{quote?.author}</p>
          </>
        )}
      </div>
      <button
        onClick={() => setRemoveQuote(true)}
        className="text-lg cursor-pointer hover:opacity-70 absolute top-4 right-4"
      >
        &#x2715;
      </button>
    </div>
  );
};
