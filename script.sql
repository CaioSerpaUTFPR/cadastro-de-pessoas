EXECUTADAS NA ORDEM

CREATE TYPE enum_person_type AS ENUM ('fisica', 'juridica');

CREATE TABLE person
(
  pk_person serial NOT NULL,
  person_name character varying(50) NOT NULL,
  encrypt_pass character varying(50) NOT NULL,
  person_login character varying(50) NOT NULL,
  person_type enum_person_type NOT NULL,
  cpf_cnpj character varying(20) NOT NULL,
  rg_stateinsc character varying(20) NOT NULL,
  tel character varying(20),
  CONSTRAINT person_pkey PRIMARY KEY (pk_person),
  CONSTRAINT person_rg_stateinsc_key UNIQUE (rg_stateinsc)
);

CREATE OR REPLACE FUNCTION fn_decrypt_pass(p_encrypted_pass character varying)
  RETURNS character varying AS
$BODY$
declare
	r_decrypt_pass varchar = '';

	v_prepare_decrypt varchar;
	
	v_part1 varchar = '';
	v_part2 varchar = '';
	v_prepare_encripty varchar = '';

	v_size_pass int;
	v_half_pass int;
begin

	v_prepare_decrypt = decode(p_encrypted_pass, 'base64');
	v_size_pass = length(v_prepare_decrypt);
	v_half_pass = (length(v_prepare_decrypt)/2);
	
	v_part1 = substring(v_prepare_decrypt, 0, v_half_pass+1);
	v_part2 = substring(v_prepare_decrypt, v_half_pass+1, v_size_pass);

	raise notice 'v_part1:%  v_part2:%', v_part1, v_part2;

	v_part1 = reverse(v_part1);
	v_part2 = reverse(v_part2);

	r_decrypt_pass = v_part1 || v_part2;

	return r_decrypt_pass;

end;
$BODY$
  LANGUAGE plpgsql VOLATILE;


CREATE OR REPLACE FUNCTION fn_encrypt_pass(p_new_pass character varying)
  RETURNS character varying AS
$BODY$
declare
	r_encripty_pass varchar = '';
	
	v_part1 varchar = '';
	v_part2 varchar = '';
	v_prepare_encripty varchar = '';
	
	v_size_pass int = length(p_new_pass);
	v_half_pass int = (length(p_new_pass)/2);
begin

	v_part1 = substring(p_new_pass, 0, v_half_pass+1);
	v_part2 = substring(p_new_pass, v_half_pass+1, v_size_pass);

	v_part1 = reverse(v_part1);
	v_part2 = reverse(v_part2);

	v_prepare_encripty = v_part1 || v_part2;
	
	r_encripty_pass = encode(v_prepare_encripty::bytea,'base64');

return r_encripty_pass;

end;
$BODY$
  LANGUAGE plpgsql VOLATILE;


CREATE OR REPLACE FUNCTION tg_person_encrypt_pass_before()
  RETURNS trigger AS
$BODY$
declare
	v_new_pass varchar = '';
	v_encrypt_pass varchar = '';
	v_has_cpf_cnpj BOOLEAN = false;
	v_has_rg_stateinsc BOOLEAN = false;
begin 
	IF ( TG_OP = 'INSERT' or TG_OP = 'UPDATE' ) THEN
		v_new_pass = NEW.encrypt_pass;

		if ( TG_OP = 'INSERT' )THEN
			v_has_cpf_cnpj = coalesce(
						(select
							true
						from
							person
						where
							cpf_cnpj = NEW.cpf_cnpj
						limit 1),false);
			
			if ( v_has_cpf_cnpj )then
				raise 'CPF ou CNPJ já cadastrado!';
			end if;

			v_has_rg_stateinsc = coalesce(
							(select
								true
							from
								person
							where
								rg_stateinsc = NEW.rg_stateinsc
							limit 1),false);
			
			if ( v_has_rg_stateinsc )then
				raise 'RG ou Inscrição Estadual já cadastrado!';
			end if;

		END IF;




		if (TG_OP = 'UPDATE')then
			if ( coalesce(fn_encrypt_pass(NEW.encrypt_pass),'') = coalesce(OLD.encrypt_pass, '') )then
				raise  'A nova senha não pode ser igual a antiga senha!';
			end if;
			
		end if;

		if ( coalesce(NEW.encrypt_pass,'') = '' ) then
		
			raise 'Senha não pode ser vazia';
			
		end if;

		if ( length(coalesce(NEW.encrypt_pass,'') ) < 7) then
		
			raise 'A senha deve conter no minimo 8 digitos!';
			
		end if;

		
		v_encrypt_pass = fn_encrypt_pass(v_new_pass);
		NEW.encrypt_pass = v_encrypt_pass;
		

		
	END IF;
	
	IF ( TG_OP = 'DELETE' ) THEN
		RETURN OLD;
	ELSE
		RETURN NEW;
	end if;
end;

$BODY$
  LANGUAGE plpgsql VOLATILE;

  CREATE TRIGGER tg_person_encrypt_pass_before BEFORE INSERT OR UPDATE OR DELETE ON person FOR EACH ROW EXECUTE PROCEDURE tg_person_encrypt_pass_before();

