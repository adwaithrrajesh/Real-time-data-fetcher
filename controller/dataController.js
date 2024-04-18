const insertData = async (req, res) => {
    try {
        const { data } = req.body;
        if (req.app.get("io")) {
            req.app.get("io").emit("newData", data); // Emit data to all connected clients
        }
        return res.status(200).json({ message: "Data received and broadcasted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports.insertData = insertData;
