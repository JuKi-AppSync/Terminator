// Git-Sync direkt im Browser via isomorphic-git.
// Das Repo lebt in einem virtuellen Dateisystem (LightningFS -> IndexedDB),
// nicht auf der echten Festplatte - das ist die Browser-Entsprechung zum
// lokalen Ordner im Python-Ansatz.

import LightningFS from "@isomorphic-git/lightning-fs";
import git from "isomorphic-git";
import http from "isomorphic-git/http/web";
import { getConfig, authCallback } from "./config.js";

const fs = new LightningFS("terminsync-fs");
export const pfs = fs.promises;
export const REPO_DIR = "/repo";

async function repoExists() {
  try {
    await pfs.stat(`${REPO_DIR}/.git`);
    return true;
  } catch {
    return false;
  }
}

export async function pullOnStartup(onProgress = () => {}) {
  const { remoteUrl, corsProxy } = getConfig();
  if (!remoteUrl) return { ok: false, reason: "Keine Repo-URL konfiguriert." };

  try {
    if (!(await repoExists())) {
      onProgress("Klone Repo ...");
      await git.clone({
        fs, http, dir: REPO_DIR, url: remoteUrl, corsProxy,
        onAuth: authCallback(), singleBranch: true, depth: 1,
      });
    } else {
      onProgress("Hole neueste Änderungen ...");
      await git.pull({
        fs, http, dir: REPO_DIR, corsProxy, onAuth: authCallback(),
        author: { name: "terminsync", email: "terminsync@local" },
        singleBranch: true,
      });
    }
    return { ok: true };
  } catch (e) {
    console.error("Pull fehlgeschlagen:", e);
    return { ok: false, reason: String(e) };
  }
}

export async function pushChanges(commitMessage, authorName) {
  const { remoteUrl, corsProxy } = getConfig();
  if (!remoteUrl) return { ok: false, reason: "Keine Repo-URL konfiguriert." };

  try {
    await git.add({ fs, dir: REPO_DIR, filepath: "." });
    const statusMatrix = await git.statusMatrix({ fs, dir: REPO_DIR });
    const hasChanges = statusMatrix.some(([, head, workdir, stage]) => head !== 1 || workdir !== 1 || stage !== 1);

    if (!hasChanges) {
      return { ok: true, reason: "Keine Änderungen vorhanden." };
    }

    await git.commit({
      fs, dir: REPO_DIR, message: commitMessage,
      author: { name: authorName || "terminsync", email: `${authorName || "terminsync"}@local` },
    });
    await git.push({ fs, http, dir: REPO_DIR, corsProxy, onAuth: authCallback() });
    return { ok: true };
  } catch (e) {
    console.error("Push fehlgeschlagen:", e);
    return { ok: false, reason: String(e) };
  }
}

export async function listFiles(subdir) {
  try {
    return await pfs.readdir(`${REPO_DIR}/${subdir}`);
  } catch {
    return [];
  }
}

export async function readFile(path) {
  try {
    const data = await pfs.readFile(`${REPO_DIR}/${path}`, "utf8");
    return data;
  } catch {
    return null;
  }
}

export async function writeFile(path, content) {
  const fullPath = `${REPO_DIR}/${path}`;
  const dir = fullPath.substring(0, fullPath.lastIndexOf("/"));
  await mkdirp(dir);
  await pfs.writeFile(fullPath, content, "utf8");
}

async function mkdirp(dir) {
  const parts = dir.split("/").filter(Boolean);
  let current = "";
  for (const part of parts) {
    current += `/${part}`;
    try {
      await pfs.mkdir(current);
    } catch {
      // existiert schon - ok
    }
  }
}
