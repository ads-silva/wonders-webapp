export const formatDateShort = (dateString?: string | null) => {
  if (dateString) {
    const date = new Date(dateString).toLocaleDateString("pt-PT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return date;
  }
  return "";
};
