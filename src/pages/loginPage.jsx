import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BASE_DATA } from "../BASE_DATA";
import { loginSchema, LoginUser, userSchema } from "../store/slices/usersSlice";
import "./loginPage.css"
import { Link, useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const LoginPage = () => {
    const {
        register,
        reset,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(loginSchema)
    });
    const [showPassword, setShowPassword] = useState(false);
    const {successMessage, error} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const nav = useNavigate();
    const onSubmit = async function(data) {
        const dialogBackdrop = document.getElementById("dialog-backdrop");

        try {
            await dispatch(LoginUser({loginData: data})).unwrap();
            dialogBackdrop.classList.remove("hidden");
            reset();
            setTimeout(() => {
                nav('/');
            }, 1000)
        } catch (error) {
            alert(error.message ?? error);
        }
    }
    return (
        <>
        <div id="dialog-backdrop" className="backdrop hidden">
            <div className="outline flex">
                <h1>Login successful!</h1>
                <h3>{successMessage}</h3>
            </div>
        </div>
        <div className="login-page outline flex center-text">
            <div className="heading">
                <h2>Login</h2>
                <p>Welcome to {BASE_DATA.WEBSITE_NAME}!</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex middle">
                <label>Username</label>
                <input className="full" placeholder="Enter username...." {...register("username")}/>
                {errors.username && <p className="info uh-oh">{errors.username.message}</p>}
                  <label>Password</label>
                  <div className="flex row">
                    <input type={`${showPassword ? "text" : "password"}`} placeholder="Enter password...." {...register("password")}/>
                    <button type="button" onClick={() => {setShowPassword(!showPassword);}} className="flex middle row"><Eye></Eye>{showPassword ? "Hide Password" : "Show Password"}</button>
                  </div>
                 {errors.password && <p className="info uh-oh">{errors.password.message}</p>}
                <button type="submit">Login</button>
            </div>
            </form>
           {error !== null && (<>
           <div className="info uh-oh">
            <p>{error}</p>
           </div>
           </>)}
            <div className="info uh-oh">
               <p>If your username and password is not working, <strong>please contact {BASE_DATA.STUDIO_NAME}.</strong></p> 
               <Link to={"https://www.crescentmoonstudios.com/contact"}>Contact Us</Link>
            </div>
            
        </div>
        </>
    )
}
export default LoginPage;