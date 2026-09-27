import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { FIELDS } from "./site.js";

const CONTENT_DIR = path.join(process.cwd(), "content/projects");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const FIELD_SLUGS = new Set(FIELDS.map((f) => f.slug));

function parse(dir, file) {
  const fail = (msg) => {
    throw new Error(`content/projects/${file}: ${msg}`);
  };
  const slug = file.replace(/\.md$/, "");
  const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8"));

  if (!data.title || !data.summary) fail("title and summary are required");
  if (!Array.isArray(data.fields) || data.fields.length === 0) fail("fields must be a non-empty list");
  for (const field of data.fields) if (!FIELD_SLUGS.has(field)) fail(`unknown field "${field}"`);
  for (const key of ["tools", "highlights"]) {
    if (!Array.isArray(data[key]) || !data[key].every((x) => typeof x === "string")) fail(`${key} must be a list of strings`);
  }

  const links = data.links ?? [];
  const files = data.files ?? [];
  if (!Array.isArray(links) || !Array.isArray(files)) fail("links and files must be lists");
  for (const link of links) if (!/^https:\/\//.test(link.href ?? "")) fail(`link "${link.label}" must use https`);
  for (const f of files) {
    if (!f.href?.startsWith(`/projects/${slug}/`)) fail(`file "${f.label}" must live in /projects/${slug}/`);
    if (!fs.statSync(path.join(PUBLIC_DIR, f.href), { throwIfNoEntry: false })?.isFile()) fail(`file not found: public${f.href}`);
  }

  return {
    ...data,
    slug,
    period: data.period == null ? undefined : String(data.period),
    order: data.order ?? 999,
    featured: Boolean(data.featured),
    links,
    files,
    body: content.trim(),
  };
}

export function getAllProjects(dir = CONTENT_DIR) {
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => parse(dir, file))
    .sort((a, b) => a.order - b.order);
}

export function getProject(slug) {
  return getAllProjects().find((p) => p.slug === slug);
}
