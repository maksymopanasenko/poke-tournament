import * as Yup from 'yup';

const formValidationSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'First name must be between 2 and 12 characters')
        .max(12, 'First name must be between 2 and 12 characters')
        .matches(/^[a-zA-Z]+$/, 'Allowed characters are a-z, A-Z')
        .required('Firstname is required'),
    lastName: Yup.string()
        .min(2, 'Last name must be between 2 and 15 characters')
        .max(15, 'Last name must be between 2 and 15 characters')
        .matches(/^[a-zA-Z]+$/, 'Allowed characters are a-z, A-Z')
        .required('Lastname is required'),
    pokemons: Yup.array()
        .test('is-four-pokemons', 'You have to choose 4 pokemons', (value) => value?.length === 4)
        .of(
            Yup.object().shape({
                id: Yup.number().required('ID is required'),
                name: Yup.string().required('Name is required'),
                sprites: Yup.string().required('Sprites is required'),
            })
        ),
});

export default formValidationSchema;