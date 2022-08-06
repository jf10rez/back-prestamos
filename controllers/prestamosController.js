const { response } = require("express");
const { validatePrestamos } = require("../helpers/validatePrestamos");
const Prestamo = require("../models/PrestamoModel");

const getPrestamos = async (req, res = response) => {
  try {
    const prestamos = await Prestamo.find({ user: req.uid });

    res.status(200).json({
      ok: true,
      prestamos,
    });
  } catch (error) {
    console.log(error);
  }
};

const newPrestamo = async (req, res = response) => {
  try {
    const prestamo = new Prestamo(req.body);
    prestamo.user = req.uid;
    prestamo.currentQuota = 1;
    prestamo.remainingAmount =
      ((+req.body.amount * +req.body.percentage) / 100) * req.body.quota +
      +req.body.amount;
    prestamo.state = 1;
    const savePrestamo = await prestamo.save();

    res.status(201).json({
      ok: true,
      prestamo: savePrestamo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Se produjo un error en el servidor",
    });
  }
};

const addQuota = async (req, res = response) => {
  try {
    const { id } = req.params;

    const prestamo = await Prestamo.findById(id);

    if (!validatePrestamos(prestamo, res, req)) return;

    if (prestamo.state === 2) {
      return res.status(400).json({
        ok: false,
        message: "El estado de la deuda es pago",
      });
    }

    const addOneQuota = +prestamo.currentQuota + 1;

    //Validar que la cuota no sobrepase el máximo de cuotas
    if (addOneQuota > prestamo.quota) {
      return res.status(400).json({
        ok: false,
        message: "La cuota agregada sobrepasa el máximo de cuotas",
      });
    }

    if (addOneQuota === prestamo.quota) {
      //Pagado
      await Prestamo.findByIdAndUpdate(id, {
        state: 2,
      });
    }

    const remainingAmountByQuotas = +prestamo.remainingAmount / +prestamo.quota;

    const prestamoUpdated = await Prestamo.findByIdAndUpdate(
      id,
      {
        currentQuota: addOneQuota,
        remainingAmount: prestamo.remainingAmount - remainingAmountByQuotas,
      },
      { new: true }
    );

    res.status(200).json({
      ok: true,
      prestamo: prestamoUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Se produjo un error con el servidor",
    });
  }
};

const payCapital = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { pay } = req.body;

    const prestamo = await Prestamo.findById(id);

    if (!validatePrestamos(prestamo, res, req)) return;

    if (prestamo.state === 2) {
      return res.status(400).json({
        ok: false,
        message: "El estado de la deuda es pago",
      });
    }

    if (pay > prestamo.remainingAmount) {
      return res.status(400).json({
        ok: false,
        message: "El abono a realizar es mayor al pago pendiente",
      });
    }

    if (+pay === +prestamo.remainingAmount) {
      //Pagado
      await Prestamo.findByIdAndUpdate(id, {
        state: 2,
      });
    }

    const prestamoUpdated = await Prestamo.findByIdAndUpdate(
      id,
      {
        remainingAmount: prestamo.remainingAmount - +pay,
      },
      { new: true }
    );

    res.status(200).json({
      ok: true,
      prestamo: prestamoUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Se presentó un error con el servidor",
    });
  }
};

const updatePrestamo = async (req, res = response) => {
  try {
    const { document, name, startDate } = req.body;
    const { id } = req.params;

    const prestamo = await Prestamo.findById(id);

    if (!validatePrestamos(prestamo, res, req)) return;

    const newPrestamo = {
      document,
      name,
      startDate,
    };

    const prestamoUpdated = await Prestamo.findByIdAndUpdate(id, newPrestamo, {
      new: true,
    });

    res.status(200).json({
      ok: true,
      prestamo: prestamoUpdated,
    });
  } catch (error) {
    console.log(error);
  }
};

const changeStatePrestamo = async (req, res = response) => {
  try {
    const { id } = req.params;

    const prestamo = await Prestamo.findById(id);

    if (!validatePrestamos(prestamo, res, req)) return;

    const statePrestamoUpdated = await Prestamo.findByIdAndUpdate(
      id,
      { state: 2 },
      { new: true }
    );

    res.status(200).json({
      ok: true,
      prestamo: statePrestamoUpdated
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Se presentó un error con el servidor",
    });
  }
};

const deletePrestamo = async( req, res = response ) => {

    try {

      const { id } = req.params
      await Prestamo.findByIdAndDelete( id )

      res.status(200).json({
        ok: true,
        message: "El prestamo se eliminó"
      })
      
    } catch (error) {
      console.log(error)
      res.status(500).json({
        ok: false,
        message: "Se produjo un error en el servidor"
      })
    }

}

module.exports = {
  getPrestamos,
  newPrestamo,
  addQuota,
  payCapital,
  updatePrestamo,
  changeStatePrestamo,
  deletePrestamo
};
