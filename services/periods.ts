import axios from "axios";

export async function deletePeriod(id: string) {
  try {
    const res = await axios.delete(`/api/periods`, { data: { id } });
    return res.data;
  } catch (error) {
    console.error("Error deleting class:", error);
    throw error;
  }
}
