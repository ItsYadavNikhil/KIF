import YouTubeSearch from '../YouTubeSearch';

export default function YouTubeSearchExample() {
  return (
    <YouTubeSearch 
      onVideoClick={(id) => console.log('Play video:', id)}
      onExternalOpen={(url) => console.log('Open external:', url)}
    />
  );
}