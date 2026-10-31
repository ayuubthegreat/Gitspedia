import { useForm } from "react-hook-form";
import { BASE_DATA } from "../BASE_DATA";
import "./registerForm.css"
import { zodResolver } from "@hookform/resolvers/zod";
import { GetUsers, RegisterUser, userSchema } from "../store/slices/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


const RegisterPage = () => {
    const {
        register,
        reset,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(userSchema)
    });
    const {successMessage} = useSelector((state) => state.user);
    const [userRegistered, setUserRegistered] = useState(null);
    const dispatch = useDispatch();
    const nav = useNavigate();
    const onSubmit = async (data) => {
        const dialogRegister = document.getElementById("dialog-register");
        data.role = "PENDING_APPROVAL";
        data.websiteName = "Gitspedia"
        console.log(data);
        try {
            await dispatch(RegisterUser({loginData: data})).unwrap();
            dialogRegister.classList.remove("hidden");
            setUserRegistered(data);
            reset();
        } catch (error) {
            alert(error);
        }
    }
    return (
        <>
        <div className="register-page page">
            <div id="dialog-register" className="backdrop flex middle hidden">
                <div className="dialog-register outline center-text flex middle">
                    <h1>Register successful</h1>
                    <p>{successMessage}</p>
                    <p>Your form has been submitted to {BASE_DATA.STUDIO_NAME}. Nice to meet you, {userRegistered ? userRegistered.firstName : "undefined"} Please wait a few days for an approval e-mail. <br></br> We appreciate your request! Please visit our company website to learn more about how we roll!</p>
                    <div className="flex row">
                       <Link to={"https://www.crescentmoonstudios.com"}>Our Company Website</Link>
                    <Link to={"/"}>Exit</Link> 
                    </div> 
                    <div className="info uh-oh">
                        <h3>Your satisfaction matters</h3>
                        <p>If you have incorrectly filled out the registration form, please contact us--your satisfaction is paramount <i>(important)</i>.<br></br> Don't be shy--we want to hear from you! </p>
                        <Link to={"https://www.crescentmoonstudios.com/contact"}>Contact Us</Link>
                    </div>
            </div>
            </div>
            
            
            <div className="center-text">
                <h1>Register Page</h1>
                <p>We at {BASE_DATA.WEBSITE_NAME} love new editors and writers!</p>
            </div>
            <form action={"/submit-profile"} onSubmit={handleSubmit(onSubmit)}>
                <div className="flex row register-section">
                    <label>Username</label>
                    <input {...register("username")} placeholder="Enter username..." type="text"></input>
                    {errors.username && <p className="info uh-oh">{errors.username.message}</p>}
                </div>
                <div className="flex row register-section">
                    <label>Name</label>
                    <input {...register("firstName")} placeholder="Enter your first name...." type="text"></input>
                    {errors.firstName && <p className="info uh-oh" role="alert">{errors.firstName.message}</p>}
                    <input {...register("lastName")} placeholder="Enter your last name...." type="text"></input>
                    {errors.lastName && <p className="info uh-oh" role="alert">{errors.lastName.message}</p>}
                </div>
                <div className="flex row register-section">
                    <label>Email</label>
                    <input {...register("email")} placeholder="Enter email...." type="email"></input>
                    {errors.email && <p className="info uh-oh" role="alert">{errors.email.message}</p>}
                     <label>Password</label>
                    <input {...register("password")} placeholder="Enter password...." type="password"/>
                    {errors.password && <p className="info uh-oh"  role="alert">{errors.password.message}</p>}
                </div>
                <div className="flex register-section">
                   <label>Why do you want to write for {BASE_DATA.WEBSITE_NAME}? <br></br> <i>Note: Please write in a minimum of 100 words. This is so we can fully determine why you want to write for us. Your data will be used to improve our writing environment, as per the Gitspedia terms of service.</i></label>
                   <textarea></textarea>
                </div>
                <div className="flex middle">
                    <button style={{width: "50%", minWidth: "100px", maxWidth: "400px"}} type="submit">Submit</button>
                </div>
            </form>
        </div>
        </>
    )
}
export default RegisterPage;