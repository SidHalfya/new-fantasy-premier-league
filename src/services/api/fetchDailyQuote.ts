export const fetchDailyQuote = async () => {
  try {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch quotes:", error);
  } finally {
    // setLoading(false);
  }
};
