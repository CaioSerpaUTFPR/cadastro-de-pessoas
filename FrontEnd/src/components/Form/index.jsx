import React from "react";
import { useForm } from "react-hook-form";
import { Input, Span, ContainerInput } from "./styles";
import { yupResolver } from '@hookform/resolvers/yup';
import { API } from "../../pages/Main";
import * as yup from "yup";

const schema = yup.object({
    person_name: yup.string().required('Preencha o Nome'),
    person_login: yup.string().required('Preencha o Login'),
    person_pass: yup.string().required('Preencha a Senha'),
    person_cpf_cnpj: yup.string().required('Preencha o CPF/CNPJ'),
    person_rg_stateinsc: yup.string().required('Preencha o RG/INSC ESTADUAL'),
    person_tel: yup.string()
}).required();


export const Form = ({ handleInsertByForm }) => {

    async function handleCreatePerson(new_person) {
        try {
            await API.post('/', {
                person_name: new_person.person_name
                , encrypt_pass: new_person.person_pass
                , person_login: new_person.person_pass
                , person_type: new_person.person_type
                , cpf_cnpj: new_person.person_cpf_cnpj
                , rg_stateinsc: new_person.person_rg_stateinsc
                , tel: new_person.person_tel
            }).then((response) => {
                handleInsertByForm(response.data);
            });
        }
        catch (e) {
            console.log(e);
        }
    }

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = data => handleCreatePerson(data);

    return (
        <div style={{ width: '500px', height: '500px' }}>
            <form style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', paddingTop: '40px' }} onSubmit={handleSubmit(onSubmit)}>


                <div style={{ display: 'flex' }}>
                    <div>
                        <label>Fisica</label>
                        <input
                            {...register("person_type")}
                            type="radio"
                            name="person_type"
                            value="fisica"
                            id="fisica_id"
                            checked={true}
                        />
                    </div>

                    <div>
                        <label>Juridica</label>
                        <input
                            {...register("person_type")}
                            type="radio"
                            name="person_type"
                            value="juridica"
                            id="juridica_id"
                        />
                    </div>


                </div>


                <ContainerInput>
                    <label>Nome</label>
                    <Input {...register("person_name", { required: true })} />
                    <Span>{errors.person_name?.message}</Span>
                </ContainerInput>

                <ContainerInput>
                    <label>Login</label>
                    <Input {...register("person_login", { required: true })} />
                    <Span> {errors.person_login?.message}</Span>
                </ContainerInput>

                <ContainerInput>
                    <label>Senha</label>
                    <Input {...register("person_pass", { required: true })} />
                    <Span>{errors.person_pass?.message}</Span>
                </ContainerInput>

                <ContainerInput>
                    <label>CPF/CNPJ</label>
                    <Input {...register("person_cpf_cnpj", { required: true })} />
                    <Span>{errors.person_cpf_cnpj?.message}</Span>
                </ContainerInput>

                <ContainerInput>
                    <label>RG/INSC ESTADUAL</label>
                    <Input {...register("person_rg_stateinsc", { required: true })} />
                    <Span>{errors.person_rg_stateinsc?.message}</Span>
                </ContainerInput>


                <ContainerInput>
                    <label>Telefone</label>
                    <Input {...register("person_tel")} />
                </ContainerInput>

                <Input type="submit" value='Cadastrar' />
            </form>
        </div>
    );
}