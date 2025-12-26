async function apiFetch(url: string, options = {}) {
    const res = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include', // Include cookies in requests
        ...options,
    });
    if (!res.ok) throw new Error("API Error");
    return res.json();
}

export async function adminLogin(email: string, password: string) {
    return apiFetch("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
}

export async function getAdminPrograms() {
    return apiFetch("/api/admin/programs");
}

export async function getProgram(id: string) {
    return apiFetch(`/api/admin/programs/${id}`);
}

export async function createProgram(data: any) {
    return apiFetch("/api/admin/programs", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function updateProgram(id: string, data: any) {
    return apiFetch(`/api/admin/programs/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

export async function deleteProgram(id: string) {
    return apiFetch(`/api/admin/programs/${id}`, {
        method: "DELETE",
    });
}

export async function getProgramStudents(id: string) {
    return apiFetch(`/api/admin/programs/${id}/students`);
}

export async function deleteStudent(id: string) {
    return apiFetch(`/api/admin/students/${id}`, {
        method: "DELETE",
    });
}