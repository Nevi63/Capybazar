import Swal from 'sweetalert2';

const customSwal = Swal.mixin({
  backdrop: "rgba(68, 33, 11, 0.26) url('https://media4.giphy.com/media/B2LZcyZQvD66EprMk7/giphy.gif?cid=6c09b952z8nxznboz48mcuof2fow01lvxa0mh0bat7fjztli&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s') bottom right no-repeat",
  background: "url('https://i.pinimg.com/736x/bc/36/c9/bc36c993f099a558a331b61c4b48431c.jpg')",
  customClass: {
   // icon: 'my-warning-icon'
  confirmButton: 'custom-swal-confirm',
  },
});

export default customSwal;
