import { useForm } from "react-hook-form";
import { BASE_DATA } from "../BASE_DATA";
import "./registerForm.css"


const RegisterPage = () => {
    const {
        register,
        setValue,
        getValues,
        reset,
        control
    } = useForm();
    return (
        <>
        <div className="register-page">
            <div className="center-text">
                <h1>Register Page</h1>
                <p>We at {BASE_DATA.WEBSITE_NAME} love new editors and writers!</p>
            </div>

        </div>
        </>
    )
}
export default RegisterPage;