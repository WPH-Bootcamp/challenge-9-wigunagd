import { useEffect, useState, type FormEvent } from "react";
import Button from "../../component/Button";
import Input from "../../component/Input";
import Checkbox from "../../component/Checkbox";
import { useRegister } from "./hooksRegister";
import { useLogin } from "./hooksLogin";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/api/redux";
import { onSuccessLogin } from "./authSlice";
import type { IRegErrorResponse, IRegErrorResponseDetails } from "./authType";
import type { ILoginResponse } from "./authType";

const LoginPage = () => {
    const urlParams = new URLSearchParams(location.search);
    const isSignUpInUrl = urlParams.has('signup');

    const [isSelectSignIn, setIsSelectSignIn] = useState(!isSignUpInUrl);

    const [nameRegister, setNameRegister] = useState('');
    const [nameRegisterError, setNameRegisterError] = useState('');
    const [emailRegister, setEmailRegister] = useState('');
    const [emailRegisterError, setEmailRegisterError] = useState('');
    const [numberPhoneRegister, setNumberPhoneRegister] = useState('');
    const [numberPhoneRegisterError, setNumberPhoneRegisterError] = useState('');
    const [passwordRegister, setPasswordRegister] = useState('');
    const [passwordRegisterError, setPasswordRegisterError] = useState('');
    const [confirmPasswordRegister, setConfirmPasswordRegister] = useState('');
    const [registerMessage, setRegisterMessage] = useState('');
    const [isSuccessRegister, setIsSuccessRegister] = useState(true);

    const [emailLogin, setEmailLogin] = useState('wph034@wphlatihan.com');
    const [passwordLogin, setPasswordLogin] = useState('Wph034Juara2026');
    const [loginErrMessage, setLoginErrMessage] = useState('');

    const { mutate: mutateRegister, isPending: isPendingRegister } = useRegister();
    const { mutate: mutateLogin, isPending: isPendingLogin } = useLogin();

    const handleNameRegister = (text: string) => {
        setNameRegister(text);
    }

    const handleEmailRegister = (text: string) => {
        setEmailRegister(text);
    }

    const handleNumberPhoneRegister = (text: string) => {
        setNumberPhoneRegister(text);
    }

    const handlePasswordRegister = (text: string) => {
        setPasswordRegister(text);
    }

    const handleConfirmPasswordRegister = (text: string) => {
        setConfirmPasswordRegister(text);
    }

    const handleEmailLogin = (text: string) => {
        setEmailLogin(text);
    }

    const handlePasswordLogin = (text: string) => {
        setPasswordLogin(text);
    }

    const handleSubmitRegister = (e: FormEvent) => {
        e.preventDefault();

        if (passwordRegister === confirmPasswordRegister) {
            mutateRegister({
                name: nameRegister,
                email: emailRegister,
                phone: numberPhoneRegister,
                password: passwordRegister
            }, {
                onSuccess: () => {
                    setNameRegister('');
                    setNameRegisterError('');
                    setEmailRegister('');
                    setEmailRegisterError('');
                    setNumberPhoneRegister('');
                    setNumberPhoneRegisterError('');
                    setPasswordRegister('');
                    setConfirmPasswordRegister('');
                    setPasswordRegisterError('');
                    setIsSuccessRegister(true);
                    setRegisterMessage('Registration successfull. Please Login.');
                },
                onError: (e) => {
                    const errresponse = e as IRegErrorResponse;
                    errresponse.response?.data.errors?.map((emsg: IRegErrorResponseDetails) => {
                        if (emsg.path === "name") {
                            setNameRegisterError(emsg.msg);
                        } else {
                            setNameRegisterError('');
                        }

                        if (emsg.path === "email") {
                            setEmailRegisterError(emsg.msg);
                        } else {
                            setEmailRegisterError('');
                        }

                        if (emsg.path === "phone") {
                            setNumberPhoneRegisterError(emsg.msg);
                        } else {
                            setNumberPhoneRegisterError('');
                        }

                        if (emsg.path === "password") {
                            setPasswordRegisterError(emsg.msg);
                        } else {
                            setPasswordRegisterError('');
                        }
                    })
                    setIsSuccessRegister(false);
                    setRegisterMessage(errresponse.response?.data.message ??
                        "Make sure name, email, phone number (Indonesian Phone number: 081xxxxxxxxx) valid and the password must be strong"
                    );
                }
            });
        } else {
            setRegisterMessage('Password does not match');
        }
    }


    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const authState = useAppSelector((state) => state.auth);

    const handleSubmitLogin = (e: FormEvent) => {
        e.preventDefault();

        if (passwordRegister === confirmPasswordRegister) {
            mutateLogin({
                email: emailLogin,
                password: passwordLogin
            }, {
                onSuccess: (data: ILoginResponse) => {
                    dispatch(onSuccessLogin(data.data));
                    navigate('/');
                },
                onError: () => {
                    setLoginErrMessage('Username or password is not correct')
                }
            });
        } else {
            setRegisterMessage('Password does not match');
        }
    }

    const handleOnClickSignIn = () => {
        setIsSelectSignIn(!isSelectSignIn);
    }

    useEffect(() => {
        if (authState.accessToken !== "" && authState.isLoggedin) {
            navigate('/');
            return;
        }
    }, []);

    return (
        <div className="flex h-screen w-full">
            <img id="imgloginbanner" src="src/assets/LoginBanner.svg" alt="Login-Banner"
                className="hidden md:block md:w-full md:max-w-[720px] object-cover" />

            <section id="loginregisterdiv"
                className="flex flex-1 items-center justify-center p-8">
                <div id="loginregisterbox" className="w-full max-w-[374px] mx-auto my-auto">
                    <div className="flex items-center mb-4">
                        <img src="src/assets/Logo.svg" alt="logo" className="w-[42px]" />
                        <h1 className="text-4xl ml-2">Foody</h1>
                    </div>
                    <h1 className="text-4xl mb-2">Wellcome Back</h1>
                    <h1 className="text-md mb-2">Good to see you again! Let's eat</h1>

                    <div id="buttonselectdiv"
                        className="grid grid-cols-2 gap-2 w-full rounded-lg bg-neutral-100 p-2 mb-2 justify-arround">
                        <Button onClick={handleOnClickSignIn}
                            id="btnsignintab" name="btnsignintab"
                            type="button"
                            className={`rounded-md ${isSelectSignIn ? 'bg-white font-bold' : 'bg-neutral-100'} `}>Sign in</Button>

                        <Button
                            onClick={handleOnClickSignIn}
                            id="btnsignuptab"
                            name="btnsignuptab"
                            type="button"
                            className={`rounded-md ${isSelectSignIn ? 'bg-neutral-100' : 'bg-white font-bold'} `}>Sign up</Button>
                    </div>

                    {
                        isSelectSignIn && (
                            <div id="logindiv" className="grid grid-cols-1">
                                <form method="POST" onSubmit={handleSubmitLogin}>
                                    <Input
                                        id="emaillogin"
                                        name="emaillogin"
                                        type="email"
                                        value={emailLogin}
                                        placeholder="Email"
                                        onChange={(e) => handleEmailLogin(e.target.value)}
                                        className="my-3" />

                                    <Input
                                        id="passwordlogin"
                                        name="passwordlogin"
                                        type="password"
                                        value={passwordLogin}
                                        placeholder="Password"
                                        onChange={(e) => handlePasswordLogin(e.target.value)}
                                        className="my-3" />

                                    <Checkbox
                                        id="chkrememberme"
                                        name="chkrememberme"
                                        label="Remember Me"
                                        className="my-3"
                                    />

                                    <Button
                                        disabled={isPendingLogin}
                                        id="btnlogin"
                                        name="btnlogin"
                                        type="submit"
                                        className="bg-red-700 w-full text-white mt-3 rounded-3xl"
                                    >Login</Button>

                                    <p className={`text-red-700 text-sm mt-2 text-center font-medium`}>
                                        {loginErrMessage}
                                    </p>
                                </form>
                            </div>
                        )
                    }

                    {
                        !isSelectSignIn && (
                            <div id="registerdiv" className="grid grid-cols-1">
                                <form method="POST" onSubmit={handleSubmitRegister}>
                                    <Input
                                        id="nameregister"
                                        name="nameregister"
                                        type="text"
                                        value={nameRegister}
                                        placeholder="Name"
                                        onChange={(e) => handleNameRegister(e.target.value)}
                                        className="my-1" />
                                    <p className={`text-red-700 text-xs`}>
                                        {nameRegisterError}
                                    </p>

                                    <Input
                                        id="emailregister"
                                        name="emailregister"
                                        type="email"
                                        value={emailRegister}
                                        placeholder="Email"
                                        onChange={(e) => handleEmailRegister(e.target.value)}
                                        className="my-1" />
                                    <p className={`text-red-700 text-xs`}>
                                        {emailRegisterError}
                                    </p>

                                    <Input
                                        id="numberphoneregister"
                                        name="numberphoneregister"
                                        type="tel"
                                        value={numberPhoneRegister}
                                        placeholder="Number Phone"
                                        onChange={(e) => handleNumberPhoneRegister(e.target.value)}
                                        className="my-1" />
                                    <p className={`text-red-700 text-xs`}>
                                        {numberPhoneRegisterError}
                                    </p>

                                    <Input
                                        id="passwordregister"
                                        name="passwordregister"
                                        type="password"
                                        value={passwordRegister}
                                        placeholder="Password"
                                        onChange={(e) => handlePasswordRegister(e.target.value)}
                                        className="my-1" />
                                    <p className={`text-red-700 text-xs`}>
                                        {passwordRegisterError}
                                    </p>

                                    <Input
                                        id="confirmpasswordregister"
                                        name="confirmpasswordregister"
                                        type="password"
                                        value={confirmPasswordRegister}
                                        placeholder="Confirm Password"
                                        onChange={(e) => handleConfirmPasswordRegister(e.target.value)}
                                        className="my-1" />
                                    <p className={`text-red-700 text-xs`}>
                                        {passwordRegisterError}
                                    </p>

                                    <Button
                                        disabled={isPendingRegister}
                                        id="btnregister"
                                        name="btnregister"
                                        type="submit"
                                        className="bg-red-700 w-full text-white mt-3 rounded-3xl"
                                    >Register</Button>

                                    <p className={` ${isSuccessRegister ? 'text-green-700' : 'text-red-700'} text-sm mt-2 text-center font-medium`}>
                                        {registerMessage}
                                    </p>
                                </form>
                            </div>
                        )
                    }

                </div>
            </section>
        </div>
    )
}

export default LoginPage;

/* 
Gunakan ini untuk login
Name: WPH-034
Email: wph034@wphlatihan.com
Number: 08198029725
Password: Wph034Juara2026
*/