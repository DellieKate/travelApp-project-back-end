import { VaxReqModel } from "../../database/entities/VaxReq.js";

export const createVaxReq = async (request, response) => {
  try {
    const vaxReq = new VaxReqModel(request.body);
    await vaxReq.save();
    response.status(201).json(vaxReq);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

export const getVaxReqs = async (request, response) => {
  try {
    const vaxReqs = await VaxReqModel.find();
    response.json(vaxReqs);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const getVaxReqById = async (request, response) => {
  try {
    const vaxReq = await VaxReqModel.findById(request.params.id);
    if (!vaxReq) return response.status(404).json({ message: "Vax requirement not found" });
    response.json(vaxReq);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const updateVaxReqById = async (request, response) => {
  try {
    const vaxReq = await VaxReqModel.findByIdAndUpdate(request.params.id, request.body, { new: true });
    if (!vaxReq) return response.status(404).json({ message: "Vax requirement not found" });
    response.json(vaxReq);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

export const deleteVaxReqById = async (request, response) => {
  try {
    const vaxReq = await VaxReqModel.findByIdAndDelete(request.params.id);
    if (!vaxReq) return response.status(404).json({ message: "Vax requirement not found" });
    response.json({ message: "Vax requirement deleted successfully" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
