import Summary from '../models/Summary.js';

export const getSummary = async(req, res) => {
    try {
        const summaries = await Summary.find();

        res.status(200).json(summaries);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getSummaryById = async(req, res) => {
    const id = req.params.id;

    try {
        const summary = await Summary.findById(id);

        res.status(200).json(summary);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createSummary = async(req, res) => {
    const categories = req.body;

    const summary = new Summary(categories);
    try {
        await summary.save();
        res.status(200).json({ message: "success" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};