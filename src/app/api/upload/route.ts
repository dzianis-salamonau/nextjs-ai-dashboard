import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { auth } from "@/auth";
import {
  addFile,
  ALLOWED_EXTENSIONS,
  deleteFileOnDisk,
  getFile,
  listFiles,
  removeFile,
  UPLOAD_DIR,
} from "@/lib/upload-store";

export const runtime = "nodejs";

const MAX_SIZE = 5 * 1024 * 1024;

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const files = await listFiles();
  return Response.json(files);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return Response.json({ error: "No file provided" }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return Response.json({ error: "File too large" }, { status: 400 });
  }

  const ext = path.extname(file.name).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return Response.json({ error: "File type not allowed" }, { status: 400 });
  }

  await mkdir(UPLOAD_DIR, { recursive: true });

  const id = crypto.randomUUID();
  const safeName = `${id}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, safeName), buffer);

  const stored = {
    id,
    name: file.name,
    size: file.size,
    url: `/uploads/${safeName}`,
    uploadedAt: new Date().toISOString(),
  };

  await addFile(stored);
  return Response.json(stored);
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = new URL(req.url).searchParams.get("id");
  if (!id) {
    return Response.json({ error: "Missing id" }, { status: 400 });
  }

  const file = await getFile(id);
  if (file) {
    await deleteFileOnDisk(file.url);
    await removeFile(id);
  }

  return Response.json({ ok: true });
}
