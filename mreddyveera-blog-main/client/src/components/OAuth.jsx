import { Button } from "flowbite-react";
import {AiFillGoogleCircle} from "react-icons/ai";
import {GoogleAuthProvider, signInWithPopup, getAuth} from "firebase/auth";
import {app} from "../firebase.js";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useDispatch} from "react-redux";
import {signInSuccess} from "../redux/user/userSlice.js";
function OAuth(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleGoogleClick=async()=>{
        const auth=getAuth(app);

        const provider=new GoogleAuthProvider();

        provider.setCustomParameters({prompt:'select_account'});
        try{
            const resultsFromGoogle=await signInWithPopup(auth,provider);
            const data={name:resultsFromGoogle.user.displayName,
                email:resultsFromGoogle.user.email,
                googlePhotoUrl:resultsFromGoogle.user.photoURL
            }
            axios.post('http://localhost:3000/api/auth/google',data)
            .then((response)=>{
                dispatch(signInSuccess(data));
                 setTimeout(()=>{navigate("/")},1000);

            })
            .catch((error)=>{
                console.log(error.message);
            })


            console.log(resultsFromGoogle);
           
        }
        catch(error){
            console.log(error.message)
        }

    }
    return(
        <>
        <Button type='button' className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800" outline onClick={handleGoogleClick}>        <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
        Continue with Google</Button>
        </>
    )

}
export default OAuth;