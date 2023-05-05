import Summary from '../models/Summary.js';

export const getSummary = async(req, res) => {
    const year = req.query.year;

    try {
        const summaries = await Summary.find({
            user: req.user.id,
            date: {
                $gte: new Date(year, 0),
                $lt: new Date(parseInt(year) + 1, 0),
            }
        });

        res.status(200).json(summaries);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getSummaryById = async(req, res) => {
    const id = req.params.id;

    try {
        const summary = await Summary.findById(id);

        if (summary.user != req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        res.status(200).json(summary);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// TODO do some date error checking
export const createSummary = async(req, res) => {
    const categories = req.body.categories;
    const year = req.body.year;
    const month = req.body.month;

    const summary = new Summary({
        user: req.user.id,
        categories: categories,
        date: new Date(year, month-1)
    });
    
    try {
        await summary.save();
        res.status(200).json({ message: "success" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};