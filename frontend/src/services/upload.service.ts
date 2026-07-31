import api from "../api/axios";

export const uploadProfileImage = async (
  id: string,
  file: File
) => {
  const formData = new FormData();

  formData.append("image", file);

  const response = await api.post(
    `/employees/${id}/profile-image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};