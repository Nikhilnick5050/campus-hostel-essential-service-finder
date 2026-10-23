import { NextResponse } from "next/server";
import { getServices, createService } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").toLowerCase().trim();
  const category = searchParams.get("category") || "";
  const area = searchParams.get("area") || "";

  let services = await getServices();

  if (q) {
    services = services.filter((s) =>
      [s.name, s.category, s.description, s.location, s.facilities?.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }
  if (category) {
    services = services.filter((s) => s.category === category);
  }
  if (area) {
    services = services.filter((s) => s.area === area);
  }

  return NextResponse.json({ services });
}

export async function POST(request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const id = "svc-" + Date.now().toString(36);
    const service = {
      id,
      name: body.name,
      category: body.category,
      description: body.description || "",
      location: body.location || "",
      area: body.area || "Campus",
      timings: body.timings || "",
      contact: body.contact || "",
      facilities: Array.isArray(body.facilities) ? body.facilities : [],
      mapLink: body.mapLink || "",
      active: body.active !== false,
      popular: Boolean(body.popular),
    };
    const created = await createService(service);
    return NextResponse.json({ service: created }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}