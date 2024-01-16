export async function readClass(classId: string | string[]) {
  try {
    const res = await fetch(`/api/classes/${classId}`);
    const res_data = await res.json();
    return res_data;
  } catch (error) {
    console.error("Error fetching classes:", error);
  }
}
