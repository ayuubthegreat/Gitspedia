import { useForm } from "react-hook-form";
import { BASE_DATA } from "../BASE_DATA";
import "./registerForm.css"


const RegisterPage = () => {
    const {
        register,
        setValue,
        getValues,
        reset,
        control,
        handleSubmit
    } = useForm();
    const onSubmit = (data) => {

    }
    return (
        <>
        <div className="register-page">
            <div className="center-text">
                <h1>Register Page</h1>
                <p>We at {BASE_DATA.WEBSITE_NAME} love new editors and writers!</p>
            </div>
            <form action={"/submit-profile"} onSubmit={handleSubmit(onSubmit)}>
                <div className="flex row">
                    <label>Name</label>
                    <input placeholder="First name" type="text"></input>
                    <input placeholder="Last name" type="text"></input>
                </div>
                <div style={{marginTop: "10px"}} className="flex">
                    <label>Email</label>
                    <input placeholder="Email" type="email"></input>
                     <label>Password</label>
                    <input placeholder="Enter password...." type="password"/>
                </div>
                <div className="flex">
                   <label>Why do you want to write for {BASE_DATA.WEBSITE_NAME}? <br></br> <i>Note: Please write in a minimum of 100 words. This is so we can fully determine why you want to write for us. Your data will be used to improve our writing environment, as per the Gitspedia terms of service.</i></label>
                </div>
            </form>
        </div>
        </>
    )
}
export default RegisterPage;