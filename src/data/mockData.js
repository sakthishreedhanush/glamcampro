import { getAssetUrl } from '../utils/assets';

export const PROJECTS = [
  {
    id: "amanda-reel-7",
    title: "Amanda - Glamcam Reel 7",
    subtitle: "Cinematic High-Speed Capture",
    category: "Glamcam Reel",
    industry: "Fashion & Entertainment",
    year: "2026",
    client: "Amanda Project",
    description: "Stunning ultra slow-motion portrait reel engineered with precision Glamcam motion tracking.",
    coverImage: getAssetUrl("glambot_1.jpeg"),
    videoUrl: getAssetUrl("AMANDA_REEL7_GLAMBOT.mp4"),
    tags: ["Glamcam Reel", "Slow Motion", "Fashion", "Cinematography"],
    featured: true,
    stats: { metric: "4K", label: "High Definition" },
    deliverables: ["Glamcam Arm Trajectory", "1000 FPS Capture", "Custom Speed Ramping"]
  },
  {
    id: "basketball-reel",
    title: "Basketball - Glamcam Reel",
    subtitle: "High-Energy Sports Glamcam",
    category: "Glamcam Reel",
    industry: "Sports & Fitness",
    year: "2026",
    client: "Focus Sports Media",
    description: "Dynamic athletic action shot captured at maximum frame rate to showcase movement detail.",
    coverImage: getAssetUrl("glambot_2.jpeg"),
    videoUrl: getAssetUrl("BASKETBALL_REEL_2_GLAMBOT.mp4"),
    tags: ["Glamcam Reel", "Sports", "Focus Sports", "Action"],
    featured: true,
    stats: { metric: "1000 FPS", label: "High Speed Action" },
    deliverables: ["On-Site Arm Setup", "High-FPS Capture", "Sound Design"]
  },
  {
    id: "sukhleen-reel-444",
    title: "Sukhleen - Glamcam Reel 444",
    subtitle: "Luxury Event Cinematography",
    category: "Glamcam Reel",
    industry: "Fashion & Events",
    year: "2026",
    client: "Sukhleen Project",
    description: "Precision camera motion path creating dramatic emphasis and cinematic highlight moments.",
    coverImage: getAssetUrl("glambot_3.jpeg"),
    videoUrl: getAssetUrl("SUKHLEEN_REEL_444_GLAMBOT.mp4"),
    tags: ["Glamcam Reel", "Fashion", "1000 FPS"],
    featured: true,
    stats: { metric: "100%", label: "Real-Time Playback" },
    deliverables: ["Glamcam Motion Track", "Post-Production", "Color Finish"]
  },
  {
    id: "amanda-bts",
    title: "Amanda - Behind The Scenes",
    subtitle: "Studio Operations & Workflow",
    category: "Behind The Scenes",
    industry: "Behind The Scenes",
    year: "2026",
    client: "The GlamCam Pro",
    description: "Exclusive BTS look into the setup, programming, and live operation of the 1000 FPS Glamcam arm.",
    coverImage: getAssetUrl("glambot.jpeg"),
    videoUrl: getAssetUrl("Amanda01_BTS_edited.mp4"),
    tags: ["Behind The Scenes", "Glamcam Tech", "Studio"],
    featured: false,
    stats: { metric: "BTS", label: "Studio Operations" },
    deliverables: ["Behind-The-Scenes Footage", "Operator Directing", "Equipment Rigging"]
  }
];

export const SERVICES = [
  {
    id: "capture",
    num: "01",
    title: "1000 FPS Slow-Motion",
    subtitle: "High-Speed Glamcam Capture.",
    description: "At The GlamCam Pro, we transform ordinary moments into cinematic experiences using our 1000 FPS Glamcam technology. We combine precision camera motion, ultra slow-motion capture, and creative direction to produce stunning, luxury-quality visuals.",
    tags: ["Glamcam", "Slow Motion", "Cinematic", "Creative Direction", "1000 FPS"],
    deliverables: [
      "Real-Time Playback & Review",
      "Custom Motion Profiles"
    ]
  },
  {
    id: "cinematography",
    num: "02",
    title: "Cinematography & Post-Production",
    subtitle: "Precision editing & color.",
    description: "Full post-production pipeline including custom color grading, speed ramping, and tailored video delivery for high-impact social and broadcast channels.",
    tags: ["Color Grading", "Post-Production", "Speed Ramping", "Motion FX"],
    deliverables: [
      "High-FPS Video Editing",
      "Custom Color Grading",
      "Speed Ramping & Slow-Motion FX",
      "Vertical & Horizontal Formats",
      "Social Media Delivery Packages"
    ]
  }
];

export const JOURNAL_ARTICLES = [];

export const CLIENT_LOGOS = [];

