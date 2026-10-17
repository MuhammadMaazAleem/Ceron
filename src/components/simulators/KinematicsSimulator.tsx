import React, { useState, useEffect, useRef } from 'react';
import { soundEngine } from '../../services/soundEngine';
import { Play, Pause, RotateCcw, Activity } from 'lucide-react';

export const KinematicsSimulator: React.FC = () => {
  const [acceleration, setAcceleration] = useState<number>(2); // m/s^2
  const [initialVelocity, setInitialVelocity] = useState<number>(0); // m/s
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0); // seconds
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Computed values
  const currentVelocity = initialVelocity + acceleration * time; // vf = vi + at
  const distance = initialVelocity * time + 0.5 * acceleration * time * time; // S = vi*t + 1/2*a*t^2

  // Animation loop
  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => {
          if (prev >= 10) {
            setIsRunning(false);
            return 10;
          }
          return Number((prev + 0.1).toFixed(1));
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Render Velocity-Time Graph on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Background Grid
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;
    for (let x = 30; x < width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 10);
      ctx.lineTo(x, height - 25);
      ctx.stroke();
    }
    for (let y = 15; y < height - 25; y += 25) {
      ctx.beginPath();
      ctx.moveTo(30, y);
      ctx.lineTo(width - 10, y);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(30, 10);
    ctx.lineTo(30, height - 25); // Y axis (Velocity)
    ctx.lineTo(width - 10, height - 25); // X axis (Time)
    ctx.stroke();

    // Labels
    ctx.fillStyle = '#64748B';
    ctx.font = '10px Outfit, sans-serif';
    ctx.fillText('v (m/s)', 5, 20);
    ctx.fillText('t (s)', width - 25, height - 10);
    ctx.fillText('0', 20, height - 12);
    ctx.fillText('10s', width - 35, height - 12);

    // Dynamic Plot Line: v = vi + a*t
    const originX = 30;
    const originY = height - 25;
    const scaleX = (width - 40) / 10; // 10 seconds max
    const scaleY = (height - 40) / 30; // 30 m/s max

    // Shaded Area (Displacement S)
    if (time > 0) {
      ctx.fillStyle = 'rgba(139, 92, 246, 0.15)';
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(originX, originY - initialVelocity * scaleY);
      ctx.lineTo(originX + time * scaleX, originY - currentVelocity * scaleY);
      ctx.lineTo(originX + time * scaleX, originY);
      ctx.closePath();
      ctx.fill();
    }

    // Slope line
    ctx.strokeStyle = '#8B5CF6';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(originX, originY - initialVelocity * scaleY);
    ctx.lineTo(originX + time * scaleX, originY - currentVelocity * scaleY);
    ctx.stroke();

    // Point head
    ctx.fillStyle = '#F59E0B';
    ctx.beginPath();
    ctx.arc(originX + time * scaleX, originY - currentVelocity * scaleY, 5, 0, Math.PI * 2);
    ctx.fill();
  }, [time, initialVelocity, acceleration, currentVelocity]);

  const toggleRun = () => {
    setIsRunning(!isRunning);
    soundEngine.playPop();
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    soundEngine.playPop();
  };

  return (
    <div className="pearl-card p-5 my-4" style={{ background: 'linear-gradient(135deg, #FAF5FF 0%, #F8FAFC 100%)' }}>
      <div className="flex items-center justify-between mb-3">
        <span className="pearl-pill text-xs" style={{ background: '#FFFFFF', color: '#8B5CF6' }}>
          <Activity size={14} /> BISE Swat Physics Simulator
        </span>
        <span className="text-xs font-semibold text-slate-500">Class 9/10 Kinematics</span>
      </div>

      <h4 className="text-lg font-bold text-slate-800 text-center">
        Velocity-Time Graph & Motion Sandbox
      </h4>
      <p className="text-xs text-center text-slate-500 mb-3">
        Slope = Acceleration (a), Shaded Area = Distance Traveled (S)
      </p>

      {/* Simulated Road View */}
      <div className="relative w-full h-16 bg-slate-800 rounded-2xl overflow-hidden mb-3 flex items-center px-4 border border-slate-700 shadow-inner">
        {/* Road line */}
        <div className="absolute w-full h-1 border-t-2 border-dashed border-amber-400 opacity-60" />

        {/* Car Icon */}
        <div
          className="relative z-10 transition-transform duration-75 text-2xl"
          style={{
            transform: `translateX(${Math.min(230, distance * 2.2)}px)`,
          }}
        >
          🏎️
        </div>
      </div>

      {/* Canvas Velocity-Time Graph */}
      <div className="flex justify-center mb-3">
        <canvas
          ref={canvasRef}
          width={320}
          height={160}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm"
        />
      </div>

      {/* Real-time Telemetry Dashboard */}
      <div className="grid grid-cols-3 gap-2 mb-4 text-center">
        <div className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-sm">
          <div className="text-[10px] text-slate-400 font-bold uppercase">Time (t)</div>
          <div className="text-base font-extrabold text-slate-800">{time.toFixed(1)} s</div>
        </div>
        <div className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-sm">
          <div className="text-[10px] text-purple-600 font-bold uppercase">Velocity (vf)</div>
          <div className="text-base font-extrabold text-purple-700">{currentVelocity.toFixed(1)} m/s</div>
        </div>
        <div className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-sm">
          <div className="text-[10px] text-amber-600 font-bold uppercase">Distance (S)</div>
          <div className="text-base font-extrabold text-amber-700">{distance.toFixed(1)} m</div>
        </div>
      </div>

      {/* Sliders */}
      <div className="space-y-3 bg-white/70 p-3 rounded-2xl border border-slate-200 mb-4">
        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
            <span>Acceleration (a):</span>
            <span className="text-purple-600 font-bold">{acceleration} m/s²</span>
          </div>
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            disabled={isRunning}
            value={acceleration}
            onChange={(e) => setAcceleration(Number(e.target.value))}
            className="w-full accent-purple-600 cursor-pointer"
          />
        </div>
        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
            <span>Initial Velocity (vi):</span>
            <span className="text-purple-600 font-bold">{initialVelocity} m/s</span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            disabled={isRunning}
            value={initialVelocity}
            onChange={(e) => setInitialVelocity(Number(e.target.value))}
            className="w-full accent-purple-600 cursor-pointer"
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3">
        <button
          onClick={toggleRun}
          className={`pearl-btn py-2 px-5 text-sm ${isRunning ? 'bg-amber-500 text-white' : 'pearl-btn-lavender'}`}
        >
          {isRunning ? <><Pause size={14} /> Pause</> : <><Play size={14} /> Start Motion (حرکت شروع)</>}
        </button>
        <button onClick={handleReset} className="pearl-btn pearl-btn-ghost py-2 px-4 text-sm">
          <RotateCcw size={14} /> Reset
        </button>
      </div>
    </div>
  );
};
