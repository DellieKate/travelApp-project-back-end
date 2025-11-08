export const errorHandler = (error, request, response, next) => {
    const status = error.status || 500;
    const message = error.message || "Error occurred.";
    response.status(status).json ({ message });
};