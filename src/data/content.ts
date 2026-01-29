export const personalInfo = {
  name: "Arjun Joshi",
  tagline: "From Ocean Depths to Digital Frontiers",
  subtitle: "Marine Scientist → Data Scientist → AI Engineer",
  description: `I'm Arjun Joshi, a data scientist and AI engineer with an unconventional journey. 
    From modeling fish populations in the Pacific to architecting real-time driving simulators 
    and building AI-powered ecosystems, I bring a unique perspective to solving complex problems 
    at the intersection of the physical and digital worlds.`,
  email: "Joshi.Arjun.K@Gmail.com",
  phone: "978-758-1863",
  linkedin: "https://linkedin.com/in/arjun-joshi",
  github: "https://github.com/aiaxmaior",
  location: "Cambridge, MA",
};

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  type: 'education' | 'work' | 'achievement';
  image?: string; // placeholder for hover image
}

// Timeline in reverse chronological order (most recent first)
export const timeline: TimelineEvent[] = [
  {
    year: "2024-Present",
    title: "Lead AI Systems Engineer",
    description: "At QRyde Technologies, architecting dual-platform driver safety system: CARLA desktop simulator (<50ms latency) + Jetson Orin Nano edge device. Leading Alpha deployment with MART transit authority.",
    type: "work",
    image: "/assets/timeline/qdrive-placeholder.jpg",
  },
  {
    year: "2024",
    title: "Data Science Immersion",
    description: "Completed intensive Data Science diploma at BrainStation. Won hackathon for innovative oyster reef detection pipeline using ResNet/YOLO and diffusion models.",
    type: "achievement",
    image: "/assets/timeline/brainstation-placeholder.jpg",
  },
  {
    year: "2019-2024",
    title: "Quantitative Analyst",
    description: "At J&J Asset Management, developed time-series forecasting (ARIMA, exponential smoothing) for real estate markets and Monte Carlo simulation for portfolio risk assessment.",
    type: "work",
    image: "/assets/timeline/jj-placeholder.jpg",
  },
  {
    year: "2016-2018",
    title: "NOAA Biostatistician",
    description: "Biostatistical analysis of stock assessment models at Ocean Associates/NOAA NMFS, informing $100M+ federal quota allocations. Maintained Oracle SQL database with 500K+ records.",
    type: "work",
    image: "/assets/timeline/noaa-placeholder.jpg",
  },
  {
    year: "2015",
    title: "M.S. Fisheries Sciences",
    description: "Completed Master's at UMass Dartmouth, focusing on Biostatistics and Time-Series analysis in R. Bridge from biology to computational methods.",
    type: "education",
    image: "/assets/timeline/umass-placeholder.jpg",
  },
  {
    year: "2011",
    title: "Marine Sciences Beginning",
    description: "Graduated from Boston University with distinction in Marine Sciences. Awarded UROP Research Grants for independent research on fisheries and ecosystem modeling.",
    type: "education",
    image: "/assets/timeline/bu-placeholder.jpg",
  },
];

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  github?: string;
  isOcean: boolean;
  landmark: string;
}

export const projects: Project[] = [
  {
    id: "qdrive",
    title: "Q-DRIVE Cortex",
    subtitle: "Real-Time Driving Simulator & AI Coach",
    description: "Dual-deployment driver safety platform: 20+ Python modules, CARLA simulation, HIL controls, unified Predictive Indices (TTC, TLC). Enterprise-grade with real-time scoring engine and MOZA racing wheel integration.",
    techStack: ["Python", "CARLA", "Pygame", "Hardware HIL", "Real-time Systems", "Threading"],
    github: "https://github.com/aiaxmaior/pi_qdrive_repo",
    isOcean: false,
    landmark: "safetytrack",
  },
  {
    id: "facial-recognition",
    title: "Facial Recognition Platform",
    subtitle: "Edge-to-Cloud Recognition System",
    description: "Distributed facial recognition: Jetson edge → IoT broker (WebSocket) → GPU server (ArcFace embeddings). React/Node.js enrollment portal with fleet-wide sync and emotion monitoring with 15s ring buffer.",
    techStack: ["DeepFace", "ArcFace", "Jetson", "WebSocket", "React", "Node.js"],
    github: "https://github.com/aiaxmaior/facial_recognition",
    isOcean: false,
    landmark: "techhub",
  },
  {
    id: "vision-lab",
    title: "Vision Lab",
    subtitle: "Multi-Modal VLM Interface",
    description: "Modern React + FastAPI multi-modal VLM interface. Comprehensive computer vision pipeline including CLIP interrogation, VLM queries, real-time image segmentation, and automatic screenshot analysis.",
    techStack: ["React", "FastAPI", "PyTorch", "CLIP", "VLM", "TypeScript"],
    github: "https://github.com/aiaxmaior/vision_lab",
    isOcean: false,
    landmark: "workshop",
  },
  {
    id: "adas-dms",
    title: "ADAS/DMS Retrofit",
    subtitle: "DeepStream Edge Computing",
    description: "DeepStream pipelines (C/Python): DashCamNet, YOLOv8 segmentation, monocular depth estimation, NVIDIA AI NVR. Hardware-accelerated video processing for Jetson devices.",
    techStack: ["DeepStream", "TensorRT", "CUDA", "YOLOv8", "C", "Python"],
    github: "https://github.com/aiaxmaior/orin_jps_scripts",
    isOcean: false,
    landmark: "workshop",
  },
  {
    id: "trainer-corpus",
    title: "Trainer Corpus Suite",
    subtitle: "ML Data Pipeline",
    description: "Multi-stage ML data pipeline: PySceneDetect → YOLO detection → DeepFace analysis → action recognition → VLM captioning → training dataset assembly for video diffusion models.",
    techStack: ["YOLO", "DeepFace", "PySceneDetect", "VLM", "Apache Arrow"],
    github: "https://github.com/aiaxmaior/trainer_corpus_suite",
    isOcean: false,
    landmark: "workshop",
  },
  {
    id: "marine-detection",
    title: "Marine Habitat Detection",
    subtitle: "AI-Powered Ecological Monitoring",
    description: "Award-winning hackathon project differentiating oyster reefs from invasive green mussel beds. Critical for Tampa Bay's $32.1B annual ecosystem services.",
    techStack: ["ResNet", "YOLO", "GANs", "Diffusion Models", "KNN"],
    isOcean: true,
    landmark: "marina",
  },
  {
    id: "coastal-risk",
    title: "Coastal Risk Intelligence",
    subtitle: "Environmental Impact Scoring",
    description: "Accessible metric for assessing coastal property development risk. Uses VAR and LSTM neural networks for time-series analysis, validated through ADF tests and IRFs.",
    techStack: ["Python", "LSTM", "VAR", "Time Series", "Keras"],
    isOcean: true,
    landmark: "marina",
  },
];

