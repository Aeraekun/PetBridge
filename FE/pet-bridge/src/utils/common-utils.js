const {default: Swal} = require("sweetalert2")

// 확인을 안눌러도 timer (3000 ms) 뒤에
export const Toast = Swal.mixin({
  toast: true,
  width: "20em",
  position: "top",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
})
