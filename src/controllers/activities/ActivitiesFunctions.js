import { ActivitiesModel } from "../../database/entities/Activities.js";

export const createActivity = async (req, res) => {
  try {
    const activity = new ActivitiesModel(req.body);
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getActivities = async (req, res) => {
  try {
    const activities = await ActivitiesModel.find();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getActivityById = async (req, res) => {
  try {
    const activity = await ActivitiesModel.findById(req.params.id);
    if (!activity) return res.status(404).json({ message: "Activity not found" });
    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateActivity = async (req, res) => {
  try {
    const activity = await ActivitiesModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } 
    );
    if (!activity) return res.status(404).json({ message: "Activity not found" });
    res.json(activity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteActivity = async (req, res) => {
  try {
    const activity = await ActivitiesModel.findByIdAndDelete(req.params.id);
    if (!activity) return res.status(404).json({ message: "Activity not found" });
    res.json({ message: "Activity deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
