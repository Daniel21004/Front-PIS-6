import swal from "sweetalert";

const message = (title, text, type='success') => {
    swal(title, text, type, {
        button: "ACEPTAR",
        timer: 2500,
        closeOnEsc: true
    });
}

export default message;