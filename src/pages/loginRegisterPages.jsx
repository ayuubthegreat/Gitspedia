import "./loginRegisterPages.css"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { LoginUser, RegisterUser, GetUserInfo } from "../store/slices/usersSlice.js"
import {useForm} from "react-hook-form"
import { userPrototype, userSchema, userLoginSchema } from "../components/schema.js"
import { zodResolver } from "@hookform/resolvers/zod"

export const LoginPage = () => {
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm({
        defaultValues: userPrototype,
        resolver: zodResolver(userLoginSchema),
    })
    const patch = useDispatch();
    const nav = useNavigate();

    const onSubmit = async (data) => {
        data.websiteName = "Gitspedia";
        console.log(data);
        try {
            await patch(LoginUser({credentials: data})).unwrap();
            nav("/");
        } catch (err) {
            console.error(err);
        }
    }
    const loginFromRecentUser = async (userId) => {
        const user = await fetchUser(userId);
        await patch(LoginUser({credentials: {email: user.email, password: user.password, websiteName: "Gitspedia"}})).unwrap();
        nav("/");
    }
    const fetchUser = async (userId) => {
        return await patch(GetUserInfo({id: userId})).unwrap();
    }
    return (
        <>
        <div className="login-page">
            <h1 className="login-title">Login</h1>
            <p>Welcome back</p>
            <div className="login-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="email" placeholder="Email" {...register("email")} />
                    {errors.email && <span>{errors.email.message}</span>}
                    <input type="password" placeholder="Password" {...register("password")} />
                    {errors.password && <span>{errors.password.message}</span>}
                    <button type="submit">Login</button>
                </form>
            </div>
            {localStorage.getItem("recentUsers") && <>
            <h2>Recent Users</h2>
            <div className="recent-users">
                {localStorage.getItem("recentUsers").split(",").map((userId, index) => {
                    if (index === localStorage.getItem("recentUsers").split(",").length - 1) return null;
                    const [username, email, id] = userId.split(":");
                    return (
                        <div className="recent-user-card recent-user" key={index} onClick={() => loginFromRecentUser(id)}>
                           {username} - {email}
                        </div>
                    );
                })}
            </div>
            
            </>}
        </div>
        </>
    )
}
export const RegisterPage = () => {
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm({
        defaultValues: userPrototype,
        resolver: zodResolver(userSchema),
    })
   
    const patch = useDispatch();
    const nav = useNavigate();
     const onSubmit = async (data) => {
        data.websiteName = "Gitspedia";
        try {
            await patch(RegisterUser({userData: data})).unwrap();
            nav("/login");
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <>
        <div className="register-page">
            <h1 className="register-title">Register</h1>
            <p>Join the Gitspedia community</p>
            <div className="register-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" placeholder="Username" {...register("username")} />
                    {errors.username && <span>{errors.username.message}</span>}
                    <input type="email" placeholder="Email" {...register("email")} />
                    {errors.email && <span>{errors.email.message}</span>}
                    <input type="password" placeholder="Password" {...register("password")} />
                    {errors.password && <span>{errors.password.message}</span>}
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
        </>
    )
}