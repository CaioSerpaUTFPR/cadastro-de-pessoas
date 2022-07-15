import React, { useEffect, useState } from "react";
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


export const Form = ({ handleInsertByForm, handleUpdateByForm, editPerson }) => {

    const [radioNaturalChecked, setRadioNaturalChecked] = useState(true);
    const [radioLegalChecked, setRadioLegalChecked] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = data => handleInsertByForm
        ? handleCreatePerson(data)
        : handleUpdatePerson(data);



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
            }).then(() => {
                handleInsertByForm();
            });
        }
        catch (e) {
            console.log(e);
        }
    }

    async function handleUpdatePerson(updated_person) {
        try {
            await API.put(`/${editPerson.pk_person}`, {
                person_name: updated_person.person_name
                , encrypt_pass: updated_person.person_pass
                , person_login: updated_person.person_pass
                , person_type: updated_person.person_type
                , cpf_cnpj: updated_person.person_cpf_cnpj
                , rg_stateinsc: updated_person.person_rg_stateinsc
                , tel: updated_person.person_tel
            }).then(() => {
                handleUpdateByForm();
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    function radioToogle() {
        setRadioNaturalChecked(!radioNaturalChecked);
        setRadioLegalChecked(!radioLegalChecked);
    }

    useEffect(() => {
        if (handleUpdateByForm) {
            if (handleUpdateByForm.person_type === 'juridica') {
                setRadioNaturalChecked(false);
                setRadioLegalChecked(true);
            }
        }
    }, [])

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
                            checked={radioNaturalChecked}
                            onClick={radioToogle}
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
                            checked={radioLegalChecked}
                            onClick={radioToogle}
                        />
                    </div>
                </div>


                <ContainerInput>
                    <label>Nome</label>
                    {handleInsertByForm
                        ? <Input {...register("person_name", { required: true })} />
                        : <Input defaultValue={`${editPerson.person_name}`}{...register("person_name", { required: true })} />
                    }
                    <Span>{errors.person_name?.message}</Span>
                </ContainerInput>

                <ContainerInput>
                    <label>Login</label>
                    {handleInsertByForm
                        ? <Input {...register("person_login", { required: true })} />
                        : <Input defaultValue={`${editPerson.person_login}`}{...register("person_login", { required: true })} />
                    }
                    <Span> {errors.person_login?.message}</Span>
                </ContainerInput>

                <ContainerInput>
                    <label>Senha</label>
                    {handleInsertByForm
                        ? <Input {...register("person_pass", { required: true })} />
                        : <Input defaultValue={`${editPerson.encrypt_pass}`}{...register("person_pass", { required: true })} />
                    }
                    <Span>{errors.person_pass?.message}</Span>
                </ContainerInput>

                <ContainerInput>
                    <label>CPF/CNPJ</label>
                    {handleInsertByForm
                        ? <Input {...register("person_cpf_cnpj", { required: true })} />
                        : <Input readOnly={true} value={`${editPerson.cpf_cnpj}`}{...register("person_cpf_cnpj")} />
                    }
                    <Span>{errors.person_cpf_cnpj?.message}</Span>
                </ContainerInput>

                <ContainerInput>
                    <label>RG/INSC ESTADUAL</label>
                    {handleInsertByForm
                        ? <Input {...register("person_rg_stateinsc", { required: true })} />
                        : <Input readOnly={true} value={`${editPerson.rg_stateinsc}`}{...register("person_rg_stateinsc")} />
                    }
                    <Span>{errors.person_rg_stateinsc?.message}</Span>
                </ContainerInput>


                <ContainerInput>
                    <label>Telefone</label>
                    {handleInsertByForm
                        ? <Input {...register("person_tel")} />
                        : <Input defaultValue={`${editPerson.tel}`}{...register("person_tel")} />
                    }
                </ContainerInput>

                <Input type="submit" value='Cadastrar' />
            </form>
        </div>
    );
}