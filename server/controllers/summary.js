export const getSummary = async(req, res) => {
    try {
        res.status(200).json({ message: "we did it" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getSummaryById = async(req, res) => {
    try {
        res.status(200).json(req.params);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};