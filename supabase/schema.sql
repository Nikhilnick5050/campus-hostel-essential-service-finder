-- Campus & Hostel Essential Services Finder — Supabase schema
-- Run this in the Supabase SQL editor.

create table if not exists public.services (
  id text primary key,
  name text not null,
  category text not null,
  description text default '',
  location text default '',
  area text default 'Campus',
  timings text default '',
  contact text default '',
  facilities jsonb default '[]'::jsonb,
  map_link text default '',
  active boolean default true,
  popular boolean default false,
  created_at timestamptz default now()
);

-- Optional: seed the same sample data as data/services.json
insert into public.services (id, name, category, description, location, area, timings, contact, facilities, map_link, active, popular) values
('svc-library', 'Central Library', 'Library', 'A quiet place for reading, studying and borrowing books.', 'Academic Block, Ground Floor', 'Campus', '8:00 AM – 8:00 PM (Mon–Sat)', '+91 90000 00001', '["Reading hall","Book lending","Digital catalogue","Study tables"]', 'https://www.openstreetmap.org/search?query=college%20library', true, true),
('svc-mess', 'Hostel Mess', 'Mess & Food', 'Information about food facilities for hostel students.', 'Hostel Dining Area, Block A', 'Hostel', '7:30–9:30 AM, 12:30–2:00 PM, 7:30–9:30 PM', '+91 90000 00002', '["Vegetarian meals","Weekly menu","Snacks counter","Water dispenser"]', 'https://www.openstreetmap.org/search?query=hostel%20mess', true, true),
('svc-medical', 'Medical Room', 'Medical Support', 'Campus health room for first aid, basic check-ups and emergency assistance.', 'Campus Health Room, Admin Block', 'Campus', '9:00 AM – 5:00 PM (Mon–Sat)', '+91 90000 00003', '["First aid","Rest beds","Basic medicines","Emergency contact"]', 'https://www.openstreetmap.org/search?query=medical%20room', true, true),
('svc-transport', 'College Bus Service', 'Transport', 'College buses and shuttle routes for daily commuting.', 'Main Gate, Transport Office', 'Campus', '6:30 AM – 7:00 PM', '+91 90000 00004', '["Daily routes","Bus pass","Route map","Help desk"]', 'https://www.openstreetmap.org/search?query=college%20bus%20stop', true, false),
('svc-wifi', 'Wi-Fi & IT Support', 'Wi-Fi & IT Support', 'Campus Wi-Fi access and technical help.', 'IT Cell, Computer Block', 'Campus', '9:00 AM – 6:00 PM (Mon–Sat)', '+91 90000 00005', '["Campus Wi-Fi","Password help","Device support","Software help"]', 'https://www.openstreetmap.org/search?query=it%20support', true, false),
('svc-admin', 'Administration Office', 'Admin & Help Desk', 'Student help desk for admissions, documents and certificates.', 'Admin Block, 1st Floor', 'Campus', '10:00 AM – 4:00 PM (Mon–Fri)', '+91 90000 00006', '["Document help","Certificates","Fee queries","General help"]', 'https://www.openstreetmap.org/search?query=administration%20office', true, false),
('svc-laundry', 'Laundry Service', 'Laundry', 'Washing, drying and ironing service for hostel students.', 'Hostel Block B, Ground Floor', 'Hostel', '8:00 AM – 8:00 PM', '+91 90000 00007', '["Washing","Drying","Ironing","Pickup & drop"]', 'https://www.openstreetmap.org/search?query=laundry', true, false),
('svc-stationery', 'Stationery Shop', 'Stationery Shop', 'Books, notebooks, pens, printing and photocopy services.', 'Near Main Gate, Shop Row', 'Campus', '9:00 AM – 7:00 PM (Mon–Sat)', '+91 90000 00008', '["Stationery","Printing","Photocopy","Notebooks"]', 'https://www.openstreetmap.org/search?query=stationery%20shop', true, false),
('svc-sports', 'Sports Complex', 'Sports Facilities', 'Grounds, courts and equipment for various sports.', 'Sports Ground, East Campus', 'Campus', '6:00 AM – 8:00 AM & 4:00 PM – 7:00 PM', '+91 90000 00009', '["Cricket ground","Football field","Badminton court","Equipment room"]', 'https://www.openstreetmap.org/search?query=sports%20complex', true, false),
('svc-hostel-office', 'Hostel Office', 'Hostel Facilities', 'Hostel administration for room allotment and maintenance.', 'Hostel Block A, Ground Floor', 'Hostel', '9:00 AM – 6:00 PM (Mon–Sat)', '+91 90000 00010', '["Room allotment","Maintenance","Complaints","Visitor help"]', 'https://www.openstreetmap.org/search?query=hostel%20office', true, false),
('svc-canteen', 'Campus Canteen', 'Mess & Food', 'Snacks, beverages and quick meals for students.', 'Student Centre, Ground Floor', 'Campus', '8:00 AM – 8:00 PM', '+91 90000 00011', '["Snacks","Beverages","Quick meals","Sitting area"]', 'https://www.openstreetmap.org/search?query=canteen', true, false),
('svc-reading-room', 'Reading Room', 'Library', 'A silent study space with individual desks.', 'Academic Block, 2nd Floor', 'Campus', '8:00 AM – 10:00 PM', '+91 90000 00012', '["Silent study","Individual desks","Charging points","Exam hours"]', 'https://www.openstreetmap.org/search?query=reading%20room', true, false),
('svc-pharmacy', 'Campus Pharmacy', 'Medical Support', 'Basic medicines and health supplies available on campus.', 'Near Medical Room, Admin Block', 'Campus', '9:00 AM – 6:00 PM (Mon–Sat)', '+91 90000 00013', '["Basic medicines","Health supplies","First-aid kits"]', 'https://www.openstreetmap.org/search?query=pharmacy', true, false),
('svc-gym', 'Hostel Gym', 'Sports Facilities', 'A basic gym with cardio and strength equipment.', 'Hostel Block C, Ground Floor', 'Hostel', '5:30 AM – 9:00 AM & 5:00 PM – 9:00 PM', '+91 90000 00014', '["Cardio machines","Weights","Trainer (demo)","Lockers"]', 'https://www.openstreetmap.org/search?query=gym', true, false),
('svc-print-shop', 'Print & Xerox Centre', 'Stationery Shop', 'Printing, photocopying, binding and laminating services.', 'Computer Block, Ground Floor', 'Campus', '9:00 AM – 7:00 PM (Mon–Sat)', '+91 90000 00015', '["Printing","Photocopy","Binding","Lamination"]', 'https://www.openstreetmap.org/search?query=print%20shop', true, false)
on conflict (id) do nothing;