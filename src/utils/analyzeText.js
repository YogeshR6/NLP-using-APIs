export async function analyzeText(text, analysisType) {
  const url = "https://api.textrazor.com/";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "X-TextRazor-Key": import.meta.env.VITE_RAZOR_KEY,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        text: text,
        analysisType: analysisType,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
