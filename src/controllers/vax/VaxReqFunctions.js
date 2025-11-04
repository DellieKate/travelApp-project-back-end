import { VaxReqModel } from "../../database/entities/VaxReq.js";

export const createVaxReq = async (req, res) => {
  try {
    const vaxReq = new VaxReqModel(req.body);
    await vaxReq.save();
    res.status(201).json(vaxReq);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getVaxReqs = async (req, res) => {
  try {
    const vaxReqs = await VaxReqModel.find();
    res.json(vaxReqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVaxReqById = async (req, res) => {
  try {
    const vaxReq = await VaxReqModel.findById(req.params.id);
    if (!vaxReq) return res.status(404).json({ message: "Vax requirement not found" });
    res.json(vaxReq);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateVaxReq = async (req, res) => {
  try {
    const vaxReq = await VaxReqModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vaxReq) return res.status(404).json({ message: "Vax requirement not found" });
    res.json(vaxReq);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteVaxReq = async (req, res) => {
  try {
    const vaxReq = await VaxReqModel.findByIdAndDelete(req.params.id);
    if (!vaxReq) return res.status(404).json({ message: "Vax requirement not found" });
    res.json({ message: "Vax requirement deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
