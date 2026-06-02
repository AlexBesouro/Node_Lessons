function getStatus(req, res) {
    const currentEnv = req.app.get("env");
    return res.json({
        status: "ok",
        message: "Server is working fine!",
        environement: currentEnv,
        timestamp: new Date(),
    });
}
export { getStatus };
