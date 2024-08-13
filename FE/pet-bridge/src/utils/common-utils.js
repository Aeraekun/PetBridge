const {default: Swal} = require("sweetalert2")

export const Toast = Swal.mixin({
  toast: true,
  position: "center-top",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
})
