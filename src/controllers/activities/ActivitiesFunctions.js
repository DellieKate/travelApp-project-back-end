import { ActivitiesModel } from "../../database/entities/Activities.js";

export const createActivity = async (request, response) => {
  try {
    const activity = new ActivitiesModel(request.body);
    await activity.save();
    responseponse.status(201).json(activity);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

export const getActivities = async (request, response) => {
  try {
    const activities = await ActivitiesModel.find();
    response.json(activities);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const getActivityById = async (request, response) => {
  try {
    const activity = await ActivitiesModel.findById(request.params.id);
    if (!activity) return response.status(404).json({ message: "Activity not found" });
    response.json(activity);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const updateActivityById = async (request, response) => {
  try {
    const activity = await ActivitiesModel.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true } 
    );
    if (!activity) return response.status(404).json({ message: "Activity not found" });
    response.json(activity);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};


export const deleteActivityById = async (request, response) => {
  try {
    const activity = await ActivitiesModel.findByIdAndDelete(request.params.id);
    if (!activity) return response.status(404).json({ message: "Activity not found" });
    response.json({ message: "Activity deleted successfully" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
