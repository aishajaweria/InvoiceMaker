import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppCtx } from '../context/AppContext';

const Register = () => {
    const { handleRegister } = useContext(AppCtx);
    useEffect(() => {
        document.title = ' invoice Maker';
      }, []);
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [errorText, setErrorText] = useState('');

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const validate = (values) => {
        const errors = {};
        if (!values.name) errors.name = "Username is required";
        if (!values.email) errors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = "Email is invalid";
        if (!values.password) errors.password = "Password is required";
        else if (values.password.length < 6) errors.password = "Password must be at least 6 characters";
        return errors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            axios
                .post('http://localhost:8801/api/auth/register', values)
                .then((res) => {
                    handleRegister();
                    navigate('/login');
                })
                .catch((err) => {
                    console.error(err);
                    setErrorText('An error occurred during registration');
                });
        }
    };

    return (
        <div className="relative min-h-screen bg-cover bg-center ">
            <div className="absolute inset-0 opacity-50 bg-cover bg-center"></div>
            <div className="flex justify-center items-center h-full">
                <div className="grid grid-cols-1 gap-0 max-w-lg w-full ">
                    <div className="flex flex-col justify-center items-center relative z-10 md:pb-20 pt-10">
                        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded md:px-10 md:pt-10">
                            <h2 className="text-3xl font-bold mb-4 text-center text-cyan-500 pb-15">SignUp</h2>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-black-700 font-bold mb-2 text-sm">
                                    Username
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    placeholder="Enter your Username"
                                    value={values.name}
                                    onChange={handleInput}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.name && <span className='text-red-500 text-xs p-1'>{errors.name}</span>}
                            </div>
                            <div className="mb-2">
                                <label htmlFor="email" className="block text-black-700 text-sm font-bold mb-2">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="Enter your Email"
                                    value={values.email}
                                    onChange={handleInput}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.email && <span className='text-red-500 text-xs p-1'>{errors.email}</span>}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="password" className="block text-black-700 text-sm font-bold mb-2">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="password"
                                        placeholder="Enter your Password"
                                        value={values.password}
                                        onChange={handleInput}
                                        className="shadow appearance-none border rounded w-[210%] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    {errors.password && <span className='text-red-500 text-xs p-1'>{errors.password}</span>}
                                </div>
                            </div>
                            {errorText && <div className="text-red-500 text-xs mb-4">{errorText}</div>}
                            <div className="flex items-center justify-center md:mt-5">
                                <button
                                    className="hover:bg-blue-800 text-white md:w-[100%] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-gradient-to-bl from-cyan-400 to-blue-500"
                                    type="submit"
                                >
                                    SignUp
                                </button>
                            </div>
                            <div>
                                <p className="text-center text-gray-600 md:pb-10">
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-cyan-500 hover:underline">
                                        Login
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
