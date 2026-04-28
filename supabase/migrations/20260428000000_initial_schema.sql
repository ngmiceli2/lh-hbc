-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    role TEXT CHECK (role IN ('student', 'teacher')) DEFAULT 'student',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create classes table
CREATE TABLE IF NOT EXISTS public.classes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    teacher_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create profile_classes junction table (for students in classes)
CREATE TABLE IF NOT EXISTS public.profile_classes (
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
    PRIMARY KEY (profile_id, class_id)
);

-- Create books table
CREATE TABLE IF NOT EXISTS public.books (
    id TEXT PRIMARY KEY, -- Using Open Library ID or ISBN
    title TEXT NOT NULL,
    author TEXT,
    cover_url TEXT,
    page_count INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create reading_logs table
CREATE TABLE IF NOT EXISTS public.reading_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    book_id TEXT REFERENCES public.books(id) ON DELETE CASCADE NOT NULL,
    date DATE DEFAULT CURRENT_DATE NOT NULL,
    pages_read INTEGER NOT NULL CHECK (pages_read > 0),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reading_logs ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies (can be refined later)
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Classes are viewable by enrolled students and teachers" ON public.classes FOR SELECT USING (true); -- Simplified for MVP

CREATE POLICY "Books are viewable by everyone" ON public.books FOR SELECT USING (true);

CREATE POLICY "Users can view own reading logs" ON public.reading_logs FOR SELECT USING (auth.uid() = profile_id);
CREATE POLICY "Users can insert own reading logs" ON public.reading_logs FOR INSERT WITH CHECK (auth.uid() = profile_id);

-- Function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    COALESCE(new.raw_user_meta_data->>'role', 'student')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
