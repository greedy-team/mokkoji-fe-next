const DRAFT_PREFIX = 'mokkoji-draft:';

export interface SerializedFile {
  name: string;
  type: string;
  dataUrl: string;
}

function storageKey(key: string): string {
  return `${DRAFT_PREFIX}${key}`;
}

export function readDraft<T>(key: string): T | null {
  try {
    const stored = sessionStorage.getItem(storageKey(key));
    return stored ? (JSON.parse(stored) as T) : null;
  } catch {
    return null;
  }
}

export function writeDraft(key: string, value: unknown): boolean {
  try {
    sessionStorage.setItem(storageKey(key), JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function clearDraft(key: string): void {
  try {
    sessionStorage.removeItem(storageKey(key));
  } catch {
    /* empty */
  }
}

export function serializeFile(file: File): Promise<SerializedFile> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      resolve({
        name: file.name,
        type: file.type,
        dataUrl: reader.result as string,
      });
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function deserializeFile(serialized: SerializedFile): File {
  const base64 = serialized.dataUrl.slice(serialized.dataUrl.indexOf(',') + 1);
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return new File([bytes], serialized.name, { type: serialized.type });
}
