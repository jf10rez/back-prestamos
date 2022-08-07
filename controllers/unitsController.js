const dayjs = require("dayjs");
const { response } = require("express");
const Unit = require("../models/UnitModel");

const getUnits = async (req, res = response) => {
  try {
    const units = await Unit.find({ user: req.uid });

    res.status(200).json({
      ok: true,
      units,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        message: "Se produjo un error en el servidor"
    })
  }
};

const newUnits = async (req, res = response) => {
  try {
    const unit = new Unit(req.body);
    unit.startDate =  dayjs( new Date() ).format("YYYY/MM/DD")
    unit.user = req.uid;
    const saveUnit = await unit.save();

    res.status(201).json({
      ok: true,
      prestamo: saveUnit,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Se produjo un error en el servidor",
    });
  }
};

module.exports = {
    newUnits,
    getUnits
};
