import { useEffect, useState } from "react";

export type Metrics = {
  co2In: number;
  co2Out: number;
  pm25: number;
  aqi: number;
  o2: number;
  efficiency: number;
  temp: number;
  humidity: number;
};

const seed: Metrics = {
  co2In: 612, co2Out: 412, pm25: 22, aqi: 38, o2: 78, efficiency: 94, temp: 24.5, humidity: 58,
};

function jitter(v: number, amp: number, min: number, max: number) {
  const next = v + (Math.random() - 0.5) * amp;
  return Math.max(min, Math.min(max, next));
}

export function useLiveMetrics() {
  const [m, setM] = useState<Metrics>(seed);
  useEffect(() => {
    const id = setInterval(() => {
      setM((p) => ({
        co2In: jitter(p.co2In, 30, 480, 720),
        co2Out: jitter(p.co2Out, 18, 320, 460),
        pm25: jitter(p.pm25, 4, 8, 45),
        aqi: jitter(p.aqi, 6, 20, 80),
        o2: jitter(p.o2, 3, 60, 92),
        efficiency: jitter(p.efficiency, 1.2, 88, 99),
        temp: jitter(p.temp, 0.4, 22, 28),
        humidity: jitter(p.humidity, 2, 45, 70),
      }));
    }, 2000);
    return () => clearInterval(id);
  }, []);
  return m;
}
