import React, { useState } from 'react'
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const intialform = {
    title: "",
    director: "",
    metascore: 0,
    stars: ''
}

const UpdateMovie = (props) => {
    const { id, title } = useParams();
    const history = useHistory();

    const [form, setForm] = useState(intialform)
   

    const handleChange = e => {
        const { name, value } = e.target
        if(name === 'stars'){
            setForm({...form,[name]:[...name, value]})
        }
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        const updated = {
            id: id,
            title: form.title,
            director: form.director,
            metascore: form.metascore,
            stars: [form.stars]
        }

        axios.put(`http://localhost:5000/api/movies/${id}`, updated)
            .then((res) => {
                console.log(res)
                setForm(intialform)
                history.push(`/`)
            })
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <h2>Edit {title} </h2>
            <form onSubmit={handleSubmit}>
                <label>Title:
            <input
                        type='text'
                        name='title'
                        onChange={handleChange}
                        placeholder='Title'
                        value={form.title}
                    />
                </label>

                <input
                    type='text'
                    name='director'
                    onChange={handleChange}
                    placeholder='Director'
                    value={form.director}
                />

                <input
                    type='number'
                    name='metascore'
                    onChange={handleChange}
                    placeholder='Metascore'
                    value={form.metascore}
                />

                <input
                    type='text'
                    name='stars'
                    onChange={handleChange}
                    placeholder='Actors'
                    value={form.stars}
                />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default UpdateMovie