import { React, useState, useEffect, useRef } from 'react';
import { Box, TextField, Button} from '@mui/material'
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
function editProfile() {
  const [user, setUser] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState(dayjs());
  
  const [profilePicture, setProfilePicture] = useState(null);
  const fileInputRef = useRef(null);
  
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const userTemp = JSON.parse(localStorage.getItem('user'));
    try {
        const token = localStorage.getItem('token'); // Obtener el token guardado
        const response = await fetch(`http://localhost:5000/users/${userTemp._id}`, { // 🔹 Corrección del endpoint
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log(data)
        setUser(data);
        setFirstName(data.firstName)
        setLastName(data.lastName)
        setBirthdate(dayjs(data.birthdate))
        setProfilePicture(data.profilePicture || 'https://media1.tenor.com/m/KUUtQs-OOHAAAAAd/rana-que-salta-meme-meme-rana.gif')
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
    }
  }

  const editUserInfo = async () =>{
        try {
            const token = localStorage.getItem('token'); 
            
            const url = `http://localhost:5000/users/${user._id}`;

            const method = 'PUT';

            const response = await fetch(url, {
                method: method,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                  firstName,
                  lastName,
                  birthdate: birthdate.format('YYYY-MM-DD') // Formatear la fecha correctamente
                })// 🔹 Asegurar que se envíe como JSON válido
            });

            const data = await response.json();
            console.log("Respuesta del servidor:", data); // 👀 Depuración

            if (response.ok) {
                alert(`Usuario editado exitosamente`);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error al editar el usuario:', error);
        }

  }

  const changePassword = async () => {
    if (password !== passwordConfirmation) {
      alert("Las contraseñas no coinciden");
      return;
    }
    if (password === '' || passwordConfirmation === '') {
      alert("No se admiten contraseñas vacias");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/users/password/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ newPassword: password })
      });

      const data = await response.json();
      if (response.ok) {
        alert("Contraseña actualizada con éxito");
        setPassword('')
        setPasswordConfirmation('')
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
    }
  }
  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      // Mostrar preview sin subir la imagen
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);  // Mostrar la preview local
      };
      reader.readAsDataURL(file);
      const formData = new FormData();
      formData.append('profilePicture', file);

      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/users/photo/${user._id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });

        if (response.ok) {
          alert('Foto de perfil actualizada'); // Actualizar la foto mostrada
        } else {
          alert('Error al subir la foto');
        }
      } catch (error) {
        console.error('Error al subir la foto:', error);
      }
    }

  }

  return (
    <Box sx={{p:7}}>
      <Box sx={{backgroundColor:'primary.main', p:2, py:6, borderRadius:'15px'}}>
        <Box  sx={{display:'flex', flexDirection:{sm:'column', md:'row'}, justifyContent:'space-evenly', width:'100%'}}>

            <Box sx={{display:'flex', flexDirection:'column', flexBasis:'35%', m:1}}>
                <h1  style={{fontWeight:'normal', margin:0}}>Editar usuario</h1>
                <TextField
                    sx={{m:1}}
                    required
                    id="filled-required"
                    label="Nombre(s)"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    color="secondary"
                    variant="filled"
                    focused 
                />
                <TextField
                    sx={{m:1}}
                    required
                    id="filled-required"
                    label="Apellido(s)"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    color="secondary"
                    variant="filled"
                    focused 
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Select Date"
                        value={dayjs(birthdate)}
                        onChange={(newValue) => setBirthdate(newValue)}
                        sx={{
                            mx:1,
                            marginTop: "1rem",
                            marginBottom: "0.5rem",
                            "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "brown" },
                            "&:hover fieldset": { borderColor: "saddlebrown" },
                            "&.Mui-focused fieldset": { borderColor: "sienna" },
                            },
                            "& .MuiInputLabel-root": { color: "brown" }, // Color normal
                            "& .MuiInputLabel-root.Mui-focused": { color: "sienna" }, // Color cuando está en focus
                            "& .MuiSvgIcon-root": { color: "brown" },
                        }}
                    />
                </LocalizationProvider>
                <TextField
                    disabled
                    sx={{m:1}}
                    required
                    id="filled-required"
                    label="Correo"
                    defaultValue={user.email}
                    color="secondary"
                    variant="filled"
                    focused 
                />
                <Button sx={{my:1}} variant='contained' color='secondary' onClick={editUserInfo}>Guardar Datos</Button>
            </Box>
            <Box sx={{display:'flex', flexDirection:'column', flexBasis:'30%', justifyContent:'center', m:1}}>
                <h1 style={{fontWeight:'normal', margin:0}}>Editar Contraseña</h1>
                <TextField
                    sx={{m:1}}
                    required
                    type='password'
                    id="filled-required"
                    label="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    color="secondary"
                    variant="filled"
                    focused 
                />
                <TextField
                    sx={{m:1}}
                    required
                    type='password'
                    id="filled-required"
                    label="Confirmar contraseña"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    color="secondary"
                    variant="filled"
                    focused 
                />
                <Button sx={{my:1}} variant='contained' color='secondary' onClick={changePassword}>Editar contraseña</Button>
            </Box>
            <Box sx={{display:'flex', flexDirection:'column', flexBasis:'20%', justifyContent:'center', m:1}}>
                <h1 style={{fontWeight:'normal', margin: 0}}>Editar foto de perfil</h1>
                <Box 
                    component={'img'} 
                    src={profilePicture || 'https://media1.tenor.com/m/KUUtQs-OOHAAAAAd/rana-que-salta-meme-meme-rana.gif'}
                    sx={{height:'120px', width:'120px', borderRadius:'50%', alignSelf:'center', m:2}}
                    />
                
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                <Button
                    onClick={triggerFileSelect}
                    sx={{my:1}} 
                    variant='contained' 
                    color='secondary'
                >Subir foto</Button>
            </Box>
        </Box>
        <Box  sx={{display:'flex',flexDirection:{sm:'column', md:'row'}, justifyContent:'flex-end', width:'100%', px:1}}>
            <Button size='large' sx={{ mr:{ sm:0, md:4}, alignSelf:'flex-end', width:{sm:'100%', md:'auto'}}} variant='contained' color='error'>Eliminar cuenta</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default editProfile
