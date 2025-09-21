import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const YOUTUBE_API_KEY = "AIzaSyBsqTyS-UQ7N6uoFB9m3bw2gohy6kKR038";
const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/search";

function YouTubeSearch() {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchVideos = async () => {
    if (!query) return;
    setLoading(true);
    setError(null);

    const params = new URLSearchParams({
      part: "snippet",
      maxResults: "10",
      q: query + " study",
      key: YOUTUBE_API_KEY,
      type: "video",
      videoEmbeddable: "true",
    });

    try {
      const response = await fetch(`${YOUTUBE_API_URL}?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setVideos(data.items);
    } catch (err) {
      setError("Failed to fetch videos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Search Study Best Videos From YouTube</h2>
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter keywords"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") searchVideos();
          }}
          className="flex-grow px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Button onClick={searchVideos} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {videos.map((video) => (
          <a
            key={video.id.videoId}
            href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-4 items-center p-4 border rounded hover:shadow-lg transition-shadow"
          >
            <img
              src={video.snippet.thumbnails.default.url}
              alt={video.snippet.title}
              className="w-32 h-20 object-cover rounded"
            />
            <div>
              <p className="font-semibold text-lg">{video.snippet.title}</p>
              <p className="text-sm text-muted-foreground">Channel: {video.snippet.channelTitle}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default YouTubeSearch;
