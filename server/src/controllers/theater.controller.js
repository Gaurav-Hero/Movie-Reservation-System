import Theater from "../models/theater.model.js";

export const addTheater = async (req, res) => {
    try {
        console.log("Theater body : ",req.body)
        const theater = new Theater(req.body)
        await theater.save()
        res.status(201).json(theater);
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

export const listAllTheater = async (req, res) => {
    try {
        const allTheaters = await Theater.find()
        res.status(201).json(allTheaters)
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

export const listSingleTheater = async(req , res) => {
    try {
        const theaterDetails = await Theater.findById(req.params.id)
        if(!theaterDetails) res.status(404).json({msg: "Theater not found"})
        res.status(201).json(theaterDetails);
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

export const updateTheater = async(req, res) => {
    try {
        const theaterDetails = await Theater.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!theaterDetails) res.status(404).json({msg: "theater not found"})
        res.status(200).json(theaterDetails);
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

export const deleteTheater = async(req , res) => {
    try {
        const theaterDetails = await Theater.findByIdAndDelete(req.params.id)
        if(!theaterDetails) res.status(404).json({msg: "Theater not found"})
        res.status(201).json({msg: "Theater deleted successfully !"});
    } catch (error) {
        res.status(500).json({msg: error})
    }
}
