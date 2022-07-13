import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "./styles";

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    person_name: yup.string().required('Preencha o Nome'),
    person_login: yup.string().required('Preencha o Login'),
    person_pass: yup.string().required('Preencha a Senha'),
    person_tel: yup.string()
}).required();


export const Form = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = data => console.log(data);

    console.log(watch("example")); // watch input value by passing the name of it

    return (
        <div style={{ width: '500px', height: '500px' }}>
            <form style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '10px', paddingTop: '40px' }} onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                <Input {...register("person_name", { required: true })} />
                <span>{errors.person_name?.message}</span>

                <Input {...register("person_login", { required: true })} />
                <span> {errors.person_login?.message}</span>

                <Input {...register("person_pass", { required: true })} />
                <span>{errors.person_pass?.message}</span>

                <Input {...register("person_tel")} />

                <Input type="submit" />
            </form>
        </div>
    );
}