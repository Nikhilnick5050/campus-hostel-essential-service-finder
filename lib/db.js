import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

let supabase = null;
if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

const DATA_FILE = path.join(process.cwd(), "data", "services.json");

function readLocal() {
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

function writeLocal(services) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(services, null, 2), "utf-8");
}

export function isSupabaseConfigured() {
  return Boolean(supabase);
}

export async function getServices() {
  if (supabase) {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("name", { ascending: true });
    if (error) throw error;
    return data;
  }
  return readLocal();
}

export async function getServiceById(id) {
  if (supabase) {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("id", id)
      .single();
    if (error) return null;
    return data;
  }
  const services = readLocal();
  return services.find((s) => s.id === id) || null;
}

export async function createService(service) {
  if (supabase) {
    const { data, error } = await supabase.from("services").insert(service).select().single();
    if (error) throw error;
    return data;
  }
  const services = readLocal();
  services.push(service);
  writeLocal(services);
  return service;
}

export async function updateService(id, updates) {
  if (supabase) {
    const { data, error } = await supabase
      .from("services")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
  const services = readLocal();
  const index = services.findIndex((s) => s.id === id);
  if (index === -1) return null;
  services[index] = { ...services[index], ...updates, id };
  writeLocal(services);
  return services[index];
}

export async function deleteService(id) {
  if (supabase) {
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) throw error;
    return true;
  }
  const services = readLocal();
  const next = services.filter((s) => s.id !== id);
  writeLocal(next);
  return true;
}

export async function getStats() {
  const services = await getServices();
  const total = services.length;
  const categories = new Set(services.map((s) => s.category)).size;
  const active = services.filter((s) => s.active !== false).length;
  return { total, categories, active };
}