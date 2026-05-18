ALTER TABLE public.sensor_data REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.sensor_data;