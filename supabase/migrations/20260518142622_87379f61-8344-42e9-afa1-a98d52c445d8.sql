CREATE TABLE public.sensor_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  co2_in NUMERIC NOT NULL,
  co2_out NUMERIC NOT NULL,
  aqi NUMERIC NOT NULL,
  pm25 NUMERIC NOT NULL,
  o2 NUMERIC NOT NULL,
  efficiency NUMERIC NOT NULL,
  temperature NUMERIC NOT NULL,
  humidity NUMERIC NOT NULL,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.sensor_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read sensor data"
  ON public.sensor_data FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert sensor data"
  ON public.sensor_data FOR INSERT
  WITH CHECK (true);

CREATE INDEX idx_sensor_data_recorded_at ON public.sensor_data (recorded_at DESC);