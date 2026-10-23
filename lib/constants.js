export const CATEGORIES = [
  { name: "Mess & Food", icon: "utensils", description: "Dining halls, canteens and food facilities for students." },
  { name: "Library", icon: "book", description: "Reading rooms, study spaces and book borrowing." },
  { name: "Medical Support", icon: "heart", description: "Health room, first aid and medical assistance." },
  { name: "Transport", icon: "bus", description: "College buses, shuttles and travel help." },
  { name: "Wi-Fi & IT Support", icon: "wifi", description: "Internet access and technical help desks." },
  { name: "Admin & Help Desk", icon: "building", description: "Administration office and student help desk." },
  { name: "Laundry", icon: "shirt", description: "Washing, ironing and laundry services." },
  { name: "Stationery Shop", icon: "pencil", description: "Books, notes, printing and stationery." },
  { name: "Sports Facilities", icon: "trophy", description: "Grounds, courts and sports equipment." },
  { name: "Hostel Facilities", icon: "home", description: "Hostel office, rooms and common facilities." },
];

export const LOCATIONS = ["Campus", "Hostel"];

export function categoryIcon(name) {
  const found = CATEGORIES.find((c) => c.name === name);
  return found ? found.icon : "map-pin";
}