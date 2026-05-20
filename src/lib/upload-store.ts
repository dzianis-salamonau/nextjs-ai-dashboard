import {
  mkdir,
  readdir,
  readFile,
  stat,
  unlink,
  writeFile,
} from "fs/promises";
import path from "path";

export type StoredFile = {
  id: string;
  name: string;
  size: number;
  url: string;
  uploadedAt: string;
};

export const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const METADATA_PATH = path.join(UPLOAD_DIR, ".metadata.json");
export const ALLOWED_EXTENSIONS = [".txt", ".md", ".json", ".csv"];
const UUID_FILENAME =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function storageFileName(id: string, ext: string) {
  return `${id}${ext}`;
}

function usesStorageFileNameAsDisplayName(
  file: StoredFile,
  diskFilename: string
) {
  const ext = path.extname(diskFilename).toLowerCase();
  return (
    file.name === diskFilename || file.name === storageFileName(file.id, ext)
  );
}

function friendlyRecoveredName(ext: string) {
  const label = ext.replace(".", "").toUpperCase() || "file";
  return `Untitled document.${label.toLowerCase()}`;
}

async function readStore(): Promise<Map<string, StoredFile>> {
  try {
    const raw = await readFile(METADATA_PATH, "utf8");
    const files = JSON.parse(raw) as StoredFile[];
    return new Map(files.map((file) => [file.id, file]));
  } catch {
    return new Map();
  }
}

async function writeStore(store: Map<string, StoredFile>) {
  await mkdir(UPLOAD_DIR, { recursive: true });
  const files = Array.from(store.values());
  await writeFile(METADATA_PATH, JSON.stringify(files, null, 2), "utf8");
}

async function reconcileWithDisk(store: Map<string, StoredFile>) {
  let changed = false;

  try {
    const entries = await readdir(UPLOAD_DIR);
    for (const entry of entries) {
      if (entry.startsWith(".")) continue;

      const ext = path.extname(entry).toLowerCase();
      if (!ALLOWED_EXTENSIONS.includes(ext)) continue;

      const id = entry.slice(0, -ext.length);
      if (!UUID_FILENAME.test(id) || store.has(id)) continue;

      const filePath = path.join(UPLOAD_DIR, entry);
      const fileStat = await stat(filePath);
      if (!fileStat.isFile()) continue;

      store.set(id, {
        id,
        name: friendlyRecoveredName(ext),
        size: fileStat.size,
        url: `/uploads/${entry}`,
        uploadedAt: fileStat.mtime.toISOString(),
      });
      changed = true;
    }
  } catch {
    /* uploads dir may not exist yet */
  }

  for (const [id, file] of store) {
    const filename = path.basename(file.url);
    const filePath = path.join(UPLOAD_DIR, filename);
    try {
      const fileStat = await stat(filePath);
      if (file.size !== fileStat.size) {
        file.size = fileStat.size;
        changed = true;
      }
      if (usesStorageFileNameAsDisplayName(file, filename)) {
        file.name = friendlyRecoveredName(path.extname(filename).toLowerCase());
        changed = true;
      }
    } catch {
      store.delete(id);
      changed = true;
    }
  }

  if (changed) {
    await writeStore(store);
  }
}

export async function addFile(file: StoredFile) {
  const store = await readStore();
  store.set(file.id, file);
  await writeStore(store);
}

export async function getFile(id: string) {
  const store = await readStore();
  return store.get(id);
}

export async function removeFile(id: string) {
  const store = await readStore();
  const removed = store.delete(id);
  if (removed) {
    await writeStore(store);
  }
  return removed;
}

export async function listFiles() {
  const store = await readStore();
  await reconcileWithDisk(store);
  return Array.from(store.values()).sort(
    (a, b) =>
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
  );
}

export async function deleteFileOnDisk(url: string) {
  const filename = path.basename(url);
  try {
    await unlink(path.join(UPLOAD_DIR, filename));
  } catch {
    /* file may already be gone */
  }
}
