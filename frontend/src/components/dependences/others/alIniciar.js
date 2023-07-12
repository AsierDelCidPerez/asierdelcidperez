const { useSelector, useDispatch } = require("react-redux")
const { actOfSetUser } = require("../../../redux/reducers/user")
const { revisarCredencialesGuardadas } = require("./iniciarSesion")

const useAtInit = () => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.user?.token)
    
    // Hacer al iniciar la aplicacion frontend
    if(token){
        //si el usuario ha iniciado sesión

    }else{
        // Si no
        revisarCredencialesGuardadas()?.then(res => {
            if(res.data.valid){
                const usuario = res.data.value
                // console.log(usuario)
                dispatch(actOfSetUser(usuario.name, usuario.apellidos, usuario.email, usuario.imageIcon, usuario.rank, usuario.blocked, localStorage.getItem('userToken')))
            }else{
                localStorage.removeItem('userToken')
            }
        }).catch(err => localStorage.removeItem('userToken') )

    }
}

module.exports = useAtInit