import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { getAllProjects } from "./projects.js";

test("loads all 14 projects with expected field counts", () => {
  const projects = getAllProjects();
  assert.equal(projects.length, 14);
  const count = (field) => projects.filter((p) => p.fields.includes(field)).length;
  assert.deepEqual(
    ["analog", "digital", "embedded", "research"].map(count),
    [3, 5, 6, 1],
  );
  assert.equal(projects.filter((p) => p.featured).length, 4);
});

test("rejects unknown fields and missing files", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "projects-"));
  const write = (fm) => fs.writeFileSync(path.join(dir, "bad.md"), `---\n${fm}\n---\nBody\n`);

  write("title: X\nsummary: Y\nfields: [cooking]\ntools: []\nhighlights: []");
  assert.throws(() => getAllProjects(dir), /unknown field "cooking"/);

  write("title: X\nsummary: Y\nfields: [analog]\ntools: []\nhighlights: []\nfiles:\n  - { label: Gone, href: /projects/bad/gone.pdf }");
  assert.throws(() => getAllProjects(dir), /file not found/);
});
