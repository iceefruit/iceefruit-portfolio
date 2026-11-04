'use client';

import React from 'react';

interface SchematicProps {
  type: 'cartography' | 'onnx-pipeline' | 'quant-bridge';
  className?: string;
}

export const TechnicalSchematic: React.FC<SchematicProps> = ({ type, className = '' }) => {
  if (type === 'cartography') {
    return (
      <svg
        viewBox="0 0 640 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-auto bg-icee-darker border border-icee-border ${className}`}
        role="img"
        aria-label="City-Api Vector Cartographic Compilation Schematic"
      >
        {/* Background Halftone Grid */}
        <defs>
          <pattern id="cartoGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1E222B" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="640" height="340" fill="#07080A" />
        <rect width="640" height="340" fill="url(#cartoGrid)" />

        {/* Top Technical Header */}
        <text x="20" y="26" fill="#94A3B8" fontFamily="monospace" fontSize="10" letterSpacing="2">
          FIG 01.A // TOPOLOGICAL GEOJSON TO SVG STREAM COMPILER
        </text>
        <text x="620" y="26" fill="#FF5E00" fontFamily="monospace" fontSize="10" textAnchor="end">
          310MS COLD-START
        </text>
        <line x1="20" y1="36" x2="620" y2="36" stroke="#2A2E39" strokeWidth="1" />

        {/* Left Node: Bounding Box & Overpass */}
        <g transform="translate(28, 68)">
          <rect width="150" height="195" fill="#0B0C10" stroke="#2A2E39" strokeWidth="1.2" />
          <rect width="150" height="24" fill="#121318" stroke="#2A2E39" strokeWidth="1" />
          <text x="10" y="16" fill="#F1F5F9" fontFamily="monospace" fontSize="9" fontWeight="bold">
            01 / MERCATOR BBOX
          </text>
          {/* Coordinate Contour Lines */}
          <path
            d="M 18 55 Q 65 40 130 75 T 135 140"
            stroke="#3E4451"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
          <path d="M 20 95 L 85 70 L 128 115 L 60 165 Z" stroke="#FF5E00" strokeWidth="1.5" fill="rgba(255,94,0,0.06)" />
          <circle cx="85" cy="70" r="3" fill="#FF5E00" />
          <circle cx="128" cy="115" r="3" fill="#FF5E00" />
          <circle cx="60" cy="165" r="3" fill="#FF5E00" />
          <circle cx="20" cy="95" r="3" fill="#FF5E00" />
          <text x="12" y="182" fill="#94A3B8" fontFamily="monospace" fontSize="8">
            NODES: 48,210 // WAYS: 6,412
          </text>
        </g>

        {/* Arrow 1 */}
        <g transform="translate(178, 155)">
          <line x1="0" y1="10" x2="62" y2="10" stroke="#FF5E00" strokeWidth="1.5" />
          <polygon points="62,6 70,10 62,14" fill="#FF5E00" />
          <text x="34" y="3" fill="#94A3B8" fontFamily="monospace" fontSize="8" textAnchor="middle">
            SIMPLIFY
          </text>
        </g>

        {/* Center Node: Douglas-Peucker & Layer Classifier */}
        <g transform="translate(248, 68)">
          <rect width="160" height="195" fill="#0B0C10" stroke="#FF5E00" strokeWidth="1.2" />
          <rect width="160" height="24" fill="#FF5E00" />
          <text x="10" y="16" fill="#07080A" fontFamily="monospace" fontSize="9" fontWeight="bold">
            02 / VECTOR COMPILER
          </text>
          {/* Isometric Stacked Layers */}
          <polygon
            points="80,48 138,74 80,100 22,74"
            fill="rgba(255,94,0,0.12)"
            stroke="#FF5E00"
            strokeWidth="1.2"
          />
          <polygon
            points="80,82 138,108 80,134 22,108"
            fill="rgba(148,163,184,0.08)"
            stroke="#94A3B8"
            strokeWidth="1"
          />
          <polygon
            points="80,116 138,142 80,168 22,142"
            fill="rgba(42,46,57,0.4)"
            stroke="#3E4451"
            strokeWidth="1"
          />
          <text x="80" y="184" fill="#F1F5F9" fontFamily="monospace" fontSize="8" textAnchor="middle">
            HIGHWAY / WATER / RAIL
          </text>
        </g>

        {/* Arrow 2 */}
        <g transform="translate(408, 155)">
          <line x1="0" y1="10" x2="52" y2="10" stroke="#FF5E00" strokeWidth="1.5" />
          <polygon points="52,6 60,10 52,14" fill="#FF5E00" />
          <text x="28" y="3" fill="#94A3B8" fontFamily="monospace" fontSize="8" textAnchor="middle">
            STREAM
          </text>
        </g>

        {/* Right Node: Output SVG & MapLibre Spec */}
        <g transform="translate(468, 68)">
          <rect width="144" height="195" fill="#0B0C10" stroke="#2A2E39" strokeWidth="1.2" />
          <rect width="144" height="24" fill="#121318" stroke="#2A2E39" strokeWidth="1" />
          <text x="10" y="16" fill="#F1F5F9" fontFamily="monospace" fontSize="9" fontWeight="bold">
            03 / SVG POSTER
          </text>
          {/* Mini Poster Art */}
          <rect x="24" y="38" width="96" height="122" fill="#07080A" stroke="#3E4451" strokeWidth="1" />
          <circle cx="72" cy="88" r="34" stroke="#FF5E00" strokeWidth="1.2" fill="none" />
          <path d="M 42 88 L 102 88 M 72 58 L 72 118 M 52 68 L 92 108" stroke="#94A3B8" strokeWidth="0.8" />
          <text x="72" y="146" fill="#F1F5F9" fontFamily="monospace" fontSize="8" textAnchor="middle" letterSpacing="2">
            TOKYO // JP
          </text>
          <text x="72" y="182" fill="#FF5E00" fontFamily="monospace" fontSize="8" textAnchor="middle">
            1.8 MB OPTIMIZED
          </text>
        </g>

        {/* Footer Telemetry Bar */}
        <line x1="20" y1="296" x2="620" y2="296" stroke="#2A2E39" strokeWidth="1" />
        <text x="20" y="316" fill="#94A3B8" fontFamily="monospace" fontSize="9">
          RUNTIME: V8 ISOLATE (68MB RAM) // ZERO CHROMIUM DEPENDENCY
        </text>
        <text x="620" y="316" fill="#F1F5F9" fontFamily="monospace" fontSize="9" textAnchor="end">
          THROUGHPUT: +1,450%
        </text>
      </svg>
    );
  }

  if (type === 'onnx-pipeline') {
    return (
      <svg
        viewBox="0 0 640 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-auto bg-icee-darker border border-icee-border ${className}`}
        role="img"
        aria-label="Quantized ONNX and Faster-Whisper INT8 Inference Mesh Schematic"
      >
        <rect width="640" height="340" fill="#07080A" />
        <line x1="20" y1="36" x2="620" y2="36" stroke="#2A2E39" strokeWidth="1" />
        <text x="20" y="26" fill="#94A3B8" fontFamily="monospace" fontSize="10" letterSpacing="2">
          FIG 02.B // HMAC GATEWAY &amp; INT8 QUANTIZED TENSOR WORKER MESH
        </text>
        <text x="620" y="26" fill="#FF5E00" fontFamily="monospace" fontSize="10" textAnchor="end">
          INT8 AVX-512
        </text>

        {/* Ingress Node */}
        <g transform="translate(24, 72)">
          <rect width="145" height="190" fill="#0B0C10" stroke="#2A2E39" strokeWidth="1.2" />
          <rect width="145" height="24" fill="#121318" />
          <text x="10" y="16" fill="#F1F5F9" fontFamily="monospace" fontSize="9" fontWeight="bold">
            EDGE INGRESS
          </text>
          <text x="14" y="54" fill="#FF5E00" fontFamily="monospace" fontSize="9">
            HMAC-SHA256
          </text>
          <text x="14" y="72" fill="#94A3B8" fontFamily="monospace" fontSize="8">
            X-Timestamp Window
          </text>
          <rect x="14" y="90" width="117" height="44" fill="#121318" stroke="#3E4451" />
          <text x="72" y="110" fill="#F1F5F9" fontFamily="monospace" fontSize="8" textAnchor="middle">
            NONCE VERIFIED
          </text>
          <text x="72" y="124" fill="#FF5E00" fontFamily="monospace" fontSize="8" textAnchor="middle">
            0.4ms OVERHEAD
          </text>
          <text x="14" y="172" fill="#94A3B8" fontFamily="monospace" fontSize="8">
            VERCEL NODE GATEWAY
          </text>
        </g>

        {/* Connector */}
        <line x1="169" y1="167" x2="228" y2="120" stroke="#FF5E00" strokeWidth="1.5" />
        <line x1="169" y1="167" x2="228" y2="215" stroke="#94A3B8" strokeWidth="1.5" />

        {/* Dual Worker Nodes */}
        <g transform="translate(228, 68)">
          <rect width="195" height="88" fill="#0B0C10" stroke="#FF5E00" strokeWidth="1.2" />
          <text x="12" y="22" fill="#FF5E00" fontFamily="monospace" fontSize="9" fontWeight="bold">
            WORKER A // RMBG-1.4 ONNX
          </text>
          <text x="12" y="42" fill="#F1F5F9" fontFamily="monospace" fontSize="8">
            Quantized Vision Segmentation
          </text>
          <text x="12" y="60" fill="#94A3B8" fontFamily="monospace" fontSize="8">
            FP32 (3.8GB) -&gt; INT8 (940MB)
          </text>
          <text x="12" y="76" fill="#FF5E00" fontFamily="monospace" fontSize="8">
            LATENCY: 680ms / 1080p
          </text>
        </g>

        <g transform="translate(228, 174)">
          <rect width="195" height="88" fill="#0B0C10" stroke="#3E4451" strokeWidth="1.2" />
          <text x="12" y="22" fill="#F1F5F9" fontFamily="monospace" fontSize="9" fontWeight="bold">
            WORKER B // FASTER-WHISPER
          </text>
          <text x="12" y="42" fill="#94A3B8" fontFamily="monospace" fontSize="8">
            CTranslate2 INT8 Acoustic Decoder
          </text>
          <text x="12" y="60" fill="#94A3B8" fontFamily="monospace" fontSize="8">
            Pinned OpenMP Intra-Op Threads
          </text>
          <text x="12" y="76" fill="#FF5E00" fontFamily="monospace" fontSize="8">
            SPEED: 4.2s per 60s Audio
          </text>
        </g>

        {/* Output Node */}
        <line x1="423" y1="112" x2="472" y2="165" stroke="#FF5E00" strokeWidth="1.5" />
        <line x1="423" y1="218" x2="472" y2="165" stroke="#94A3B8" strokeWidth="1.5" />

        <g transform="translate(472, 72)">
          <rect width="144" height="190" fill="#0B0C10" stroke="#2A2E39" strokeWidth="1.2" />
          <rect width="144" height="24" fill="#121318" />
          <text x="10" y="16" fill="#F1F5F9" fontFamily="monospace" fontSize="9" fontWeight="bold">
            STREAM EGRESS
          </text>
          {/* Waveform & Alpha Grid */}
          <line x1="20" y1="85" x2="124" y2="85" stroke="#2A2E39" />
          <path
            d="M 20 85 L 35 60 L 48 110 L 62 50 L 76 115 L 90 68 L 105 95 L 124 85"
            stroke="#FF5E00"
            strokeWidth="1.5"
            fill="none"
          />
          <text x="72" y="145" fill="#F1F5F9" fontFamily="monospace" fontSize="8" textAnchor="middle">
            ALPHA PNG + JSON
          </text>
          <text x="72" y="172" fill="#94A3B8" fontFamily="monospace" fontSize="8" textAnchor="middle">
            ZERO GPU COST
          </text>
        </g>

        <line x1="20" y1="296" x2="620" y2="296" stroke="#2A2E39" strokeWidth="1" />
        <text x="20" y="316" fill="#94A3B8" fontFamily="monospace" fontSize="9">
          MEMORY SAVED: -75.2% // CPU THREAD PINNING: ACTIVE
        </text>
        <text x="620" y="316" fill="#F1F5F9" fontFamily="monospace" fontSize="9" textAnchor="end">
          4.4X THROUGHPUT
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 640 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-auto bg-icee-darker border border-icee-border ${className}`}
      role="img"
      aria-label="ExML and GoldAlgo ZeroMQ Quantitative Execution Bridge Schematic"
    >
      <rect width="640" height="340" fill="#07080A" />
      <line x1="20" y1="36" x2="620" y2="36" stroke="#2A2E39" strokeWidth="1" />
      <text x="20" y="26" fill="#94A3B8" fontFamily="monospace" fontSize="10" letterSpacing="2">
        FIG 03.C // LOCK-FREE ZEROMQ IPC &amp; XAUUSD RISK PARITY KERNEL
      </text>
      <text x="620" y="26" fill="#FF5E00" fontFamily="monospace" fontSize="10" textAnchor="end">
        1.2MS TICK-TO-ORDER
      </text>

      {/* Tick Feed */}
      <g transform="translate(24, 72)">
        <rect width="155" height="190" fill="#0B0C10" stroke="#2A2E39" strokeWidth="1.2" />
        <rect width="155" height="24" fill="#121318" />
        <text x="10" y="16" fill="#F1F5F9" fontFamily="monospace" fontSize="9" fontWeight="bold">
          MT5 L1/L2 TICK FEED
        </text>
        <text x="12" y="52" fill="#94A3B8" fontFamily="monospace" fontSize="8">
          XAUUSD BID/ASK STREAM
        </text>
        {/* Order book bars */}
        <rect x="12" y="68" width="95" height="8" fill="#FF5E00" opacity="0.85" />
        <rect x="12" y="82" width="72" height="8" fill="#FF5E00" opacity="0.55" />
        <rect x="12" y="96" width="118" height="8" fill="#3E4451" />
        <rect x="12" y="110" width="84" height="8" fill="#3E4451" />
        <text x="12" y="146" fill="#F1F5F9" fontFamily="monospace" fontSize="8">
          C++ DLL Zero-Copy Struct
        </text>
        <text x="12" y="172" fill="#FF5E00" fontFamily="monospace" fontSize="8">
          ZMQ PUB // TCP LOOPBACK
        </text>
      </g>

      {/* Bidirectional ZMQ Bus */}
      <g transform="translate(179, 145)">
        <line x1="0" y1="8" x2="65" y2="8" stroke="#FF5E00" strokeWidth="1.8" />
        <polygon points="65,4 73,8 65,12" fill="#FF5E00" />
        <line x1="73" y1="28" x2="8" y2="28" stroke="#94A3B8" strokeWidth="1.2" strokeDasharray="3 3" />
        <polygon points="8,24 0,28 8,32" fill="#94A3B8" />
        <text x="36" y="0" fill="#FF5E00" fontFamily="monospace" fontSize="8" textAnchor="middle">
          0.15ms IPC
        </text>
      </g>

      {/* ExML Inference Ring Buffer */}
      <g transform="translate(252, 72)">
        <rect width="175" height="190" fill="#0B0C10" stroke="#FF5E00" strokeWidth="1.2" />
        <rect width="175" height="24" fill="#FF5E00" />
        <text x="10" y="16" fill="#07080A" fontFamily="monospace" fontSize="9" fontWeight="bold">
          EX-ML SIGNAL ENGINE
        </text>
        <circle cx="87" cy="95" r="42" stroke="#2A2E39" strokeWidth="6" fill="none" />
        <path d="M 87 53 A 42 42 0 1 1 48 112" stroke="#FF5E00" strokeWidth="6" fill="none" />
        <text x="87" y="93" fill="#F1F5F9" fontFamily="monospace" fontSize="10" fontWeight="bold" textAnchor="middle">
          4.1ms
        </text>
        <text x="87" y="106" fill="#94A3B8" fontFamily="monospace" fontSize="7" textAnchor="middle">
          ONNX TENSOR
        </text>
        <text x="87" y="172" fill="#F1F5F9" fontFamily="monospace" fontSize="8" textAnchor="middle">
          50,000 OPS/SEC BATCH
        </text>
      </g>

      {/* Arrow to Risk Gate */}
      <g transform="translate(427, 155)">
        <line x1="0" y1="10" x2="36" y2="10" stroke="#FF5E00" strokeWidth="1.5" />
        <polygon points="36,6 44,10 36,14" fill="#FF5E00" />
      </g>

      {/* Risk Parity & Circuit Breaker */}
      <g transform="translate(471, 72)">
        <rect width="145" height="190" fill="#0B0C10" stroke="#2A2E39" strokeWidth="1.2" />
        <rect width="145" height="24" fill="#121318" />
        <text x="10" y="16" fill="#F1F5F9" fontFamily="monospace" fontSize="9" fontWeight="bold">
          RISK CIRCUIT GATE
        </text>
        <text x="12" y="54" fill="#94A3B8" fontFamily="monospace" fontSize="8">
          MAX DD BRAKE: &lt; 4.8%
        </text>
        <text x="12" y="74" fill="#FF5E00" fontFamily="monospace" fontSize="9" fontWeight="bold">
          SHARPE: 3.14
        </text>
        <polyline
          points="14,135 36,125 58,128 80,108 102,112 130,84"
          stroke="#FF5E00"
          strokeWidth="2"
          fill="none"
        />
        <text x="12" y="172" fill="#F1F5F9" fontFamily="monospace" fontSize="8">
          NATIVE LOT SIZING
        </text>
      </g>

      <line x1="20" y1="296" x2="620" y2="296" stroke="#2A2E39" strokeWidth="1" />
      <text x="20" y="316" fill="#94A3B8" fontFamily="monospace" fontSize="9">
        SLIPPAGE REDUCTION: -99.1% VS REST POLLING
      </text>
      <text x="620" y="316" fill="#F1F5F9" fontFamily="monospace" fontSize="9" textAnchor="end">
        CLASSIFIED // INTERNAL
      </text>
    </svg>
  );
};
