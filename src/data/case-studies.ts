export interface CaseStudyMetricRow {
  metric: string;
  before: string;
  after: string;
  delta: string;
}

export interface EngineeringCaseStudy {
  id: string;
  chapterNumber: string;
  slug: string;
  title: string;
  subtitle: string;
  repoUrl: string;
  visibility: 'PUBLIC' | 'CLASSIFIED';
  role: string;
  timeline: string;
  stack: string[];
  impactHeadline: string;
  overview: string;
  problem: string;
  keyDecisions: {
    title: string;
    rationale: string;
  }[];
  architectureSteps: string[];
  results: CaseStudyMetricRow[];
  learnings: string;
  schematicType: 'cartography' | 'onnx-pipeline' | 'quant-bridge';
}

export const engineeringCaseStudies: EngineeringCaseStudy[] = [
  {
    id: 'cs-city-api',
    chapterNumber: '01',
    slug: 'city-api-vector-engine',
    title: 'City-Api Cartographic Compiler',
    subtitle: 'Serverless Vector SVG Map Poster & MapLibre GL Specification Engine',
    repoUrl: 'https://github.com/iceefruit/City-Api',
    visibility: 'PUBLIC',
    role: 'Systems Architect',
    timeline: '2026',
    stack: ['TypeScript', 'Next.js Edge', 'MapLibre GL', 'OSM Overpass', 'SVG DOM Compiler'],
    impactHeadline: 'Cut vector map generation time from 4.8s to 310ms while eliminating headless browser memory crashes on serverless cold starts.',
    overview:
      'A stateless cartographic rendering API built for Vercel that resolves raw geographic coordinates or city names into print-grade vector SVG map posters, curated cartographic palettes, and ready-to-mount MapLibre GL style JSONs.',
    problem:
      'Traditional map poster generators rely on headless Chromium instances or Python Matplotlib workers that exceed serverless 250MB bundle limits and suffer 4-8 second cold starts. Rendering dense road networks caused frequent out-of-memory faults under concurrent requests.',
    keyDecisions: [
      {
        title: 'Direct Geometry-to-SVG Stream Compilation',
        rationale:
          'Replaced headless canvas snapshots with a pure TypeScript topological projection pipeline that transforms GeoJSON line-strings directly into optimized SVG path commands.',
      },
      {
        title: 'Deterministic Theme Token Matrix',
        rationale:
          'Decoupled road hierarchy classification (motorway, arterial, residential, waterway) from color palettes so a single geometry query can emit both SVG posters and MapLibre GL specs.',
      },
    ],
    architectureSteps: [
      'Geocode Resolver -> Bounding Box Normalization (Mercator Projection)',
      'Vector Tile / Overpass Geometry Extraction -> Douglas-Peucker Simplification',
      'Layered SVG Path Serializer -> Edge Cache (Stale-While-Revalidate)',
    ],
    results: [
      {
        metric: 'Cold-Start Render Latency',
        before: '4,820 ms',
        after: '310 ms',
        delta: '-93.5%',
      },
      {
        metric: 'Serverless Memory Peak',
        before: '1,024 MB (Chromium)',
        after: '68 MB (Pure V8)',
        delta: '-93.3%',
      },
      {
        metric: 'SVG Payload Size (Dense Metro)',
        before: '14.2 MB',
        after: '1.8 MB',
        delta: '-87.3%',
      },
    ],
    learnings:
      'Coordinate precision beyond 2 decimal places in SVG viewport space added 40% byte overhead with zero sub-pixel visual gain. Clamping path coordinates and merging collinear segments yielded an immediate 87% payload reduction.',
    schematicType: 'cartography',
  },
  {
    id: 'cs-ai-gateway',
    chapterNumber: '02',
    slug: 'onnx-whisper-inference-gateway',
    title: 'Transparent & Transcribe AI Gateway',
    subtitle: 'Quantized ONNX RMBG-1.4 & Faster-Whisper INT8 Asynchronous Inference Mesh',
    repoUrl: 'https://github.com/iceefruit/Transparent-Api',
    visibility: 'PUBLIC',
    role: 'Backend & ML Systems Engineer',
    timeline: '2026',
    stack: ['Python', 'FastAPI', 'ONNX Runtime', 'Faster-Whisper INT8', 'Node.js Gateway', 'HMAC-SHA256'],
    impactHeadline: 'Delivered GPU-class background removal and speech transcription on commodity CPU workers at 4.1x throughput via INT8 quantization.',
    overview:
      'A dual-service inference architecture pairing a lightweight Vercel Node.js edge gateway with asynchronous FastAPI compute workers running quantized RMBG-1.4 vision segmentation and CTranslate2 Faster-Whisper INT8 audio transcription.',
    problem:
      'Running PyTorch FP32 vision segmentation and Whisper speech models directly inside web API handlers caused 30-second gateway timeouts, exhausted RAM on burst traffic, and left public endpoints vulnerable to unauthorized compute draining.',
    keyDecisions: [
      {
        title: 'Static INT8 Quantization on ONNX & CTranslate2',
        rationale:
          'Converted full-precision PyTorch weights into quantized INT8 graphs with AVX-512 CPU execution providers, cutting model memory footprints by 74% without dedicated GPU rental costs.',
      },
      {
        title: 'Zero-Trust HMAC-SHA256 Edge Gateway',
        rationale:
          'Separated public request validation from heavy Python workers using a Node.js edge ingress that verifies timestamped HMAC signatures before dispatching jobs.',
      },
    ],
    architectureSteps: [
      'Client Upload -> Vercel Edge Gateway (HMAC-SHA256 Timestamp Verification)',
      'Async Job Dispatch -> FastAPI Worker Pool (Pre-warmed ONNX / CTranslate2 Sessions)',
      'Tensor Post-Processing -> Alpha Matte / Time-Aligned Transcript Stream',
    ],
    results: [
      {
        metric: 'Model RAM Footprint',
        before: '3.8 GB (PyTorch FP32)',
        after: '940 MB (ONNX INT8)',
        delta: '-75.2%',
      },
      {
        metric: '1080p Alpha Matte Inference',
        before: '2,950 ms',
        after: '680 ms',
        delta: '4.3x Faster',
      },
      {
        metric: '60s Audio Transcription (CPU)',
        before: '18.4 s',
        after: '4.2 s',
        delta: '4.4x Faster',
      },
    ],
    learnings:
      'Thread contention between Python asyncio event loops and OpenMP tensor threads degraded p99 latency under load. Pinning `intra_op_num_threads` per worker process stabilized tail latency across all concurrent jobs.',
    schematicType: 'onnx-pipeline',
  },
  {
    id: 'cs-quant-exml',
    chapterNumber: '03',
    slug: 'exml-goldalgo-quant-bridge',
    title: 'ExML & GoldAlgo Execution Core',
    subtitle: 'Low-Latency Quantitative Signal Pipeline & MT5 ZeroMQ Execution Bridge',
    repoUrl: 'https://github.com/iceefruit',
    visibility: 'CLASSIFIED',
    role: 'Lead Quantitative Developer',
    timeline: '2025 - 2026',
    stack: ['C++', 'MQL5', 'Python', 'ONNX Runtime', 'ZeroMQ', 'TimescaleDB'],
    impactHeadline: 'Achieved 1.2ms tick-to-order execution and 3.14 Sharpe ratio across XAUUSD liquidity pools using lock-free socket IPC.',
    overview:
      'An institutional-style algorithmic trading and ML evaluation system coupling an asynchronous Python feature/inference engine (`ExML`) with a native MQL5/C++ execution terminal (`GoldAlgo`) over lock-free ZeroMQ sockets.',
    problem:
      'Standard retail trading bridges poll filesystem CSVs or HTTP endpoints, introducing 80-250ms slippage during high-volatility macroeconomic releases and causing catastrophic adverse selection on XAUUSD order books.',
    keyDecisions: [
      {
        title: 'Zero-Copy ZeroMQ PUB/SUB & PUSH/PULL Topology',
        rationale:
          'Bypassed HTTP serialization entirely by streaming binary tick structs from the MT5 C++ DLL wrapper directly into memory-pinned NumPy ring buffers.',
      },
      {
        title: 'Dynamic Volatility Regime Risk Brakes',
        rationale:
          'Embedded deterministic drawdown circuit breakers and order-book imbalance filters inside the native execution layer so risk limits enforce even if the ML node disconnects.',
      },
    ],
    architectureSteps: [
      'MT5 L1/L2 Tick Stream -> C++ ZeroMQ Publisher (Binary Structs)',
      'ExML Feature Ring Buffer -> Quantized ONNX Signal Classifier (<4.2ms)',
      'Risk Parity & Drawdown Gate -> Native Order Execution (<1.2ms RTT)',
    ],
    results: [
      {
        metric: 'Tick-to-Order Roundtrip',
        before: '145 ms (REST Bridge)',
        after: '1.2 ms (ZeroMQ IPC)',
        delta: '-99.1%',
      },
      {
        metric: 'Signal Inference Latency',
        before: '38.0 ms',
        after: '4.1 ms',
        delta: '9.2x Faster',
      },
      {
        metric: 'Out-of-Sample Max Drawdown',
        before: '14.6%',
        after: '4.7%',
        delta: '-67.8% Risk',
      },
    ],
    learnings:
      'Backtesting on 1-minute OHLC bars masked spread-widening events during London/NY session overlaps. Rebuilding the simulator around raw historical bid/ask tick records eliminated phantom alpha and hardened live execution.',
    schematicType: 'quant-bridge',
  },
];
