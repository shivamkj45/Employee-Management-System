export const getHealthStatus = () => {
  return {
    success: true,
    message: "Employee Management API is running 🚀",
    timestamp: new Date().toISOString(),
  };
};