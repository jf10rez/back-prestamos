const validatePrestamos = ( prestamo, res, req ) => {

    if (!prestamo) {
         res.status(400).json({
          ok: false,
          message: "El prestamo no existe",
        });
        return false
      }
  
      if (prestamo.user.toString() !== req.uid) {
         res.status(401).json({
          ok: false,
          message: "El usuario no puede modificar este prestamo",
        });
        return false
      }

      return true

}

module.exports = { validatePrestamos }