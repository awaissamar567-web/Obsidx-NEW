type ApplicationPayload = {
  platform?: string;
  name?: string;
  contact?: string;
  audienceLocation?: string;
  followers?: string;
  engagement?: string;
  revenue?: string;
  company?: string;
};

const requiredFields: Array<keyof ApplicationPayload> = [
  "platform",
  "name",
  "contact",
  "audienceLocation",
  "followers",
  "engagement",
  "revenue",
];

export async function POST(request: Request) {
  let payload: ApplicationPayload;

  try {
    payload = (await request.json()) as ApplicationPayload;
  } catch {
    return Response.json({ message: "Please check the form and try again." }, { status: 400 });
  }

  if (payload.company) {
    return Response.json({ ok: true });
  }

  const missingField = requiredFields.find((field) => !payload[field]?.trim());
  if (missingField) {
    return Response.json({ message: "Please complete every field." }, { status: 400 });
  }

  const webhookUrl = process.env.OBSIDX_APPLICATION_WEBHOOK_URL;
  if (!webhookUrl) {
    return Response.json(
      { message: "Applications are not open yet. Please check back shortly." },
      { status: 503 },
    );
  }

  const forwarded = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      company: undefined,
      submittedAt: new Date().toISOString(),
      source: "obsidx-website",
    }),
    cache: "no-store",
  });

  if (!forwarded.ok) {
    return Response.json(
      { message: "The application could not be sent. Please try again." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
