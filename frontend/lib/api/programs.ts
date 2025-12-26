const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

async function apiFetch(url: string, options = {}) {
  const res = await fetch(BASE_URL + url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error("API Error");
  return res.json();
}

export async function getPrograms() {
  return apiFetch("/api/programs");
}

export async function getProgramBySlug(slug: string) {
  const res = await fetch(`${BASE_URL}/api/program/${slug}`, {
    headers: { "Content-Type": "application/json" },
    cache: 'no-store',
  });
  
  if (res.status === 404) {
    return null;
  }
  
  if (!res.ok) {
    throw new Error("API Error");
  }
  
  return res.json();
}

export async function submitStudentForm(data: any) {
  return apiFetch("/api/student/submit", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getCertificateStatus(programId: string, studentId: string) {
  return apiFetch(`/api/certificate/status?programId=${programId}&studentId=${studentId}`);
}