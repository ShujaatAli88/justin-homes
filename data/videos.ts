/**
 * TODO(client): replace with actual video IDs from the client's channels once
 * confirmed. youtubeId/tiktokUrl values below are placeholders.
 */
export interface VideoItem {
  id: string;
  platform: "youtube" | "tiktok";
  title: string;
  embedUrl: string;
  thumbnail: string;
}

export const videos: VideoItem[] = [
  {
    id: "1",
    platform: "youtube",
    title: "{{VIDEO_TITLE_1}}",
    embedUrl: "{{YOUTUBE_EMBED_URL_1}}",
    thumbnail: "{{VIDEO_THUMBNAIL_1}}",
  },
  {
    id: "2",
    platform: "youtube",
    title: "{{VIDEO_TITLE_2}}",
    embedUrl: "{{YOUTUBE_EMBED_URL_2}}",
    thumbnail: "{{VIDEO_THUMBNAIL_2}}",
  },
  {
    id: "3",
    platform: "tiktok",
    title: "{{VIDEO_TITLE_3}}",
    embedUrl: "{{TIKTOK_EMBED_URL_3}}",
    thumbnail: "{{VIDEO_THUMBNAIL_3}}",
  },
];

export const youtubeChannelUrl = "https://www.youtube.com/@BrownwoodTX-m5d";
export const tiktokProfileUrl = "https://www.tiktok.com/@justincadenhead3";
