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
    <div className="w-full flex flex-col gap-2">
      <p className="text-xl text-coffeeDark font-bold">Quote of the day</p>
      <div className="h-fit w-full flex flex-col gap-2">
        {quote && (
          <>
            <p className="text-2xl italic">{`"${quote?.content}"`}</p>
            <p className="flex text-base">-{quote?.author}</p>
          </>
        )}
      </div>
    </div>
  );
};