export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "AI & Machine Learning",
    skills: [
      "PyTorch, TensorFlow, Scikit-Learn",
      "YOLO, ResNet, Segmentation",
      "LLMs, VLMs, Transformers",
      "Diffusion Models & GANs",
      "LoRA, AWQ/GPTQ Quantization",
    ],
  },
  {
    title: "Edge & Embedded",
    skills: [
      "NVIDIA Jetson Orin",
      "DeepStream SDK, GStreamer",
      "TensorRT, CUDA",
      "Real-Time Systems",
      "Hardware-in-the-Loop",
    ],
  },
  {
    title: "Statistics & Analysis",
    skills: [
      "Time-Series (ARIMA, VAR, LSTM)",
      "Bayesian Inference",
      "Monte Carlo Simulation",
      "A/B Testing & Validation",
      "Biostatistics",
    ],
  },
  {
    title: "Infrastructure",
    skills: [
      "Python, R, SQL, C",
      "React, Node.js, FastAPI",
      "Docker, AWS, Linux",
      "Apache Arrow, Parquet",
      "WebSocket, Socket.IO",
    ],
  },
];

export interface Landmark {
  id: string;
  name: string;
  label: string; // Static text label
  x: number;
  y: number;
  isWater: boolean;
  targetSection: string;
  iconPath?: string; // Path to custom icon
}

export const landmarks: Landmark[] = [
  {
    id: "voyage",
    name: "Voyage",
    label: "Voyage: My Story",
    x: 12,
    y: 52,
    isWater: false,
    targetSection: "timeline",
    iconPath: "/assets/icons/voyage.svg",
  },
  {
    id: "marina",
    name: "Marina",
    label: "Work in Marine Sciences",
    x: 25,
    y: 20,
    isWater: true,
    targetSection: "projects",
    iconPath: "/assets/icons/marina.svg",
  },
  {
    id: "safetytrack",
    name: "Safety Track",
    label: "Q-DRIVE Driver Safety Ecosystem",
    x: 75,
    y: 55,
    isWater: false,
    targetSection: "projects",
    iconPath: "/assets/icons/safetytrack.svg",
  },
  {
    id: "techhub",
    name: "Tech Hub",
    label: "Technical Skills",
    x: 50,
    y: 72,
    isWater: false,
    targetSection: "skills",
    iconPath: "/assets/icons/techhub.svg",
  },
  {
    id: "workshop",
    name: "AI/ML Workshop",
    label: "AI/ML Workshop",
    x: 30,
    y: 62,
    isWater: false,
    targetSection: "projects",
    iconPath: "/assets/icons/workshop.svg",
  },
  {
    id: "tower",
    name: "Control Tower",
    label: "Get in Touch",
    x: 88,
    y: 72,
    isWater: false,
    targetSection: "contact",
    iconPath: "/assets/icons/tower.svg",
  },
  {
    id: "presentations",
    name: "Presentations",
    label: "Conferences & Talks",
    x: 60,
    y: 25,
    isWater: true,
    targetSection: "presentations",
    iconPath: "/assets/icons/presentations.svg",
  },
];

export interface Presentation {
  title: string;
  event: string;
  date: string;
  location: string;
  description?: string;
}

export const presentations: Presentation[] = [
  {
    title: "AI-Powered Driver Safety Systems",
    event: "Example Conference 2025",
    date: "2025",
    location: "Boston, MA",
    description: "Placeholder for conference presentation",
  },
  // Add more presentations here
];
